import * as config from '@nomad-xyz/configuration';
import { MultiProvider, utils } from '@nomad-xyz/multi-provider';
import { NomadContext } from '@nomad-xyz/sdk';
import { CallBatch } from '@nomad-xyz/sdk-govern';
import ethers from 'ethers';

import {EthereumBridgeDeploy, } from './bridge/BridgeContracts';
import {EvmCoreDeploy, } from './core/CoreContracts';
import fs from 'fs';
import { CheckList } from './Checklist';

const defaultRoot = '0x0000000000000000000000000000000000000000000000000000000000000000'


export interface Verification {
  name: string;
  specifier: string;
  address: string;
  constructorArguments?: ReadonlyArray<unknown>;
  encodedConstructorArguments?: string; // DataHexString
}

export class DeployContext extends MultiProvider<config.Domain> {
  overrides: Map<string, ethers.Overrides>;
  protected _data: config.NomadConfig;
  protected _verification: Map<string, Array<Verification>>;
  protected _callBatch: CallBatch;
  protected _outputDir: string;
  protected _instantiatedAt: number;

  constructor(data: config.NomadConfig, outputDir = './output') {
    super();

    this._data = data;
    this.overrides = new Map();
    this._verification = new Map();
    this._outputDir = outputDir;
    this._instantiatedAt = Date.now();

    for (const network of this.data.networks) {
      this.registerDomain(this.data.protocol.networks[network]);
      if (this.data.rpcs[network] && this.data.rpcs[network].length > 0 && this.isNetEvm(network)) {
        this.registerRpcProvider(network, this.data.rpcs[network][0]);
      }
    }

    // instantiate the CallBatch *after* the providers have been registered
    this._callBatch = CallBatch.fromContext(this.asNomadContext);
  }

  get asNomadContext(): NomadContext {
    const ctx = new NomadContext(this.data);
    for (const [domain, provider] of this.providers.entries()) {
      ctx.registerProvider(domain, provider);
    }
    return ctx;
  }

  get protocol(): config.NetworkInfo | undefined {
    return this.data.protocol;
  }

  get networks(): ReadonlyArray<string> {
    return this.data.networks;
  }

  get cores(): Readonly<Record<string, config.CoreDeploymentInfo>> {
    return this.data.core;
  }

  get bridges(): Readonly<Record<string, config.BridgeDeploymentInfo>> {
    return this.data.bridge;
  }

  get data(): Readonly<config.NomadConfig> {
    return this._data;
  }

  get outputDir(): Readonly<string> {
    return this._outputDir;
  }

  get instantiatedAt(): Readonly<number> {
    return this._instantiatedAt;
  }

  get verification(): Readonly<Map<string, ReadonlyArray<Verification>>> {
    return this._verification;
  }

  get callBatch(): Readonly<CallBatch> {
    return this._callBatch;
  }

  validate(): void {
    config.validateConfig(this.data);
  }

  getDeployer(nameOrDomain: string | number): ethers.Signer {
    return this.mustGetSigner(nameOrDomain);
  }

  getDomainConfig(nameOrDomain: string | number): config.Domain | undefined {
    const name = this.resolveDomainName(nameOrDomain);
    return this.data.protocol.networks[name];
  }

  mustGetDomainConfig(nameOrDomain: string | number): config.Domain {
    const protocol = this.getDomainConfig(nameOrDomain);
    if (!protocol)
      throw new Error(`No protocol configuration for domain ${nameOrDomain}`);
    return protocol;
  }

  getCore(nameOrDomain: string | number): EvmCoreDeploy | undefined {
    const name = this.resolveDomainName(nameOrDomain);
    const coreConfig = this.data.core[name];

    if (!coreConfig) {
      console.log(`No core actually for ${nameOrDomain}`, this.data);
      return undefined;
    }
    if (!isEvmCoreConfig(coreConfig)) {
      console.log(`Core is not evm!`, coreConfig);
      return undefined;
    }
    return new EvmCoreDeploy(this, name, coreConfig as config.EthereumCoreDeploymentInfo);
  }

