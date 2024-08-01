// BannerSlider.js
import React from 'react';
import Slider from 'react-slick';

const BannerSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="banner-slider">
      <Slider {...settings}>
        <div>
          <img src="path_to_your_image1.jpg" alt="Banner 1" />
        </div>
        <div>
          <img src="path_to_your_image2.jpg" alt="Banner 2" />
        </div>
        <div>
          <img src="path_to_your_image3.jpg" alt="Banner 3" />
        </div>
      </Slider>
    </div>
  );
};

export default BannerSlider;
