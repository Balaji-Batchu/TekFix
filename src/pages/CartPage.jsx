import React, { useState, useEffect } from "react";

const CartPage = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);

  const handleRemoveFromCart = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  return (
    <div className="font-lora max-w-6xl mx-auto py-10">
      <h2 className="text-3xl font-bold text-dark mb-6">Your Cart</h2>
      {cart.length === 0 ? (
        <p className="text-lg text-gray-700">Your cart is empty.</p>
      ) : (
        <div>
          {cart.map((item) => (
            <div key={item.id} className="flex items-center justify-between mb-6 border-b pb-4">
              <img src={item.image} alt={item.title} className="w-20 h-20 object-contain" />
              <div className="flex-1 ml-4">
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p className="text-lg text-gray-700">Quantity: {item.quantity}</p>
                <p className="text-lg font-bold text-primary">${item.price * item.quantity}</p>
              </div>
              <button
                onClick={() => handleRemoveFromCart(item.id)}
                className="text-red-500 hover:text-red-700"
              >
                Remove
              </button>
            </div>
          ))}
          <div className="flex justify-between items-center mt-6">
            <p className="text-xl font-semibold">Total: ${getTotalPrice()}</p>
            <button className="px-6 py-3 bg-dark text-white rounded-full font-semibold shadow-lg hover:bg-accent transition-all">
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
