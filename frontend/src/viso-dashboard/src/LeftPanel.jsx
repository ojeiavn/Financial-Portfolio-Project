// LeftPanel.jsx
import { useState } from "react";
import { ProductCard } from "./ProductCard";

export function LeftPanel({ setCompanyName }) {
  const [productType, setProductType] = useState("stocks");

  const productData = {
    stocks: [
      { name: "APPLE", value: "$4560", change: "-28.90", percentage: "64%", color: "red" },
      { name: "META", value: "$6780", change: "+40.1", percentage: "244%", color: "green" },
      { name: "GOOGLE", value: "$6666", change: "+33.6", percentage: "456%", color: "green" },
      { name: "NETFLIX", value: "$7822", change: "+44.6", percentage: "243%", color: "green" }
    ],
    bonds: [
      { name: "US10Y", value: "$1012.75", change: "2.50+", percentage: "0.25%", color: "green" },
      { name: "UK10Y", value: "$980.50", change: "1.25-", percentage: "0.13%", color: "red" },
      { name: "DE10Y", value: "$995.30", change: "0.80+", percentage: "0.08%", color: "green" },
      { name: "JP10Y", value: "$850.20", change: "0.45-", percentage: "0.05%", color: "red" }
    ],
    cash: [
      { name: "USD", value: "$12,345.67", change: "15.23+", percentage: "0.12%", color: "green" },
      { name: "EUR", value: "€10,234.56", change: "10.45-", percentage: "0.10%", color: "red" },
      { name: "GBP", value: "£8,765.43", change: "20.12+", percentage: "0.25%", color: "green" },
      { name: "JPY", value: "¥1,234,567.00", change: "500.00-", percentage: "0.04%", color: "red" }
    ]
  };

  return (
    <div className="left-panel">
      <div id="sbc-buttons">
        <button type="button" onClick={() => setProductType("stocks")}>Stocks</button>
        <button type="button" onClick={() => setProductType("bonds")}>Bonds</button>
        <button type="button" onClick={() => setProductType("cash")}>Cash</button>
      </div>
      {productData[productType].map((p, i) => (
        <ProductCard key={i} {...p} onClick={setCompanyName} />
      ))}
    </div>
  );
}
