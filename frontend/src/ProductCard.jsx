export function ProductCard({ value, percentage, change, name, color, onClick }) {
  return (
    <div className="card" onClick={() => onClick(name)}>
      <div>{value}</div>
      <div style={{ color }}>
        ({percentage.toFixed(2)}%) {change}
      </div>
      <div className="company-name">{name}</div>
      <button className="buy-buttons" type="button" onClick="handleBuy(name)">
        Buy
      </button>
    </div>
  );
}

export const handleBuy = async (symbol) => {
  try { {
    const res = await fetch('http://localhost:5000/buy/${symbol}', method="POST");
    }
    if(!res.ok) {
      alert("Unable to buy stock");
    }
    alert("successfully bought stock");
  } catch(e) {
    console.log("error ", e);
  }
}