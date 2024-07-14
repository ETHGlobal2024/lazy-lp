import {
    useAccount,
    useReadContract,
    useReadContracts,
    useSendTransaction,
    useWaitForTransactionReceipt,
    useWriteContract
} from 'wagmi'
import {BigNumber} from "@ethersproject/bignumber";
import {
    computePoolAddress,
    FeeAmount, MintOptions,
    NonfungiblePositionManager,
    Pool,
    Position, Route,
    TICK_SPACINGS, Trade
} from "@uniswap/v3-sdk";
import {Percent, Token} from "@uniswap/sdk-core";
import {ABIs, ChainId, Contracts} from "./abi";
import {formatUnits, parseEther} from "viem";
import {useEffect, useState} from "react";

export const DefaultFee = FeeAmount.MEDIUM
export const DefaultTickSpacing = TICK_SPACINGS[DefaultFee]
export const DefaultInitialPrice = 1
export const DefaultDecimals = 18

export function number2Str(num: number): string {
    return num.toPrecision(Math.ceil(Math.log10(num)))
}

export function calcSqrtPriceX96(
    tokenAAddress: string, tokenBAddress: string,
    initialPrice: number) {
    return number2Str(Math.sqrt(initialPrice) * (2 ** 96));
    // if (tokenAAddress < tokenBAddress) {
    //   console.log(`${initialPrice} -> ${number2Str(Math.sqrt(initialPrice) * (2 ** 96))}`);
    //   return number2Str(Math.sqrt(initialPrice) * (2 ** 96));
    // } else {
    //   console.log(`${initialPrice} -> ${number2Str(Math.sqrt(1 / initialPrice) * (2 ** 96))}`);
    //   return number2Str(Math.sqrt(1 / initialPrice) * (2 ** 96));
    // }
}

export function price2Tick(price: number, tickSpacing = 1) {
    return Math.floor(Math.log(price) / Math.log(1.0001) / tickSpacing) * tickSpacing;
}

export function usePoolInfo(
    tokenAAddress: string,
    tokenBAddress: string,
    priceLower: number,
    priceUpper: number,
    amountA: bigint) {

    const tokenA = new Token(Number(ChainId), tokenAAddress, DefaultDecimals)
    const tokenB = new Token(Number(ChainId), tokenBAddress, DefaultDecimals)

    const factoryAddress = Contracts["UniswapV3Factory"] as string
    const poolAddress = computePoolAddress({
        factoryAddress, tokenA, tokenB, fee: DefaultFee,
    })

    const readResult = useReadContracts({
        contracts: [
            {
                //@ts-ignore
                address: poolAddress,
                abi: ABIs["UniswapV3Pool"],
                functionName: "liquidity",
                args: [],
            },
            {
                //@ts-ignore
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

        console.log(`Pool info: liquidity=${liquidity}, sqrtPriceX96=${sqrtPriceX96}, tick=${tick}`)

        const pool = new Pool(
            tokenA, tokenB, DefaultFee, sqrtPriceX96.toString(),
            //@ts-ignore
            liquidity.toString(), tick as number
        )

        const tickLower: number = price2Tick(priceLower, DefaultTickSpacing)
        const tickUpper: number = price2Tick(priceUpper, DefaultTickSpacing)

        const position = Position.fromAmount0({
            pool, tickLower, tickUpper,
            amount0: amountA.toString(),
            useFullPrecision: true
        })
        // const realDeltaAmountA = amountA
        const amountB = parseEther(position.amount1.toFixed())

        console.log(`Approving tokens: ${
            formatUnits(amountA, DefaultDecimals)
        } TokenA and ${
            formatUnits(amountB, DefaultDecimals)
        } TokenB`)

        return {position, amountB}
    }

    //@ts-ignore
    return {position: null, amountB: 0n}
}

export function useAddLiquidity(
    tokenAAddress: string,
    tokenBAddress: string,
    priceLower: number,
    priceUpper: number,
    amountA: bigint
) {
    const [step, setStep] = useState<number>(0)
    const {writeContractAsync} = useWriteContract();

    const [approvalHash1, setApprovalHash1] = useState<string>("");
    const [approvalHash2, setApprovalHash2] = useState<string>("");
    const [depositHash, setDepositHash] = useState<string>("");

    const {position, amountB} = usePoolInfo(tokenAAddress, tokenBAddress, priceLower, priceUpper, amountA)
    console.log({position, amountB})

    const {address} = useAccount()
    const {sendTransactionAsync} = useSendTransaction();

    const {data: approveResult1} = useWaitForTransactionReceipt({
        hash: approvalHash1 as `0x${string}`,
        confirmations: 2,
    });
    const {data: approveResult2} = useWaitForTransactionReceipt({
        hash: approvalHash2 as `0x${string}`,
        confirmations: 2,
    });
    const {data: depositResult, error: depositError} =
        useWaitForTransactionReceipt({
            hash: depositHash as `0x${string}`,
            confirmations: 2,
        });

    const addLiquidity = async () => {
        console.log("Adding liquidity...")
        await _approve1()
    }

    const _approve1 = async () => {
        setStep(1)
        const hash1 = await writeContractAsync({
            abi: ABIs["MockERC20"],
            //@ts-ignore
            address: tokenAAddress,
            functionName: "approve",
            args: [
                Contracts["NonfungiblePositionManager"],
                //@ts-ignore
                amountA * 12n / 10n,
            ],
        });
        setApprovalHash1(hash1);
    }
    const _approve2 = async () => {
        setStep(2)
        const hash2 = await writeContractAsync({
            abi: ABIs["MockERC20"],
            //@ts-ignore
            address: tokenBAddress,
            functionName: "approve",
            args: [
                Contracts["NonfungiblePositionManager"],
                //@ts-ignore
                amountB * 12n / 10n,
            ],
        });
        setApprovalHash2(hash2);
    }
    const _addLiquidity = async () => {
        setStep(3)

        const mintOptions: MintOptions = {
            recipient: address as string,
            deadline: Math.floor(Date.now() / 1000) + 60 * 20,
            slippageTolerance: new Percent(100, 10_000),
        }

        const {calldata, value} = NonfungiblePositionManager.addCallParameters(position!, mintOptions)

        const hash = await sendTransactionAsync({
            //@ts-ignore
            to: Contracts["NonfungiblePositionManager"], data: calldata, value
        })

        console.log(`Transaction hash: ${hash}`)

        setDepositHash(hash)
    }

    useEffect(() => {
        if (approveResult1 && !approveResult2) {
            _approve2();
        }
        if (approveResult1 && approveResult2) {
            _addLiquidity();
        }
    }, [approveResult1, approveResult2]);

    useEffect(() => {
        if (depositResult) {
            setStep(4);
        }
    }, [depositResult]);

    return {addLiquidity, step, depositResult}
}
