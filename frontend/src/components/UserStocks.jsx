import React, { useEffect, useState } from "react";

const UserStocks = () => {
  const [data, setData] = useState([]);

  const [prices, setPrices] = useState([]);
  const [holdings, setHoldings] = useState([]);
  const [merged, setMerged] = useState([]);

  useEffect(() => {
    try {
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
          const stockOnly = jsondata.filter((item) => item.Type === "Stock");
          setData(stockOnly);
        });
    } catch (e) {
      console.log(e);
    }
    async function fetchPrices() {
      try {
        const res = await fetch("http://localhost:5000/prices");
        if (!res.ok) throw new Error("HTTP error ", res.status);
        const jsonData = await res.json();
        const stockOnly = jsonData.filter((item) => item.Type === "Stock");
        setPrices(stockOnly);
      } catch (e) {
        console.log("error: " + e);
      }
    }

    async function fetchHoldings() {
      try {
        const res = await fetch("http://localhost:5000/holdings");
        if (!res.ok) throw new Error("HTTP error ", res.status);
        const jsonData = await res.json();
        setHoldings(jsonData);
      } catch (e) {
        console.log("error: " + e);
      }
    }

    async function fetchAll() {
      try {
        await fetchPrices();
        await fetchHoldings();
      } catch (e) {
        console.log(e);
      }
    }

    fetchAll();
  }, []);

  //   useEffect(() => {
  //     async function mergeData() {
  //       try {
  //         const mergedData = prices.map((item) => {
  //           const holdingItem = holdings.find((h) => h.Symbol === item.Symbol);
  //           console.log(
  //             "prices item: ",
  //             item.Symbol,
  //             " holding item: ",
  //             holdingItem.HoldingId
  //           );
  //           //   return {
  //           //     ...item,
  //           //     HoldingId: holdingItem ? holdingItem.holdingid : null,
  //           //   };
  //         });
  //         // setMerged(mergedData);
  //         console.log("merged data: ", mergedData);
  //         // setMerged(mergeddata);
  //       } catch (e) {
  //         console.log(e);
  //       }
  //     }

  //     mergeData();
  //   });

  const handleSell = async (item) => {
    merged.map((item) => {
      console.log("merged item = ", item);
    });
    console.log("handle sell item = " + item.Symbol);
  };

  return (
    <>
      <div className="overflow-y-auto scrollbar-thin pr-1 assests">
        <div className="text-xl py-5 netWorth">Total Net Worth: $234,567</div>
        <div className="flex flex-col innerCol">
          <div className="text-lg p-2 title">Total Stocks Owned</div>
          {data.map((item, idx) => (
            <div
              className="flex justify-between p-3 bg-bg-dark rounded-lg m-1 items"
              key={idx}
            >
              <span className="p-1 symbol">{item.Symbol}</span>
              <div>
                <button className="py-1 px-2 mr-1 w-10 bg-bg-light rounded-lg quantity">
                  {item.Quantity}
                </button>
                <button
                  className="py-1 px-2 ml-1 w-10 bg-bg-light rounded-lg cursor-pointer sellBtn"
                  onClick={() => handleSell(item)}
                >
                  Sell
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default UserStocks;
