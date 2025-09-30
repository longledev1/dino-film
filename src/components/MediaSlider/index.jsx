import React, { useState } from "react";
// Component
import Title from "../Title";
import MediaPreviewCard from "./MediaPreviewCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { FaPlayCircle, FaRegBookmark } from "react-icons/fa";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

// import required modules
import { EffectFade } from "swiper/modules";

const MediaSlider = (props) => {
  const [index, setIndex] = useState(0);
  const { title } = props;
  console.log(index);

  return (
    <div>
      <Title className="mb-4 text-white">{title}</Title>
      <>
        <Swiper
          onSlideChange={(swiper) => setIndex(swiper.activeIndex)}
          spaceBetween={30}
          effect={"fade"}
          navigation={true}
          pagination={{
            clickable: true,
          }}
          modules={[EffectFade]}
          grabCursor={true}
        >
          <SwiperSlide>
            <div className="relative flex h-[460px] w-full overflow-hidden rounded-[40px] bg-gray-800">
              {/* Background màu bên trái */}
              <div className="relative z-10 flex w-1/3 flex-col justify-center bg-gray-800 p-8 text-white">
                <h2 className="mb-2 w-full !text-[25px] font-bold md:text-6xl lg:w-[800px]">
                  Biệt Đội Lính Cứu Hỏa
                </h2>
                <p className="text-sub mb-2">2025-08-18</p>
                <div className="mb-4 flex items-center gap-x-2">
                  <button className="w-fit rounded-md bg-slate-300/35 p-2 text-[14px] font-extralight">
                    Action
                  </button>
                  <button className="w-fit rounded-md bg-slate-300/35 p-2 text-[14px] font-extralight">
                    War
                  </button>
                  <button className="w-fit rounded-md bg-slate-300/35 p-2 text-[14px] font-extralight">
                    History
                  </button>
                </div>
                <p className="mb-2 text-[25px] font-bold text-white">
                  Overview
                </p>

                <div className="relative z-10 mb-6 w-[600px] leading-normal">
                  <p className="text-[14px]">
                    Against the vibrant backdrop of a 1960s-inspired,
                    retro-futuristic world, Marvel's First Family is forced to
                    balance their roles as heroes with the strength of their
                    family bond, while defending Earth from a ravenous space god
                    called Galactus and his enigmatic Herald, Silver Surfer.
                  </p>
                </div>
                <div className="flex space-x-4">
                  <button className="bg-button flex cursor-pointer items-center gap-x-2 rounded-lg px-6 py-3 font-semibold opacity-70 hover:opacity-100">
                    <FaPlayCircle className="text-xl"></FaPlayCircle>
                    <span>Watch Trailer</span>
                  </button>
                  <button className="flex cursor-pointer items-center gap-x-2 rounded-lg bg-slate-300/35 px-6 py-3 font-semibold hover:bg-white hover:text-black">
                    <FaRegBookmark className="text-xl"></FaRegBookmark>
                    <span>Add to Watchlist</span>
                  </button>
                </div>
              </div>

              {/* Ảnh bên phải */}
              <div className="relative w-2/3">
                <img
                  src="https://res.cloudinary.com/cinemaworld/image/upload/v1656967852/Inception_Wallpaper.jpg"
                  className="h-full !w-[100%] object-cover"
                  alt="Fire Force"
                />

                {/* Layer gradient để blend với màu nền bên trái */}
                <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-l from-transparent to-gray-800" />
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="relative flex h-[460px] w-full overflow-hidden rounded-[40px] bg-gray-800">
              {/* Background màu bên trái */}
              <div className="relative z-10 flex w-1/3 flex-col justify-center bg-gray-800 p-8 text-white">
                <h2 className="mb-2 w-full !text-[25px] font-bold md:text-6xl lg:w-[800px]">
                  Naruto
                </h2>
                <p className="text-sub mb-2">2025-02-12</p>
                <div className="mb-4 flex items-center gap-x-2">
                  <button className="w-fit rounded-md bg-slate-300/35 p-2 text-[14px] font-extralight">
                    Anime
                  </button>
                  <button className="w-fit rounded-md bg-slate-300/35 p-2 text-[14px] font-extralight">
                    Cartoon
                  </button>
                  <button className="w-fit rounded-md bg-slate-300/35 p-2 text-[14px] font-extralight">
                    Japan
                  </button>
                </div>
                <p className="mb-2 text-[25px] font-bold text-white">
                  Overview
                </p>

                <div className="relative z-10 mb-6 w-[600px] leading-normal">
                  <p className="text-[14px]">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Voluptates mollitia quaerat necessitatibus facere debitis
                    amet inventore at reprehenderit et rerum, a asperiores
                    voluptatem soluta error animi officia libero. Placeat,
                    reprehenderit!
                  </p>
                </div>
                <div className="flex space-x-4">
                  <button className="bg-button flex cursor-pointer items-center gap-x-2 rounded-lg px-6 py-3 font-semibold opacity-70 hover:opacity-100">
                    <FaPlayCircle className="text-xl"></FaPlayCircle>
                    <span>Watch Trailer</span>
                  </button>
                  <button className="flex cursor-pointer items-center gap-x-2 rounded-lg bg-slate-300/35 px-6 py-3 font-semibold hover:bg-white hover:text-black">
                    <FaRegBookmark className="text-xl"></FaRegBookmark>
                    <span>Add to Watchlist</span>
                  </button>
                </div>
              </div>

              {/* Ảnh bên phải */}
              <div className="relative w-2/3">
                <img
                  src="https://4kwallpapers.com/images/wallpapers/goku-dragon-ball-8k-5k-7680x4320-17944.jpg"
                  className="h-full !w-[100%] object-cover"
                  alt="Fire Force"
                />

                {/* Layer gradient để blend với màu nền bên trái */}
                <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-l from-transparent to-gray-800" />
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </>
    </div>
  );
};

