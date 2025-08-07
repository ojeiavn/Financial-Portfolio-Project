import React from "react";

const UserOtherAssests = () => {
    return (
        <>
            <div className="overflow-y-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-200">
                    <div className="flex flex-col ">
                        <div className="text-lg p-2">Total Bonds Owned</div>
                        <div className="flex justify-between p-3 bg-bg-dark rounded-lg m-1">
                            <span className="p-1">US TREASURY</span>
                            <div>
                                <button className="py-1 px-2 mr-1 w-10 bg-bg-light rounded-lg">10</button>
                                <button className="py-1 px-2 ml-1 w-10 bg-bg-light rounded-lg cursor-pointer sellBtn">Sell</button>
                            </div>
                        </div>
                        <div className="flex justify-between p-3 bg-bg-dark rounded-lg m-1">
                            <span className="p-1">APPLE INC</span>
                            <div>
                                <button className="py-1 px-2 mr-1 w-10 bg-bg-light rounded-lg">6</button>
                                <button className="py-1 px-2 ml-1 w-10 bg-bg-light rounded-lg cursor-pointer sellBtn">Sell</button>
                            </div>
                        </div>
                        <div className="flex justify-between p-3 bg-bg-dark rounded-lg m-1">
                            <span className="p-1">TESLA INC</span>
                            <div>
                                <button className="py-1 px-2 mr-1 w-10 bg-bg-light rounded-lg">20</button>
                                <button className="py-1 px-2 ml-1 w-10 bg-bg-light rounded-lg cursor-pointer sellBtn">Sell</button>
                            </div>
                        </div>
                        <div className="flex justify-between p-3 bg-bg-dark rounded-lg m-1">
                            <span className="p-1">VANGUARD</span>
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

                        <div className="text-lg p-2">Total Amount of Cash</div>
                        <div className="flex justify-between p-3 bg-bg-dark rounded-lg m-1">
                            <span className="p-1">Savings Account</span>
                            <div>
                                <button className="py-1 px-2 mr-1 bg-bg-light rounded-lg">$24,678</button>
                            </div>
                        </div>
                        <div className="flex justify-between p-3 bg-bg-dark rounded-lg m-1">
                            <span className="p-1">Brokerage Account</span>
                            <div>
                                <button className="py-1 px-2 mr-1 bg-bg-light rounded-lg">$84,678</button>
                            </div>
                        </div>
                    </div>
            </div>
        </>
    )
}

export default UserOtherAssests;