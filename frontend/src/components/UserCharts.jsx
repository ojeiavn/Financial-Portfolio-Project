import React, { useEffect, useState } from "react";
import ApexCharts from "apexcharts";
import ReactApexChart from "react-apexcharts";

const UserCharts = () => {
  const [state, setState] = React.useState({
    series: [], // 44, 55, 13, 43, 22
    options: {
      chart: {
        width: 380,
        type: "pie",
      },
      labels: [], // 'Team A', 'Team B', 'Team C', 'Team D', 'Team E'
      legend: {
        position: "bottom",
        labels: {
          colors: "#ffffff",
        },
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    },
  });

  useEffect(() => {
    fetch("http://localhost:5000/prices")
      .then((res) => res.json())
      .then((jsondata) => {
        const stockOnly = jsondata.filter((item) => item.Type === "Stock");
        setState((prev) => ({
          ...prev,
          series: stockOnly
            .filter((i) => i.Quantity > 0)
            .map((i) => Number(i.Quantity)),
          options: {
            ...prev.options,
            labels: stockOnly
              .filter((i) => i.Quantity > 0)
              .map((i) => i.Symbol),
          },
        }));
      })
      .catch((err) => {
        console.log("Failed fetch data:  " + err);
      });
  }, []);

  return (
    <>
      <div id="chart">
        <ReactApexChart
          options={state.options}
          series={state.series}
          type="pie"
          width={300}
        />
      </div>
    </>
  );
};

export default UserCharts;
