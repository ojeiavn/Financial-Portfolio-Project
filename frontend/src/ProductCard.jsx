// ProductCard.jsx
export function ProductCard({ value, percentage, change, name, color, onClick }) {
  return (
    <div className="card" onClick={() => onClick(name)}>
      <div>{value}</div>
      <div style={{ color }}>({percentage}) {change}</div>
      <div className="company-name">{name}</div>
      <button class="buy-buttons" type="button" onClick="">Buy</button>
    </div>
  );
}
