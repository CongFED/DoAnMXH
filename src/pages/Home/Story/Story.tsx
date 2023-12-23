import React from "react";
import ItemStory from "./ItemStory";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick-theme.css";
// import "slick-carousel/slick/slick.css";
const Story = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    //  slidesToShow: data1.length >= 6 ? 5 : 5,
    slidesToShow: 3,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="h-[10%] w-[60%] ml-[35%]  mt-[50px] flex">
      <ItemStory />
      <ItemStory />
      <ItemStory />
      <ItemStory />
      <ItemStory />
      <ItemStory />
      <ItemStory />
      <ItemStory />
    </div>
  );
};

export default Story;
