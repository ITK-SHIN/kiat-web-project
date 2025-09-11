import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// 폼 섹션 데이터
const formSections = [
  {
    id: 'applicant',
    title: '신청인 정보',
    icon: '👤',
    description: '신청인 기본 정보를 입력해주세요',
  },
  {
    id: 'file',
    title: '파일 첨부',
    icon: '📁',
    description: '필요한 서류를 첨부해주세요',
  },
];

// Tailwind CSS 클래스 유틸리티 함수들
const cn = (...classes) => classes.filter(Boolean).join(' ');

// 스타일 변형 함수들 (Tailwind의 variant 패턴 활용)
const getStepStyles = (index, currentStep) => {
  const baseClasses = 'p-4 rounded-xl border-2 transition-all duration-300';

  if (index === currentStep) {
    return cn(baseClasses, 'border-purple-300 bg-purple-50');
  } else if (index < currentStep) {
    return cn(baseClasses, 'border-green-300 bg-green-50');
  } else {
    return cn(baseClasses, 'border-gray-200 bg-gray-50');
  }
};

const getStepTitleStyles = (index, currentStep) => {
  const baseClasses = 'font-medium';

  if (index === currentStep) {
    return cn(baseClasses, 'text-purple-700');
  } else if (index < currentStep) {
    return cn(baseClasses, 'text-green-700');
  } else {
    return cn(baseClasses, 'text-gray-600');
  }
};

const getInputStyles = (error, value) => {
  const baseClasses =
    'w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all';

  if (error) {
    return cn(baseClasses, 'border-red-300 bg-red-50');
  } else if (value && (typeof value === 'string' ? value.trim() !== '' : value !== null)) {
    return cn(baseClasses, 'border-gray-300 bg-gray-100');
  } else {
    return cn(baseClasses, 'border-gray-300');
  }
};

const getTextareaStyles = (error, value) => {
  const baseClasses =
    'w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all resize-none';

  if (error) {
    return cn(baseClasses, 'border-red-300 bg-red-50');
  } else if (value && (typeof value === 'string' ? value.trim() !== '' : value !== null)) {
    return cn(baseClasses, 'border-gray-300 bg-gray-100');
  } else {
    return cn(baseClasses, 'border-gray-300');
  }
};

