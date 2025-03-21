import Banner from "../components/Banner";
import ProductCarousel from "../components/ProductCarousel";

const Home = () => {
  return (
    <div className="bg-background text-dark min-h-screen">
      <Banner />
      <div className="max-w-6xl mx-auto py-10">
        <h2 className="font-lora text-3xl font-bold text-center mb-6">Featured Products</h2>
        <ProductCarousel />
      </div>
    </div>
  );
};

export default Home;
