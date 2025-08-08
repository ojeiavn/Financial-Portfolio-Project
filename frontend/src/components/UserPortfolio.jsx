import React from "react";
import UserStocks from "./UserStocks";
import UserOtherAssests from "./UserOtherAssests";
import UserCharts from "./UserCharts";
import LiveClock from "./LiveClock";
import TestConnection from "./TestConnection";

const UserPortfolio = () => {

    // fetch("http://172.30.0.198:5000").then(response => response.json()).then(data=> console.log(data)).catch(e => console.log(e))

    return (
        <div className="flex flex-col h-screen items-center bg-bg-light p-5 overflow-hidden font-main">
            {/* Heading */}
            <div className="bg-bg-dark px-10 rounded-2xl py-6 text-white text-center w-2/4">MY PORTFOLIO</div>
            <div className="text-white w-screen text-end pr-20"><LiveClock /> </div>

            
            {/* <TestConnection className="text-white" /> */}
            <TestConnection />

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