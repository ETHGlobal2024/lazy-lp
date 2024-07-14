'use client'

import React, { useState } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';

const HistoryTable = () => {
    const [selectedPeriod, setSelectedPeriod] = useState('7d');

    const periods = ['24h', '7d', '14d', '30d'];

    // Sample data - replace with actual data fetching logic
    const historyData = [
        { price: '1.039', time: '07.13.24 12:25', currentRange: '1.035 — 1.042', oldRange: '1.035 — 1.042' },
        { price: '1.039', time: '07.13.24 12:25', currentRange: '1.035 — 1.042', oldRange: '1.035 — 1.042' },
        { price: '1.039', time: '07.13.24 12:25', currentRange: '1.035 — 1.042', oldRange: '1.035 — 1.042' },
        { price: '1.039', time: '07.13.24 12:25', currentRange: '1.035 — 1.042', oldRange: '1.035 — 1.042' },
        { price: '1.039', time: '07.13.24 12:25', currentRange: '1.035 — 1.042', oldRange: '1.035 — 1.042' },
    ];

    return (
        <Card className="bg-neutral-900 text-white rounded-xl overflow-hidden">
            <CardHeader className="flex justify-between items-center p-4 flex-row">
                <h2 className="text-2xl font-normal">History</h2>
                <div className="flex space-x-2 bg-neutral-700 p-1.5 rounded-xl">
                    {periods.map((period) => (
                        <button
                            key={period}
                            className={`px-3 py-1 rounded-md text-sm ${
                                selectedPeriod === period ? 'bg-neutral-600' : 'bg-neutral-700 hover:bg-neutral-600'
                            }`}
                            onClick={() => setSelectedPeriod(period)}
                        >
                            {period}
                        </button>
                    ))}
                </div>
            </CardHeader>
            <CardContent className="p-0">
                <table className="w-full">
                    <thead>
                    <tr className="bg-neutral-800 text-neutral-400">
                        <th className="py-2 px-4 text-left">Price (USD)</th>
                        <th className="py-2 px-4 text-left">Position Time</th>
                        <th className="py-2 px-4 text-left">Current Range</th>
                        <th className="py-2 px-4 text-left">Old Range ({selectedPeriod})</th>
                    </tr>
                    </thead>
                    <tbody>
                    {historyData.map((row, index) => (
                        <tr key={index} className="border-t border-neutral-800">
                            <td className="py-3 px-4">{row.price}</td>
                            <td className="py-3 px-4">{row.time}</td>
                            <td className="py-3 px-4">{row.currentRange}</td>
                            <td className="py-3 px-4">{row.oldRange}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </CardContent>
        </Card>
    );
};

export default HistoryTable;