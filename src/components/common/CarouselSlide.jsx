import React from 'react';
import { themeStyles } from '../../data/carouselData';

const CarouselSlide = React.memo(({ slide, totalSlides, onNavigate, onSlideNavigation }) => {
  const theme = themeStyles[slide.theme];

  // 간단한 계산이므로 useCallback 제거
  const prevSlide = slide.id === 1 ? totalSlides : slide.id - 1;
  const nextSlide = slide.id === totalSlides ? 1 : slide.id + 1;

  return (
    <div id={`slide${slide.id}`} className="carousel-item relative w-full">
      <div
        className="w-full h-full bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${slide.backgroundImage})`,
        }}
      >
        <div className={`absolute inset-0 bg-gradient-to-r ${theme.gradient} flex items-center justify-center`}>
          <div className="text-center text-white max-w-2xl px-6">
            <h2 className="text-4xl font-bold mb-4">{slide.title}</h2>
            <p className="text-xl mb-6 leading-relaxed">{slide.description}</p>
            <button
              className={`btn bg-white ${theme.buttonColor} hover:bg-gray-100 font-semibold px-8 py-3`}
              onClick={() => onNavigate(slide.buttonPath)}
            >
              {slide.buttonText}
            </button>
          </div>
        </div>
      </div>

      {/* 네비게이션 버튼 */}
      <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between pointer-events-none">
        <button
          className="btn btn-circle btn-sm bg-white/20 border-white/30 text-white hover:bg-white/30 pointer-events-auto"
          onClick={e => onSlideNavigation(e, prevSlide)}
        >
          ❮
        </button>
        <button
          className="btn btn-circle btn-sm bg-white/20 border-white/30 text-white hover:bg-white/30 pointer-events-auto"
          onClick={e => onSlideNavigation(e, nextSlide)}
        >
          ❯
        </button>
      </div>
    </div>
  );
});

CarouselSlide.displayName = 'CarouselSlide';

export default CarouselSlide;
