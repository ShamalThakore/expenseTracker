import React, { useEffect,useState } from 'react';
import { LuPlus } from "react-icons/lu";
import { CustomBarChart } from '../Charts/CustomBarChart';
import { prepareIncomeBarChartData } from '../../utils/helper';

const IncomeOverview = ({transaction,onAddIncome}) => {

    const [chartData, setChartData] = useState([]);
    console.log("=============================okok")
    useEffect(() => {
        if (transaction && transaction.length > 0) {
            const result = prepareIncomeBarChartData(transaction);
            setChartData(result);
        }
        
    }, [transaction]);


    return (
        <div className='card'>
            <div className='flex items-center justify-between'>
                <div className=''>
                    <h5 className='text-lg'>Income Overview</h5>
                    <p className='text-xs text-gray-400 mt-0.5'>Track your earnings over time and analyze your income trends.</p>
                </div>
                
                <button className='add-btn' onClick={onAddIncome}><LuPlus className='text-lg'/> Add Income </button>
            </div>

            <div className='mt-10'>
            {chartData.length > 0 ? (
                <CustomBarChart data={chartData} />
            ) : (
                <p>No expenses recorded in the last 30 days.</p>
            )}
            </div>
        </div>
    );
}

export default IncomeOverview;
