import React from 'react';
import {Sparkles} from 'lucide-react';

interface RangeDisplayProps {
    ethRange: number;
    ezethRange: number;
    estApr: number;
    onRecalculate: () => void;
    onConfirmStake: () => void;
}

export default function RangeDisplay({
                                         ethRange,
                                         ezethRange,
                                         estApr,
                                         onRecalculate,
                                         onConfirmStake
                                     }: RangeDisplayProps) {
    return (
        <div className="rounded-lg p-4 max-w-lg w-full bg-primary my-1">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-primary">Range</h2>
                <div className="flex items-center text-sm border-2 border-primary p-1 rounded-sm">
                    <Sparkles size={16} className="text-primary mr-2"/>
                    <p className="text-primary">Calculated with AI</p>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-2 mb-4">
                <div className="rounded-lg p-3 border-2 border-primary ">
                    <p className="text-sm mb-1 text-primary">ETH RANGE</p>
                    <p className="text-3xl font-bold text-primary">{ethRange}%</p>
                </div>
                <div className="rounded-lg p-3 border-2 border-primary ">
                    <p className="text-sm mb-1 text-primary">EZETH RANGE</p>
                    <p className=" text-3xl font-bold text-primary">{ezethRange}%</p>
                </div>
                <div className="rounded-lg p-3 border-2 border-primary ">
                    <p className="text-sm mb-1 text-primary">EST. APR</p>
                    <p className=" text-3xl font-bold text-primary">{estApr}%</p>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
                <button
                    onClick={onRecalculate}
                    className="font-bold py-2 px-4 rounded-lg transition duration-300 bg-primary hover:brightness-90 text-primary"
                >
                    Recalculate
                </button>
                <button
                    onClick={onConfirmStake}
                    className="font-bold py-2 px-4 rounded-lg transition duration-300 bg-primary hover:brightness-90 text-black"
                >
                    Confirm Stake
                </button>
            </div>
        </div>
    );
}