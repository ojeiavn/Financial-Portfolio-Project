import React from "react";
import UserStocks from "./UserStocks";
import UserOtherAssests from "./UserOtherAssests";
import UserCharts from "./UserCharts";

const UserPortfolio = () => {
    return (
        <div className="flex flex-col h-screen items-center bg-bg-light p-5 overflow-hidden font-main">
            {/* Heading */}
            <div className="bg-bg-dark px-10 rounded-2xl py-6 text-white text-center">MY PORTFOLIO</div>
            
            <div className="flex justify-between bg-bg-light m-0 p-6 text-white w-full overflow-y-auto">
                
                {/* Left side panel */}
                <UserStocks />

                {/* Middle panel for graphs */}
                <div className="flex justify-between items-center">
                    <UserCharts />
                    <UserCharts />
                    <UserCharts />
                </div>

                {/* Right side panel */}
                <UserOtherAssests />

            </div>
        </div>
    )
}

export default UserPortfolio