import React from 'react';
import Slider from 'react-slick';
import './BannerSlider.css'; // CSS 파일 임포트

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

  const banners = [
    "banner1", "banner2"
  ];

  return (
    <div className="banner-slider">
      <Slider {...settings}>
        {banners.map((banner, index) => (
          <div key={index} className={`banner ${banner}`}>
            {/* 필요하면 추가 콘텐츠를 여기에 넣으세요 */}
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default BannerSlider;
