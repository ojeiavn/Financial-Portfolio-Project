import { useState, useEffect } from "react";
import { ProductCard } from "./ProductCard";

export function LeftPanel({ setCompanyName }) {
  const [productType, setProductType] = useState("stock");
  const [productData, setProductData] = useState([]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      fetch(`http://192.168.1.100:5000/prices/${productType}`)
        .then((res) =>
          res.json().then((data) => {
            console.log('Fetched data:', data);
            setProductData(data);
          })
        )
        .catch((error) => {
          console.error('Error fetching product data:', error);
        });
    }, 5000); // 5 seconds interval

    return () => clearInterval(intervalId); // Cleanup the interval on component unmount
  }, [productType]); // Dependency array ensures the effect runs again when `productType` changes

  return (
    <div className="left-panel">
      <div id="sbc-buttons">
        <button type="button" onClick={() => setProductType("stock")}>Stocks</button>
        <button type="button" onClick={() => setProductType("bond")}>Bonds</button>
        <button type="button" onClick={() => setProductType("cash")}>Cash</button>
      </div>

      {productData.length > 0 ? (
        productData.map((p, i) => (
          <ProductCard
            key={i}
            value={p.Price}
            percentage={((p.CurrentPrice - parseFloat(p.Price)) / parseFloat(p.Price)) * 100}
            change={(p.CurrentPrice - parseFloat(p.Price)).toFixed(4)}
            name={p.Symbol}
            color={p.CurrentPrice > parseFloat(p.Price) ? "green" : "red"}
            onClick={setCompanyName}
          />
        ))
      ) : (
        <div>No products available</div>
      )}
    </div>
  );
}
