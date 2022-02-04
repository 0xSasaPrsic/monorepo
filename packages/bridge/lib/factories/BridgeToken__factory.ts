/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { BridgeToken, BridgeTokenInterface } from "../BridgeToken";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        indexed: true,
        internalType: "string",
        name: "symbol",
        type: "string",
      },
      {
        indexed: true,
        internalType: "uint8",
        name: "decimals",
        type: "uint8",
      },
    ],
    name: "UpdateDetails",
    type: "event",
  },
  {
    inputs: [],
    name: "VERSION",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "_PERMIT_TYPEHASH",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "_spender",
        type: "address",
      },
    ],
    name: "allowance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_account",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_from",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_amnt",
        type: "uint256",
      },
    ],
    name: "burn",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_subtractedValue",
        type: "uint256",
      },
    ],
    name: "decreaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "detailsHash",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "domainSeparator",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_addedValue",
        type: "uint256",
      },
    ],
    name: "increaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_amnt",
        type: "uint256",
      },
    ],
    name: "mint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "nonces",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "_spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_value",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_deadline",
        type: "uint256",
      },
      {
        internalType: "uint8",
        name: "_v",
        type: "uint8",
      },
      {
        internalType: "bytes32",
        name: "_r",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "_s",
        type: "bytes32",
      },
    ],
    name: "permit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_newName",
        type: "string",
      },
      {
        internalType: "string",
        name: "_newSymbol",
        type: "string",
      },
      {
        internalType: "uint8",
        name: "_newDecimals",
        type: "uint8",
      },
    ],
    name: "setDetails",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "_detailsHash",
        type: "bytes32",
      },
    ],
    name: "setDetailsHash",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_recipient",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_sender",
        type: "address",
      },
      {
        internalType: "address",
        name: "_recipient",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x7f6e71edae12b1b97f4d1f60370fef10105fa2faae0126114a169c64845d6126c9608052610120604052600160e052603160f81b610100527fc89efdaa54c0f20c7adf612882df0950f5a951637e0307cdcb4c672f298b8bc660a05261190160f01b60c05234801561007057600080fd5b5060805160a05160c05160f01c6125236100a56000398061111652508061144b525080610da052806110b252506125236000f3fe608060405234801561001057600080fd5b50600436106101a35760003560e01c80638129fc1c116100ee578063a9059cbb11610097578063dd62ed3e11610071578063dd62ed3e1461060b578063f2fde38b14610646578063f698da2514610679578063ffa1ad7414610681576101a3565b8063a9059cbb14610557578063cc2ab7c714610590578063d505accf146105ad576101a3565b8063982aaf6b116100c8578063982aaf6b146104dd5780639dc29fac146104e5578063a457c2d71461051e576101a3565b80638129fc1c1461049c5780638da5cb5b146104a457806395d89b41146104d5576101a3565b806340c10f191161015057806370a082311161012a57806370a082311461042e578063715018a6146104615780637ecebe0014610469576101a3565b806340c10f19146103265780634815fcb114610361578063654935f414610369576101a3565b806323b872dd1161018157806323b872dd1461028c578063313ce567146102cf57806339509351146102ed576101a3565b806306fdde03146101a8578063095ea7b31461022557806318160ddd14610272575b600080fd5b6101b0610689565b6040805160208082528351818301528351919283929083019185019080838360005b838110156101ea5781810151838201526020016101d2565b50505050905090810190601f1680156102175780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b61025e6004803603604081101561023b57600080fd5b5073ffffffffffffffffffffffffffffffffffffffff813516906020013561073d565b604080519115158252519081900360200190f35b61027a610753565b60408051918252519081900360200190f35b61025e600480360360608110156102a257600080fd5b5073ffffffffffffffffffffffffffffffffffffffff813581169160208101359091169060400135610759565b6102d76107cf565b6040805160ff9092168252519081900360200190f35b61025e6004803603604081101561030357600080fd5b5073ffffffffffffffffffffffffffffffffffffffff81351690602001356107d8565b61035f6004803603604081101561033c57600080fd5b5073ffffffffffffffffffffffffffffffffffffffff813516906020013561081b565b005b61027a6108d1565b61035f6004803603606081101561037f57600080fd5b81019060208101813564010000000081111561039a57600080fd5b8201836020820111156103ac57600080fd5b803590602001918460018302840111640100000000831117156103ce57600080fd5b9193909290916020810190356401000000008111156103ec57600080fd5b8201836020820111156103fe57600080fd5b8035906020019184600183028401116401000000008311171561042057600080fd5b91935091503560ff166108d7565b61027a6004803603602081101561044457600080fd5b503573ffffffffffffffffffffffffffffffffffffffff16610aad565b61035f610abe565b61027a6004803603602081101561047f57600080fd5b503573ffffffffffffffffffffffffffffffffffffffff16610bd5565b61035f610be7565b6104ac610d03565b6040805173ffffffffffffffffffffffffffffffffffffffff9092168252519081900360200190f35b6101b0610d1f565b61027a610d9e565b61035f600480360360408110156104fb57600080fd5b5073ffffffffffffffffffffffffffffffffffffffff8135169060200135610dc2565b61025e6004803603604081101561053457600080fd5b5073ffffffffffffffffffffffffffffffffffffffff8135169060200135610e74565b61025e6004803603604081101561056d57600080fd5b5073ffffffffffffffffffffffffffffffffffffffff8135169060200135610ed0565b61035f600480360360208110156105a657600080fd5b5035610edd565b61035f600480360360e08110156105c357600080fd5b5073ffffffffffffffffffffffffffffffffffffffff813581169160208101359091169060408101359060608101359060ff6080820135169060a08101359060c00135610f93565b61027a6004803603604081101561062157600080fd5b5073ffffffffffffffffffffffffffffffffffffffff813581169160200135166112c0565b61035f6004803603602081101561065c57600080fd5b503573ffffffffffffffffffffffffffffffffffffffff166112f8565b61027a6113a9565b6102d761149f565b60688054604080516020601f60027fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff6101006001881615020190951694909404938401819004810282018101909252828152606093909290918301828280156107335780601f1061070857610100808354040283529160200191610733565b820191906000526020600020905b81548152906001019060200180831161071657829003601f168201915b5050505050905090565b600061074a3384846114a4565b50600192915050565b60675490565b60006107668484846115eb565b6107c584336107c0856040518060600160405280602881526020016124376028913973ffffffffffffffffffffffffffffffffffffffff8a16600090815260666020908152604080832033845290915290205491906117bd565b6114a4565b5060019392505050565b606a5460ff1690565b33600081815260666020908152604080832073ffffffffffffffffffffffffffffffffffffffff87168452909152812054909161074a9185906107c0908661186e565b6108236118e9565b73ffffffffffffffffffffffffffffffffffffffff16610841610d03565b73ffffffffffffffffffffffffffffffffffffffff16146108c357604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015290519081900360640190fd5b6108cd82826118ed565b5050565b606c5481565b60685460027fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff610100600184161502019091160415808061098d5750606c5461098b87878080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525050604080516020601f8b018190048102820181019092528981529250899150889081908401838280828437600092019190915250889250611a20915050565b145b6109f857604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601260248201527f21636f6d6d69747465642064657461696c730000000000000000000000000000604482015290519081900360640190fd5b610a0460688787612296565b50610a1160698585612296565b50606a80547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff001660ff841617905580610aa5578160ff168484604051808383808284376040519201829003822094508b93508a92508190508383808284376040519201829003822094507f96848da8c41ae282b5ec5c04f45fc469a8186bb78de70419275c2c402fcc27b193506000925050a45b505050505050565b6000610ab882611b5b565b92915050565b610ac66118e9565b73ffffffffffffffffffffffffffffffffffffffff16610ae4610d03565b73ffffffffffffffffffffffffffffffffffffffff1614610b6657604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015290519081900360640190fd5b60335460405160009173ffffffffffffffffffffffffffffffffffffffff16907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0908390a3603380547fffffffffffffffffffffffff0000000000000000000000000000000000000000169055565b606b6020526000908152604090205481565b600054610100900460ff1680610c005750610c00611b83565b80610c0e575060005460ff16155b610c63576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252602e815260200180612409602e913960400191505060405180910390fd5b600054610100900460ff16158015610cc957600080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff007fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff00ff909116610100171660011790555b610cd1611b94565b8015610d0057600080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff00ff1690555b50565b60335473ffffffffffffffffffffffffffffffffffffffff1690565b60698054604080516020601f60027fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff6101006001881615020190951694909404938401819004810282018101909252828152606093909290918301828280156107335780601f1061070857610100808354040283529160200191610733565b7f000000000000000000000000000000000000000000000000000000000000000081565b610dca6118e9565b73ffffffffffffffffffffffffffffffffffffffff16610de8610d03565b73ffffffffffffffffffffffffffffffffffffffff1614610e6a57604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015290519081900360640190fd5b6108cd8282611c86565b600061074a33846107c0856040518060600160405280602581526020016124c96025913933600090815260666020908152604080832073ffffffffffffffffffffffffffffffffffffffff8d16845290915290205491906117bd565b600061074a3384846115eb565b610ee56118e9565b73ffffffffffffffffffffffffffffffffffffffff16610f03610d03565b73ffffffffffffffffffffffffffffffffffffffff1614610f8557604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015290519081900360640190fd5b80606c5414610d0057606c55565b8342111561100257604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601d60248201527f45524332305065726d69743a206578706972656420646561646c696e65000000604482015290519081900360640190fd5b73ffffffffffffffffffffffffffffffffffffffff871661108457604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601f60248201527f45524332305065726d69743a206f776e6572207a65726f206164647265737300604482015290519081900360640190fd5b73ffffffffffffffffffffffffffffffffffffffff8088166000818152606b602090815260408083205481517f00000000000000000000000000000000000000000000000000000000000000008185015280830195909552948b166060850152608084018a905260a0840185905260c08085018a90528151808603909101815260e090940190528251920191909120907f000000000000000000000000000000000000000000000000000000000000000061113d6113a9565b83604051602001808461ffff1660f01b81526002018381526020018281526020019350505050604051602081830303815290604052805190602001209050600060018288888860405160008152602001604052604051808581526020018460ff1681526020018381526020018281526020019450505050506020604051602081039080840390855afa1580156111d7573d6000803e3d6000fd5b5050506020604051035190508a73ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff161461127d57604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601e60248201527f45524332305065726d69743a20696e76616c6964207369676e61747572650000604482015290519081900360640190fd5b73ffffffffffffffffffffffffffffffffffffffff8b166000908152606b602052604090206001850190556112b38b8b8b6114a4565b5050505050505050505050565b73ffffffffffffffffffffffffffffffffffffffff918216600090815260666020908152604080832093909416825291909152205490565b6113006118e9565b73ffffffffffffffffffffffffffffffffffffffff1661131e610d03565b73ffffffffffffffffffffffffffffffffffffffff16146113a057604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015290519081900360640190fd5b610d0081611dd0565b6000804690507f8b73c3c69bb8fe3d512ecc4cf759cc79239f7b179b0ffacaa9a75d522b39400f606860000160405180828054600181600116156101000203166002900480156114305780601f1061140e576101008083540402835291820191611430565b820191906000526020600020905b81548152906001019060200180831161141c575b505060408051918290038220602080840196909652828201527f0000000000000000000000000000000000000000000000000000000000000000606083015260808201959095523060a0808301919091528551808303909101815260c090910190945250508151910120905090565b600081565b73ffffffffffffffffffffffffffffffffffffffff8316611510576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260248152602001806124a56024913960400191505060405180910390fd5b73ffffffffffffffffffffffffffffffffffffffff821661157c576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260228152602001806123c16022913960400191505060405180910390fd5b73ffffffffffffffffffffffffffffffffffffffff808416600081815260666020908152604080832094871680845294825291829020859055815185815291517f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b9259281900390910190a3505050565b73ffffffffffffffffffffffffffffffffffffffff8316611657576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260258152602001806124806025913960400191505060405180910390fd5b73ffffffffffffffffffffffffffffffffffffffff82166116c3576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260238152602001806123566023913960400191505060405180910390fd5b6116ce838383611f72565b611718816040518060600160405280602681526020016123e36026913973ffffffffffffffffffffffffffffffffffffffff861660009081526065602052604090205491906117bd565b73ffffffffffffffffffffffffffffffffffffffff8085166000908152606560205260408082209390935590841681522054611754908261186e565b73ffffffffffffffffffffffffffffffffffffffff80841660008181526065602090815260409182902094909455805185815290519193928716927fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef92918290030190a3505050565b60008184841115611866576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825283818151815260200191508051906020019080838360005b8381101561182b578181015183820152602001611813565b50505050905090810190601f1680156118585780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b505050900390565b6000828201838110156118e257604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601b60248201527f536166654d6174683a206164646974696f6e206f766572666c6f770000000000604482015290519081900360640190fd5b9392505050565b3390565b73ffffffffffffffffffffffffffffffffffffffff821661196f57604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601f60248201527f45524332303a206d696e7420746f20746865207a65726f206164647265737300604482015290519081900360640190fd5b61197b60008383611f72565b606754611988908261186e565b60675573ffffffffffffffffffffffffffffffffffffffff82166000908152606560205260409020546119bb908261186e565b73ffffffffffffffffffffffffffffffffffffffff831660008181526065602090815260408083209490945583518581529351929391927fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9281900390910190a35050565b6000835184845185856040516020018086815260200185805190602001908083835b60208310611a7f57805182527fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe09092019160209182019101611a42565b51815160209384036101000a7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff01801990921691161790529201868152855190830192860191508083835b60208310611b0757805182527fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe09092019160209182019101611aca565b6001836020036101000a0380198251168184511680821785525050505050509050018260ff1660f81b8152600101955050505050506040516020818303038152906040528051906020012090509392505050565b73ffffffffffffffffffffffffffffffffffffffff1660009081526065602052604090205490565b6000611b8e30611f77565b15905090565b600054610100900460ff1680611bad5750611bad611b83565b80611bbb575060005460ff16155b611c10576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252602e815260200180612409602e913960400191505060405180910390fd5b600054610100900460ff16158015611c7657600080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff007fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff00ff909116610100171660011790555b611c7e611f7d565b610cd161208f565b73ffffffffffffffffffffffffffffffffffffffff8216611cf2576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252602181526020018061245f6021913960400191505060405180910390fd5b611cfe82600083611f72565b611d48816040518060600160405280602281526020016123796022913973ffffffffffffffffffffffffffffffffffffffff851660009081526065602052604090205491906117bd565b73ffffffffffffffffffffffffffffffffffffffff8316600090815260656020526040902055606754611d7b908261221f565b60675560408051828152905160009173ffffffffffffffffffffffffffffffffffffffff8516917fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9181900360200190a35050565b611dd86118e9565b73ffffffffffffffffffffffffffffffffffffffff16611df6610d03565b73ffffffffffffffffffffffffffffffffffffffff1614611e7857604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015290519081900360640190fd5b73ffffffffffffffffffffffffffffffffffffffff8116611ee4576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252602681526020018061239b6026913960400191505060405180910390fd5b60335460405173ffffffffffffffffffffffffffffffffffffffff8084169216907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a3603380547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff92909216919091179055565b505050565b3b151590565b600054610100900460ff1680611f965750611f96611b83565b80611fa4575060005460ff16155b611ff9576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252602e815260200180612409602e913960400191505060405180910390fd5b600054610100900460ff16158015610cd157600080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff007fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff00ff909116610100171660011790558015610d0057600080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff00ff16905550565b600054610100900460ff16806120a857506120a8611b83565b806120b6575060005460ff16155b61210b576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252602e815260200180612409602e913960400191505060405180910390fd5b600054610100900460ff1615801561217157600080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff007fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff00ff909116610100171660011790555b600061217b6118e9565b603380547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff8316908117909155604051919250906000907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0908290a3508015610d0057600080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff00ff16905550565b60008282111561229057604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601e60248201527f536166654d6174683a207375627472616374696f6e206f766572666c6f770000604482015290519081900360640190fd5b50900390565b828054600181600116156101000203166002900490600052602060002090601f0160209004810192826122cc5760008555612330565b82601f10612303578280017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff00823516178555612330565b82800160010185558215612330579182015b82811115612330578235825591602001919060010190612315565b5061233c929150612340565b5090565b5b8082111561233c576000815560010161234156fe45524332303a207472616e7366657220746f20746865207a65726f206164647265737345524332303a206275726e20616d6f756e7420657863656564732062616c616e63654f776e61626c653a206e6577206f776e657220697320746865207a65726f206164647265737345524332303a20617070726f766520746f20746865207a65726f206164647265737345524332303a207472616e7366657220616d6f756e7420657863656564732062616c616e6365496e697469616c697a61626c653a20636f6e747261637420697320616c726561647920696e697469616c697a656445524332303a207472616e7366657220616d6f756e74206578636565647320616c6c6f77616e636545524332303a206275726e2066726f6d20746865207a65726f206164647265737345524332303a207472616e736665722066726f6d20746865207a65726f206164647265737345524332303a20617070726f76652066726f6d20746865207a65726f206164647265737345524332303a2064656372656173656420616c6c6f77616e63652062656c6f77207a65726fa2646970667358221220f33a9297f40bed4f67d1363b9d55447bba59611bc4f920314fadd8d81f16f31764736f6c63430007060033";

export class BridgeToken__factory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<BridgeToken> {
    return super.deploy(overrides || {}) as Promise<BridgeToken>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): BridgeToken {
    return super.attach(address) as BridgeToken;
  }
  connect(signer: Signer): BridgeToken__factory {
    return super.connect(signer) as BridgeToken__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): BridgeTokenInterface {
    return new utils.Interface(_abi) as BridgeTokenInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): BridgeToken {
    return new Contract(address, _abi, signerOrProvider) as BridgeToken;
  }
}
