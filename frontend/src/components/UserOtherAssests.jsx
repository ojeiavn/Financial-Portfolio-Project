import React, { useEffect, useState } from "react";

const UserOtherAssests = () => {
  const [bonddata, setbonddata] = useState([]);
  const [cashdata, setcashdata] = useState([]);

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
        const bondsOnly = jsondata.filter((item) => item.Type === "Bond");
        const cashOnly = jsondata.filter((item) => item.Type === "Cash");
        setbonddata(bondsOnly);
        setcashdata(cashOnly);
      })
      .catch((err) => {
        console.log("Failed to connect " + err);
      });
  }, []);

  return (
    <>
      <div className="overflow-y-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-200 assests">
        <div className="flex flex-col innerCol">
          <div className="text-lg p-2 title">Total Bonds Owned</div>
          {bonddata.map((item, idx) => (
            <div className="flex justify-between p-3 bg-bg-dark rounded-lg m-1 items">
              <span className="p-1 symbol">{item.Symbol}</span>
              <div>
                <button className="py-1 px-20 mr-1 w-10 bg-bg-light rounded-lg quantity">
                  {item.Quantity}
                </button>
                <button className="py-1 px-2 ml-1 w-10 bg-bg-light rounded-lg cursor-pointer sellBtn">
                  Sell
                </button>
              </div>
            </div>
          ))}

          <div className="text-lg p-2 title">Total Amount of Cash</div>
          {cashdata.map((item, idx) => (
            <div className="flex justify-between p-3 bg-bg-dark rounded-lg m-1 items">
              <span className="p-1 symbol">{item.Symbol}</span>
              <div>
                <button className="py-1 px-2 mr-1 w-10 bg-bg-light rounded-lg quantity">
                  {item.Quantity}
                </button>
                <button className="py-1 px-2 ml-1 w-10 bg-bg-light rounded-lg cursor-pointer sellBtn">
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

export default UserOtherAssests;
