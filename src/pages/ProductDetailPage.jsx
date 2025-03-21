import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    axios.get(`https://fakestoreapi.com/products/${id}`)
      .then(response => setProduct(response.data));
  }, [id]);

  if (!product) return <div className="text-center py-10">Loading...</div>;

  const handleAddToCart = () => {
    const cartItem = {
      id: product.id,
      title: product.title,
      image: product.image,
      price: product.price,
      quantity,
    };

    const currentCart = JSON.parse(localStorage.getItem("cart")) || [];
    currentCart.push(cartItem);
    localStorage.setItem("cart", JSON.stringify(currentCart));

    alert(`${quantity} ${product.title} added to cart!`);
  };

  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => {
    if (quantity > 1) setQuantity(prev => prev - 1); // Prevent going below 1
  };

  return (
    <div className="font-lora max-w-4xl mx-auto py-10">
      <div className="flex flex-col md:flex-row items-center gap-8">
        <img 
          src={product.image} 
          alt={product.title} 
          className="w-80 object-contain border p-4 rounded-lg shadow-lg" 
        />
        <div>
          <h2 className="text-4xl font-bold text-dark">{product.title}</h2>
          <p className="text-lg py-5 text-gray-700 mt-2">{product.description}</p>
          <p className="text-primary font-bold text-2xl mt-4">${product.price}</p>
          <p className="text-yellow-500 text-lg mt-2">⭐ {product.rating.rate} / 5</p>

          {/* Quantity Controls */}
          <div className="flex items-center gap-4 mt-6">
            <button 
              onClick={decrementQuantity} 
              className="px-4 py-2 bg-gray-300 rounded-full hover:bg-gray-400 transition"
            >
              -
            </button>
            <span className="text-xl">{quantity}</span>
            <button 
              onClick={incrementQuantity} 
              className="px-4 py-2 bg-gray-300 rounded-full hover:bg-gray-400 transition"
            >
              +
            </button>
          </div>

          {/* Add to Cart Button */}
          <button 
            onClick={handleAddToCart} 
            className="mt-6 px-6 py-3 bg-accent text-white rounded-full font-semibold shadow-lg hover:bg-dark transition-all"
          >
            Add to WishList
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
