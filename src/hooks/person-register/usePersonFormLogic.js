import { useCallback, useMemo, useState } from 'react';

// Person-register 전용 폼 로직 커스텀 훅
export const usePersonFormLogic = (initialFormData, validationRules) => {
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [currentStep, setCurrentStep] = useState(0);

  // 입력 변경 핸들러
  const handleInputChange = useCallback(
    e => {
      const { name, value, files } = e.target;

      if (e.target.type === 'file') {
        setFormData(prev => ({
          ...prev,
          [name]: files[0] || null,
        }));
      } else {
        // 체크박스 필드 처리
        if (e.target.type === 'checkbox') {
          console.log('Person-register 체크박스 이벤트:', { name, value: e.target.value, checked: e.target.checked });
          const checkboxValue = e.target.value;

          setFormData(prev => {
            const currentValues = prev[name] || []; // prev 상태에서 currentValues 가져오기
            let newValues;

            if (e.target.checked) {
              // 이미 선택된 값이 아닌 경우에만 추가
              if (!currentValues.includes(checkboxValue)) {
                newValues = [...currentValues, checkboxValue];
              } else {
                newValues = currentValues; // 이미 있으면 그대로 유지
              }
            } else {
              newValues = currentValues.filter(v => v !== checkboxValue);
            }

            console.log('Person-register 체크박스 새 값 (setFormData 내부):', newValues); // 디버깅 로그 추가

            return {
              ...prev,
              [name]: newValues,
            };
          });

          // 에러 메시지 제거
          if (errors[name]) {
            setErrors(prev => ({
              ...prev,
              [name]: '',
            }));
          }
          return; // 체크박스 처리가 완료되면 함수 종료
        }

        let formattedValue = value;

        // 전화번호 자동 포맷팅 (숫자만 입력)
        if (name === 'phone') {
          const numbers = value.replace(/[^0-9]/g, '');
          formattedValue = numbers.slice(0, 11);
        }

        // 생년월일 자동 포맷팅 (YYYY-MM-DD)
        if (name === 'birthDate') {
          const numbers = value.replace(/[^0-9]/g, '');
          if (numbers.length >= 8) {
            formattedValue = `${numbers.slice(0, 4)}-${numbers.slice(4, 6)}-${numbers.slice(6, 8)}`;
          } else if (numbers.length >= 6) {
            formattedValue = `${numbers.slice(0, 4)}-${numbers.slice(4, 6)}`;
          } else if (numbers.length >= 4) {
            formattedValue = numbers.slice(0, 4);
          } else {
            formattedValue = numbers;
          }
        }

        setFormData(prev => ({
          ...prev,
          [name]: formattedValue,
        }));

        // 에러 메시지 제거
        if (errors[name]) {
          setErrors(prev => ({
            ...prev,
            [name]: '',
          }));
        }
      }
    },
    [errors]
  );

  // 단계별 검증
  const validateStep = useCallback(
    step => {
      const newErrors = {};
      const stepKey = ['applicant', 'activity', 'file'][step];
      const rules = validationRules[stepKey];

      Object.entries(rules).forEach(([field, rule]) => {
        if (rule.required) {
          if (stepKey === 'file') {
            // 파일 필드 검증
            if (!formData[field]) {
              newErrors[field] = rule.message;
            }
          } else if (stepKey === 'activity') {
            // 활동계획서 필드 검증
            if (!formData[field]?.trim()) {
              newErrors[field] = rule.message;
            }
          } else {
            // 신청인 정보 필드 검증
            if (field === 'expertiseField') {
              if (!formData[field] || formData[field].length === 0) {
                newErrors[field] = rule.message;
              }
            } else if (field === 'expertiseFieldOther') {
              // 기타가 선택되었는데 기타 입력 필드가 비어있으면 에러
              if (formData.expertiseField?.includes('other') && !formData[field]?.trim()) {
                newErrors[field] = rule.message;
              }
            } else {
              // 일반 텍스트 필드의 경우
              if (!formData[field]?.trim()) {
                newErrors[field] = rule.message;
              }
            }
          }
        }

        // 패턴 검증 (전화번호, 이메일)
        if (rule.pattern && formData[field]?.trim()) {
          if (!rule.pattern.test(formData[field].trim())) {
            newErrors[field] = rule.patternMessage;
          }
        }
      });

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    },
    [formData, validationRules]
  );

  // 다음 단계로 이동
  const handleNext = useCallback(() => {
    console.log('Person-register handleNext 호출됨, currentStep:', currentStep);
    const isValid = validateStep(currentStep);
    console.log('Person-register 검증 결과:', isValid);
    if (isValid) {
      setCurrentStep(prev => {
        console.log('Person-register 단계 변경:', prev, '->', prev + 1);
        return prev + 1;
      });
    } else {
      console.log('Person-register 검증 실패로 단계 이동 안됨');
    }
  }, [currentStep, validateStep]);

  // 이전 단계로 이동
  const handlePrev = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  }, [currentStep]);

  // 폼 제출
  const handleSubmit = useCallback(
    e => {
      e.preventDefault();
      if (validateStep(currentStep)) {
        return true; // 성공적으로 제출됨
      }
      return false;
    },
    [currentStep, validateStep]
  );

  // 메모이제이션된 값들
  const memoizedFormData = useMemo(() => formData, [formData]);
  const memoizedErrors = useMemo(() => errors, [errors]);
  const memoizedCurrentStep = useMemo(() => currentStep, [currentStep]);

  return {
    formData: memoizedFormData,
    setFormData,
    errors: memoizedErrors,
    setErrors,
    currentStep: memoizedCurrentStep,
    setCurrentStep,
    handleInputChange,
    validateStep,
    handleNext,
    handlePrev,
    handleSubmit,
  };
};
