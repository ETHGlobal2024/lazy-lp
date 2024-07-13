import {useAccount, useWriteContract} from 'wagmi'
import {abi} from '@/contract/abi'
import React from "react";

function useCalculateLazyLP(): React.JSX.Element {
    const {writeContract} = useWriteContract()
    const {address} = useAccount()

    if (!address) {
        return (
            <button onClick={() => alert('Please connect your wallet first')}>
                Transfer
            </button>
        )
    }

    return (
        <button
            onClick={() =>
                writeContract({
                    abi,
                    address,
                    functionName: 'TBD',
                    args: [],
                })
            }
        >
            Transfer
        </button>
        //     Write contract should return the ranges of the best possible outcome
        //     for the user
        //     and we use this to calculate the ezEth
    )
}