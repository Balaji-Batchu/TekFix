import { useNavigate } from "react-router-dom";


const Banner = () => {
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate("/products");
    };


    return (
      <div className="font-lora relative h-80 bg-gradient-to-r from-secondary to-background flex items-center justify-between px-10">
        <div className="w-1/2 h-full text-dark text-center md:text-left content-center">
          <h1 className="text-5xl sm:text-7xl font-extrabold tracking-wide leading-tight mb-4">
            Discover <br /> Your Unique <br /> Style
          </h1>  
        </div>

        <div className="w-1/2 text-dark text-center md:text-left">
          <p className="text-gray-600 text-lg sm:text-xl font-medium leading-relaxed mb-6">
            "Make a better choice."
          </p>
          <p className="text-lg sm:text-xl text-gray-700 font-medium leading-relaxed mb-6">
            Uncover exclusive fashion, gadgets, and lifestyle products designed to bring out the best in you. 
            Enjoy a personalized shopping experience tailored just for you.
          </p>
          <button onClick={handleNavigate} className="px-6 py-3 mt-5 bg-dark text-white rounded-full font-semibold shadow-lg relative overflow-hidden group">
            <span className="absolute inset-0 bg-accent transform scale-x-0 group-hover:scale-x-100 transition-all duration-300 ease-in-out"></span>
            <span className="relative z-10 hover:text-dark">
              Shop Now <span className="inline-block ml-2 transform group-hover:translate-x-1 transition-all">→</span>
            </span>
          </button>
        </div>
  
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-background to-transparent opacity-20"></div>
      </div>
    );
  };
  
  export default Banner;
  