  mustGetCore(nameOrDomain: string | number): EvmCoreDeploy {
    const core = this.getCore(nameOrDomain);
    if (!core) throw new Error(`No core contracts for domain ${nameOrDomain}`);
    return core;
  }

  getBridge(nameOrDomain: string | number): EthereumBridgeDeploy | undefined {
    const name = this.resolveDomainName(nameOrDomain);
    if (!this.data.bridge[name]) return undefined;
    if (!isEvmBridgeConfig(this.data.bridge[name])) return undefined
    return new EthereumBridgeDeploy(this, name, this.data.bridge[name] as config.EthereumBridgeDeploymentInfo);
  }

  mustGetBridge(nameOrDomain: string | number): EthereumBridgeDeploy {
    const bridge = this.getBridge(nameOrDomain);
    if (!bridge)
      throw new Error(`No bridge contracts for domain ${nameOrDomain}`);
    return bridge;
  }

  addDomain(domain: config.Domain): void {
    this._data = config.addNetwork(this.data, domain);
  }

  protected addCore(name: string, core: config.EthereumCoreDeploymentInfo): void {
    this._data = config.addCore(this.data, name, core);
    this.output();
  }

  protected addBridge(name: string, bridge: config.EthereumBridgeDeploymentInfo): void {
    this._data = config.addBridge(this.data, name, bridge);
    this.output();
  }

  pushVerification(
    nameOrDomain: string | number,
    verification: Verification,
  ): void {
    const name = this.resolveDomainName(nameOrDomain);
    if (!this.verification.has(name)) this.verification.set(name, []);

    const net = this._verification.get(name);
    if (net) net.push(verification);
  }

  mustGetVerification(nameOrDomain: string | number): readonly Verification[] {
    const domain = this.resolveDomainName(nameOrDomain);
    const verification = this.verification.get(domain);
    if (!verification)
      throw new Error(
        `Verification with name ${nameOrDomain} for domain ${domain} is not defined`,
      );

    return verification;
  }

  output(): void {
    // output the config
    fs.mkdirSync(this.outputDir, { recursive: true });
    fs.writeFileSync(
      `${this.outputDir}/config.json`,
      JSON.stringify(this.data, null, 2),
    );
    // if new contracts were deployed,
    const verification = Object.fromEntries(this.verification);
    if (Object.keys(verification).length > 0) {
      // output the verification inputs
      // Note: append the timestamp so that
      // verification outputs for different runs are disambiguated
      fs.writeFileSync(
        `${this.outputDir}/verification-${this.instantiatedAt}.json`,
        JSON.stringify(verification, null, 2),
      );
    }
  }

  async outputGovernance(): Promise<void> {
    const governanceBatch = this.callBatch;
    if (!governanceBatch.isEmpty()) {
      // build & write governance batch
      await governanceBatch.build();
      fs.writeFileSync(
        `${this.outputDir}/governanceTransactions.json`,
        JSON.stringify(governanceBatch, null, 2),
      );
    }
  }

  protected async deployCore(domain: config.Domain): Promise<void> {
    this.addDomain(domain);

    const core = new EvmCoreDeploy(this, domain.name);
    await core.recordStartBlock();

    await Promise.all([
      core.deployUpgradeBeaconController(),
      core.deployUpdaterManager(),
      core.deployXAppConnectionManager(),
    ]);

    await core.deployHome();
    await core.deployGovernanceRouter();

    // all contracts deployed
    const complete = core.complete();
    this.addCore(domain.name, complete);
  }

  protected async deployBridge(name: string): Promise<void> {
    this.mustGetCore(name).complete(); // assert that the core is totally deployed

    const bridge = new EthereumBridgeDeploy(this, name);
    await bridge.recordStartBlock();

    await bridge.deployTokenUpgradeBeacon();
    await bridge.deployTokenRegistry();
    await bridge.deployBridgeRouter();
    await bridge.deployEthHelper();

    this.addBridge(name, bridge.complete());
  }

