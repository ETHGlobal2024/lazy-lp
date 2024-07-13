import React from 'react';

interface DashboardMetricCardProps {
    title: string;
    value: string;

}

const DashboardMetricCard: React.FC<DashboardMetricCardProps> = ({title, value}) => {
    return (
        <div className="bg-neutral-800 rounded-lg p-3">
            <h3 className="text-gray-400 text-sm mb-1">{title}</h3>
            <p className="text-white text-4xl font-normal">{value}</p>
        </div>
    );
};

export default DashboardMetricCard;