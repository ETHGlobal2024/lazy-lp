'use client'

import DashboardMetricCard from "@/components/ui/dashboard-card";
import HistoryTable from "@/components/ui/history-table";
import CustomConnectButton from "@/components/W3R/CustomConnectButton";
import {Sparkles} from "lucide-react";
import React, {useMemo, useState} from "react";
import {useAccount} from "wagmi";
import RangeDisplay from "@/components/ui/range-display";
import {ChartExample} from "@/components/ui/dashboard-chart";
import {Card} from "@/components/ui/card";
import SwapButton from "@/components/W3R/SwapButton";
import {useAddLiquidity, usePoolInfo} from "@/contract/useAddLiquidity";
import {Contracts} from "@/contract/abi";
import {set} from "zod";

const Dashboard = () => {

    const [ethAmount, setEthAmount] = useState<number>(0);
    const [ezethAmount, setEZethAmount] = useState<number>(0);
    const [isCalculated, setIsCalculated] = useState<boolean>(false);
    const account = useAccount();

    const {
        position,
        amountB
    } = usePoolInfo(Contracts["WETH"], Contracts["EETH"], 0.8, 1.1, BigInt(ethAmount * 10 ** 18));

    useMemo(() => {
        setEZethAmount(Number(amountB / BigInt(10 ** 18)));
        console.log("useEffect", amountB);
    }, [ethAmount]);

    const {
        addLiquidity, step, depositResult
    } = useAddLiquidity(
        Contracts["WETH"], Contracts["EETH"],
        0.9, 1.1, BigInt(ethAmount * 10 ** 18)
    );

    return (
        <main className="container mx-auto px-8 py-4">
            <div className="flex flex-row gap-4">
                <Card className="bg-background rounded-xl overflow-hidden p-2 flex flex-grow">
                    <div className="flex flex-grow flex-col">
                        <div className="grid grid-cols-3 gap-2">
                            <DashboardMetricCard title="CIRCULATING SUPPLY" value="$0.9831"/>
                            <DashboardMetricCard title="SPOT PRICE" value="$0.9831"/>
                            <DashboardMetricCard title="24H TRADING VOLUME" value="$2M"/>
                            <DashboardMetricCard title="AVG PRICE (24H)" value="$0.9803"/>
                            <DashboardMetricCard title="MAX PRICE (24H)" value="$0.9803"/>
                            <DashboardMetricCard title="MIN PRICE (24H)" value="$0.9803"/>
                        </div>
                        <div className="my-2 mx-1">
                            <ChartExample/>
                        </div>
                        <HistoryTable/>
                    </div>
                </Card>
                <div>
                    <Card className="bg-background rounded-xl overflow-hidden p-2">
                        <p className="text-2xl">Deposit to the Pool</p>
                        <div className="w-full max-w-xs flex flex-col justify-center items-center self-center gap-1">
                            <div className="bg-neutral-800 rounded-lg p-4 flex justify-between items-center w-full">
                                <div>
                                    <p className="text-gray-400 text-sm">Deposit</p>
                                    <input
                                        type="number"
                                        value={ethAmount}
                                        onChange={(e) => setEthAmount(Number(e.target.value))}
                                        className="bg-transparent text-4xl font-normal outline-none py-6 w-3/4"
                                        placeholder="0"
                                        step={0.001}
                                    />
                                </div>
                                <div className="flex items-center bg-neutral-600 rounded-md p-1.5 -translate-y-10">
                                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <rect width="32" height="32" rx="8" fill="#627EEA"/>
                                        <g clip-path="url(#clip0_6239_21740)">
                                            <path
                                                d="M16.0224 20.1565C15.9547 20.1795 15.9161 20.1206 15.8701 20.0936C13.614 18.762 11.3603 17.4295 9.10919 16.0962C9.08739 16.0851 9.06476 16.0759 9.0415 16.0684V16.0386L9.08144 16.0156C9.13814 16.0007 9.19396 15.9826 9.24862 15.9615L14.5652 13.5425C15.039 13.3265 15.5127 13.114 15.9865 12.9001H16.0204C16.0204 12.9678 16.0204 13.0281 16.0204 13.0924C16.0222 15.4473 16.0228 17.802 16.0224 20.1565Z"
                                                fill="#C0CBF6"/>
                                            <path
                                                d="M16.0255 12.9018H15.9917C15.9917 12.8341 15.9985 12.7664 15.9985 12.6953C15.9985 10.0503 15.9985 7.40496 15.9985 4.75944C15.9907 4.69149 15.9953 4.6227 16.012 4.55639H16.0262C16.3044 4.96722 16.5467 5.4004 16.8026 5.82478C18.8295 9.18685 20.8552 12.5485 22.8799 15.9096C22.8995 15.9428 22.9151 15.9773 22.9327 16.0139C22.8753 16.0016 22.819 15.9851 22.7641 15.9645C22.3925 15.7966 22.0196 15.626 21.6514 15.4548C21.0747 15.1908 20.4978 14.9273 19.9207 14.6643L17.1403 13.4047C16.7701 13.2341 16.3978 13.0683 16.0255 12.9018Z"
                                                fill="#C0CBF6"/>
                                            <path
                                                d="M16.0143 4.55289C15.9975 4.6192 15.9929 4.688 16.0007 4.75594C16.0007 7.40102 16.0007 10.0463 16.0007 12.6918C16.0007 12.7595 15.9967 12.8272 15.994 12.8983C15.5202 13.1122 15.0464 13.3247 14.5726 13.5406L9.25605 15.9596C9.20139 15.9808 9.14557 15.9989 9.08887 16.0138C9.24251 15.6943 9.44218 15.4046 9.62425 15.0987C11.7337 11.5922 13.8448 8.08643 15.9574 4.58132C15.9714 4.5619 15.9865 4.54337 16.0028 4.52582L16.0143 4.55289Z"
                                                fill="white"/>
                                            <path
                                                d="M16.0258 12.9018C16.3981 13.0683 16.7704 13.2342 17.142 13.402L19.9224 14.6616C20.5 14.9242 21.0769 15.1877 21.6531 15.4522C22.024 15.622 22.3976 15.794 22.7658 15.9618C22.8206 15.9825 22.877 15.999 22.9343 16.0112C23.002 16.0958 22.9018 16.0992 22.8714 16.1175C22.294 16.4627 21.714 16.8031 21.1353 17.1456C19.4743 18.1284 17.8138 19.1109 16.1538 20.0932C16.1118 20.1176 16.0665 20.1359 16.0225 20.1568C16.0225 17.8028 16.0225 15.4485 16.0225 13.0941C16.0231 13.0298 16.0252 12.9661 16.0258 12.9018Z"
                                                fill="#8197EE"/>
                                            <path
                                                d="M15.9987 21.4937L20.3473 18.9305C21.1776 18.4405 22.0074 17.95 22.8368 17.4591L22.9119 17.4178C22.9193 17.4855 22.8726 17.5214 22.8442 17.5606C20.9491 20.2323 19.0539 22.9031 17.1588 25.573C16.8001 26.0793 16.442 26.5883 16.0799 27.0905C16.0609 27.1169 16.0318 27.2407 15.9736 27.1094C16.0197 27.0702 15.9994 27.0174 15.9994 26.9741C15.9998 25.1466 15.9996 23.3198 15.9987 21.4937Z"
                                                fill="#C0CBF6"/>
                                            <path
                                                d="M15.9983 21.494C15.9983 23.3201 15.9983 25.1458 15.9983 26.971C15.9983 27.0177 16.0186 27.0705 15.9726 27.1064C15.8758 27.0482 15.8338 26.9439 15.7695 26.858C13.5721 23.7626 11.3757 20.6667 9.18053 17.5704C9.15278 17.5312 9.12706 17.4892 9.09863 17.4459C9.15549 17.4127 9.18595 17.4581 9.21911 17.4777C11.4414 18.7899 13.6632 20.1032 15.8846 21.4176C15.9259 21.4433 15.9611 21.4697 15.9983 21.494Z"
                                                fill="white"/>
                                            <path
                                                d="M16.0148 4.55285L15.9985 4.52781C16.0283 4.50886 16.0243 4.53661 16.029 4.55082L16.0148 4.55285Z"
                                                fill="#393939"/>
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_6239_21740">
                                                <rect width="13.913" height="22.6476" fill="white"
                                                      transform="translate(9.04346 4.52174)"/>
                                            </clipPath>
                                        </defs>
                                    </svg>

                                    <span className="text-neutral-400 font-normal ml-2">ETH</span>
                                </div>
                            </div>

                            <div className="relative flex justify-center -translate-y-5">
                                <div className="absolute bg-neutral-800 border-background border-4 p-1 rounded-lg">
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
                                        className="bg-transparent text-4xl font-normal outline-none py-6 w-3/4"
                                        placeholder="0"
                                    />
                                </div>
                                <div className="flex items-center bg-neutral-600 rounded-md p-1.5 -translate-y-10">
                                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <rect x="0.695652" y="0.695652" width="30.6087" height="30.6087" rx="7.30435"
                                              fill="white"/>
                                        <rect x="0.695652" y="0.695652" width="30.6087" height="30.6087" rx="7.30435"
                                              stroke="#ACE730" stroke-width="1.3913"/>
                                        <g clip-path="url(#clip0_6239_21772)">
                                            <path
                                                d="M16.0224 20.1565C15.9547 20.1795 15.9161 20.1206 15.8701 20.0935C13.614 18.762 11.3603 17.4295 9.10919 16.0961C9.08739 16.0851 9.06476 16.0759 9.0415 16.0684V16.0386L9.08144 16.0156C9.13814 16.0007 9.19396 15.9826 9.24862 15.9615L14.5652 13.5424C15.039 13.3265 15.5127 13.114 15.9865 12.9001H16.0204C16.0204 12.9678 16.0204 13.0281 16.0204 13.0924C16.0222 15.4473 16.0228 17.802 16.0224 20.1565Z"
                                                fill="#E3F7B9"/>
                                            <path
                                                d="M16.0255 12.9018H15.9917C15.9917 12.8341 15.9985 12.7664 15.9985 12.6953C15.9985 10.0503 15.9985 7.40496 15.9985 4.75943C15.9907 4.69149 15.9953 4.62269 16.012 4.55638H16.0262C16.3044 4.96722 16.5467 5.4004 16.8026 5.82477C18.8295 9.18684 20.8552 12.5485 22.8799 15.9096C22.8995 15.9428 22.9151 15.9773 22.9327 16.0139C22.8753 16.0016 22.819 15.9851 22.7641 15.9645C22.3925 15.7966 22.0196 15.626 21.6514 15.4548C21.0747 15.1908 20.4978 14.9273 19.9207 14.6643L17.1403 13.4047C16.7701 13.2341 16.3978 13.0683 16.0255 12.9018Z"
                                                fill="#90C228"/>
                                            <path
                                                d="M16.0143 4.55289C15.9975 4.6192 15.9929 4.688 16.0007 4.75594C16.0007 7.40102 16.0007 10.0463 16.0007 12.6918C16.0007 12.7595 15.9967 12.8272 15.994 12.8983C15.5202 13.1122 15.0464 13.3247 14.5726 13.5406L9.25605 15.9596C9.20139 15.9808 9.14557 15.9989 9.08887 16.0138C9.24251 15.6943 9.44218 15.4046 9.62425 15.0987C11.7337 11.5922 13.8448 8.08643 15.9574 4.58132C15.9714 4.5619 15.9865 4.54337 16.0028 4.52582L16.0143 4.55289Z"
                                                fill="#C2ED68"/>
                                            <path
                                                d="M16.0258 12.9018C16.3981 13.0683 16.7704 13.2342 17.142 13.402L19.9224 14.6616C20.5 14.9242 21.0769 15.1877 21.6531 15.4522C22.024 15.622 22.3976 15.794 22.7658 15.9618C22.8206 15.9825 22.877 15.999 22.9343 16.0112C23.002 16.0958 22.9018 16.0992 22.8714 16.1175C22.294 16.4627 21.714 16.8031 21.1353 17.1456C19.4743 18.1284 17.8138 19.1109 16.1538 20.0932C16.1118 20.1176 16.0665 20.1359 16.0225 20.1568C16.0225 17.8028 16.0225 15.4485 16.0225 13.0941C16.0231 13.0298 16.0252 12.9661 16.0258 12.9018Z"
                                                fill="#A3DB2E"/>
                                            <path
                                                d="M15.9987 21.4937L20.3473 18.9305C21.1776 18.4405 22.0074 17.95 22.8368 17.4591L22.9119 17.4178C22.9193 17.4855 22.8726 17.5214 22.8442 17.5606C20.9491 20.2323 19.0539 22.9031 17.1588 25.573C16.8001 26.0793 16.442 26.5883 16.0799 27.0905C16.0609 27.1169 16.0318 27.2407 15.9736 27.1094C16.0197 27.0702 15.9994 27.0174 15.9994 26.9741C15.9998 25.1466 15.9996 23.3198 15.9987 21.4937Z"
                                                fill="#6B8D1D"/>
                                            <path
                                                d="M15.9983 21.494C15.9983 23.3201 15.9983 25.1458 15.9983 26.971C15.9983 27.0177 16.0186 27.0705 15.9726 27.1064C15.8758 27.0482 15.8338 26.9439 15.7695 26.858C13.5721 23.7626 11.3757 20.6667 9.18053 17.5704C9.15278 17.5312 9.12706 17.4892 9.09863 17.4459C9.15549 17.4127 9.18595 17.4581 9.21911 17.4777C11.4414 18.7899 13.6632 20.1031 15.8846 21.4176C15.9259 21.4433 15.9611 21.4697 15.9983 21.494Z"
                                                fill="#C2ED68"/>
                                            <path
                                                d="M16.0148 4.55284L15.9985 4.5278C16.0283 4.50885 16.0243 4.5366 16.029 4.55081L16.0148 4.55284Z"
                                                fill="#393939"/>
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_6239_21772">
                                                <rect width="13.913" height="22.6476" fill="white"
                                                      transform="translate(9.04346 4.52174)"/>
                                            </clipPath>
                                        </defs>
                                    </svg>
                                    <span className="text-neutral-400 font-normal ml-2">ezETH</span>
                                </div>
                            </div>
                            {
                                !account.isConnected ? (
                                    <CustomConnectButton
                                        className="w-full bg-primary-20 hover:brightness-110 text-primary
                             font-bold my-1 py-3 px-4 rounded-lg transition duration-300"
                                    />
                                ) : !isCalculated ? (
                                    <div className="flex flex-row w-full gap-2">
                                        <button onClick={() => {
                                            setIsCalculated(true)
                                        }}
                                                className="w-1/2 bg-neutral-500 hover:bg-neutral-600 font-bold
                             my-1 py-3 px-4 rounded-lg transition duration-300 flex flex-row justify-center items-center"
                                        >
                                            <Sparkles size={20} className="text-white mr-2"/>
                                            AI Request
                                        </button>
                                        <div className="w-1/2">
                                            <SwapButton/>
                                        </div>
                                    </div>
                                ) : null
                            }
                            {isCalculated && (
                                <>
                                    <SwapButton/>
                                    <RangeDisplay
                                        ethRange={25}
                                        ezethRange={75}
                                        estApr={320}
                                        onRecalculate={() => {

                                        }
                                        }
                                        onConfirmStake={() => {
                                            addLiquidity().then(() => {
                                                    setIsCalculated(false);
                                                    setEthAmount(0);
                                                }
                                            )
                                        }
                                        }
                                        row={true}
                                    />
                                </>
                            )
                            }
                        </div>
                    </Card>
                </div>
            </div>
        </main>
    );
};

export default Dashboard;