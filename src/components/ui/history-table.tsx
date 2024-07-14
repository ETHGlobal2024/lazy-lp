'use client'

import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';

interface HistoryData {
    timestamp: number;
    oldRange: [number, number];
    newRange: [number, number];
    triggerPrice: string;
}

// interface ApiResponse {
//     data: HistoryData[];
// }

const HistoryTable = () => {
    const [selectedPeriod, setSelectedPeriod] = useState('7d');
    const [historyData, setHistoryData] = useState<HistoryData[]>([]);

    const periods = ['24h', '7d', '14d', '30d'];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`/api/rebalance`, {
                    headers: {
                        "ngrok-skip-browser-warning": "69420",
                    }
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const result: HistoryData[] = await response.json();
                console.log("result", result);
                setHistoryData(result);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchData();
    }, [selectedPeriod]);

    const formatTimestamp = (timestamp: number): string => {
        const date = new Date(timestamp * 1000);
        return date.toLocaleString('en-US', {
            month: '2-digit',
            day: '2-digit',
            year: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        });
    };

    const formatRange = (range: [number, number]): string => {
        return `${range[0].toFixed(3)} — ${range[1].toFixed(3)}`;
    };

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
                        <th className="py-2 px-4 text-left">Price (ETH)</th>
                        <th className="py-2 px-4 text-left">Position Time</th>
                        <th className="py-2 px-4 text-left">Current Range</th>
                        <th className="py-2 px-4 text-left">Old Range ({selectedPeriod})</th>
                    </tr>
                    </thead>
                    <tbody>
                    {historyData.map((row, index) => (
                        <tr key={index} className="border-t border-neutral-800">
                            <td className="py-3 px-4">{row.triggerPrice}</td>
                            <td className="py-3 px-4">{formatTimestamp(row.timestamp)}</td>
                            <td className="py-3 px-4">{formatRange(row.newRange)}</td>
                            <td className="py-3 px-4">{formatRange(row.oldRange)}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </CardContent>
        </Card>
    );
};

export default HistoryTable;
