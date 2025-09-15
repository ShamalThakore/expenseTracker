import React, { useEffect, useState } from 'react';
import CustomPieChart from '../Charts/CosutomPieChart';

const COLORS = ["#875CF5", "#FA2C37", "#FF6900", "#4f39f6"];

const RecentIncomeWithChart = ({ data, totalIncome }) => {
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        if (!data || !Array.isArray(data) || data.length === 0) {
            console.log("No valid data provided.");
            setChartData([]);
            return;
        }

        const dataArr = data.map((item, index) => ({
            name: item?.source || `Unknown ${index}`,
            amount: item?.amount || 0,
        }));
        console.log("Prepared chart data:", dataArr);
        setChartData(dataArr);
    }, [data]);

    console.log("Chart Data Length:", chartData.length);
    console.log("Chart Data:", chartData);

    return (
        <div className='card'>
            <div className='flex items-center justify-between'>
                <h5 className='text-lg'>Last 60 Days Income</h5>
            </div>

            {chartData.length > 0 ? (
                <CustomPieChart
                    data={chartData}
                    label="Total Income"
                    totalAmount={`$${totalIncome}`}
                    showTextAnchor
                    colors={COLORS}
                />
            ) : (
                <p>No income data available for the last 60 days.</p>
            )}
        </div>
    );
};

export default RecentIncomeWithChart;