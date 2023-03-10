import {
    UBP_SPECIFIER,
    UPGRADE_BEACON_SPECIFIER,
    UpgradeBeacon__factory,
    UpgradeBeaconProxy__factory,
} from '@nomad-xyz/contracts-core';

import {ethers} from 'ethers';
import {utils} from '@nomad-xyz/multi-provider';
import * as config from '@nomad-xyz/configuration';

import Contracts from '../Contracts';
import {DeployContext} from '../DeployContext';
import {log} from '../utils';
import {Call, CallBatch} from '@nomad-xyz/sdk-govern';
import {CheckList} from '../Checklist';
import {DABridgeRouter__factory} from "@nomad-xyz/contracts-da-bridge/dist/src/factories/DABridgeRouter__factory";
import {DA_BRIDGE_ROUTER_SPECIFIER, DABridgeRouter} from "@nomad-xyz/contracts-da-bridge";

export abstract class AbstractBridgeDeploy<T> extends Contracts<T> {
    // Placeholder for future multi-VM abstraction
}

export default class DaBridgeContracts extends AbstractBridgeDeploy<config.EthereumBridgeDeploymentInfo> {
    protected keys: ReadonlyArray<keyof config.EthereumBridgeDeploymentInfo> = [
        'bridgeRouter',
        'deployHeight',
    ];

    constructor(
        context: DeployContext,
        domain: string,
        data?: config.EthereumBridgeDeploymentInfo,
    ) {
        super(context, domain, data);
    }

    assertIsComplete(): void {
        if (!this.data.customs) {
            this._data.customs = [];
        }
        super.assertIsComplete();
    }

    get domainNumber(): number {
        return this.context.resolveDomain(this.domain);
    }

    get deployer(): ethers.Signer {
        return this.context.getDeployer(this.domain);
    }

    get connection(): ethers.Signer | ethers.providers.Provider {
        return this.context.mustGetConnection(this.domain);
    }

    get overrides(): ethers.Overrides | undefined {
        return this.context.overrides.get(this.domain);
    }

    get confirmations(): number {
        const {confirmations} = this.context.mustGetDomainConfig(
            this.domain,
        ).specs;
        return utils.parseInt(confirmations);
    }

    get bridgeRouterContract(): DABridgeRouter {
        if (!this.data.bridgeRouter) { //TODO it raises error since cannot read bridge router
            throw new Error('Missing bridgeRouter address');
        }

        return DABridgeRouter__factory.connect(
            utils.evmId(this.data.bridgeRouter.proxy),
            this.connection,
        );

    }

    set bridgeRouter(proxy: config.Proxy) {
        this._data.bridgeRouter = proxy;
    }

    async recordStartBlock(): Promise<void> {
        if (this.data.deployHeight && this.data.deployHeight !== 0) return;
        const provider = this.context.mustGetProvider(this.domain);
        this._data.deployHeight = await provider.getBlockNumber();
    }


    // TODO: DRY
    private async deployProxy(
        initData: ethers.BytesLike,
        proxy: Partial<config.Proxy>,
    ): Promise<void> {
        const name = this.context.resolveDomainName(this.domain);
        const beacon = proxy.beacon;
        if (!beacon) throw new Error('Tried to deploy proxy without beacon');
        if (proxy.proxy) return; // don't redploy
        log(`  deploy Proxy on ${name}`);

        const factory = new UpgradeBeaconProxy__factory(
            this.context.getDeployer(name),
        );

        const constructorArguments = [beacon, initData];
        const prx = await factory.deploy(
            beacon, //constructorArguments[0],
            constructorArguments[1],
            this.overrides,
        );
        proxy.proxy = prx.address;
        await prx.deployTransaction.wait(this.confirmations);

        this.context.pushVerification(name, {
            name: 'UpgradeBeaconProxy',
            specifier: UBP_SPECIFIER,
            address: prx.address,
            constructorArguments,
            encodedConstructorArguments:
                UpgradeBeaconProxy__factory.createInterface().encodeDeploy(
                    constructorArguments,
                ),
        });
    }

    private async deployBeacon(proxy: Partial<config.Proxy>): Promise<void> {
        const name = this.context.resolveDomainName(this.domain);
        const core = this.context.mustGetCore(this.domain);
        const implementation = proxy.implementation;
        if (!implementation)
            throw new Error('Tried to deploy beacon without initial implementation');
        // don't redeploy
        if (proxy.beacon) return;
        log(`  deploy Beacon on ${name}`);

        const ubc = core.upgradeBeaconController.address;
        if (!ubc) throw new Error('Cannot deploy proxy without UBC');
        const factory = new UpgradeBeacon__factory(this.context.getDeployer(name));

        const constructorArguments = [implementation, ubc];
        const beacon = await factory.deploy(
            constructorArguments[0],
            constructorArguments[1],
            this.overrides,
        );
        proxy.beacon = beacon.address;
        await beacon.deployTransaction.wait(this.confirmations);

        this.context.pushVerification(name, {
            name: 'UpgradeBeacon',
            specifier: UPGRADE_BEACON_SPECIFIER,
            address: beacon.address,
            constructorArguments,
            encodedConstructorArguments:
                UpgradeBeacon__factory.createInterface().encodeDeploy(
                    constructorArguments,
                ),
        });
    }

    async newProxy(
        implementation: string,
        initData: ethers.BytesLike,
    ): Promise<config.Proxy> {
        const proxy = {implementation};

        await this.deployBeacon(proxy);
        await this.deployProxy(initData, proxy);

        return proxy as config.Proxy;
    }

