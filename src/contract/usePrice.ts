import {computePoolAddress, FeeAmount, Pool, Position, Route} from "@uniswap/v3-sdk";
import {Token} from "@uniswap/sdk-core";
import {ABIs, ChainId, Contracts} from "./abi";
import {DefaultDecimals, DefaultFee, DefaultTickSpacing, price2Tick} from "./useAddLiquidity";
import {useReadContracts} from "wagmi";
import {BigNumber} from "@ethersproject/bignumber";
import {formatUnits, parseEther} from "viem";

export function usePrice(
  tokenInAddress: string,
  tokenOutAddress: string,
  fee = FeeAmount.MEDIUM,
  ) {

  const tokenIn = new Token(Number(ChainId), tokenInAddress, DefaultDecimals)
  const tokenOut = new Token(Number(ChainId), tokenOutAddress, DefaultDecimals)

  const factoryAddress = Contracts["UniswapV3Factory"] as string
  const poolAddress = computePoolAddress({
    factoryAddress, tokenA: tokenIn, tokenB: tokenOut, fee: DefaultFee,
  })

  const readResult = useReadContracts({
    contracts: [
      {
        address: poolAddress,
        abi: ABIs["UniswapV3Pool"],
        functionName: "liquidity",
        args: [],
      },
      {
        address: poolAddress,
        abi: ABIs["UniswapV3Pool"],
        functionName: "slot0",
        args: [],
      }
    ]
  })

  const poolData = readResult.data

  if (poolData && poolData.length === 2) {
    const liquidity = poolData[0].result as BigNumber
    const slot0 = poolData[1].result as [BigNumber, BigNumber, BigNumber, BigNumber, BigNumber, BigNumber, BigNumber, boolean]
    const sqrtPriceX96 = slot0[0]
    const tick = slot0[1]

    const pool = new Pool(
      tokenIn, tokenOut, fee, // Fee tier, 0.3%
      sqrtPriceX96.toString(),
      liquidity.toString(), tick as number
    );

    const route = new Route([pool], tokenIn, tokenOut);
    const price = route.midPrice.toSignificant(6);

    // console.log(`Price of tokenIn in terms of tokenOut: ${price}`);

    return price
  }
  return 0
}
