import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useAutoSlide } from './useAutoSlide';

/**
 * 캐러셀 기능을 제공하는 커스텀 훅
 * @param {number} totalSlides - 총 슬라이드 개수
 * @param {number} autoSlideInterval - 자동 슬라이드 간격 (밀리초)
 * @returns {Object} 캐러셀 관련 상태와 함수들
 */
export const useCarousel = (totalSlides, autoSlideInterval = 3000) => {
  const carouselRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(1);

  // 슬라이드 이동 함수
  const goToSlide = useCallback(slideNumber => {
    setCurrentSlide(slideNumber);
    const carousel = carouselRef.current;
    if (carousel) {
      const slideWidth = carousel.offsetWidth;
      carousel.scrollTo({
        left: (slideNumber - 1) * slideWidth,
        behavior: 'smooth',
      });
    }
  }, []);

  // 다음 슬라이드로 이동
  const nextSlide = useCallback(() => {
    const next = currentSlide === totalSlides ? 1 : currentSlide + 1;
    goToSlide(next);
  }, [currentSlide, totalSlides, goToSlide]);

  // 이전 슬라이드로 이동
  const prevSlide = useCallback(() => {
    const prev = currentSlide === 1 ? totalSlides : currentSlide - 1;
    goToSlide(prev);
  }, [currentSlide, totalSlides, goToSlide]);

  // 자동 슬라이드 관리
  const { startAutoSlide, stopAutoSlide, clearAutoSlide } = useAutoSlide(nextSlide, autoSlideInterval);

  // 스크롤 이벤트 핸들러
  const handleScroll = useCallback(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const scrollLeft = carousel.scrollLeft;
    const slideWidth = carousel.offsetWidth;
    const newSlide = Math.round(scrollLeft / slideWidth) + 1;

    if (newSlide !== currentSlide && newSlide >= 1 && newSlide <= totalSlides) {
      setCurrentSlide(newSlide);
    }
  }, [currentSlide, totalSlides]);

  // 마우스 이벤트 핸들러
  const handleMouseEnter = useCallback(() => {
    stopAutoSlide();
  }, [stopAutoSlide]);

  const handleMouseLeave = useCallback(() => {
    startAutoSlide();
  }, [startAutoSlide]);

  // 이벤트 리스너 등록
  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    carousel.addEventListener('scroll', handleScroll);
    carousel.addEventListener('mouseenter', handleMouseEnter);
    carousel.addEventListener('mouseleave', handleMouseLeave);

    // 자동 슬라이드 시작
    startAutoSlide();

    return () => {
      clearAutoSlide();
      carousel.removeEventListener('scroll', handleScroll);
      carousel.removeEventListener('mouseenter', handleMouseEnter);
      carousel.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [handleScroll, handleMouseEnter, handleMouseLeave, startAutoSlide, clearAutoSlide]);

  // 슬라이드 네비게이션 핸들러
  const handleSlideNavigation = useCallback(
    (e, slideNumber) => {
      e.preventDefault();
      e.stopPropagation();
      goToSlide(slideNumber);
    },
    [goToSlide]
  );

  // 반환 객체를 useMemo로 메모이제이션
  return useMemo(
    () => ({
      carouselRef,
      currentSlide,
      totalSlides,
      goToSlide,
      nextSlide,
      prevSlide,
      handleSlideNavigation,
      startAutoSlide,
      stopAutoSlide,
    }),
    [
      carouselRef,
      currentSlide,
      totalSlides,
      goToSlide,
      nextSlide,
      prevSlide,
      handleSlideNavigation,
      startAutoSlide,
      stopAutoSlide,
    ]
  );
};
