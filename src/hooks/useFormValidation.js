import { useCallback } from 'react';

// 폼 검증 커스텀 훅
const useFormValidation = () => {
  // 이메일 검증
  const validateEmail = useCallback(email => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }, []);

  // 전화번호 검증
  const validatePhone = useCallback(phone => {
    const phoneRegex = /^[0-9]{10,11}$/;
    return phoneRegex.test(phone.replace(/[^0-9]/g, ''));
  }, []);

  // 사업자등록번호 검증
  const validateBusinessNumber = useCallback(businessNumber => {
    const numbers = businessNumber.replace(/[^0-9]/g, '');
    return numbers.length === 10;
  }, []);

  // 생년월일 검증
  const validateBirthDate = useCallback(birthDate => {
    const numbers = birthDate.replace(/[^0-9]/g, '');
    if (numbers.length !== 8) return false;

    const year = parseInt(numbers.substring(0, 4));
    const month = parseInt(numbers.substring(4, 6));
    const day = parseInt(numbers.substring(6, 8));

    const currentYear = new Date().getFullYear();
    return year >= 1900 && year <= currentYear && month >= 1 && month <= 12 && day >= 1 && day <= 31;
  }, []);

  // 필수 필드 검증
  const validateRequired = useCallback(value => {
    return value && value.toString().trim().length > 0;
  }, []);

  // 최소 길이 검증
  const validateMinLength = useCallback((value, minLength) => {
    return value && value.toString().trim().length >= minLength;
  }, []);

  // 최대 길이 검증
  const validateMaxLength = useCallback((value, maxLength) => {
    return !value || value.toString().trim().length <= maxLength;
  }, []);

  // 숫자 검증
  const validateNumber = useCallback(value => {
    return !isNaN(parseFloat(value)) && isFinite(value);
  }, []);

  // 양수 검증
  const validatePositiveNumber = useCallback(value => {
    const num = parseFloat(value);
    return !isNaN(num) && num > 0;
  }, []);

  // 날짜 검증
  const validateDate = useCallback(date => {
    if (!date) return false;
    const dateObj = new Date(date);
    return dateObj instanceof Date && !isNaN(dateObj);
  }, []);

  // 미래 날짜 검증
  const validateFutureDate = useCallback(date => {
    if (!date) return false;
    const dateObj = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return dateObj >= today;
  }, []);

  // 과거 날짜 검증
  const validatePastDate = useCallback(date => {
    if (!date) return false;
    const dateObj = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return dateObj <= today;
  }, []);

  // 배열 검증
  const validateArray = useCallback((array, minLength = 0) => {
    return Array.isArray(array) && array.length >= minLength;
  }, []);

  // 파일 검증
  const validateFile = useCallback((file, options = {}) => {
    if (!file) return false;

    const { maxSizeMB = 100, allowedTypes = [] } = options;

    // 크기 검증
    const maxSizeBytes = maxSizeMB * 1024 * 1024;
    if (file.size > maxSizeBytes) return false;

    // 형식 검증
    if (allowedTypes.length > 0) {
      const fileExtension = file.name.split('.').pop().toLowerCase();
      const allowedExtensions = allowedTypes.map(type => type.replace('.', ''));
      return allowedExtensions.includes(fileExtension);
    }

    return true;
  }, []);

  return {
    validateEmail,
    validatePhone,
    validateBusinessNumber,
    validateBirthDate,
    validateRequired,
    validateMinLength,
    validateMaxLength,
    validateNumber,
    validatePositiveNumber,
    validateDate,
    validateFutureDate,
    validatePastDate,
    validateArray,
    validateFile,
  };
};

export default useFormValidation;
