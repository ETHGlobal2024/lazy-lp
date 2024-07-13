import React from 'react';
import {Sparkles} from 'lucide-react';

interface RangeDisplayProps {
    ethRange: number;
    ezethRange: number;
    estApr: number;
    onRecalculate: () => void;
    onConfirmStake: () => void;
    row?: boolean;
}

export default function RangeDisplay({
                                         ethRange,
                                         ezethRange,
                                         estApr,
                                         onRecalculate,
                                         onConfirmStake,
                                         row = false

                                     }: RangeDisplayProps) {
    return (
        <div className="rounded-lg p-4 max-w-lg w-full bg-primary-20 my-1">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-primary">Range</h2>
                <div className="flex items-center text-sm border-2 border-primary-60 p-1 rounded-sm">
                    <Sparkles size={16} className="text-primary-60 mr-2"/>
                    <p className="text-primary-60">Calculated with AI</p>
                </div>
            </div>

            {!row ? (
                <div className="grid grid-cols-3 gap-2 mb-4">
                    <div className="rounded-lg p-3 border-2 border-primary-60 ">
                        <p className="text-sm mb-1 text-primary-60">ETH RANGE</p>
                        <p className="text-4xl font-normal text-primary">{ethRange}%</p>
                    </div>
                    <div className="rounded-lg p-3 border-2 border-primary-60 ">
                        <p className="text-sm mb-1 text-primary-60">EZETH RANGE</p>
                        <p className=" text-4xl font-normal text-primary">{ezethRange}%</p>
                    </div>
                    <div className="rounded-lg p-3 border-2 border-primary-60">
                        <p className="text-sm mb-1 text-primary-60">EST. APR</p>
                        <p className=" text-4xl font-nornal text-primary">{estApr}%</p>
                    </div>
                </div>) : (
                <div className="grid grid-row-3 gap-2 mb-4">
                    <div className="rounded-lg p-3 border-2 border-primary-60 ">
                        <p className="text-sm mb-1 text-primary-60">ETH RANGE</p>
                        <p className="text-2xl font-normal text-primary">{ethRange}%</p>
                    </div>
                    <div className="rounded-lg p-3 border-2 border-primary-60 ">
                        <p className="text-sm mb-1 text-primary-60">EZETH RANGE</p>
                        <p className=" text-2xl font-normal text-primary">{ezethRange}%</p>
                    </div>
                    <div className="rounded-lg p-3 border-2 border-primary-60">
                        <p className="text-sm mb-1 text-primary-60">EST. APR</p>
                        <p className=" text-2xl font-nornal text-primary">{estApr}%</p>
                    </div>
                </div>)
            }

            <div className="grid grid-cols-2 gap-1.5">
                <button
                    onClick={onRecalculate}
                    className="text-sm font-bold py-2 px-4 rounded-lg transition duration-300 bg-primary-40 hover:brightness-90 text-primary"
                >
                    Recalculate
                </button>
                <button
                    onClick={onConfirmStake}
                    className="text-sm font-bold py-2 px-4 rounded-lg transition duration-300 bg-primary hover:brightness-90 text-black"
                >
                    Confirm Stake
                </button>
            </div>
        </div>
    );
}