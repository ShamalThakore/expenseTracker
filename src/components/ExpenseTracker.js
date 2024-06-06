import React, {useState} from 'react'

export default function ExpenseTracker(){

    const [item, setitem] = useState('');

    const [amount, setamount] = useState(0);

    const [totalRecord, setTotalRecord] = useState([]);

    const [totalAmount, settotalAmount] = useState(0);

    const addItemtoCard = ( ) => {
       
        console.log(item)
        console.log(amount)

        if (item && amount) {
            let newr = { Name: item, Amount: amount };
            let totalamo = [...totalRecord, newr]
            setTotalRecord(totalamo);
            
            let amounttotal = parseInt(totalAmount)+parseInt(amount);

            settotalAmount(amounttotal)

            clearAll();

        } else {
            alert("Please enter both item name and amount");
        }
    }

    const handlename = (event) =>{
        setitem(event.target.value)
    }

    const handleamount = (event) =>{
        setamount(event.target.value)
    }

    const clearAll = () =>{
        setitem('')
        setamount(0)
    }

    return(
        <>
            <div className="container mt-5">
                <div className="card p-3" >
                    <div className="card-title text-center">
                        <h2>Expense Tracker</h2>
                    </div>
                    <div className="card-body">
                        Item Name:
                        <input className="form-control form-control-sm" type="text" placeholder="Enter Item Name" aria-label=".form-control-sm example" value={item} onChange={handlename}/>
                        <br/>
                        Item Amount:
                        <input className="form-control form-control-sm" type="text" placeholder="Enter Item Amount" aria-label=".form-control-sm example" value={amount} onChange={handleamount}/>
                        <br/>
                        <div className="d-flex justify-content-center align-center">
                            <button type="button" className="btn btn-outline-success" onClick={addItemtoCard}>ADD Item</button>&nbsp;
                            <button type="button" className="btn btn-outline-danger" onClick={clearAll}>Clear ALL</button>&nbsp;
                        </div>
                    </div>
                </div>
                <br/>
                <div className="text-end">
                    <h3>Total Amount :- {totalAmount}</h3>
                </div>
                <br/>
                <table class="table">
                    <thead>
                        <tr>
                        <th scope="col">#</th>
                        <th scope="col">Item</th>
                        <th scope="col">Amount</th>
                        </tr>
                    </thead>
                    {totalRecord.length>0?(
                        <tbody>
                            {/* {totalRecord.length>0?'':} */}
                            {totalRecord.map((record, index) => (
                                <tr>
                                    <th scope="row">{index}</th>
                                    <td>{record.Name}</td>
                                    <td>${record.Amount}</td>
                                </tr>
                            ))}
                        </tbody>
                    ):
                    <tbody>
                        <tr rowspan="12">
                        <td colspan="12" className="text-center">No Data Found</td>
                        </tr>
                    </tbody>
                    }
                </table>
                {/* <div> {totalRecord.map((record, index) => (
                        <div key={index}>
                            <p>{record.Name}: ${record.Amount}</p>
                        </div>
                    ))}</div> */}
            </div>
          
        </>
    )
}