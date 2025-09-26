import { useCallback } from 'react';

// Person-register 전용 검증 커스텀 훅
export const usePersonValidation = () => {
  // 이메일 검증
  const validateEmail = useCallback(email => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }, []);

  // 전화번호 검증 (10-11자리 숫자)
  const validatePhone = useCallback(phone => {
    const phoneRegex = /^[0-9]{10,11}$/;
    return phoneRegex.test(phone.replace(/[^0-9]/g, ''));
  }, []);

  // 생년월일 검증 (YYYY-MM-DD 형식)
  const validateBirthDate = useCallback(birthDate => {
    if (!birthDate) return false;
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(birthDate)) return false;

    const date = new Date(birthDate);
    const currentDate = new Date();
    const minDate = new Date('1900-01-01');

    return date >= minDate && date <= currentDate;
  }, []);

  // 전문 분야 검증 (최소 1개 선택)
  const validateExpertiseField = useCallback(expertiseField => {
    return Array.isArray(expertiseField) && expertiseField.length > 0;
  }, []);

  // 기타 전문 분야 검증 (기타가 선택된 경우에만 필수)
  const validateExpertiseFieldOther = useCallback((expertiseField, otherField) => {
    if (expertiseField?.includes('other')) {
      return otherField && otherField.trim().length > 0;
    }
    return true; // 기타가 선택되지 않은 경우 항상 유효
  }, []);

  // 자격 상태 검증
  const validateQualificationStatus = useCallback(qualificationStatus => {
    const validOptions = ['engineer', 'master', 'none'];
    return validOptions.includes(qualificationStatus);
  }, []);

  // 활동계획서 필드 검증 (최소 길이)
  const validateActivityField = useCallback((field, minLength = 10) => {
    return field && field.trim().length >= minLength;
  }, []);

  // 파일 검증
  const validateFile = useCallback((file, options = {}) => {
    if (!file) return false;

    const { maxSizeMB = 10, allowedTypes = [] } = options;

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

  // 전체 폼 검증
  const validateForm = useCallback(
    (formData, validationRules) => {
      const errors = {};

      // 신청인 정보 검증
      if (validationRules.applicant) {
        Object.entries(validationRules.applicant).forEach(([field, rule]) => {
          if (rule.required) {
            if (field === 'expertiseField') {
              if (!validateExpertiseField(formData[field])) {
                errors[field] = rule.message;
              }
            } else if (field === 'expertiseFieldOther') {
              if (!validateExpertiseFieldOther(formData.expertiseField, formData[field])) {
                errors[field] = rule.message;
              }
            } else if (field === 'email') {
              if (!formData[field]?.trim()) {
                errors[field] = rule.message;
              } else if (!validateEmail(formData[field])) {
                errors[field] = '올바른 이메일 형식을 입력해주세요';
              }
            } else if (field === 'phone') {
              if (!formData[field]?.trim()) {
                errors[field] = rule.message;
              } else if (!validatePhone(formData[field])) {
                errors[field] = '올바른 전화번호 형식을 입력해주세요';
              }
            } else if (field === 'birthDate') {
              if (!formData[field]?.trim()) {
                errors[field] = rule.message;
              } else if (!validateBirthDate(formData[field])) {
                errors[field] = '올바른 생년월일을 입력해주세요';
              }
            } else if (field === 'qualificationStatus') {
              if (!formData[field]?.trim()) {
                errors[field] = rule.message;
              } else if (!validateQualificationStatus(formData[field])) {
                errors[field] = '올바른 자격 상태를 선택해주세요';
              }
            } else {
              if (!formData[field]?.trim()) {
                errors[field] = rule.message;
              }
            }
          }
        });
      }

      // 활동계획서 검증
      if (validationRules.activity) {
        Object.entries(validationRules.activity).forEach(([field, rule]) => {
          if (rule.required) {
            if (!validateActivityField(formData[field])) {
              errors[field] = rule.message;
            }
          }
        });
      }

      // 첨부파일 검증
      if (validationRules.file) {
        Object.entries(validationRules.file).forEach(([field, rule]) => {
          if (rule.required) {
            if (!formData[field]) {
              errors[field] = rule.message;
            } else if (!validateFile(formData[field])) {
              errors[field] = '올바른 파일을 업로드해주세요';
            }
          }
        });
      }

      return {
        isValid: Object.keys(errors).length === 0,
        errors,
      };
    },
    [
      validateExpertiseField,
      validateExpertiseFieldOther,
      validateEmail,
      validatePhone,
      validateBirthDate,
      validateQualificationStatus,
      validateActivityField,
      validateFile,
    ]
  );

  return {
    validateEmail,
    validatePhone,
    validateBirthDate,
    validateExpertiseField,
    validateExpertiseFieldOther,
    validateQualificationStatus,
    validateActivityField,
    validateFile,
    validateForm,
  };
};
