import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// 폼 섹션 데이터
const formSections = [
  {
    id: 'personal',
    title: '개인 정보',
    icon: '👤',
    description: '개인 기본 정보를 입력해주세요',
  },
  {
    id: 'education',
    title: '학력 정보',
    icon: '🎓',
    description: '최종 학력 및 교육 이력을 입력해주세요',
  },
  {
    id: 'career',
    title: '경력 정보',
    icon: '💼',
    description: '전문 분야 경력 사항을 입력해주세요',
  },
  {
    id: 'expertise',
    title: '전문 분야',
    icon: '🔬',
    description: '전문성 및 강의 가능 분야를 입력해주세요',
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

const getInputStyles = error => {
  const baseClasses =
    'w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all';
  return error ? cn(baseClasses, 'border-red-300 bg-red-50') : cn(baseClasses, 'border-gray-300');
};

const getTextareaStyles = error => {
  const baseClasses =
    'w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all resize-none';
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
  defaultValue = null,
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

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
  personal: {
    name: { required: true, message: '이름을 입력해주세요' },
    birthDate: { required: true, message: '생년월일을 입력해주세요' },
    gender: { required: true, message: '성별을 선택해주세요' },
    address: { required: true, message: '주소를 입력해주세요' },
    phone: { required: true, message: '연락처를 입력해주세요' },
    email: { required: true, message: '이메일을 입력해주세요' },
  },
  education: {
    finalEducation: { required: true, message: '최종학력을 선택해주세요' },
    university: { required: true, message: '대학교명을 입력해주세요' },
    major: { required: true, message: '전공을 입력해주세요' },
    graduationYear: { required: true, message: '졸업년도를 입력해주세요' },
  },
  career: {
    currentCompany: { required: true, message: '현재 소속을 입력해주세요' },
    currentPosition: { required: true, message: '현재 직책을 입력해주세요' },
    workExperience: { required: true, message: '총 경력을 선택해주세요' },
    industryExperience: { required: true, message: '산업 분야 경력을 입력해주세요' },
  },
  expertise: {
    expertiseField: { required: true, message: '전문 분야를 선택해주세요' },
    teachableSubjects: { required: true, message: '강의 가능 과목을 입력해주세요' },
  },
};

// 옵션 데이터
const genderOptions = [
  { value: '남성', label: '남성' },
  { value: '여성', label: '여성' },
];

const educationOptions = [
  { value: '학사', label: '학사' },
  { value: '석사', label: '석사' },
  { value: '박사', label: '박사' },
];

const experienceOptions = [
  { value: '5년 미만', label: '5년 미만' },
  { value: '5-10년', label: '5-10년' },
  { value: '10-15년', label: '10-15년' },
  { value: '15-20년', label: '15-20년' },
  { value: '20년 이상', label: '20년 이상' },
];

const expertiseOptions = [
  { value: '반도체', label: '반도체' },
  { value: '이차전지', label: '이차전지' },
  { value: '디스플레이', label: '디스플레이' },
  { value: '바이오', label: '바이오' },
  { value: '인공지능', label: '인공지능' },
  { value: '기타', label: '기타' },
];

export default function PersonRegister() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    // Personal Info
    name: '',
    birthDate: '',
    gender: '',
    nationality: '',
    address: '',
    phone: '',
    email: '',

    // Education Info
    finalEducation: '',
    university: '',
    major: '',
    graduationYear: '',
    degree: '',
    additionalEducation: '',

    // Career Info
    currentCompany: '',
    currentPosition: '',
    workExperience: '',
    industryExperience: '',
    teachingExperience: '',

    // Expertise Info
    expertiseField: '',
    certifications: '',
    publications: '',
    researchAreas: '',
    teachableSubjects: '',
    portfolioUrl: '',
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
      const stepKey = ['personal', 'education', 'career', 'expertise'][step];
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
            {/* Step 0: Personal Info */}
            {currentStep === 0 && (
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <FormField
                    label="성명"
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
                    label="성별"
                    name="gender"
                    type="select"
                    value={formData.gender}
                    onChange={handleInputChange}
                    error={errors.gender}
                    options={genderOptions}
                    required
                  />
                  <FormField
                    label="국적"
                    name="nationality"
                    value={formData.nationality}
                    onChange={handleInputChange}
                    placeholder="대한민국"
                    defaultValue="대한민국"
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

                <div className="grid md:grid-cols-2 gap-6">
                  <FormField
                    label="연락처"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    error={errors.phone}
                    placeholder="010-0000-0000"
                    required
                  />
                  <FormField
                    label="이메일"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    error={errors.email}
                    placeholder="example@email.com"
                    required
                  />
                </div>
              </div>
            )}

            {/* Step 1: Education Info */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <FormField
                    label="최종학력"
                    name="finalEducation"
                    type="select"
                    value={formData.finalEducation}
                    onChange={handleInputChange}
                    error={errors.finalEducation}
                    options={educationOptions}
                    required
                  />
                  <FormField
                    label="학위 구분"
                    name="degree"
                    value={formData.degree}
                    onChange={handleInputChange}
                    placeholder="예: 공학박사, 경영학석사"
                  />
                </div>

                <FormField
                  label="대학교명"
                  name="university"
                  value={formData.university}
                  onChange={handleInputChange}
                  error={errors.university}
                  placeholder="○○대학교"
                  required
                />

                <div className="grid md:grid-cols-2 gap-6">
                  <FormField
                    label="전공"
                    name="major"
                    value={formData.major}
                    onChange={handleInputChange}
                    error={errors.major}
                    placeholder="컴퓨터공학, 경영학 등"
                    required
                  />
                  <FormField
                    label="졸업년도"
                    name="graduationYear"
                    type="number"
                    value={formData.graduationYear}
                    onChange={handleInputChange}
                    error={errors.graduationYear}
                    placeholder="2020"
                    required
                  />
                </div>

                <FormField
                  label="추가 교육이력"
                  name="additionalEducation"
                  type="textarea"
                  value={formData.additionalEducation}
                  onChange={handleInputChange}
                  placeholder="연수, 자격증, 추가 학위 등 관련 교육 이력을 입력해주세요"
                  rows={3}
                />
              </div>
            )}

            {/* Step 2: Career Info */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <FormField
                    label="현재 소속"
                    name="currentCompany"
                    value={formData.currentCompany}
                    onChange={handleInputChange}
                    error={errors.currentCompany}
                    placeholder="회사명 또는 기관명"
                    required
                  />
                  <FormField
                    label="현재 직책"
                    name="currentPosition"
                    value={formData.currentPosition}
                    onChange={handleInputChange}
                    error={errors.currentPosition}
                    placeholder="부장, 교수, 연구원 등"
                    required
                  />
                </div>

                <FormField
                  label="총 경력"
                  name="workExperience"
                  type="select"
                  value={formData.workExperience}
                  onChange={handleInputChange}
                  error={errors.workExperience}
                  options={experienceOptions}
                  required
                />

                <FormField
                  label="산업 분야 경력"
                  name="industryExperience"
                  type="textarea"
                  value={formData.industryExperience}
                  onChange={handleInputChange}
                  error={errors.industryExperience}
                  placeholder="해당 산업 분야에서의 주요 경력 사항을 구체적으로 기술해주세요"
                  rows={4}
                  required
                />

                <FormField
                  label="교육/강의 경험"
                  name="teachingExperience"
                  type="textarea"
                  value={formData.teachingExperience}
                  onChange={handleInputChange}
                  placeholder="교육, 강의, 멘토링 등의 경험이 있다면 기술해주세요"
                  rows={3}
                />
              </div>
            )}

            {/* Step 3: Expertise Info */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <FormField
                  label="전문 분야"
                  name="expertiseField"
                  type="select"
                  value={formData.expertiseField}
                  onChange={handleInputChange}
                  error={errors.expertiseField}
                  options={expertiseOptions}
                  required
                />

                <FormField
                  label="보유 자격증 및 인증"
                  name="certifications"
                  type="textarea"
                  value={formData.certifications}
                  onChange={handleInputChange}
                  placeholder="관련 자격증, 전문 인증, 면허 등을 나열해주세요"
                  rows={3}
                />

                <FormField
                  label="논문 및 출간물"
                  name="publications"
                  type="textarea"
                  value={formData.publications}
                  onChange={handleInputChange}
                  placeholder="주요 논문, 저서, 특허 등이 있다면 기술해주세요"
                  rows={3}
                />

                <FormField
                  label="연구 분야"
                  name="researchAreas"
                  type="textarea"
                  value={formData.researchAreas}
                  onChange={handleInputChange}
                  placeholder="현재 진행 중이거나 관심 있는 연구 분야를 기술해주세요"
                  rows={3}
                />

                <FormField
                  label="강의 가능 과목"
                  name="teachableSubjects"
                  type="textarea"
                  value={formData.teachableSubjects}
                  onChange={handleInputChange}
                  error={errors.teachableSubjects}
                  placeholder="강의 가능한 과목명과 간단한 설명을 기술해주세요"
                  rows={4}
                  required
                />

                <FormField
                  label="포트폴리오 URL"
                  name="portfolioUrl"
                  type="url"
                  value={formData.portfolioUrl}
                  onChange={handleInputChange}
                  placeholder="https://example.com (선택사항)"
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
