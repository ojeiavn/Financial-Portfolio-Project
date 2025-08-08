// ProductCard.jsx
export function ProductCard({ value, percentage, change, name, color, onClick }) {
  return (
    <div className="card" onClick={() => onClick(name)}>
      <div>{value}</div>
      <div style={{ color }}>({percentage}) {change}</div>
      <div className="company-name">{name}</div>
    </div>
  );
}
