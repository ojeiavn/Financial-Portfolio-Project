// CenterPanel.jsx
import { ApexChart } from "./ApexChart";

export function CenterPanel({ companyName }) {
  return (
    <div className="center-panel">
      <div className="finance-card">
        PLACEHOLDER
        <div>Profit = $667,990</div>
      </div>
      <div className="finance-card">
        <div>All time high = $678,559</div>
      </div>
      <div className="graph-box">
        <button className="overview-buttons">My Overview</button>
        <button className="overview-buttons">Company Overview</button>
        <ApexChart companyName={companyName} />
      </div>
      <div className="news-ticker">
        <ul>
          <li>Stocks close lower as jobs report looms</li>
          <li>Nintendo quarterly revenue surges thanks to Switch2</li>
        </ul>
      </div>
    </div>
  );
}
