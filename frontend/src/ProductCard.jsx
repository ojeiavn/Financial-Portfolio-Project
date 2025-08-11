// ProductCard.jsx
export async function handleBuy({symbol}) {
  console.log(symbol);
  if (!symbol) {
    console.error("handleBuy called without symbol");
    alert("No symbol selected.");
    return;
  }
  try {
    const res = await fetch(
      `http://localhost:5000/buy/${symbol}`,
      { method: 'POST', headers: { Accept: 'application/json' } }
    );
    if (!res.ok) {
      const msg = await res.text().catch(() => '');
      throw new Error(msg || `HTTP ${res.status}`);
    }
    alert('Successfully bought stock');
  } catch (e) {
    console.error('buy error:', e);
    alert('Unable to buy stock');
  }
}

export function ProductCard({
  value, percentage, change, name, color, symbol, onClick
}) {
  console.log(symbol)
  return (
    <div className="card" onClick={() => onClick(symbol)}>
      <div>{value}</div>
      <div style={{ color }}>
        ({Number(percentage).toFixed(2)}%) {change}
      </div>
      <div className="company-name">{name}</div>
      <button
        className="buy-buttons"
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          handleBuy({symbol});
        }}
      >
        Buy
      </button>
    </div>
  );
}
