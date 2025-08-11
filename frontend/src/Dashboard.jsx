// Dashboard.jsx
import { useState } from "react";
import { LeftPanel } from "./LeftPanel";
import { CenterPanel } from "./CenterPanel";
import { RightPanel } from "./RightPanel";
import LiveClock from "./LiveClock";

export function Dashboard() {
  const [symbol, setSymbol] = useState("NVDA");
  const [productType, setProductType] = useState("stock");

  return (
    <div className="dashboard">
      <LeftPanel setCompanyName={setSymbol} setProductType={setProductType} />
      <CenterPanel symbol={symbol} productType={productType} />
      <RightPanel />
    </div>
  );
}