import {sepolia} from "wagmi/chains";
import _Contracts from "./contracts.json";

export const ABIs = {
  MockERC20: require("./abi/MockERC20.json").abi,
  NonfungiblePositionManager: require("./abi/NonfungiblePositionManager.json").abi,
  NonfungibleTokenPositionDescriptor: require("./abi/NonfungibleTokenPositionDescriptor.json").abi,
  QuoterV2: require("./abi/QuoterV2.json").abi,
  SwapRouter02: require("./abi/SwapRouter02.json").abi,
  UniswapV3Factory: require("./abi/UniswapV3Factory.json").abi,
  UniswapV3Pool: require("./abi/UniswapV3Pool.json").abi,
} as const;
export type ContractName = keyof typeof ABIs;

export const ChainId = process.env.NEXT_PUBLIC_CHAIN_ID as string;

export const Chains = {
  "48899": {
    name: "Zircuit Testnet",
    rpcUrl: "https://zircuit1.p2pify.com",
    explorerUrl: "https://explorer.zircuit.com",
  },
  "11155111": {
    name: "Sepolia Testnet",
    rpcUrl: "https://ethereum-sepolia-rpc.publicnode.com",
    explorerUrl: "https://sepolia.etherscan.io",
  },
};

export const ChainDetails = {
  "48899": {
    id: 48899,
    network: "zircuit-testnet",
    name: "Zircuit Testnet",
    nativeCurrency: {
      name: "Ether",
      symbol: "ETH",
      decimals: 18,
    },
    rpcUrls: {
      default: {
        http: ["https://zircuit1.p2pify.com"],
      },
      public: {
        http: ["https://zircuit1.p2pify.com"],
      },
    },
    blockExplorers: {
      default: {
        name: "Zircuit Explorer",
        url: "https://explorer.zircuit.com",
      },
    },
    testnet: true,
  },
  "11155111": sepolia,
};

export const Chain = Chains[ChainId as keyof typeof Chains];
export const ChainDetail = ChainDetails[ChainId as keyof typeof ChainDetails];
//@ts-ignore
export const Contracts = _Contracts[ChainId] as { [key: string]: string };