  /// Deploys all configured Cores
  async ensureCores(): Promise<void> {
    const networksToDeploy = this.networks.filter((net) => !this.cores[net]).filter(net => this.isNetEvm(net));

    await Promise.all(
      networksToDeploy.map((net) =>
        this.deployCore(this.mustGetDomainConfig(net))
      ),
    );
  }

  isNetEvm(nameOrDomain: string | number): boolean {
    const domain = this.getDomain(nameOrDomain);
    if (!domain) throw new Error(`Domain ${nameOrDomain} is not found`);
    return domain.rpcStyle === 'ethereum';
  }

  // Deploys all configured connections and enrolls them if possible.
  // For any connection that cannot be enrolled, outputs the governance
  // action required to enroll them
  async ensureCoreConnections(): Promise<void> {
    // ensure all core contracts are deployed
    await this.ensureCores();
    // ensure all core contracts are enrolled in each other
    await Promise.all(
      this.networks.filter(net => this.isNetEvm(net)).map(async (network): Promise<void> => {
          
        const core = this.mustGetCore(network);
        const name = this.resolveDomainName(network);
        const remoteDomains = this.data.protocol.networks[name]?.connections;
        // the following "unreachable" error performs type-narrowing for the compiler
        if (!remoteDomains) throw new utils.UnreachableError();
        if (remoteDomains.length == 0) return;

        const [firstDomain, ...restDomains] = remoteDomains;

        // wait on the first replica deploy to ensure that the implementation and beacon are deployed
        let firstReplicaTxns: CallBatch = await core.enrollRemote(firstDomain, !this.isNetEvm(firstDomain));
        this.output();
        this._callBatch.append(firstReplicaTxns);

        // perform subsequent replica deploys concurrently (will use same implementation and beacon)
        await Promise.all(
          restDomains.map(async (remote) => {
            let batch: CallBatch = await core.enrollRemote(remote, !this.isNetEvm(remote));
            this.output();
            if (batch) this._callBatch.append(batch);
          }),
        );
      }),
    );
  }

  /// Deploys all configured bridges.
  async ensureBridges(): Promise<void> {
    const toDeploy = this.networks.filter((net) => !this.bridges[net]).filter((net) => this.isNetEvm(net));
    await Promise.all(toDeploy.map((net) => this.deployBridge(net)));
  }

  async ensureBridgeConnections(): Promise<void> {
    // first, ensure all bridge contracts are deployed
    await this.ensureBridges();
    // next, ensure all bridge contracts are enrolled in each other
    // and all custom tokens are also enrolled
    await Promise.all(
      this.networks.filter((net) => this.isNetEvm(net)).map(async (network): Promise<void> => {
        const bridge = this.mustGetBridge(network);
        const name = this.resolveDomainName(network);
        const remoteDomains = this.data.protocol.networks[name]?.connections.filter((net) => this.isNetEvm(net));
        // the following "unreachable" error performs type-narrowing for the compiler
        if (!remoteDomains) throw new utils.UnreachableError();
        await Promise.all(
          remoteDomains.map(async (remote) => {
            const batch = await bridge.enrollBridgeRouter(remote);
            if (batch) this._callBatch.append(batch);
          }),
        );

        // deploy and enroll custom tokens
        const customs = await bridge.deployCustomTokens();
        if (customs) this._callBatch.append(customs);
      }),
    );
  }

  async relinquishOwnership(): Promise<void> {
    const networks = this.networks.filter((net) => this.isNetEvm(net));
    // relinquish deployer control
    await Promise.all([
      ...networks.map((network) => this.mustGetCore(network).relinquish()),
      ...networks.map((network) =>
        this.mustGetBridge(network).relinquish(),
      ),
    ]);
  }

  async relinquishCoreOwnership(): Promise<void> {
    const networks = this.networks.filter((net) => this.isNetEvm(net));
    // relinquish deployer control
    await Promise.all(networks.map((network) => this.mustGetCore(network).relinquish()));
  }

