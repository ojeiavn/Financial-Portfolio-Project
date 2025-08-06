import React from "react";

const UserPortfolio = () => {
    return (
        <div class="flex flex-col h-screen items-center bg-bg-light p-5 overflow-hidden font-main">
            {/* Heading */}
            <div class="bg-bg-dark px-10 rounded-2xl py-6 text-white text-center">MY PORTFOLIO</div>
            
            {/* Left side panel */}
            <div class="flex justify-between bg-bg-light m-0 p-6 text-white w-full overflow-y-auto">
                <div>
                    <div class="text-xl py-5">Total Net Worth: $234,567</div>
                    <div class="flex flex-col">
                        <div class="text-lg p-2">Total Stocks Owned</div>
                        <div class="flex justify-between p-3 bg-bg-dark rounded-lg m-1">
                            <span class="p-1">META</span>
                            <div>
                                <button class="py-1 px-2 mr-1 w-10 bg-bg-light rounded-lg">10</button>
                                <button class="py-1 px-2 ml-1 w-10 bg-bg-light rounded-lg cursor-pointer">Sell</button>
                            </div>
                        </div>
                        <div class="flex justify-between p-3 bg-bg-dark rounded-lg m-1">
                            <span class="p-1">APPLE</span>
                            <div>
                                <button class="py-1 px-2 mr-1 w-10 bg-bg-light rounded-lg">6</button>
                                <button class="py-1 px-2 ml-1 w-10 bg-bg-light rounded-lg cursor-pointer">Sell</button>
                            </div>
                        </div>
                        <div class="flex justify-between p-3 bg-bg-dark rounded-lg m-1">
                            <span class="p-1">WELLS FARGO</span>
                            <div>
                                <button class="py-1 px-2 mr-1 w-10 bg-bg-light rounded-lg">20</button>
                                <button class="py-1 px-2 ml-1 w-10 bg-bg-light rounded-lg cursor-pointer">Sell</button>
                            </div>
                        </div>
                        <div class="flex justify-between p-3 bg-bg-dark rounded-lg m-1">
                            <span class="p-1">GOOGLE</span>
                            <div>
                                <button class="py-1 px-2 mr-1 w-10 bg-bg-light rounded-lg">100</button>
                                <button class="py-1 px-2 ml-1 w-10 bg-bg-light rounded-lg cursor-pointer">Sell</button>
                            </div>
                        </div>
                        <div class="flex justify-between p-3 bg-bg-dark rounded-lg m-1">
                            <span class="p-1">NETFLIX</span>
                            <div>
                                <button class="py-1 px-2 mr-1 w-10 bg-bg-light rounded-lg">120</button>
                                <button class="py-1 px-2 ml-1 w-10 bg-bg-light rounded-lg cursor-pointer">Sell</button>
                            </div>
                        </div>

                    </div>
                </div>

            {/* Right side panel */}
                <div class="overflow-y-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-200">
                    <div class="flex flex-col ">
                        <div class="text-lg p-2">Total Bonds Owned</div>
                        <div class="flex justify-between p-3 bg-bg-dark rounded-lg m-1">
                            <span class="p-1">US TREASURY</span>
                            <div>
                                <button class="py-1 px-2 mr-1 w-10 bg-bg-light rounded-lg">10</button>
                                <button class="py-1 px-2 ml-1 w-10 bg-bg-light rounded-lg cursor-pointer">Sell</button>
                            </div>
                        </div>
                        <div class="flex justify-between p-3 bg-bg-dark rounded-lg m-1">
                            <span class="p-1">APPLE INC</span>
                            <div>
                                <button class="py-1 px-2 mr-1 w-10 bg-bg-light rounded-lg">6</button>
                                <button class="py-1 px-2 ml-1 w-10 bg-bg-light rounded-lg cursor-pointer">Sell</button>
                            </div>
                        </div>
                        <div class="flex justify-between p-3 bg-bg-dark rounded-lg m-1">
                            <span class="p-1">TESLA INC</span>
                            <div>
                                <button class="py-1 px-2 mr-1 w-10 bg-bg-light rounded-lg">20</button>
                                <button class="py-1 px-2 ml-1 w-10 bg-bg-light rounded-lg cursor-pointer">Sell</button>
                            </div>
                        </div>
                        <div class="flex justify-between p-3 bg-bg-dark rounded-lg m-1">
                            <span class="p-1">VANGUARD</span>
                            <div>
                                <button class="py-1 px-2 mr-1 w-10 bg-bg-light rounded-lg">100</button>
                                <button class="py-1 px-2 ml-1 w-10 bg-bg-light rounded-lg cursor-pointer">Sell</button>
                            </div>
                        </div>
                        <div class="flex justify-between p-3 bg-bg-dark rounded-lg m-1">
                            <span class="p-1">NETFLIX</span>
                            <div>
                                <button class="py-1 px-2 mr-1 w-10 bg-bg-light rounded-lg">120</button>
                                <button class="py-1 px-2 ml-1 w-10 bg-bg-light rounded-lg cursor-pointer">Sell</button>
                            </div>
                        </div>

                        <div class="text-lg p-2">Total Amount of Cash</div>
                        <div class="flex justify-between p-3 bg-bg-dark rounded-lg m-1">
                            <span class="p-1">Savings Account</span>
                            <div>
                                <button class="py-1 px-2 mr-1 bg-bg-light rounded-lg">$24,678</button>
                            </div>
                        </div>
                        <div class="flex justify-between p-3 bg-bg-dark rounded-lg m-1">
                            <span class="p-1">Brokerage Account</span>
                            <div>
                                <button class="py-1 px-2 mr-1 bg-bg-light rounded-lg">$84,678</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>


        </div>
    )
}

export default UserPortfolio