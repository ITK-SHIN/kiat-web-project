import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Carousel() {
  const carouselRef = useRef(null);
  const totalSlides = 4;
  const currentSlideRef = useRef(1);
  const intervalRef = useRef(null);
  const navigate = useNavigate();

  // 네비게이션 관련 함수들
  const navigateToPage = path => {
    navigate(path);
  };

  const navigateToSlide = slideNumber => {
    const carousel = carouselRef.current; // 캐러셀 요소
    const targetSlide = document.getElementById(`slide${slideNumber}`); // 이동할 슬라이드 요소
    if (carousel && targetSlide) {
      // 캐러셀 요소와 이동할 슬라이드 요소가 있을 때
      carousel.scrollTo({
        // 슬라이드 이동
        left: targetSlide.offsetLeft, // 슬라이드 이동 위치
        behavior: 'smooth', // 부드러운 스크롤 효과
      });
    }
  };

  const handleSlideNavigation = (e, slideNumber) => {
    e.preventDefault();
    e.stopPropagation();
    navigateToSlide(slideNumber);
  };

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const updateDots = slideNumber => {
      for (let i = 1; i <= totalSlides; i++) {
        const dot = document.getElementById(`dot${i}`);
        if (dot) {
          if (i === slideNumber) {
            dot.classList.remove('bg-white/70');
            dot.classList.add('bg-white');
          } else {
            dot.classList.remove('bg-white');
            dot.classList.add('bg-white/70');
          }
        }
      }
    };

    const goToSlide = slideNumber => {
      currentSlideRef.current = slideNumber;
      const targetSlide = document.getElementById(`slide${slideNumber}`);
      if (carousel && targetSlide) {
        carousel.scrollTo({
          left: targetSlide.offsetLeft,
          behavior: 'smooth',
        });
        updateDots(slideNumber);
      }
    };

    const nextSlide = () => {
      const next = currentSlideRef.current === totalSlides ? 1 : currentSlideRef.current + 1;
      goToSlide(next);
    };

    const startAutoSlide = () => {
      intervalRef.current = setInterval(nextSlide, 3000);
    };

    const stopAutoSlide = () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };

    const onScroll = () => {
      const scrollLeft = carousel.scrollLeft;
      const slideWidth = carousel.offsetWidth;
      const newSlide = Math.round(scrollLeft / slideWidth) + 1;
      if (newSlide !== currentSlideRef.current) {
        currentSlideRef.current = newSlide;
        updateDots(currentSlideRef.current);
      }
    };

    updateDots(1);
    startAutoSlide();

    carousel.addEventListener('scroll', onScroll);
    carousel.addEventListener('mouseenter', stopAutoSlide);
    carousel.addEventListener('mouseleave', startAutoSlide);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      carousel.removeEventListener('scroll', onScroll);
      carousel.removeEventListener('mouseenter', stopAutoSlide);
      carousel.removeEventListener('mouseleave', startAutoSlide);
    };
  }, []);
  return (
    <>
      <div ref={carouselRef} className="carousel w-full h-80 relative overflow-hidden z-0">
        <div id="slide1" className="carousel-item relative w-full">
          <div
            className="w-full h-full bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: 'url(https://www.koita.or.kr/common/front/kor/images/main/bg_visual01.png)',
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 to-blue-600/50 flex items-center justify-center">
              <div className="text-center text-white max-w-2xl px-6">
                <h2 className="text-4xl font-bold mb-4">기업인재개발기관 지정</h2>
                <p className="text-xl mb-6 leading-relaxed">체계적인 인재양성 프로그램으로 기업 경쟁력을 강화하세요</p>
                <button
                  className="btn bg-white text-blue-600 hover:bg-gray-100 font-semibold px-8 py-3"
                  onClick={() => navigateToPage('/login')}
                >
                  자세히 보기
                </button>
              </div>
            </div>
          </div>
          <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between pointer-events-none">
            <button
              className="btn btn-circle btn-sm bg-white/20 border-white/30 text-white hover:bg-white/30 pointer-events-auto"
              onClick={e => handleSlideNavigation(e, 4)}
            >
              ❮
            </button>
            <button
              className="btn btn-circle btn-sm bg-white/20 border-white/30 text-white hover:bg-white/30 pointer-events-auto"
              onClick={e => handleSlideNavigation(e, 2)}
            >
              ❯
            </button>
          </div>
        </div>
        <div id="slide2" className="carousel-item relative w-full">
          <div
            className="w-full h-full bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: 'url(https://www.koita.or.kr/common/front/kor/images/main/bg_visual01.png)',
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-green-900/70 to-green-600/50 flex items-center justify-center">
              <div className="text-center text-white max-w-2xl px-6">
                <h2 className="text-4xl font-bold mb-4">첨단산업아카데미</h2>
                <p className="text-xl mb-6 leading-relaxed">미래 기술 인재 양성을 위한 전문 교육기관 등록</p>
                <button className="btn bg-white text-green-600 hover:bg-gray-100 font-semibold px-8 py-3">
                  신청하기
                </button>
              </div>
            </div>
          </div>
          <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between pointer-events-none">
            <button
              className="btn btn-circle btn-sm bg-white/20 border-white/30 text-white hover:bg-white/30 pointer-events-auto"
              onClick={e => handleSlideNavigation(e, 1)}
            >
              ❮
            </button>
            <button
              className="btn btn-circle btn-sm bg-white/20 border-white/30 text-white hover:bg-white/30 pointer-events-auto"
              onClick={e => handleSlideNavigation(e, 3)}
            >
              ❯
            </button>
          </div>
        </div>
        <div id="slide3" className="carousel-item relative w-full">
          <div
            className="w-full h-full bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: 'url(https://www.koita.or.kr/common/front/kor/images/main/bg_visual01.png)',
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-900/70 to-purple-600/50 flex items-center justify-center">
              <div className="text-center text-white max-w-2xl px-6">
                <h2 className="text-4xl font-bold mb-4">인재혁신전문기업</h2>
                <p className="text-xl mb-6 leading-relaxed">혁신적인 인재개발 솔루션으로 기업 성장을 지원합니다</p>
                <button className="btn bg-white text-purple-600 hover:bg-gray-100 font-semibold px-8 py-3">
                  등록안내
                </button>
              </div>
            </div>
          </div>
          <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between pointer-events-none">
            <button
              className="btn btn-circle btn-sm bg-white/20 border-white/30 text-white hover:bg-white/30 pointer-events-auto"
              onClick={e => handleSlideNavigation(e, 2)}
            >
              ❮
            </button>
            <button
              className="btn btn-circle btn-sm bg-white/20 border-white/30 text-white hover:bg-white/30 pointer-events-auto"
              onClick={e => handleSlideNavigation(e, 4)}
            >
              ❯
            </button>
          </div>
        </div>
        <div id="slide4" className="carousel-item relative w-full">
          <div
            className="w-full h-full bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: 'url(https://www.koita.or.kr/common/front/kor/images/main/bg_visual01.png)',
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-orange-900/70 to-orange-600/50 flex items-center justify-center">
              <div className="text-center text-white max-w-2xl px-6">
                <h2 className="text-4xl font-bold mb-4">전문양성인 등록</h2>
                <p className="text-xl mb-6 leading-relaxed">전문 역량을 갖춘 인재양성 전문가가 되어보세요</p>
                <button
                  className="btn bg-white text-orange-600 hover:bg-gray-100 font-semibold px-8 py-3"
                  onClick={() => navigateToPage('/person-login')}
                >
                  등록절차
                </button>
              </div>
            </div>
          </div>
          <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between pointer-events-none">
            <button
              className="btn btn-circle btn-sm bg-white/20 border-white/30 text-white hover:bg-white/30 pointer-events-auto"
              onClick={e => handleSlideNavigation(e, 3)}
            >
              ❮
            </button>
            <button
              className="btn btn-circle btn-sm bg-white/20 border-white/30 text-white hover:bg-white/30 pointer-events-auto"
              onClick={e => handleSlideNavigation(e, 1)}
            >
              ❯
            </button>
          </div>
        </div>
      </div>

      {/* 인디케이터 도트들 - 캐러셀 밖에 배치하여 가시성 보장 */}
      <div className="relative -mt-12 flex justify-center space-x-3 z-50">
        <button
          className="w-4 h-4 rounded-full bg-white border-2 border-black/30 shadow-lg opacity-100 transition-all duration-300 hover:scale-110 relative z-[10000]"
          id="dot1"
          onClick={e => handleSlideNavigation(e, 1)}
        ></button>
        <button
          className="w-4 h-4 rounded-full bg-white/70 border-2 border-black/30 shadow-lg opacity-100 transition-all duration-300 hover:scale-110 relative z-[10000]"
          id="dot2"
          onClick={e => handleSlideNavigation(e, 2)}
        ></button>
        <button
          className="w-4 h-4 rounded-full bg-white/70 border-2 border-black/30 shadow-lg opacity-100 transition-all duration-300 hover:scale-110 relative z-[10000]"
          id="dot3"
          onClick={e => handleSlideNavigation(e, 3)}
        ></button>
        <button
          className="w-4 h-4 rounded-full bg-white/70 border-2 border-black/30 shadow-lg opacity-100 transition-all duration-300 hover:scale-110 relative z-[10000]"
          id="dot4"
          onClick={e => handleSlideNavigation(e, 4)}
        ></button>
      </div>
    </>
  );
}
