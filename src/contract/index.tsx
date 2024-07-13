import {useAccount, useReadContract, useWriteContract} from 'wagmi'
import {abi} from '@/contract/abi'

function useCalculateEzETH(): number {
    // const readContract = useReadContract()
    const {address} = useAccount()

    if (!address) throw new Error('Please connect your wallet')

    //Get min max range from contract

    // Calculate ezETH based on min max range and ethAmount

    return 0

}

function useStake(): void {
    // const {writeContract} = useWriteContract()
    const {address} = useAccount()

    if (!address) throw new Error('Please connect your wallet')

    // Stake the amounts using writeContract

}