import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import { IoFilterSharp } from "react-icons/io5";

const ProductListPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedPriceRange, setSelectedPriceRange] = useState('');
  const [rating, setRating] = useState(0);
  const [filtersVisible, setFiltersVisible] = useState(false); // State to control visibility of the filter menu

  // Fetch products and categories
  useEffect(() => {
    axios.get("https://fakestoreapi.com/products")
      .then(response => {
        setProducts(response.data);
        setFilteredProducts(response.data);
        // Extract categories (assuming the API returns product categories)
        const allCategories = Array.from(new Set(response.data.map(product => product.category)));
        setCategories(allCategories);
      });
  }, []);

  // Function to apply filters
  const applyFilters = () => {
    let filtered = [...products];

    // Category Filter
    if (selectedCategory) {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Rating Filter
    if (rating > 0) {
      filtered = filtered.filter(product => product.rating.rate >= rating);
    }

    // Price Range Filter (predefined options)
    if (selectedPriceRange) {
      const priceLimit = parseInt(selectedPriceRange.replace('below ', ''), 10);
      filtered = filtered.filter(product => product.price < priceLimit);
    }

    setFilteredProducts(filtered);
  };

  // Handle filter change
  useEffect(() => {
    applyFilters();
  }, [selectedCategory, selectedPriceRange, rating]);

  return (
    <div className="font-lora max-w-6xl mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-dark">All Products</h2>

        {/* Filter Icon (Right-aligned) */}
        <button
          onClick={() => setFiltersVisible(!filtersVisible)}
          className="px-4 py-2 bg-dark text-white rounded-md flex items-center space-x-2"
        >
          <IoFilterSharp/>
          <span>Filters</span>
        </button>
      </div>

      {/* Filter Section (Toggle visibility based on filtersVisible state) */}
      {filtersVisible && (
        <div className="flex w-full mb-6 p-4 bg-gray-100 rounded-md justify-around">
          <div className="flex space-x-6">
            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md"
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>

            {/* Rating Filter */}
            <div className="flex items-center space-x-4">
              <label htmlFor="rating" className="font-medium">Rating:</label>
              <select
                id="rating"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-md"
              >
                <option value={0}>Any Rating</option>
                <option value={3}>3 stars & above</option>
                <option value={4}>4 stars & above</option>
                <option value={5}>5 stars only</option>
              </select>
            </div>

            <div className="flex items-center space-x-4">
              <label htmlFor="priceRange" className="font-medium">Price Range:</label>
              <select
                id="priceRange"
                value={selectedPriceRange}
                onChange={(e) => setSelectedPriceRange(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-md w-full md:w-64"
              >
                <option value="">Select Price Range</option>
                <option value="below 100">Below $100</option>
                <option value="below 500">Below $500</option>
                <option value="below 700">Below $700</option>
                {/* <option value="below 899">Below $899</option> */}
              </select>
            </div>
          </div>

          {/* Price Range Filter */}
          
        </div>
      )}

      {/* Products Display */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductListPage;
