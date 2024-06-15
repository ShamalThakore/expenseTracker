import React, { useState } from 'react';

export default function ExpenseTracker() {
    const [item, setItem] = useState('');
    const [amount, setAmount] = useState(0);
    const [totalRecord, setTotalRecord] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);

    const addItemToCard = () => {
        if (item && amount) {
            let newr = { Name: item, Amount: amount };
            let totalamo = [...totalRecord, newr]
            setTotalRecord(totalamo);
            
            let amounttotal = parseInt(totalAmount)+parseInt(amount);
        
            setTotalAmount(amounttotal)
        
            clearAll();
        
        } else {
            alert("Please enter both item name and amount");
        }
    };

    const handleNameChange = (event) => {
        setItem(event.target.value);
    };

    const handleAmountChange = (event) => {
        setAmount(event.target.value);
    };

    const clearAll = () => {
        setItem('');
        setAmount(0);
    };

    const removeItem = (index) => {
        console.log(index)
        let updatedRecords = [...totalRecord];
        let removedAmount = updatedRecords[index].Amount

        updatedRecords.splice(index,1);
        setTotalRecord(updatedRecords);
       
        setTotalAmount(totalAmount - removedAmount);
    };

    return (
        <>
            <div className="container mt-5">
                <div className="card p-3">
                    <div className="card-title text-center">
                        <h2>Expense Tracker</h2>
                    </div>
                    <div className="card-body">
                        Item Name:
                        <input className="form-control form-control-sm" type="text" placeholder="Enter Item Name" aria-label=".form-control-sm example" value={item} onChange={handleNameChange} />
                        <br />
                        Item Amount:
                        <input className="form-control form-control-sm" type="number" placeholder="Enter Item Amount" aria-label=".form-control-sm example" value={amount} onChange={handleAmountChange} />
                        <br />
                        <div className="d-flex justify-content-center align-center">
                            <button type="button" className="btn btn-outline-success" onClick={addItemToCard}>ADD Item</button>&nbsp;
                            <button type="button" className="btn btn-outline-danger" onClick={clearAll}>Clear ALL</button>&nbsp;
                        </div>
                    </div>
                </div>
                <br />
                <div className="text-end">
                    <h3>Total Amount: ${totalAmount}</h3>
                </div>
                <br />
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Item</th>
                            <th scope="col">Amount</th>
                            <th scope="col">Remove Item</th>
                        </tr>
                    </thead>
                    {totalRecord.length > 0 ? (
                        <tbody>
                            {totalRecord.map((record, index) => (
                                <tr key={index}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{record.Name}</td>
                                    <td>${record.Amount}</td>
                                    <td>
                                        <button type="button" className="btn btn-danger" onClick={() => removeItem(index)}>X</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    ) : (
                        <tbody>
                            <tr>
                                <td colSpan="4" className="text-center">No Data Found</td>
                            </tr>
                        </tbody>
                    )}
                </table>
            </div>
        </>
    );
}
