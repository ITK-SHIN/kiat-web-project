import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// 폼 섹션 데이터
const formSections = [
  {
    id: 'basic',
    title: '기본 정보',
    icon: '🏢',
    description: '기업의 기본 정보를 입력해주세요',
  },
  {
    id: 'contact',
    title: '담당자 정보',
    icon: '👤',
    description: '담당자 연락처 정보를 입력해주세요',
  },
  {
    id: 'facility',
    title: '교육시설 정보',
    icon: '🏫',
    description: '교육시설 현황을 입력해주세요',
  },
];

// Tailwind CSS 클래스 유틸리티 함수들
const cn = (...classes) => classes.filter(Boolean).join(' ');

// 스타일 변형 함수들 (Tailwind의 variant 패턴 활용)
const getStepStyles = (index, currentStep) => {
  const baseClasses = 'p-4 rounded-xl border-2 transition-all duration-300';

  if (index === currentStep) {
    return cn(baseClasses, 'border-blue-300 bg-blue-50');
  } else if (index < currentStep) {
    return cn(baseClasses, 'border-green-300 bg-green-50');
  } else {
    return cn(baseClasses, 'border-gray-200 bg-gray-50');
  }
};

const getStepTitleStyles = (index, currentStep) => {
  const baseClasses = 'font-medium';

  if (index === currentStep) {
    return cn(baseClasses, 'text-blue-700');
  } else if (index < currentStep) {
    return cn(baseClasses, 'text-green-700');
  } else {
    return cn(baseClasses, 'text-gray-600');
  }
};

const getInputStyles = error => {
  const baseClasses =
    'w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all';
  return error ? cn(baseClasses, 'border-red-300 bg-red-50') : cn(baseClasses, 'border-gray-300');
};

