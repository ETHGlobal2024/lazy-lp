import {computePoolAddress, FeeAmount, Pool, Position, Route} from "@uniswap/v3-sdk";
import {Token} from "@uniswap/sdk-core";
import {ABIs, ChainId, Contracts} from "./abi";
import {DefaultDecimals, DefaultFee, DefaultTickSpacing, price2Tick} from "./useAddLiquidity";
import {useAccount, useReadContracts, useSendTransaction, useWaitForTransactionReceipt, useWriteContract} from "wagmi";
import {BigNumber} from "@ethersproject/bignumber";
import {formatUnits, parseEther} from "viem";
import {useEffect, useState} from "react";

export function useSwap(
  tokenInAddress: string,
  tokenOutAddress: string,
  amountIn: bigint
  ) {
  const [step, setStep] = useState<number>(0)
  const { writeContractAsync } = useWriteContract();

  const [approvalHash1, setApprovalHash1] = useState<string>("");
  const [depositHash, setDepositHash] = useState<string>("");

  const {address} = useAccount()

  const { data: approveResult1 } = useWaitForTransactionReceipt({
    hash: approvalHash1 as `0x${string}`,
    confirmations: 2,
  });
  const { data: depositResult, error: depositError } =
    useWaitForTransactionReceipt({
      hash: depositHash as `0x${string}`,
      confirmations: 2,
    });

  const swap = async () => {
    console.log("Adding liquidity...")
    await _approve1()
  }

  const _approve1 = async () => {
    setStep(1)
    const hash1 = await writeContractAsync({
      abi: ABIs["MockERC20"],
      //@ts-ignore
      address: tokenInAddress,
      functionName: "approve",
      args: [
        Contracts["SwapRouter02"],
        //@ts-ignore
        amountIn * 12n / 10n,
      ],
    });
    setApprovalHash1(hash1);
  }
  const _swap = async () => {
    setStep(2)
    const hash = await writeContractAsync({
      abi: ABIs["SwapRouter02"],
      //@ts-ignore
      address: Contracts["SwapRouter02"],
      functionName: "exactInputSingle",
      args: [
        {
          tokenIn: tokenInAddress,
          tokenOut: tokenOutAddress,
          fee: DefaultFee,
          //@ts-ignore
          recipient: address,
          deadline: Math.floor(Date.now() / 1000) + 60 * 20,
          amountIn: amountIn.toString(),
          amountOutMinimum: 0,
          sqrtPriceLimitX96: 0,
        },
      ],
    });
    setDepositHash(hash);
  }

  useEffect(() => {
    if (approveResult1) {
      _swap();
    }
  }, [approveResult1]);

  useEffect(() => {
    if (depositResult) {
      setStep(3);
    }
  }, [depositResult]);

  return {
    swap,
  }
}
