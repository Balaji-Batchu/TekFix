import { useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import { Link } from "react-router-dom";

const ProductCarousel = () => {
  const [products, setProducts] = useState([]);
  
  useEffect(() => {
    axios.get("https://fakestoreapi.com/products").then((response) => {
      setProducts(response.data);
    });
  }, []);

  const slidesPerView = products.length < 3 ? products.length : 3;

  return (
    <div className="font-lora w-full mx-auto py-10">
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={slidesPerView}
        spaceBetween={20}
        loop={products.length >= 3}
        autoplay={{
          delay: 1500,
          disableOnInteraction: false,
          waitForTransition: false,
        }}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 200,
          modifier: 1,
          slideShadows: false,
        }}
        breakpoints={{
          1024: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          480: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
        }}
        modules={[Autoplay, EffectCoverflow]}
        className="swiper-container"
      >
        {products.map((product) => (
          <SwiperSlide key={product.id} className="relative">
            <Link to={`/product/${product.id}`}>
              <div className="font-lora bg-{#252501} rounded-lg shadow-lg p-4 px-2 mx-6 transition transform hover:scale-110 hover:cursor-pointer">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-60 h-60 object-contain mx-auto"
                />
                <h3 className="text-center mt-2 font-semibold text-gray-800 hover:text-xl">
                  {product.title.length > 20
                    ? product.title.slice(0, 20) + "..."
                    : product.title}
                </h3>
                <p className="text-center text-primary font-bold">${product.price}</p>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>

      <style jsx="true">{`
        .swiper-slide {
          transition: all 0.3s ease;
        }
        .swiper-slide:not(.swiper-slide-active) {
          opacity: 0.8; /* Slightly reduce opacity */
          transform: scale(0.9); /* Make non-active slides slightly smaller */
          filter: blur(0px); /* Remove blur effect */
        }
      `}</style>
    </div>
  );
};

export default ProductCarousel;
