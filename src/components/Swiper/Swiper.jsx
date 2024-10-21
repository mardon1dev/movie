import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import "./styles.css";

import { FreeMode, Navigation, Thumbs, Autoplay } from "swiper/modules";
import { IMAGE_URL } from "../../hooks/useEnv";
import SwiperSlideSingle from "../SwiperSlide/SwiperSlide";

export default function SwiperSlides({ data }) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <>
      <Swiper
        style={{
          "--swiper-navigation-color": "#fff",
          "--swiper-pagination-color": "#fff",
        }}
        loop={true}
        spaceBetween={10}
        navigation={true}
        autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs, Autoplay]}
        className="mySwiper2"
      >
        {data.length > 0
          ? data.slice(0, 10).map((movie, index) => {
              return (
                <SwiperSlide key={index}>
                    <SwiperSlideSingle movie ={movie} />
                </SwiperSlide>
              );
            })
          : ""}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        loop={true}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
      >
        {data.length > 0
          ? data.slice(0, 10).map((movie, index) => {
              return (
                <SwiperSlide key={index}>
                  <img src={`${IMAGE_URL}${movie.backdrop_path}`} alt="" width={500} />
                </SwiperSlide>
              );
            })
          : ""}
      </Swiper>
    </>
  );
}
