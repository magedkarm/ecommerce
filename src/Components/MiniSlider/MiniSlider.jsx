import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/scrollbar";
import "../MiniSlider/MiniSlider.css";
import { Scrollbar } from "swiper/modules";
// import style from "../MiniSlider/MiniSlider.module.css";
import cat1 from "../../Assets/Images/cat/product-cat-1.jpg";
import cat2 from "../../Assets/Images/cat/product-cat-2.jpg";
import cat3 from "../../Assets/Images/cat/product-cat-3.jpg";
import cat4 from "../../Assets/Images/cat/product-cat-4.jpg";
import cat5 from "../../Assets/Images/cat/product-cat-5.jpg";
import cat6 from "../../Assets/Images/cat/product-cat-6.jpg";
import cat7 from "../../Assets/Images/cat/product-cat-7.jpg";
let category = [
  { img: cat1, catName: "Planer & Virtual" },
  {
    img: cat2,
    catName: "Spinning Reel & Kettle",
  },
  {
    img: cat3,
    catName: "Computers Monitor & Laptop",
  },
  {
    img: cat4,
    catName: "Exercise Bike & Shaver Clean",
  },
  {
    img: cat5,
    catName: "Wireless & Watches",
  },
  {
    img: cat6,
    catName: "Camera Bluetooth & Headset",
  },
  {
    img: cat7,
    catName: "Ipad Phone & Tablets",
  },
];

export default function MiniSlider() {
  return (
    <div className="container ">
      <div className="MiniSlider">
        <Swiper
          watchSlidesProgress={true}
          slidesPerView={3}
          breakpoints={{
            320: {
              slidesPerView: 4,
              spaceBetween: 30,
            },
          }}
          scrollbar={{
            hide: false,
          }}
          modules={[Scrollbar]}
          className="mySwiper"
        >
          {category.map((cat, index) => {
            return (
              <SwiperSlide key={index}>
                <div className="text-center">
                  <img className="img-fluid w-100" src={cat.img} alt="" />
                  <h3
                    style={{
                      fontFamily: "Roboto",
                      fontSize: "16px",
                      fontWeight: "500",
                      lineHeight: "1",
                      color: "#525258",
                      padding: "21px 0px",
                    }}
                  >
                    {cat.catName}
                  </h3>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
}
