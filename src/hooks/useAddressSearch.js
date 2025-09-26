import { useCallback } from 'react';

// 주소 검색 커스텀 훅
export const useAddressSearch = (setFormData, addressFieldName = 'officeAddress') => {
  const handleAddressSearch = useCallback(() => {
    if (window.daum && window.daum.Postcode) {
      new window.daum.Postcode({
        oncomplete: function (data) {
          // 주소 정보 설정
          setFormData(prev => ({
            ...prev,
            [addressFieldName]: data.address,
            [`${addressFieldName}Detail`]: '', // 상세주소 초기화
          }));

          // 상세주소 입력 필드에 포커스
          setTimeout(() => {
            const detailInput = document.querySelector(`input[name="${addressFieldName}Detail"]`);
            if (detailInput) {
              detailInput.focus();
            }
          }, 100);
        },
      }).open();
    } else {
      alert('주소 검색 서비스를 불러올 수 없습니다. 페이지를 새로고침해주세요.');
    }
  }, [setFormData, addressFieldName]);

  return {
    handleAddressSearch,
  };
};
