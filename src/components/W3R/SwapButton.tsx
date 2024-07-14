'use client'

import React, {useState} from 'react';
import {useAccount} from 'wagmi';
import {ApiResponse, Notification} from '@/types';
import {sendNotification} from '@/lib/notifications';
import {useSwap} from "@/contract/useSwap";
import {Contracts} from "@/contract/abi";
import {usePrice} from "@/contract/usePrice";

const SwapButton = () => {
    const {address} = useAccount();
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState<ApiResponse | null>(null);

    const {swap} = useSwap(
        Contracts["WETH"], Contracts["EETH"], BigInt(1 * 10 ** 18)
    );

    const handleNotify = async (notification: Notification) => {
        if (!address) {
            alert('Please connect your wallet first');
            return;
        }

        setIsLoading(true);
        try {
            const accounts = [`eip155:1:${address}`];
            const response = await sendNotification(notification, accounts);
            setResult(response);
        } catch (error) {
            console.error('Error sending notification:', error);
            alert('Failed to send notification. Check console for details.');
        } finally {
            setIsLoading(false);
            alert('Notification sent')
        }
    };

    const price = usePrice(Contracts["WETH"], Contracts["EETH"]);
    console.log("usePrice", price);

    //Return the min and max range of the swap
    const handleSwap = async () => {
        await swap()

        const low = Number(price) * 0.90
        const high = Number(price) * 1.10

        return [
            low,
            high
        ]
    }

    return (
        <button onClick={() => {

            handleSwap().then(([min, max]) => {
                handleNotify({
                    type: '3d671a2f-1277-46ad-b2e8-aa58d308be0f',
                    title: 'Rebalance Alert',
                    body: `We changed the allocation of your portfolio. Your new allocation is ${min} - ${max}`,
                    url: 'https://lazy-lp.vercel.app/'
                })
            })
        }
        } disabled={isLoading || !address}
                className="w-full bg-neutral-500 hover:bg-neutral-600 font-bold
                             my-1 py-3 px-4 rounded-lg transition duration-300 flex flex-row justify-center items-center">
            Swap
        </button>
    );
};

export default SwapButton;