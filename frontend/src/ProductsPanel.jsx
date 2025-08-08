import { SBCButton } from "./SBCButton";
import { ProductCard } from "./ProductCard";

export function ProductsPanel({ productType }) {
  const products = [
    { name: "APPLE", value: "$4560", change: "-28.90", percentage: "64%", color: "red" },
    { name: "META", value: "$6780", change: "+40.1", percentage: "244%", color: "green" },
    { name: "GOOGLE", value: "$6666", change: "+33.6", percentage: "456%", color: "green" },
    { name: "NETFLIX", value: "$7822", change: "+44.6", percentage: "243%", color: "green" },
  ];

  const bonds = [
    { name: "US10Y", value: "$1012.75", change: "2.50+", percent: "0.25%", color: "green" },
    { name: "UK10Y", value: "$980.50",  change: "1.25-", percent: "0.13%", color: "red"   },
    { name: "DE10Y", value: "$995.30",  change: "0.80+", percent: "0.08%", color: "green" },
    { name: "JP10Y", value: "$850.20",  change: "0.45-", percent: "0.05%", color: "red"   }
  ];

  const cash = [
    { name: "USD", value: "$12,345.67", change: "15.23+", percent: "0.12%", color: "green" },
    { name: "EUR", value: "€10,234.56", change: "10.45-", percent: "0.10%", color: "red" },
    { name: "GBP", value: "£8,765.43", change: "20.12+", percent: "0.25%", color: "green" },
    { name: "JPY", value: "¥1,234,567.00", change: "500.00-", percent: "0.04%", color: "red" }
  ];



  return (
    <div className="left-panel">
      <SBCButton />
      {products.map((p, i) => (
        <ProductCard key={i} {...p} />
      ))}
    </div>
  );
}
