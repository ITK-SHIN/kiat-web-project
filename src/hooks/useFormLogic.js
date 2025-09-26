import { useCallback, useState } from 'react';

// 폼 처리 커스텀 훅
export const useFormLogic = (initialFormData, validationRules) => {
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
        let formattedValue = value;

        // 사업자등록번호 자동 포맷팅
        if (name === 'businessNumber') {
          // 숫자만 추출
          const numbers = value.replace(/[^0-9]/g, '');

          // 10자리 숫자로 제한
          const limitedNumbers = numbers.slice(0, 10);

          // 하이픈 자동 추가 (000-00-00000 형식)
          if (limitedNumbers.length >= 3) {
            if (limitedNumbers.length >= 5) {
              formattedValue = `${limitedNumbers.slice(0, 3)}-${limitedNumbers.slice(3, 5)}-${limitedNumbers.slice(5)}`;
            } else {
              formattedValue = `${limitedNumbers.slice(0, 3)}-${limitedNumbers.slice(3)}`;
            }
          } else {
            formattedValue = limitedNumbers;
          }
        }

        // 전화번호 자동 포맷팅
        if (name === 'phone') {
          // 숫자만 추출
          const numbers = value.replace(/[^0-9]/g, '');

          // 11자리 숫자로 제한
          formattedValue = numbers.slice(0, 11);
        }

        // 팩스 번호 자동 포맷팅
        if (name === 'fax') {
          // 숫자만 추출
          const numbers = value.replace(/[^0-9]/g, '');

          // 10자리 숫자로 제한 (02-1234-5679 형식)
          const limitedNumbers = numbers.slice(0, 10);

          // 하이픈 자동 추가 (02-1234-5679 형식)
          if (limitedNumbers.length >= 2) {
            if (limitedNumbers.length >= 6) {
              formattedValue = `${limitedNumbers.slice(0, 2)}-${limitedNumbers.slice(2, 6)}-${limitedNumbers.slice(6)}`;
            } else {
              formattedValue = `${limitedNumbers.slice(0, 2)}-${limitedNumbers.slice(2)}`;
            }
          } else {
            formattedValue = limitedNumbers;
          }
        }

        // 기업명 자동 포맷팅 (주) 접두사 추가
        if (name === 'companyName') {
          // 입력된 값에 (주) 접두사가 없으면 자동으로 추가
          if (!value.startsWith('(주)')) {
            formattedValue = `(주)${value}`;
          } else {
            formattedValue = value;
          }
        }

        // 체크박스 필드 처리
        if (e.target.type === 'checkbox') {
          console.log('체크박스 이벤트:', { name, value: e.target.value, checked: e.target.checked });
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

            console.log('체크박스 새 값 (setFormData 내부):', newValues); // 디버깅 로그 추가

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
          // 파일 필드의 경우
          if (stepKey === 'file') {
            if (!formData[field]) {
              newErrors[field] = rule.message;
            }
          } else if (stepKey === 'activity') {
            // activity 단계의 특별한 검증
            if (field === 'programContent') {
              if (!formData[field]?.trim()) {
                newErrors[field] = rule.message;
              }
            } else if (field === 'personnel') {
              // 인력 정보 검증
              if (!formData.personnel || formData.personnel.length === 0) {
                newErrors[field] = '최소 1명의 인력 정보를 입력해주세요';
              } else {
                // 각 인력의 필수 정보 검증
                const hasIncompletePersonnel = formData.personnel.some(
                  person => !person.type || !person.position?.trim() || !person.name?.trim()
                );
                if (hasIncompletePersonnel) {
                  newErrors[field] = '모든 인력의 구분, 직위, 이름을 입력해주세요';
                }
              }
            } else if (field === 'equipment') {
              // 장비 정보 검증
              if (!formData.equipment || formData.equipment.length === 0) {
                newErrors[field] = '최소 1개의 장비 정보를 입력해주세요';
              } else {
                // 각 장비의 필수 정보 검증 (장비명과 용도)
                const hasIncompleteEquipment = formData.equipment.some(
                  equipment => !equipment.name?.trim() || !equipment.purpose?.trim()
                );
                if (hasIncompleteEquipment) {
                  newErrors[field] = '모든 장비의 장비명, 용도를 입력해주세요';
                }
              }
            } else if (field === 'organizationChart') {
              // 기업의 조직도 첨부파일 검증
              if (!formData.activityFiles?.organizationChart) {
                newErrors.activityFiles = {
                  ...newErrors.activityFiles,
                  organizationChart: rule.message,
                };
              }
            } else if (field === 'trainingOrganization') {
              // 기업부설 교육훈련기관 조직 첨부파일 검증
              if (!formData.activityFiles?.trainingOrganization) {
                newErrors.activityFiles = {
                  ...newErrors.activityFiles,
                  trainingOrganization: rule.message,
                };
              }
            } else if (field === 'trainingFloorPlan') {
              // 교육훈련부서 전체 도면 및 내부 도면 첨부파일 검증
              if (!formData.activityFiles?.trainingFloorPlan) {
                newErrors.activityFiles = {
                  ...newErrors.activityFiles,
                  trainingFloorPlan: rule.message,
                };
              }
            }
          } else {
            // applicant 단계의 검증
            if (field === 'industryField' || field === 'expertiseField') {
              if (!formData[field] || formData[field].length === 0) {
                newErrors[field] = rule.message;
              }
            } else if (field === 'industryFieldOther' || field === 'expertiseFieldOther') {
              // 기타가 선택되었는데 기타 입력 필드가 비어있으면 에러
              const fieldName = field === 'industryFieldOther' ? 'industryField' : 'expertiseField';
              if (formData[fieldName]?.includes('other') && !formData[field]?.trim()) {
                newErrors[field] = rule.message;
              }
            } else if (field === 'companyName') {
              // 기업명의 경우 빈 값이거나 (주)만 있는 경우를 에러로 처리
              const companyName = formData[field]?.trim();
              if (!companyName || companyName === '(주)' || companyName === '') {
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

        // 패턴 검증 (전화번호, 팩스, 이메일, 사업자등록번호)
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
    console.log('handleNext 호출됨, currentStep:', currentStep);
    const isValid = validateStep(currentStep);
    console.log('검증 결과:', isValid);
    if (isValid) {
      setCurrentStep(prev => {
        console.log('단계 변경:', prev, '->', prev + 1);
        return prev + 1;
      });
    } else {
      console.log('검증 실패로 단계 이동 안됨');
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

  // 인력 정보 저장
  const handlePersonnelSave = useCallback(personnelData => {
    const newPersonnel = {
      id: Date.now(),
      ...personnelData,
    };
    setFormData(prev => ({
      ...prev,
      personnel: [...prev.personnel, newPersonnel],
    }));
  }, []);

  // 장비 정보 저장
  const handleEquipmentSave = useCallback(equipmentData => {
    setFormData(prev => {
      const newEquipment = {
        id: Date.now(),
        order: prev.equipment.length + 1,
        ...equipmentData,
      };
      return {
        ...prev,
        equipment: [...prev.equipment, newEquipment],
      };
    });
  }, []);

  return {
    formData,
    setFormData,
    errors,
    setErrors,
    currentStep,
    setCurrentStep,
    handleInputChange,
    validateStep,
    handleNext,
    handlePrev,
    handleSubmit,
    handlePersonnelSave,
    handleEquipmentSave,
  };
};
