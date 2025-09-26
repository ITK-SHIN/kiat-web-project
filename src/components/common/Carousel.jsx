import React, { useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { carouselData } from '../../data/carouselData';
import { useCarousel } from '../../hooks/useCarousel';
import CarouselIndicator from './CarouselIndicator';
import CarouselSlide from './CarouselSlide';

const Carousel = React.memo(() => {
  const totalSlides = useMemo(() => carouselData.length, []);
  const navigate = useNavigate();

  const { carouselRef, currentSlide, handleSlideNavigation } = useCarousel(totalSlides);

  // 네비게이션 관련 함수들
  const navigateToPage = useCallback(
    path => {
      navigate(path);
    },
    [navigate]
  );

  return (
    <>
      <div ref={carouselRef} className="carousel w-full h-80 relative overflow-hidden z-0">
        {carouselData.map(slide => (
          <CarouselSlide
            key={slide.id}
            slide={slide}
            totalSlides={totalSlides}
            onNavigate={navigateToPage}
            onSlideNavigation={handleSlideNavigation}
          />
        ))}
      </div>

      <CarouselIndicator
        totalSlides={totalSlides}
        currentSlide={currentSlide}
        onSlideNavigation={handleSlideNavigation}
      />
    </>
  );
});

Carousel.displayName = 'Carousel';

export default Carousel;
