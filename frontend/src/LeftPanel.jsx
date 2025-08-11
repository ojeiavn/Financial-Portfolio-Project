import { useState, useEffect } from "react";
import { ProductCard } from "./ProductCard";

export function LeftPanel({ setCompanyName }) {
  const [productType, setProductType] = useState("stock");
  const [productData, setProductData] = useState([]);

  useEffect(() => {
    let abort = false;

    const load = async () => {
      try {
        const res = await fetch(`http://127.0.0.1:5000/prices/${productType}`);
        if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
        const data = await res.json();
        if (!abort) setProductData(Array.isArray(data) ? data : Object.values(data || {}));
      } catch (e) {
        if (!abort) setProductData([]);
        console.error("Error fetching product data:", e);
      }
    };

    load();                         
    //const id = setInterval(load, 10000);
    //return () => { abort = true; clearInterval(id); };
  }, [productType]);

  return (
    <aside className="left-panel">
      <div id="sbc-buttons">
        <button type="button" onClick={() => setProductType("stock")}>Stocks</button>
        <button type="button" onClick={() => setProductType("bond")}>Bonds</button>
        <button type="button" onClick={() => setProductType("cash")}>Cash</button>
      </div>

      <div className="left-panel__card"> 
        {productData.map((p, i) => {
          const price = Number(p.Price);
          const current = Number(p.CurrentPrice);
          const change = current - price;
          const pct = price ? (change / price) * 100 : 0;

          return (
            <div key={p.Symbol ?? i} className="product-card">
              <ProductCard
                value={price?.toFixed(2)}
                percentage={pct}
                change={change.toFixed(4)}
                name={p.Name}
                color={current > price ? "green" : "red"}
                symbol={p.Symbol}
                onClick={() => setCompanyName(p.Symbol)}
              />
            </div>
          );
        })}
      </div>
    </aside>
  );
}