export default MediaSlider;

<SwiperSlide>
  <div className="relative flex h-[460px] w-full">
    {/* Background màu bên trái */}
    <div className="relative z-10 flex w-1/3 flex-col justify-center rounded-l-[40px] bg-gray-800 p-8 text-white">
      <h2 className="mb-2 w-full !text-[25px] font-bold md:text-6xl lg:w-[800px]">
        Biệt Đội Lính Cứu Hỏa
      </h2>
      <p className="text-sub mb-2">2025-08-18</p>
      <div className="mb-4 flex items-center gap-x-2">
        <button className="w-fit rounded-md bg-slate-300/35 p-2 text-[14px] font-extralight">
          Action
        </button>
        <button className="w-fit rounded-md bg-slate-300/35 p-2 text-[14px] font-extralight">
          War
        </button>
        <button className="w-fit rounded-md bg-slate-300/35 p-2 text-[14px] font-extralight">
          History
        </button>
      </div>
      <p className="mb-2 text-[25px] font-bold text-white">Overview</p>

      <div className="relative z-10 mb-6 w-[600px] leading-normal">
        <p className="text-[14px]">
          Against the vibrant backdrop of a 1960s-inspired, retro-futuristic
          world, Marvel's First Family is forced to balance their roles as
          heroes with the strength of their family bond, while defending Earth
          from a ravenous space god called Galactus and his enigmatic Herald,
          Silver Surfer.
        </p>
      </div>
      <div className="flex space-x-4">
        <button className="bg-button flex cursor-pointer items-center gap-x-2 rounded-lg px-6 py-3 font-semibold opacity-70 hover:opacity-100">
          <FaPlayCircle className="text-xl"></FaPlayCircle>
          <span>Watch Trailer</span>
        </button>
        <button className="flex cursor-pointer items-center gap-x-2 rounded-lg bg-slate-300/35 px-6 py-3 font-semibold hover:bg-white hover:text-black">
          <FaRegBookmark className="text-xl"></FaRegBookmark>
          <span>Add to Watchlist</span>
        </button>
      </div>
    </div>

    {/* Ảnh bên phải */}
    <div className="relative w-2/3">
      <img
        src="https://4kwallpapers.com/images/wallpapers/goku-dragon-ball-8k-5k-7680x4320-17944.jpg"
        className="h-full w-full rounded-[40px] object-cover"
        alt="Fire Force"
      />

      {/* Layer gradient để blend với màu nền bên trái */}
      <div className="absolute inset-y-0 left-0 w-3/4 bg-gradient-to-l from-transparent to-gray-800" />
    </div>
  </div>
</SwiperSlide>;
