import { useCallback, useMemo, useRef } from 'react';

/**
 * 자동 슬라이드 기능을 제공하는 커스텀 훅
 * @param {Function} nextSlide - 다음 슬라이드로 이동하는 함수
 * @param {number} interval - 자동 슬라이드 간격 (밀리초)
 * @returns {Object} startAutoSlide, stopAutoSlide 함수
 */
export const useAutoSlide = (nextSlide, interval = 3000) => {
  const intervalRef = useRef(null);

  const startAutoSlide = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = setInterval(nextSlide, interval);
  }, [nextSlide, interval]);

  const stopAutoSlide = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const clearAutoSlide = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  // 반환 객체를 useMemo로 메모이제이션
  return useMemo(
    () => ({
      startAutoSlide,
      stopAutoSlide,
      clearAutoSlide,
    }),
    [startAutoSlide, stopAutoSlide, clearAutoSlide]
  );
};
