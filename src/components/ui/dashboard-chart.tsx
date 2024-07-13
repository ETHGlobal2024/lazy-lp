import React, {useEffect, useState} from "react";
import {AgCharts} from "ag-charts-react";
import {AgChartOptions, AgChartTheme} from "ag-charts-community";

// Assuming getData function is modified accordingly or replaced here
const getData = () => {
    const data = [];
    const today = new Date();
    for (let i = 13; i >= 0; i--) {
        const date = new Date(today.getFullYear(), today.getMonth(), today.getDate() - i);
        data.push({
            date: date,
            loanType1: Math.random() * 5 + 10,  // Random APR between 10% and 15%
            loanType2: Math.random() * 5 + 5,   // Random APR between 5% and 10%
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
            text: "APR Comparison Over Last 14 Days",
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
                // @ts-ignore
                type: "line",
                xKey: "date",
                yKey: "loanType1",
                yName: "Loan Type 1 APR",
            },
            {
                // @ts-ignore
                type: "line",
                xKey: "date",
                yKey: "loanType2",
                yName: "Loan Type 2 APR",
            },
        ],
        axes: [
            {
                // @ts-ignore
                type: 'time',
                position: 'bottom',
                title: {text: 'Date'},
                // @ts-ignore
                tick: {count: 'd'},
                label: {
                    formatter: function (params) {
                        // Formatting the date as "Month, Day"
                        return `${params.value.toLocaleDateString('en-US', {month: 'short', day: 'numeric'})}`;
                    }
                }
            },
            {
                // @ts-ignore
                type: 'number',
                position: 'left',
                title: {text: 'APR (%)'},
                label: {
                    formatter: function (params) {
                        return `${params.value}%`;
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

    return <AgCharts options={options}/>;
};