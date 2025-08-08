import React, {useEffect, useState} from "react";

const UserStocks = () => {

    const [data, setData] = useState([])
    
    useEffect(() => {
        fetch("http://172.30.0.198:5000/holdings" || "http://localhost:5000/holdings")
        .then((res) => {
            if(!res.ok) {
                throw new Error("Network reposnse not ok");
            }
            return res.json();
        })
        .then((jsondata)=> {
            jsondata.map((item, idx) => {
                console.log(item.type +" - " +idx)
            })
            const stockOnly = jsondata.filter((item) => item.type === "Stock");
            setData(stockOnly);
        })
        .catch((err) => {
            setMsg("Failed to connect "+err)
        });
    }, []);

    return (
        <>
            <div className="overflow-y-auto scrollbar-thin pr-1">
                <div className="text-xl py-5">Total Net Worth: $234,567</div>
                    <div className="flex flex-col">
                        <div className="text-lg p-2">Total Stocks Owned</div>
                        {data.map((item, idx) => (
                            <div className="flex justify-between p-3 bg-bg-dark rounded-lg m-1">
                                <span className="p-1">{item.Symbol}</span>
                                <div>
                                    <button className="py-1 px-2 mr-1 w-10 bg-bg-light rounded-lg">{item.Quantity}</button>
                                    <button className="py-1 px-2 ml-1 w-10 bg-bg-light rounded-lg cursor-pointer sellBtn">Sell</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
        </>
    )
}

export default UserStocks;