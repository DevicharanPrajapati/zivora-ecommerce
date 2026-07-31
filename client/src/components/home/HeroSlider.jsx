import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const HeroSlider = () => {
  const slides = [
    {
      image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c",
      title: "Summer Collection",
      desc: "Up to 50% Off",
    },
    {
      image: "https://images.unsplash.com/photo-1542272604-787c3835535d",
      title: "New Arrivals",
      desc: "Latest Fashion",
    },
    {
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
      title: "Sneaker Sale",
      desc: "Limited Time Offer",
    },
     {
      image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f",
      title: "Shirt Collection",
      desc: "Limited Time Offer",
    },
  ];

  return (
    <Swiper
      modules={[Autoplay, Navigation, Pagination]}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      loop
      // navigation
      pagination={{ clickable: true }}
    >
      {slides.map((slide, index) => (
        <SwiperSlide key={index} >
          <div className="relative h-[500px] mx-2 ">
            <img
              src={slide.image}
              alt={slide.title}
              className="h-full w-full  object-cover"
            />

            <div className="absolute inset-0 bg-black/40 flex items-center">
              <div className="ml-20 text-white">
                <h1 className="text-5xl font-bold">
                  {slide.title}
                </h1>

                <p className="mt-4 text-xl">
                  {slide.desc}
                </p>

                <button className="mt-6 rounded bg-blue-600 px-6 py-3">
                  Shop Now
                </button>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default HeroSlider;