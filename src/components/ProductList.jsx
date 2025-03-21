import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";

const ProductList = ({ limit }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("https://fakestoreapi.com/products")
      .then(response => {
        const items = limit ? response.data.slice(0, limit) : response.data;
        setProducts(items);
      });
  }, [limit]);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
