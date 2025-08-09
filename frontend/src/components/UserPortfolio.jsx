import React, { useState, useEffect } from "react";
import UserStocks from "./UserStocks";
import UserOtherAssests from "./UserOtherAssests";
import UserCharts from "./UserCharts";
import LiveClock from "./LiveClock";
import TestConnection from "./TestConnection";
import UserChartsBonds from "./UserChartsBonds";
import UserChartsCash from "./UserChartsCash";

const UserPortfolio = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/prices")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network reposnse not ok");
        }
        return res.json();
      })
      .then((jsondata) => {
        // jsondata.map((item, idx) => {
        //     console.log(item.Type +" - " +idx)
        // })
        setData(jsondata);
      })
      .catch((err) => {
        console.log("Failed to connect " + err);
      });
  }, []);

  return (
    <div className="flex flex-col h-screen items-center bg-bg-light p-5 overflow-hidden font-main outerDiv">
      {/* Heading */}
      <div className="bg-bg-dark px-10 rounded-2xl py-6 text-white text-center w-2/4 myportfolio">
        MY PORTFOLIO
      </div>
      <div className="text-white w-screen text-end pr-20 liveClock">
        <LiveClock />{" "}
      </div>

      {/* <TestConnection className="text-white" /> */}

      <div className="flex justify-between bg-bg-light m-0 p-6 text-white w-full overflow-y-auto innerDiv">
        {/* Left side panel */}
        <UserStocks />

        {/* Middle panel for graphs */}
        <div className="flex justify-between items-center graphs">
          <UserCharts />
          <UserChartsBonds />
          <UserChartsCash />
        </div>

        {/* Right side panel */}
        <UserOtherAssests />
      </div>
      <div className="descDiv">
        {data.map((item, idx) => (
          <div>
            <span className="desc">{item.Symbol}: </span>
            <span>{item.Name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserPortfolio;
