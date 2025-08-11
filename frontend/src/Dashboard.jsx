// Dashboard.jsx
import { useState } from "react";
import { LeftPanel } from "./LeftPanel";
import { CenterPanel } from "./CenterPanel";
import { RightPanel } from "./RightPanel";
import LiveClock from "./LiveClock";

export function Dashboard() {
  const [companyName, setCompanyName] = useState("APPLE");

  return (
    
    <div className="dashboard">
      <LeftPanel setCompanyName={setCompanyName} />
      <CenterPanel companyName={companyName} />
      <RightPanel />
    </div>
  );
}
