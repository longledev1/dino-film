import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/autoplay";
import "./slider.css";
const logos = [
  "images/disney.png",
  "images/hbo_logo.png",
  "images/marvel.png",
  "images/nation.png",
  "images/netflix.png",
  "images/pixar.png",
  "images/cartoon_logo.png",
];

const InfiniteSlider = () => {
  return (
    <div className="container mt-5 mb-5">
      <Swiper
        modules={[Autoplay, FreeMode]}
        slidesPerView={5}
        spaceBetween={20}
        loop={true}
        freeMode={true}
        freeModeMomentum={false}
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
        }}
        speed={6000} // càng lớn → chạy càng chậm mượt
      >
        {/* Lặp 2 lần để giả lập vòng lặp vô tận */}
        {[...logos, ...logos].map((src, idx) => (
          <SwiperSlide key={idx}>
            <img
              src={src}
              alt={`logo-${idx}`}
              className="h-[40px] object-contain"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default InfiniteSlider;
