// Navbar.js
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [cartCount, setCartCount] = useState(0);

  // Function to update cart count from localStorage
  const updateCartCount = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartCount(cart.reduce((total, item) => total + item.quantity, 0));
  };

  useEffect(() => {
    updateCartCount();

    const cartChangeListener = () => updateCartCount();

    window.addEventListener("storage", cartChangeListener);

    return () => {
      window.removeEventListener("storage", cartChangeListener);
    };
  }, []);

  return (
    <nav className="font-lora bg-background border-b border-accent text-dark p-4 shadow-sm">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-semibold hover:text-accent transition">
          ShopMate
        </Link>
        <div className="flex space-x-10">
          <Link to="/products" className="text-lg hover:text-accent transition">
            Products
          </Link>
          <Link to="/cart" className="relative text-lg hover:text-accent transition">
            Cart
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
