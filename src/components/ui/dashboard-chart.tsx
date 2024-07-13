import React, { useEffect, useState } from "react";
import { AgCharts } from "ag-charts-react";
import { AgChartOptions, AgChartTheme } from "ag-charts-community";

// Modified getData function to reflect fee collection logic
const getData = () => {
    const data = [];
    const today = new Date();
    let feeType1 = 0;
    let feeType2 = 100;  // Only increases once

    for (let i = 13; i >= 0; i--) {
        const date = new Date(today.getFullYear(), today.getMonth(), today.getDate() - i);
        feeType1 += 100;  // Increases by 100 each day

        data.push({
            date: date,
            feeType1: feeType1,
            feeType2: i === 13 ? feeType2 : feeType2 // feeType2 remains the same after the first entry
        });
    }
    return data;
};

let myTheme: AgChartTheme = {
    palette: {
        fills: ["#B9FF30", "#AF6DEA"]
    },

};

export const ChartExample = () => {
    const [options, setOptions] = useState<AgChartOptions>({
        theme: myTheme,
        title: {
            text: "Fees Collected Over Last 14 Days",
        },
        background: {
            fill: 'rgba(35, 35, 36, 1)'
        },
        animations: {
            enabled: true,
            easing: 'ease-in-out',
            duration: 1000
        },
        data: getData(),
        series: [
            {
                //@ts-ignore
                type: "line",
                xKey: "date",
                yKey: "feeType1",
                yName: "Lazy Peggy",
            },
            {
                //@ts-ignore
                type: "line",
                xKey: "date",
                yKey: "feeType2",
                yName: "Others",
            },
        ],
        axes: [
            {
                //@ts-ignore
                type: 'time',
                position: 'bottom',
                title: { text: 'Date' },
                //@ts-ignore
                tick: { count: 'd' },
                label: {
                    formatter: function (params) {
                        return `${params.value.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`;
                    }
                }
            },
            {
                //@ts-ignore
                type: 'number',
                position: 'left',
                title: { text: 'Fees Collected ($)' },
                label: {
                    formatter: function (params) {
                        return `$${params.value}`;
                    }
                }
            }
        ]
    });

    useEffect(() => {
        // Refresh the data and update chart options dynamically
        setOptions((currentOptions) => ({
            ...currentOptions,
            data: getData()
        }));
    }, []);

    return <AgCharts options={options} />;
};