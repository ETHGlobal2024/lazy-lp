'use client'
import NotificationModule from "@/components/W3R/NotificationModule";
import NotificationButton from "@/components/W3R/NotificationButton";
import React, {useState} from 'react';
// TODO - Replace egg with ETH icon
import {Egg, Sparkles} from 'lucide-react';
import CustomConnectButton from "@/components/W3R/CustomConnectButton";
import {useAccount} from "wagmi";
import RangeDisplay from "@/components/ui/range-display";

export default function Main() {

    const [ethAmount, setEthAmount] = useState<string>('0');
    const [ezethAmount, setEZethAmount] = useState<string>('0');
    const [isCalculated, setIsCalculated] = useState<boolean>(false);
    const account = useAccount();

    // TODO: Implement actual zETH calculation logic
    const calculateEZEth = (ethAmount: string): string => {
        // Placeholder calculation - replace with actual logic
        setIsCalculated(true);
        return ethAmount;
    };

    return (
        <main className="container flex justify-center gap-8 flex-col my-20">
            {/*<NotificationModule/>*/}
            {/*<NotificationButton/>*/}
            <h1 className="text-3xl font-bold text-center">Deposit anytime, <br/> anywhere</h1>

            <div className="w-full max-w-lg flex flex-col justify-center items-center self-center gap-1">
                <div className="bg-neutral-800 rounded-lg p-4 flex justify-between items-center w-full">
                    <div>
                        <p className="text-gray-400 text-sm">Deposit</p>
                        <input
                            type="number"
                            value={ethAmount}
                            onChange={(e) => setEthAmount(e.target.value)}
                            className="bg-transparent text-2xl font-bold outline-none py-4"
                            placeholder="0"
                        />
                    </div>
                    <div className="flex items-center bg-neutral-600 rounded px-3 py-1">
                        <Egg size={20} className="text-neutral-200 mr-1"/>
                        <span className="text-neutral-200 font-semibold">ETH</span>
                    </div>
                </div>

                <div className="relative flex justify-center -translate-y-5">
                    <div className="absolute bg-neutral-800 border-background border-4 p-1 rounded">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none"
                             viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                        </svg>
                    </div>
                </div>

                <div className="bg-neutral-800 rounded-lg p-4 flex justify-between items-center w-full">
                    <div>
                        <p className="text-gray-400 text-sm">Deposit</p>
                        <input
                            type="number"
                            value={ezethAmount}
                            readOnly
                            className="bg-transparent text-2xl font-bold outline-none py-4"
                            placeholder="0"
                        />
                    </div>
                    <div className="flex items-center bg-neutral-600 rounded px-3 py-1">
                        <Egg size={20} className="text-neutral-200 mr-1"/>
                        <span className="text-neutral-200 font-semibold">ezETH</span>
                    </div>
                </div>
                {
                    !account.isConnected ? (
                        <CustomConnectButton
                            className="w-full bg-primary hover:brightness-90
                             font-bold my-1 py-3 px-4 rounded-lg transition duration-300"
                        />
                    ) : !isCalculated ? (
                        <button onClick={() => {
                            setEZethAmount(calculateEZEth(ethAmount + 10));
                        }}
                                className="w-full bg-neutral-500 hover:bg-neutral-600 font-bold
                             my-1 py-3 px-4 rounded-lg transition duration-300 flex flex-row justify-center items-center"
                        >
                            <Sparkles size={20} className="text-white mr-2"/>
                            AI Request
                        </button>
                    ) : null
                }
                {isCalculated && (
                    <RangeDisplay
                        ethRange={25}
                        ezethRange={75}
                        estApr={320}
                        onRecalculate={() => {
                            setEZethAmount(calculateEZEth(ethAmount + 20));
                        }
                        }
                        onConfirmStake={() => {
                            alert('Stake confirmed');
                        }
                        }
                    />
                )
                }
            </div>
            <p className="text-gray-400 text-md text-center mt-2">
                The AI recommendations is lorem ipsum<br/>
                Try not to connect ...
            </p>
        </main>
    );
}