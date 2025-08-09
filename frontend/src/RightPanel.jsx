import {Link} from 'react-router';

export function RightPanel() {
  return (
    <div className="right-panel">
      <div className="finance-card">
        <div>FTSE 100<br />9084.57<br />-7.48 <span style={{ color: "red" }}>(0.34%)</span></div>
      </div>
      <div className="finance-card">
        <div>GBP/USD<br />78908<br />+0.003 <span style={{ color: "green" }}>(0.009%)</span></div>
      </div>
      <div className="finance-card">
        <div>GBP/EUR<br />1.5132<br />-0.26 <span style={{ color: "red" }}>(0.034%)</span></div>
      </div>
      <div className="finance-card">
        <div>AIM<br />756.57<br />-4.44 <span style={{ color: "red" }}>(0.58%)</span></div>
      </div>
      <div className="finance-card">
        <h3>Top Gainers</h3>
        <p>0MC5.L +12.02 <span style={{ color: "green" }}>(2.56%)</span></p>
        <p>0RCR.L +23.44 <span style={{ color: "green" }}>(3.46%)</span></p>
        <p>0DPO.L1 +12.02 <span style={{ color: "green" }}>(2.56%)</span></p>
        <p>0O4N.L1 +12.02 <span style={{ color: "green" }}>(2.56%)</span></p>
      </div>
      <Link to="/my-portfolio" className="my-portfolio-button">My Portfolio</Link>
    </div>
  );
}
