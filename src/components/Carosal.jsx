import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// bg image
import bg1 from "../assets/images/carousel1.jpg"
import bg2 from "../assets/images/carousel2.jpg"
import bg3 from "../assets/images/carousel3.jpg"

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import Slide from './Slide';

export default function App() {
  return (
    <>
    <div className='container mx-auto px-12 py-12'>
    <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        loop={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide><div><Slide image={bg1}></Slide></div></SwiperSlide>
        <SwiperSlide><div><Slide image={bg2}></Slide></div></SwiperSlide>
        <SwiperSlide><div><Slide image={bg3}></Slide></div></SwiperSlide>
      </Swiper>
    </div>
    </>
  );
}