  // Intended entrypoint.
  async deployAndRelinquish(): Promise<void> {
    // validate the config input
    this.validate();

    // Checks for connections that are present in the config,
    // but lack the on-chain state to be connected,
    // such as missing deployed contracts or
    // missing on-chain configuration transactions.
    // Deploys all missing contracts.
    // Attempts to submit any missing configuration transactions;
    // if unable to submit the transaction, adds them to callBatch as governance actions.
    await this.ensureCoreConnections();
    await this.ensureBridgeConnections();

    // relinquish control of all other contracts from deployer to governance
    await this.relinquishOwnership();

    // appoint governor on all networks
    await Promise.all(
      this.networks.filter(net => this.isNetEvm(net)).map((network) =>
        this.mustGetCore(network).appointGovernor(),
      ),
    );

    // output governance transactions
    // once all actions have completed
    await this.outputGovernance();
  }

  // perform validation checks on core and bridges
  async checkDeployment(): Promise<void> {
    CheckList.printStart(this.data.environment);
    const [core, bridge] = await Promise.all([
      this.checkCores(),
      this.checkBridges(),
    ]);
    // combine core and bridge checks
    const list = CheckList.combine([core, bridge]);
    // print the results of all checks
    list.report();
  }

  async checkCores(): Promise<CheckList> {
    const checklists: CheckList[] = [];
    await Promise.all(
      this.networks.map(async (net) => {
        const coreConfig = this.data.core[net];
        if (this.isNetEvm(net)) {
          if (!coreConfig)
            throw new Error(`network ${net} is missing core config`);

          if (!isEvmCoreConfig(this.data.core[net]))
            throw new Error(`not an core config - deal with it somehow TODO`);

          const core = new EvmCoreDeploy(this, net, coreConfig as config.EthereumCoreDeploymentInfo);

          const domainConfig = this.mustGetDomainConfig(net);

          const checklist = await core.checkDeploy(
            domainConfig.connections.filter(net => this.isNetEvm(net)),
            this.data.protocol.governor.domain,
          );
          checklists.push(checklist);
        }
      }),
    );
    const checklist = CheckList.combine(checklists);
    return checklist;
  }

  async checkBridges(): Promise<CheckList> {
    const checklists: CheckList[] = [];
    await Promise.all(this.networks.map(async (net) => {
      const bridgeConfig = this.data.bridge[net];
      if (this.isNetEvm(net)) {
        if (!bridgeConfig)
        throw new Error(`network ${net} is missing bridge config`);
      
        if (!isEvmBridgeConfig(bridgeConfig))
          throw new Error(`not an core config - deal with it somehow TODO`);
        const bridge = new EthereumBridgeDeploy(this, net, bridgeConfig as config.EthereumBridgeDeploymentInfo);
        const checklist = await bridge.checkDeploy(
          this.data.protocol.networks[net].connections,
        );
        checklists.push(checklist);
      }
    }));
    const checklist = CheckList.combine(checklists);
    return checklist;
  }

  checkVerificationInput(
    nameOrDomain: string | number,
    name: string,
    addr: string,
  ): void {
    const verification = this.mustGetVerification(nameOrDomain);

    if (verification.length === 0)
      throw new Error(
        `Verification with name '${name}' for domain '${nameOrDomain}' is not defined`,
      );
    const inputAddr = verification.filter(
      (contract) => contract.name == name,
    )[0].address;
    expect(utils.equalIds(inputAddr, addr));
  }
}


function isEvmCoreConfig(config: config.CoreDeploymentInfo ): boolean {
  console.log(`Checking if config evm:`, config);
  try {
    return !!(config as config.EthereumCoreDeploymentInfo).home
  } catch(e) {
    console.log(`NOOOO`);
    return false
  }
}

function isEvmBridgeConfig(config: config.BridgeDeploymentInfo ): boolean {
  try {
    return !!(config as config.EthereumBridgeDeploymentInfo).bridgeRouter
  } catch(e) {
    return false
  }
}