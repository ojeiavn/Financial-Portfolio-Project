import React from "react";

const UserStocks = () => {
    return (
        <>
            <div>
                <div className="text-xl py-5">Total Net Worth: $234,567</div>
                    <div className="flex flex-col">
                        <div className="text-lg p-2">Total Stocks Owned</div>
                        <div className="flex justify-between p-3 bg-bg-dark rounded-lg m-1">
                            <span className="p-1">META</span>
                            <div>
                                <button className="py-1 px-2 mr-1 w-10 bg-bg-light rounded-lg">10</button>
                                <button className="py-1 px-2 ml-1 w-10 bg-bg-light rounded-lg cursor-pointer sellBtn">Sell</button>
                            </div>
                        </div>
                        <div className="flex justify-between p-3 bg-bg-dark rounded-lg m-1">
                            <span className="p-1">APPLE</span>
                            <div>
                                <button className="py-1 px-2 mr-1 w-10 bg-bg-light rounded-lg">6</button>
                                <button className="py-1 px-2 ml-1 w-10 bg-bg-light rounded-lg cursor-pointer sellBtn">Sell</button>
                            </div>
                        </div>
                        <div className="flex justify-between p-3 bg-bg-dark rounded-lg m-1">
                            <span className="p-1">WELLS FARGO</span>
                            <div>
                                <button className="py-1 px-2 mr-1 w-10 bg-bg-light rounded-lg">20</button>
                                <button className="py-1 px-2 ml-1 w-10 bg-bg-light rounded-lg cursor-pointer sellBtn">Sell</button>
                            </div>
                        </div>
                        <div className="flex justify-between p-3 bg-bg-dark rounded-lg m-1">
                            <span className="p-1">GOOGLE</span>
                            <div>
                                <button className="py-1 px-2 mr-1 w-10 bg-bg-light rounded-lg">100</button>
                                <button className="py-1 px-2 ml-1 w-10 bg-bg-light rounded-lg cursor-pointer sellBtn">Sell</button>
                            </div>
                        </div>
                        <div className="flex justify-between p-3 bg-bg-dark rounded-lg m-1">
                            <span className="p-1">NETFLIX</span>
                            <div>
                                <button className="py-1 px-2 mr-1 w-10 bg-bg-light rounded-lg">120</button>
                                <button className="py-1 px-2 ml-1 w-10 bg-bg-light rounded-lg cursor-pointer sellBtn">Sell</button>
                            </div>
                        </div>

                    </div>
                </div>
        </>
    )
}

export default UserStocks;