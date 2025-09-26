import React, { useMemo } from 'react';

const CarouselIndicator = React.memo(({ totalSlides, currentSlide, onSlideNavigation }) => {
  const indicators = useMemo(() => {
    return Array.from({ length: totalSlides }, (_, index) => {
      const slideNumber = index + 1;
      const isActive = slideNumber === currentSlide;

      return {
        slideNumber,
        isActive,
        className: `w-4 h-4 rounded-full border-2 border-black/30 shadow-lg opacity-100 transition-all duration-300 hover:scale-110 relative z-[10000] ${
          isActive ? 'bg-white' : 'bg-white/70'
        }`,
      };
    });
  }, [totalSlides, currentSlide]);

  return (
    <div className="relative -mt-12 flex justify-center space-x-3 z-50">
      {indicators.map(({ slideNumber, className }) => (
        <button
          key={slideNumber}
          className={className}
          id={`dot${slideNumber}`}
          onClick={e => onSlideNavigation(e, slideNumber)}
        />
      ))}
    </div>
  );
});

CarouselIndicator.displayName = 'CarouselIndicator';

export default CarouselIndicator;
