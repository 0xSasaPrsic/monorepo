/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { ethers } from "ethers";
import {
  FactoryOptions,
  HardhatEthersHelpers as HardhatEthersHelpersBase,
} from "@nomiclabs/hardhat-ethers/types";

import * as Contracts from ".";

declare module "hardhat/types/runtime" {
  interface HardhatEthersHelpers extends HardhatEthersHelpersBase {
    getContractFactory(
      name: "Home",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Home__factory>;
    getContractFactory(
      name: "IMessageRecipient",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IMessageRecipient__factory>;
    getContractFactory(
      name: "IUpdaterManager",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IUpdaterManager__factory>;
    getContractFactory(
      name: "MerkleTreeManager",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.MerkleTreeManager__factory>;
    getContractFactory(
      name: "NomadBase",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.NomadBase__factory>;
    getContractFactory(
      name: "QueueManager",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.QueueManager__factory>;
    getContractFactory(
      name: "Replica",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Replica__factory>;
    getContractFactory(
      name: "Version0",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Version0__factory>;
    getContractFactory(
      name: "XAppConnectionManager",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.XAppConnectionManager__factory>;
    getContractFactory(
      name: "OwnableUpgradeable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.OwnableUpgradeable__factory>;
    getContractFactory(
      name: "Ownable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Ownable__factory>;
    getContractFactory(
      name: "TypedMemView",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.TypedMemView__factory>;
    getContractFactory(
      name: "Router",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Router__factory>;
    getContractFactory(
      name: "XAppConnectionClient",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.XAppConnectionClient__factory>;

    // default types
    getContractFactory(
      name: string,
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<ethers.ContractFactory>;
    getContractFactory(
      abi: any[],
      bytecode: ethers.utils.BytesLike,
      signer?: ethers.Signer
    ): Promise<ethers.ContractFactory>;
  }
}
