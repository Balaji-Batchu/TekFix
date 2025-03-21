import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <Link
      to={`/product/${product.id}`}
      className="font-lora border border-accent bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition"
    >
      <div className="font-lora w-full h-48 flex justify-center items-center bg-primary rounded-md">
        <img src={product.image} alt={product.title} className="h-full object-contain" />
      </div>
      <h3 className="mt-4 font-semibold text-dark text-lg truncate">{product.title}</h3>
      <p className="text-accent font-bold text-xl mt-2">${product.price}</p>
    </Link>
  );
};

export default ProductCard;