const getTextareaStyles = error => {
  const baseClasses =
    'w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all resize-none';
  return error ? cn(baseClasses, 'border-red-300 bg-red-50') : cn(baseClasses, 'border-gray-300');
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
        className={getTextareaStyles(error)}
        placeholder={placeholder}
      />
    ) : type === 'select' ? (
      <select name={name} value={value} onChange={onChange} className={getInputStyles(error)}>
        <option value="">선택해주세요</option>
        {options?.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    ) : (
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className={getInputStyles(error)}
        placeholder={placeholder}
        {...(type === 'number' && { min: '1900', max: '2024' })}
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
          className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
        className="inline-flex items-center px-6 py-3 text-gray-600 font-medium hover:text-blue-600 transition-colors duration-200"
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
            className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
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
  basic: {
    companyName: { required: true, message: '기업명을 입력해주세요' },
    businessNumber: { required: true, message: '사업자등록번호를 입력해주세요' },
    address: { required: true, message: '주소를 입력해주세요' },
    establishedYear: { required: true, message: '설립년도를 입력해주세요' },
    employeeCount: { required: true, message: '직원 수를 선택해주세요' },
  },
  contact: {
    contactName: { required: true, message: '담당자 이름을 입력해주세요' },
    contactPhone: { required: true, message: '연락처를 입력해주세요' },
    contactEmail: { required: true, message: '이메일을 입력해주세요' },
    department: { required: true, message: '부서/직책을 입력해주세요' },
  },
  facility: {
    facilityOverview: { required: true, message: '교육시설 개요를 입력해주세요' },
    facilitySize: { required: true, message: '시설 규모를 입력해주세요' },
    facilityLocation: { required: true, message: '시설 위치를 입력해주세요' },
    equipment: { required: true, message: '주요 장비 및 시설을 입력해주세요' },
  },
};

// 직원 수 옵션
const employeeOptions = [
  { value: '1 -200', label: '200명 이하' },
  { value: '200-500', label: '200-500명' },
  { value: '500-1000', label: '500-1,000명' },
  { value: '1000+', label: '1,000명 이상' },
];

export default function Register() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    companyName: '',
    businessNumber: '',
    address: '',
    establishedYear: '',
    employeeCount: '',
    contactName: '',
    contactPhone: '',
    contactEmail: '',
    department: '',
    facilityOverview: '',
    facilitySize: '',
    facilityLocation: '',
    equipment: '',
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = useCallback(
    e => {
      const { name, value } = e.target;
      setFormData(prev => ({
        ...prev,
        [name]: value,
      }));

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
      const stepKey = ['basic', 'contact', 'facility'][step];
      const rules = validationRules[stepKey];

      Object.entries(rules).forEach(([field, rule]) => {
        if (rule.required && !formData[field]?.trim()) {
          newErrors[field] = rule.message;
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
        alert('등록 신청이 완료되었습니다! (데모)');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        navigate('/');
      }
    },
    [currentStep, validateStep, navigate]
  );

  const handleHome = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    navigate('/steps');
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="container-max max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-4">
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 2L3 7v11a1 1 0 001 1h3v-6h6v6h3a1 1 0 001-1V7l-7-5z" clipRule="evenodd" />
            </svg>
            기관 등록 신청
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">기업인재개발기관 등록</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            사내대학원 설립을 위한 기관 정보를 단계별로 입력해주세요. 모든 정보는 안전하게 보호됩니다.
          </p>
        </div>

        {/* Progress Steps */}
        <ProgressSteps currentStep={currentStep} sections={formSections} />

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6">
            <div className="flex items-center space-x-3">
              <span className="text-3xl">{formSections[currentStep].icon}</span>
              <div>
                <h3 className="text-white text-xl font-bold">{formSections[currentStep].title}</h3>
                <p className="text-blue-100">{formSections[currentStep].description}</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-8">
            {/* Step 0: Basic Info */}
            {currentStep === 0 && (
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <FormField
                    label="기업명"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    error={errors.companyName}
                    placeholder="기업명을 입력해주세요"
                    required
                  />
                  <FormField
                    label="사업자등록번호"
                    name="businessNumber"
                    value={formData.businessNumber}
                    onChange={handleInputChange}
                    error={errors.businessNumber}
                    placeholder="000-00-00000"
                    required
                  />
                </div>

                <FormField
                  label="주소"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  error={errors.address}
                  placeholder="기업 주소를 입력해주세요"
                  required
                />

                <div className="grid md:grid-cols-2 gap-6">
                  <FormField
                    label="설립년도"
                    name="establishedYear"
                    type="number"
                    value={formData.establishedYear}
                    onChange={handleInputChange}
                    error={errors.establishedYear}
                    placeholder="2020"
                    required
                  />
                  <FormField
                    label="직원 수"
                    name="employeeCount"
                    type="select"
                    value={formData.employeeCount}
                    onChange={handleInputChange}
                    error={errors.employeeCount}
                    options={employeeOptions}
                    required
                  />
                </div>
              </div>
            )}

            {/* Step 1: Contact Info */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <FormField
                    label="담당자 이름"
                    name="contactName"
                    value={formData.contactName}
                    onChange={handleInputChange}
                    error={errors.contactName}
                    placeholder="담당자 성명을 입력해주세요"
                    required
                  />
                  <FormField
                    label="부서/직책"
                    name="department"
                    value={formData.department}
                    onChange={handleInputChange}
                    error={errors.department}
                    placeholder="인사팀 과장"
                    required
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <FormField
                    label="연락처"
                    name="contactPhone"
                    type="tel"
                    value={formData.contactPhone}
                    onChange={handleInputChange}
                    error={errors.contactPhone}
                    placeholder="010-0000-0000"
                    required
                  />
                  <FormField
                    label="이메일"
                    name="contactEmail"
                    type="email"
                    value={formData.contactEmail}
                    onChange={handleInputChange}
                    error={errors.contactEmail}
                    placeholder="contact@company.com"
                    required
                  />
                </div>
              </div>
            )}

            {/* Step 2: Facility Info */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <FormField
                  label="교육시설 개요"
                  name="facilityOverview"
                  type="textarea"
                  value={formData.facilityOverview}
                  onChange={handleInputChange}
                  error={errors.facilityOverview}
                  placeholder="교육시설의 규모, 위치, 주요 장비 등을 간략히 설명해주세요"
                  rows={4}
                  required
                />

                <div className="grid md:grid-cols-2 gap-6">
                  <FormField
                    label="시설 규모"
                    name="facilitySize"
                    value={formData.facilitySize}
                    onChange={handleInputChange}
                    error={errors.facilitySize}
                    placeholder="예: 연면적 1,000㎡"
                    required
                  />
                  <FormField
                    label="시설 위치"
                    name="facilityLocation"
                    value={formData.facilityLocation}
                    onChange={handleInputChange}
                    error={errors.facilityLocation}
                    placeholder="예: 본사 5층"
                    required
                  />
                </div>

                <FormField
                  label="주요 장비 및 시설"
                  name="equipment"
                  type="textarea"
                  value={formData.equipment}
                  onChange={handleInputChange}
                  error={errors.equipment}
                  placeholder="강의실, 실습실, 장비 등 보유 시설을 나열해주세요"
                  rows={3}
                  required
                />
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
        <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200">
          <div className="text-center">
            <h4 className="text-lg font-bold text-gray-900 mb-2">도움이 필요하시나요?</h4>
            <p className="text-gray-600 mb-4">등록 과정에서 궁금한 사항이 있으시면 언제든지 연락주세요.</p>
            <div className="flex justify-center items-center space-x-6">
              <div className="flex items-center space-x-2 text-blue-700">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <span className="font-medium text-sm">1379 → 3번</span>
              </div>
              <div className="text-gray-400">|</div>
              <div className="flex items-center space-x-2 text-blue-700">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <span className="font-medium text-sm">온라인 문의</span>
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
