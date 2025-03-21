import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";

const ProductListPage = () => {
  const [products, setProducts] = useState([]);
  
  useEffect(() => {
    axios.get("https://fakestoreapi.com/products")
      .then(response => setProducts(response.data));
  }, []);

  return (
    <div className="font-lora max-w-6xl mx-auto py-10">
      <h2 className="text-3xl font-bold text-dark mb-6">All Products</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductListPage;