    async deployDaBridgeRouter(): Promise<void> {
        const name = this.context.resolveDomainName(this.domain);
        const core = this.context.mustGetCore(this.domain);

        // don't redeploy
        if (this.data.bridgeRouter) {
            return;
        }
        log(`deploy DABridgeRouter on ${name}`);

        const initData =
            DABridgeRouter__factory.createInterface().encodeFunctionData(
                'initialize',
                [core.xAppConnectionManager.address, 2000],
            );

        const factory = new DABridgeRouter__factory(this.deployer);
        const implementation = await factory.deploy(this.overrides);
        await implementation.deployTransaction.wait(this.confirmations);

        this._data.bridgeRouter = await this.newProxy(
            implementation.address,
            initData,
        );

        console.log(this._data.bridgeRouter);

        console.log("pushVerification");
        this.context.pushVerification(name, {
            name: 'BridgeRouter',
            specifier: DA_BRIDGE_ROUTER_SPECIFIER,
            address: implementation.address,
        });
        console.log("pushVerification DONE");

    }

    async enrollDABridgeRouter(
        remote: string | number,
    ): Promise<CallBatch | undefined> {
        const remoteBridge = this.context.mustGetBridge(remote);
        const remoteDomain = this.context.resolveDomain(remote);
        const remoteConfig = this.context.mustGetDomainConfig(remote);
        const remoteName = this.context.resolveDomainName(remote);
        const local = this.context.resolveDomainName(this.domain);

        const remoteRouter = remoteBridge.data.bridgeRouter?.proxy;
        if (!remoteRouter) {
            throw new Error('Remote deploy incomplete. No BridgeRouter');
        }


        // don't re-enroll if already enrolled
        const enrolledRemote = await this.bridgeRouterContract.remotes(
            remoteConfig.domain,
        );
        if (
            utils.equalIds(enrolledRemote, remoteBridge.bridgeRouterContract.address)
        )
            return;
        log(`enroll BridgeRouter for ${remoteName} on ${local}`);

        // Check that this key has permissions to set this
        const owner = await this.bridgeRouterContract.owner();
        const deployer = ethers.utils.getAddress(await this.deployer.getAddress());

        // If we can't use deployer ownership
        if (!utils.equalIds(owner, deployer)) {
            const batch = CallBatch.fromContext(this.context.asNomadContext);
            const tx =
                await this.bridgeRouterContract.populateTransaction.enrollRemoteRouter(
                    remoteDomain,
                    utils.canonizeId(remoteRouter),
                );
            // safe as populateTransaction always sets `to`
            batch.push(this.domainNumber, tx as Call);
            return batch;
        }

        const tx = await this.bridgeRouterContract.enrollRemoteRouter(
            remoteDomain,
            utils.canonizeId(remoteRouter),
            this.overrides,
        );
        await tx.wait(this.confirmations);
        return;
    }

    async relinquish(): Promise<void> {
        const name = this.context.resolveDomainName(this.domain);
        const core = this.context.mustGetCore(this.domain);
        const governance = core.governanceRouter.address;

        const deployer = await this.deployer.getAddress();

        // transfer ownership of bridgeRouter to governance
        const bridgeOwner = await this.bridgeRouterContract.owner();
        if (utils.equalIds(bridgeOwner, deployer)) {
            log(`transfer bridge router ownership on ${name}`);
            const tx = await this.bridgeRouterContract.transferOwnership(
                governance,
                this.overrides,
            );
            await tx.wait(this.confirmations);
        }
    }

    async checkDeploy(remoteDomains: string[]): Promise<CheckList> {
        const checklist = new CheckList(`${this.domain.toUpperCase()}`, 'BRIDGE');
        checklist.addCheck({
            msg: `BridgeRouter is in config`,
            check: () => checklist.assertBeaconProxy(this.data.bridgeRouter),
        });

        // # DABridgeRouter

        const core = this.context.mustGetCore(this.domain);

        //  ========= BridgeRouter =========
        // BridgeRouter upgrade setup contracts are defined
        // owner
        checklist.addCheck({
            msg: 'BridgeRouter is owned by the GovernanceRouter',
            check: async () => {
                const bridgeRouterOwner = await this.bridgeRouterContract.owner();
                checklist.equalIds(core.governanceRouter.address, bridgeRouterOwner);
            },
        });

        // xAppConnectionManager
        checklist.addCheck({
            msg: 'BridgeRouter has correct xAppConnectionManager configured',
            check: async () => {
                const xApp = await this.bridgeRouterContract.xAppConnectionManager();
                checklist.equalIds(xApp, core.xAppConnectionManager.address);
            },
        });
        // remotes
        for (const domain of remoteDomains) {
            const remoteDomainNumber = this.context.mustGetDomain(domain).domain;
            checklist.addCheck({
                msg: `BridgeRouter is enrolled for ${CheckList.colorDomain(domain)}`,
                check: async () => {
                    const remoteRouter = await this.bridgeRouterContract.remotes(
                        remoteDomainNumber,
                    );
                    checklist.equalIds(
                        this.context.mustGetBridge(domain).bridgeRouterContract.address,
                        remoteRouter,
                    );
                },
            });
        }

        await checklist.executeChecks();
        return checklist;
    }

    checkVerificationInput(name: string, addr: string): void {
        this.context.checkVerificationInput(this.domain, name, addr);
    }
}