// 입력 필드 컴포넌트
const FormField = ({
  label,
  name,
  type = 'text',
  value,
  onChange,
  error,
  placeholder,
  required = false,
  options = null,
  rows = null,
  defaultValue = null,
  formData = null,
  errors = null,
}) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    {type === 'textarea' ? (
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        rows={rows}
        className={getTextareaStyles(error, value)}
        placeholder={placeholder}
      />
    ) : type === 'select' ? (
      <select name={name} value={value} onChange={onChange} className={getInputStyles(error, value)}>
        <option value="">선택해주세요</option>
        {options?.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    ) : type === 'date' ? (
      <div className="relative">
        <input
          type="date"
          name={name}
          value={value}
          onChange={onChange}
          className={`${getInputStyles(error, value)} cursor-pointer pr-12`}
          placeholder={placeholder}
          style={{
            colorScheme: 'light',
            WebkitAppearance: 'none',
            MozAppearance: 'textfield',
          }}
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <svg className="w-7 h-7 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>
      </div>
    ) : type === 'checkbox' ? (
      <div
        className={`p-4 rounded-lg border transition-all ${
          error
            ? 'border-red-300 bg-red-50'
            : value && value.length > 0
              ? 'border-gray-300 bg-gray-100'
              : 'border-gray-200'
        }`}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {options?.map(option => (
            <label
              key={option.value}
              className="flex items-center space-x-3 cursor-pointer group p-3 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 bg-white"
            >
              <div className="relative">
                <input
                  type="checkbox"
                  name={name}
                  value={option.value}
                  checked={value?.includes(option.value) || false}
                  onChange={onChange}
                  className="sr-only"
                />
                <div
                  className={`w-5 h-5 border-2 rounded-md transition-all duration-200 flex items-center justify-center ${
                    value?.includes(option.value)
                      ? 'bg-blue-600 border-blue-600 shadow-md'
                      : 'bg-white border-gray-300 group-hover:border-blue-400 group-hover:bg-blue-50'
                  }`}
                >
                  {value?.includes(option.value) && (
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
              </div>
              <span
                className={`text-sm transition-colors duration-200 ${
                  value?.includes(option.value)
                    ? 'text-blue-700 font-medium'
                    : 'text-gray-700 group-hover:text-blue-600'
                }`}
              >
                {option.label}
              </span>
            </label>
          ))}
        </div>
        {/* 기타 입력 필드 */}
        {value?.includes('other') && (
          <div className="mt-4">
            <input
              type="text"
              name="expertiseFieldOther"
              value={formData?.expertiseFieldOther || ''}
              onChange={onChange}
              placeholder="기타 분야를 입력해주세요"
              className={getInputStyles(errors?.expertiseFieldOther, formData?.expertiseFieldOther)}
            />
            {errors?.expertiseFieldOther && <p className="mt-1 text-sm text-red-600">{errors.expertiseFieldOther}</p>}
          </div>
        )}
      </div>
    ) : (
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className={getInputStyles(error, value)}
        placeholder={placeholder}
        defaultValue={defaultValue}
        {...(type === 'number' && { min: '1970', max: '2024' })}
      />
    )}
    {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
  </div>
);

// 진행 단계 컴포넌트
const ProgressSteps = ({ currentStep, sections }) => {
  const progressPercentage = ((currentStep + 1) / sections.length) * 100;

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg mb-8">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900">진행 단계</h3>
        <span className="text-sm text-gray-600">
          {currentStep + 1} / {sections.length}
        </span>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
        <div
          className="bg-gradient-to-r from-purple-500 to-pink-600 h-2 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sections.map((section, index) => (
          <div key={section.id} className={getStepStyles(index, currentStep)}>
            <div className="flex items-center space-x-3 mb-2">
              <span className="text-2xl">{section.icon}</span>
              <h4 className={getStepTitleStyles(index, currentStep)}>{section.title}</h4>
            </div>
            <p className="text-sm text-gray-600">{section.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// 네비게이션 버튼 컴포넌트
const NavigationButtons = ({ currentStep, totalSteps, onPrev, onNext, onSubmit, onHome }) => (
  <div className="border-t pt-8 mt-8">
    <div className="flex justify-between">
      <button
        type="button"
        onClick={onHome}
        className="inline-flex items-center px-6 py-3 text-gray-600 font-medium hover:text-purple-600 transition-colors duration-200"
      >
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </svg>
        홈으로
      </button>

      <div className="flex space-x-3">
        {currentStep > 0 && (
          <button
            type="button"
            onClick={onPrev}
            className="inline-flex items-center px-6 py-3 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-all duration-200"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            이전
          </button>
        )}

        {currentStep < totalSteps - 1 ? (
          <button
            type="button"
            onClick={onNext}
            className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            다음
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        ) : (
          <button
            type="submit"
            onClick={onSubmit}
            className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            등록 신청하기
          </button>
        )}
      </div>
    </div>
  </div>
);

// 폼 검증 규칙
const validationRules = {
  applicant: {
    name: { required: true, message: '이름을 입력해주세요' },
    birthDate: { required: true, message: '생년월일을 입력해주세요' },
    phone: { required: true, message: '전화번호를 입력해주세요' },
    email: { required: true, message: '전자우편을 입력해주세요' },
    address: { required: true, message: '주소를 입력해주세요' },
    expertiseField: { required: true, message: '전문 분야를 하나 이상 선택해주세요' },
    expertiseFieldOther: { required: false, message: '기타 전문 분야를 입력해주세요' },
    qualificationStatus: { required: true, message: '국가기술자격 취득여부를 선택해주세요' },
  },
  file: {
    applicationForm: { required: true, message: '전문양성인 등록 신청서를 첨부해주세요' },
    activityPlan: { required: true, message: '전문양성인 활동계획서를 첨부해주세요' },
    careerCertificate: { required: true, message: '경력증명서를 첨부해주세요' },
    residentRegistration: { required: true, message: '주민등록등본을 첨부해주세요' },
    privacyConsent: { required: true, message: '개인정보 제공활용동의서를 첨부해주세요' },
    ethicsPledge: { required: true, message: '윤리청렴 및 보안서약서를 첨부해주세요' },
  },
};

// 옵션 데이터
const expertiseOptions = [
  { value: 'ai', label: '인공지능' },
  { value: 'semiconductor', label: '반도체' },
  { value: 'battery', label: '이차전지' },
  { value: 'display', label: '디스플레이' },
  { value: 'bio', label: '바이오' },
  { value: 'robot', label: '로봇' },
  { value: 'energy', label: '신재생에너지' },
  { value: 'other', label: '기타' },
];

const qualificationOptions = [
  { value: 'engineer', label: '기술사' },
  { value: 'master', label: '기능장' },
  { value: 'none', label: '해당없음' },
];

export default function PersonRegister() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    // 신청인 정보
    name: '',
    birthDate: '',
    phone: '',
    email: '',
    address: '',
    expertiseField: [],
    expertiseFieldOther: '',
    qualificationStatus: '', // 기술사, 기능장, 해당없음

    // 파일 첨부
    applicationForm: null,
    activityPlan: null,
    careerCertificate: null,
    residentRegistration: null,
    privacyConsent: null,
    ethicsPledge: null,
  });

  const [errors, setErrors] = useState({});
  const [isCareerGuideOpen, setIsCareerGuideOpen] = useState(false);

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

        // 전문 분야 다중 선택 처리
        if (name === 'expertiseField') {
          const fieldValue = e.target.value;
          const isChecked = e.target.checked;

          setFormData(prev => ({
            ...prev,
            expertiseField: isChecked
              ? [...prev.expertiseField, fieldValue]
              : prev.expertiseField.filter(field => field !== fieldValue),
            // 기타가 선택 해제되면 기타 입력 필드도 초기화
            expertiseFieldOther: fieldValue === 'other' && !isChecked ? '' : prev.expertiseFieldOther,
          }));
          return; // early return to avoid setting formattedValue
        }
        // 전화번호 숫자만 입력 가능하도록 처리
        else if (name === 'phone') {
          // 숫자만 추출
          const numbers = value.replace(/[^0-9]/g, '');
          formattedValue = numbers;
        }

        setFormData(prev => ({
          ...prev,
          [name]: formattedValue,
        }));
      }

      // Clear error when user starts typing
      if (errors[name]) {
        setErrors(prev => ({
          ...prev,
          [name]: '',
        }));
      }
    },
    [errors]
  );

  const validateStep = useCallback(
    step => {
      const newErrors = {};
      const stepKey = ['applicant', 'file'][step];
      const rules = validationRules[stepKey];

      Object.entries(rules).forEach(([field, rule]) => {
        if (rule.required) {
          // 파일 필드의 경우
          if (stepKey === 'file') {
            if (!formData[field]) {
              newErrors[field] = rule.message;
            }
          } else {
            // 전문 분야 배열 검증
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
      });

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    },
    [formData]
  );

  const handleNext = useCallback(() => {
    if (validateStep(currentStep)) {
      if (currentStep < formSections.length - 1) {
        setCurrentStep(currentStep + 1);
      }
    }
  }, [currentStep, validateStep]);

  const handlePrev = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  }, [currentStep]);

  const handleSubmit = useCallback(
    e => {
      e.preventDefault();
      if (validateStep(currentStep)) {
        alert('전문양성인 등록 신청이 완료되었습니다! (데모)');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        navigate('/');
      }
    },
    [currentStep, validateStep, navigate]
  );

  const handleHome = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    navigate('/person-steps');
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 py-8">
      <div className="container-max max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center px-4 py-2 bg-purple-100 text-purple-800 rounded-full text-sm font-medium mb-4">
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
            전문양성인 등록 신청
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">전문양성인 등록</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            첨단산업 분야 전문양성인으로 등록하여 인재 양성에 참여하세요. 단계별로 정보를 입력해주시면 심사 후 등록
            여부를 안내드립니다.
          </p>
        </div>

        {/* Progress Steps */}
        <ProgressSteps currentStep={currentStep} sections={formSections} />

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-6">
            <div className="flex items-center space-x-3">
              <span className="text-3xl">{formSections[currentStep].icon}</span>
              <div>
                <h3 className="text-white text-xl font-bold">{formSections[currentStep].title}</h3>
                <p className="text-purple-100">{formSections[currentStep].description}</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-8">
            {/* Step 0: 신청인 정보 */}
            {currentStep === 0 && (
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <FormField
                    label="이름"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    error={errors.name}
                    placeholder="홍길동"
                    required
                  />
                  <FormField
                    label="생년월일"
                    name="birthDate"
                    type="date"
                    value={formData.birthDate}
                    onChange={handleInputChange}
                    error={errors.birthDate}
                    required
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <FormField
                    label="전화번호"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    error={errors.phone}
                    placeholder="숫자만 입력 (예: 01012345678)"
                    required
                  />
                  <FormField
                    label="전자우편"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    error={errors.email}
                    placeholder="example@email.com"
                    required
                  />
                </div>

                <FormField
                  label="주소"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  error={errors.address}
                  placeholder="서울시 강남구 테헤란로 123"
                  required
                />

                <FormField
                  label="전문 분야"
                  name="expertiseField"
                  type="checkbox"
                  value={formData.expertiseField}
                  onChange={handleInputChange}
                  error={errors.expertiseField}
                  options={expertiseOptions}
                  formData={formData}
                  errors={errors}
                  required
                />

                <FormField
                  label="국가기술자격 취득여부"
                  name="qualificationStatus"
                  type="select"
                  value={formData.qualificationStatus}
                  onChange={handleInputChange}
                  error={errors.qualificationStatus}
                  options={qualificationOptions}
                  required
                />
              </div>
            )}
            {/* 경력증명서 포함내용 */}
            {currentStep === 1 && (
              <div className="space-y-6">
                {/* 파일첨부안내 */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                  <div className="flex items-start space-x-3">
                    <svg className="w-5 h-5 text-blue-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <div>
                      <h4 className="text-sm font-medium text-blue-800 mb-1">파일 첨부 안내</h4>
                      <p className="text-sm text-blue-700">
                        전문양성인 등록을 위해 필요한 서류를 첨부해주세요. 파일은 PDF, DOC, DOCX, JPG, PNG 형식을
                        지원합니다. (최대 10MB)
                      </p>
                    </div>
                  </div>
                </div>
                {/* 경력증명서 포함 내용 안내 (토글 가능) */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                  <button
                    type="button"
                    onClick={() => setIsCareerGuideOpen(!isCareerGuideOpen)}
                    className="w-full flex items-center justify-between text-left"
                  >
                    <div>
                      <p className="text-sm text-blue-800 font-medium">* 경력증명서 포함 내용</p>
                      <p className="text-xs text-blue-600 mt-1">클릭하여 상세 내용 확인</p>
                    </div>
                    <svg
                      className={`w-5 h-5 text-blue-600 transition-transform duration-200 ${
                        isCareerGuideOpen ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {isCareerGuideOpen && (
                    <div className="mt-4 pt-4 border-t border-blue-200">
                      <div className="text-sm text-blue-700 space-y-2 text-left">
                        <p>• 첨단산업 관련 기술 보유 또는 종사 경력을 증빙할 수 있는 기술사 자격증명서</p>
                        <p>• 기능장 자격증명서</p>
                        <p>• 재직증명서</p>
                        <p>• 기타 자격증 등</p>
                      </div>
                    </div>
                  )}
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <FormField
                    label="전문양성인 등록 신청서"
                    name="applicationForm"
                    type="file"
                    onChange={handleInputChange}
                    error={errors.applicationForm}
                    accept=".pdf,.doc,.docx"
                    required
                  />

                  <FormField
                    label="전문양성인 활동계획서"
                    name="activityPlan"
                    type="file"
                    onChange={handleInputChange}
                    error={errors.activityPlan}
                    accept=".pdf,.doc,.docx"
                    required
                  />

                  <FormField
                    label="경력증명서"
                    name="careerCertificate"
                    type="file"
                    onChange={handleInputChange}
                    error={errors.careerCertificate}
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                    required
                  />

                  <FormField
                    label="주민등록등본"
                    name="residentRegistration"
                    type="file"
                    onChange={handleInputChange}
                    error={errors.residentRegistration}
                    accept=".pdf,.jpg,.jpeg,.png"
                    required
                  />

                  <FormField
                    label="개인정보 제공활용동의서"
                    name="privacyConsent"
                    type="file"
                    onChange={handleInputChange}
                    error={errors.privacyConsent}
                    accept=".pdf,.doc,.docx"
                    required
                  />

                  <FormField
                    label="윤리청렴 및 보안서약서"
                    name="ethicsPledge"
                    type="file"
                    onChange={handleInputChange}
                    error={errors.ethicsPledge}
                    accept=".pdf,.doc,.docx"
                    required
                  />
                </div>

                {/* 첨부된 파일 목록 표시 */}
                <div className="mt-6">
                  <h4 className="text-sm font-medium text-gray-700 mb-3">첨부된 파일</h4>
                  <div className="space-y-2">
                    {Object.entries(formData).map(([key, file]) => {
                      if (
                        key.startsWith('applicationForm') ||
                        key.startsWith('activityPlan') ||
                        key.startsWith('careerCertificate') ||
                        key.startsWith('residentRegistration') ||
                        key.startsWith('privacyConsent') ||
                        key.startsWith('ethicsPledge')
                      ) {
                        if (file) {
                          const fieldLabels = {
                            applicationForm: '전문양성인 등록 신청서',
                            activityPlan: '전문양성인 활동계획서',
                            careerCertificate: '경력증명서',
                            residentRegistration: '주민등록등본',
                            privacyConsent: '개인정보 제공활용동의서',
                            ethicsPledge: '윤리청렴 및 보안서약서',
                          };

                          return (
                            <div
                              key={key}
                              className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded-lg"
                            >
                              <div className="flex items-center space-x-2">
                                <svg
                                  className="w-4 h-4 text-gray-500"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                  />
                                </svg>
                                <span className="text-sm text-gray-700">
                                  {fieldLabels[key]}: {file.name}
                                </span>
                              </div>
                              <span className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</span>
                            </div>
                          );
                        }
                      }
                      return null;
                    })}
                    {Object.values(formData).filter(file => file && typeof file === 'object' && file.name).length ===
                      0 && <p className="text-sm text-gray-500 italic">첨부된 파일이 없습니다.</p>}
                  </div>
                </div>
              </div>
            )}

            {/* 법적 근거 안내 */}
            {currentStep === formSections.length - 1 && (
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6 mt-6">
                <div className="flex items-start space-x-3">
                  <svg
                    className="w-5 h-5 text-gray-600 mt-0.5 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  <div>
                    <h4 className="text-sm font-medium text-gray-800 mb-2">법적 근거</h4>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      첨단산업 인재혁신 특별법 제10조제1항, 같은 법 시행령 제21조제3항 및 같은 법 시행규칙 제5조제1항에
                      따라
                      <br /> 전문양성인 등록을 신청합니다.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <NavigationButtons
              currentStep={currentStep}
              totalSteps={formSections.length}
              onPrev={handlePrev}
              onNext={handleNext}
              onSubmit={handleSubmit}
              onHome={handleHome}
            />
          </form>
        </div>

        {/* Help Section */}
        <div className="mt-8 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-200">
          <div className="text-center">
            <h4 className="text-lg font-bold text-gray-900 mb-2">전문양성인 등록 문의</h4>
            <p className="text-gray-600 mb-4">전문양성인 등록 과정에서 궁금한 사항이 있으시면 언제든지 연락주세요.</p>
            <div className="flex justify-center items-center space-x-6">
              <div className="flex items-center space-x-2 text-purple-700">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <span className="font-medium text-sm">1379 → 4번</span>
              </div>
              <div className="text-gray-400">|</div>
              <div className="flex items-center space-x-2 text-purple-700">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <span className="font-medium text-sm">전문양성인 문의</span>
              </div>
            </div>
          </div>
        </div>

        {/* Required Fields Notice */}
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-500">
            <span className="text-red-500">*</span> 표시된 항목은 필수 입력 사항입니다
          </p>
        </div>
      </div>
    </div>
  );
}
