import React from 'react';
import {BadgeCheck} from 'lucide-react';

interface SuccesStakeModalProps {
    onGoToDashboard: () => void;
}

export default function SuccessStakeModal({onGoToDashboard}: SuccesStakeModalProps) {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
            <div className="bg-neutral-800 rounded-lg max-w-lg w-full p-6 relative">
                <div className="flex justify-center">
                    <BadgeCheck size={64} className="text-primary mb-4"/>
                </div>

                <h2 className="text-2xl font-bold mb-2">
                    The amount was successfully deposited!
                </h2>

                <p className="text-gray-400 mb-8 text-sm">
                    You&apos;ve successfully deposited the amount of tokens to the pool.
                    You can now track the pool range status and receive bonuses after the
                    successful distribution.
                </p>

                <div className="text-sm flex justify-end">
                    <button
                        onClick={onGoToDashboard}
                        className="bg-neutral-600 hover:bg-neutral-400 font-semibold py-4 px-6 rounded-2xl transition duration-300"
                    >
                        Go to Dashboard
                    </button>
                </div>
            </div>
        </div>
    );
}