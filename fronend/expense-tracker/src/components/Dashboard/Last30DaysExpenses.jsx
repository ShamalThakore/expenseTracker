import React, { useEffect, useState } from 'react';
import { prepareExpenseBarChartData } from '../../utils/helper';
import { CustomBarChart } from '../Charts/CustomBarChart';

const Last30DaysExpenses = ({ data }) => {

    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        if (data && data.length > 0) {
            const result = prepareExpenseBarChartData(data);
            setChartData(result);
        }
    }, [data]);

    return (
        <div className='card col-span-1'>
            <div className='flex items-center justify-between'>
                <h5 className='text-lg'>Last 30 Days Expenses</h5>
            </div>

            {chartData.length > 0 ? (
                <CustomBarChart data={chartData} />
            ) : (
                <p>No expenses recorded in the last 30 days.</p>
            )}
        </div>
    );
};

export default Last30DaysExpenses;