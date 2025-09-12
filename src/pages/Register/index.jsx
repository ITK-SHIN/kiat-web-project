import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// 폼 섹션 데이터
const formSections = [
  {
    id: 'applicant',
    title: '신청인 정보',
    icon: '🏢',
    description: '신청인 및 기업 정보를 입력해주세요',
  },
  {
    id: 'file',
    title: '파일 첨부',
    icon: '📎',
    description: '필요한 서류를 첨부해주세요',
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

const getInputStyles = (error, value) => {
  const baseClasses =
    'w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all';

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
    'w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all resize-none';

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
  accept = null,
  multiple = false,
  formData = null,
  errors = null,
  handleInputChange = null,
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
    ) : type === 'file' ? (
      <input
        type="file"
        name={name}
        onChange={onChange}
        className={getInputStyles(error, value)}
        accept={accept}
        multiple={multiple}
      />
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
    ) : type === 'companyName' ? (
      <div className="flex">
        <div className="flex items-center px-4 py-3 bg-gray-100 border border-r-0 border-gray-300 rounded-l-lg text-gray-700 font-medium">
          (주)
        </div>
        <input
          type="text"
          name={name}
          value={value.replace('(주)', '')}
          onChange={e => {
            const newValue = `(주)${e.target.value}`;
            onChange({ target: { name, value: newValue } });
          }}
          className={`${getInputStyles(error, value)} rounded-l-none border-l-0`}
          placeholder="기업명을 입력해주세요"
        />
      </div>
    ) : type === 'address' ? (
      <div className="space-y-3">
        <div className="flex space-x-2">
          <input
            type="text"
            name={name}
            value={value}
            readOnly
            className={`${getInputStyles(error, value)} bg-gray-50 cursor-pointer`}
            placeholder="주소를 검색해주세요"
            onClick={onChange}
          />
          <button
            type="button"
            onClick={onChange}
            className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200 whitespace-nowrap"
          >
            주소 검색
          </button>
        </div>
        <input
          type="text"
          name={`${name}Detail`}
          value={formData?.[`${name}Detail`] || ''}
          onChange={handleInputChange || onChange}
          className={getInputStyles(errors?.[`${name}Detail`], formData?.[`${name}Detail`])}
          placeholder="상세주소를 입력해주세요 (선택사항)"
        />
        {errors?.[`${name}Detail`] && <p className="mt-1 text-sm text-red-600">{errors[`${name}Detail`]}</p>}
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
              name="industryFieldOther"
              value={formData?.industryFieldOther || ''}
              onChange={onChange}
              placeholder="기타 분야를 입력해주세요"
              className={getInputStyles(errors?.industryFieldOther, formData?.industryFieldOther)}
            />
            {errors?.industryFieldOther && <p className="mt-1 text-sm text-red-600">{errors.industryFieldOther}</p>}
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
        {...(type === 'number' && { min: '1800', max: '2024' })}
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
  applicant: {
    companyName: { required: true, message: '기업명을 입력해주세요' },
    establishedDate: { required: true, message: '설립일을 입력해주세요' },
    representative: { required: true, message: '대표자명을 입력해주세요' },
    businessNumber: {
      required: true,
      message: '사업자등록번호(법인등록번호)를 입력해주세요',
      pattern: /^[0-9]{3}-[0-9]{2}-[0-9]{5}$/,
      patternMessage: '올바른 사업자등록번호 형식을 입력해주세요 (예: 123-45-67890)',
    },
    phone: {
      required: true,
      message: '전화번호를 입력해주세요',
      pattern: /^[0-9-+\s()]{10,15}$/,
      patternMessage: '올바른 전화번호 형식을 입력해주세요 (예: 02-1234-5678)',
    },
    fax: {
      pattern: /^[0-9]{2}-[0-9]{4}-[0-9]{4}$/,
      patternMessage: '올바른 팩스번호 형식을 입력해주세요 (예: 02-1111-1111)',
    },
    email: {
      required: true,
      message: '전자우편을 입력해주세요',
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      patternMessage: '올바른 이메일 형식을 입력해주세요 (예: example@company.com)',
    },
    officeAddress: { required: true, message: '사무소 소재지를 입력해주세요' },
    industryField: { required: true, message: '첨단산업 분야를 하나 이상 선택해주세요' },
    industryFieldOther: { required: false, message: '기타 분야를 입력해주세요' },
  },
  file: {
    applicationForm: { required: true, message: '기업인재개발기관 지정신청서를 첨부해주세요' },
    activityOverview: { required: true, message: '첨단산업 인재혁신 활동 개요서를 첨부해주세요' },
    smeConfirmation: { required: true, message: '중견기업 및 중소기업 확인서를 첨부해주세요' },
    corporateRegistration: { required: true, message: '법인등록 등기부등본을 첨부해주세요' },
    buildingRegistration: {
      required: true,
      message: '강의실이 포함된 건물의 등기부 등본 또는 임대차 계약서를 첨부해주세요',
    },
    businessLicense: { required: true, message: '사업자등록증 사본을 첨부해주세요' },
    auditReport: { required: true, message: '회계감사보고서 또는 결산재무제표를 첨부해주세요' },
    performanceCertificate: { required: true, message: '최근 3년 간 실적증명원을 첨부해주세요' },
    privacyConsent: { required: true, message: '개인정보 및 과세정보 제공활용동의서를 첨부해주세요' },
    participationConfirmation: { required: true, message: '신청기관 대표의 참여의사 확인서를 첨부해주세요' },
    personnelResume: { required: true, message: '전담인력과 강의인력 이력서 및 경력증명서를 첨부해주세요' },
    safetyChecklist: { required: true, message: '안전관리형 과제 자가점검표를 첨부해주세요' },
    cooperationAgreement: { required: false, message: '공동운영협약서를 첨부해주세요' },
  },
};

// 첨단산업 분야 옵션
const industryFieldOptions = [
  { value: 'ai', label: '인공지능' },
  { value: 'bio', label: '바이오' },
  { value: 'semiconductor', label: '반도체' },
  { value: 'display', label: '디스플레이' },
  { value: 'battery', label: '배터리' },
  { value: 'mobility', label: '모빌리티' },
  { value: 'quantum', label: '양자' },
  { value: 'aerospace', label: '우주항공' },
  { value: 'cyber', label: '사이버보안' },
  { value: 'robot', label: '로봇' },
  { value: 'energy', label: '신재생에너지' },
  { value: 'other', label: '기타' },
];

export default function Register() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [isOverviewGuideOpen, setIsOverviewGuideOpen] = useState(false);
  const [formData, setFormData] = useState({
    // 신청인 정보
    companyName: '(주)',
    establishedDate: '',
    representative: '',
    businessNumber: '',
    phone: '',
    fax: '',
    email: '',
    officeAddress: '',
    officeAddressDetail: '',
    industryField: [],
    industryFieldOther: '',
    // 파일 첨부
    applicationForm: null,
    activityOverview: null,
    smeConfirmation: null,
    corporateRegistration: null,
    buildingRegistration: null,
    businessLicense: null,
    auditReport: null,
    performanceCertificate: null,
    privacyConsent: null,
    participationConfirmation: null,
    personnelResume: null,
    safetyChecklist: null,
    cooperationAgreement: null,
  });

  const [errors, setErrors] = useState({});

  // 주소 검색 함수
  const handleAddressSearch = useCallback(() => {
    if (window.daum && window.daum.Postcode) {
      new window.daum.Postcode({
        oncomplete: function (data) {
          // 우편번호와 주소 정보를 해당 필드에 넣는다.
          let addr = '';
          let extraAddr = '';

          // 사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
          if (data.userSelectedType === 'R') {
            // 사용자가 도로명 주소를 선택했을 경우
            addr = data.roadAddress;
          } else {
            // 사용자가 지번 주소를 선택했을 경우(J)
            addr = data.jibunAddress;
          }

          // 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
          if (data.userSelectedType === 'R') {
            // 법정동명이 있을 경우 추가한다. (법정리는 제외)
            // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
            if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
              extraAddr += data.bname;
            }
            // 건물명이 있고, 공동주택일 경우 추가한다.
            if (data.buildingName !== '' && data.apartment === 'Y') {
              extraAddr += extraAddr !== '' ? ', ' + data.buildingName : data.buildingName;
            }
            // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
            if (extraAddr !== '') {
              extraAddr = ' (' + extraAddr + ')';
            }
          }

          // 우편번호와 주소 정보를 폼 데이터에 설정
          setFormData(prev => ({
            ...prev,
            officeAddress: addr + extraAddr,
          }));

          // 상세주소 입력 필드에 포커스
          setTimeout(() => {
            const detailInput = document.querySelector('input[name="officeAddressDetail"]');
            if (detailInput) {
              detailInput.focus();
            }
          }, 100);
        },
      }).open();
    } else {
      alert('주소 검색 서비스를 불러올 수 없습니다. 페이지를 새로고침해주세요.');
    }
  }, []);

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

        // 팩스 번호 자동 포맷팅
        if (name === 'fax') {
          // 숫자만 추출
          const numbers = value.replace(/[^0-9]/g, '');

          // 10자리 숫자로 제한 (02-1111-1111 형식)
          const limitedNumbers = numbers.slice(0, 10);

          // 하이픈 자동 추가 (02-1234-5678 형식)
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

        // 첨단산업 분야 다중 선택 처리
        if (name === 'industryField') {
          const fieldValue = e.target.value;
          const isChecked = e.target.checked;

          setFormData(prev => ({
            ...prev,
            industryField: isChecked
              ? [...prev.industryField, fieldValue]
              : prev.industryField.filter(field => field !== fieldValue),
            // 기타가 선택 해제되면 기타 입력 필드도 초기화
            industryFieldOther: fieldValue === 'other' && !isChecked ? '' : prev.industryFieldOther,
          }));
          return; // early return to avoid setting formattedValue
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
            // 첨단산업 분야 배열 검증
            if (field === 'industryField') {
              if (!formData[field] || formData[field].length === 0) {
                newErrors[field] = rule.message;
              }
            } else if (field === 'industryFieldOther') {
              // 기타가 선택되었는데 기타 입력 필드가 비어있으면 에러
              if (formData.industryField?.includes('other') && !formData[field]?.trim()) {
                newErrors[field] = rule.message;
              }
            } else if (field === 'companyName') {
              // 기업명의 경우 (주)만 있는 경우를 빈 값으로 처리
              const companyName = formData[field]?.trim();
              if (!companyName || companyName === '(주)') {
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
            기업인재개발기관 지정 신청을 위한 기관 정보를 단계별로 입력해주세요.
            <br />
            모든 정보는 안전하게 보호됩니다.
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
            {/* Step 0: 신청인 정보 */}
            {currentStep === 0 && (
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <FormField
                    label="기업명"
                    name="companyName"
                    type="companyName"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    error={errors.companyName}
                    placeholder="기업명을 입력해주세요"
                    required
                  />
                  <FormField
                    label="설립일"
                    name="establishedDate"
                    type="date"
                    value={formData.establishedDate}
                    onChange={handleInputChange}
                    error={errors.establishedDate}
                    required
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <FormField
                    label="대표자"
                    name="representative"
                    value={formData.representative}
                    onChange={handleInputChange}
                    error={errors.representative}
                    placeholder="대표자명을 입력해주세요"
                    required
                  />
                  <FormField
                    label="사업자등록번호(법인등록번호)"
                    name="businessNumber"
                    value={formData.businessNumber}
                    onChange={handleInputChange}
                    error={errors.businessNumber}
                    placeholder="000-00-00000"
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
                    placeholder="02-1234-5678"
                    required
                  />
                  <FormField
                    label="팩스"
                    name="fax"
                    value={formData.fax}
                    onChange={handleInputChange}
                    error={errors.fax}
                    placeholder="02-1234-5679"
                  />
                </div>

                <FormField
                  label="전자우편"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  error={errors.email}
                  placeholder="example@company.com"
                  required
                />

                <FormField
                  label="사무소 소재지"
                  name="officeAddress"
                  type="address"
                  value={formData.officeAddress}
                  onChange={handleAddressSearch}
                  error={errors.officeAddress}
                  formData={formData}
                  errors={errors}
                  handleInputChange={handleInputChange}
                  required
                />

                <FormField
                  label="첨단산업 분야"
                  name="industryField"
                  type="checkbox"
                  value={formData.industryField}
                  onChange={handleInputChange}
                  error={errors.industryField}
                  options={industryFieldOptions}
                  formData={formData}
                  errors={errors}
                  required
                />
              </div>
            )}

            {/* Step 1: 파일 첨부 */}
            {currentStep === 1 && (
              <div className="space-y-6">
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
                        기업인재개발기관 등록을 위해 필요한 서류를 첨부해주세요. 파일은 PDF, DOC, DOCX, JPG, PNG 형식을
                        지원합니다. <br />
                        (최대 100MB)
                      </p>
                    </div>
                  </div>
                </div>

                {/* 개요서 포함 내용 안내 (토글 가능) */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                  <button
                    type="button"
                    onClick={() => setIsOverviewGuideOpen(!isOverviewGuideOpen)}
                    className="w-full flex items-center justify-between text-left"
                  >
                    <div>
                      <p className="text-sm text-blue-800 font-medium">* 첨단산업 인재혁신 활동 개요서 포함 내용</p>
                      <p className="text-xs text-blue-600 mt-1">클릭하여 상세 내용 확인</p>
                    </div>
                    <svg
                      className={`w-5 h-5 text-blue-600 transition-transform duration-200 ${
                        isOverviewGuideOpen ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {isOverviewGuideOpen && (
                    <div className="mt-4 pt-4 border-t border-blue-200">
                      <div className="text-sm text-blue-700 space-y-2 text-left">
                        <p>❶ 교육프로그램 내용</p>
                        <p>❷ 전담인력과 강의인력 보유 현황</p>
                        <p>❸ 교육 실습에 필요한 장비 보유 현황</p>
                        <p>❹ 기업의 조직도</p>
                        <p>❺ 기업부설 교육훈련기관 또는 기업의 교육훈련부서의 조직도</p>
                        <p>
                          ❻ 기업부설 교육훈련기관 또는 기업의 교육훈련부서가 위치한 건물 또는 층의 전체 도면 및 내부
                          도면(전용 출입구 현판 및 내부사진 포함)
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <FormField
                    label="기업인재개발기관 지정신청서"
                    name="applicationForm"
                    type="file"
                    onChange={handleInputChange}
                    error={errors.applicationForm}
                    accept=".pdf,.doc,.docx"
                    required
                  />

                  <FormField
                    label="첨단산업 인재혁신 활동 개요서"
                    name="activityOverview"
                    type="file"
                    onChange={handleInputChange}
                    error={errors.activityOverview}
                    accept=".pdf,.doc,.docx"
                    required
                  />

                  <FormField
                    label="중견기업 및 중소기업 확인서"
                    name="smeConfirmation"
                    type="file"
                    onChange={handleInputChange}
                    error={errors.smeConfirmation}
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                    required
                  />

                  <FormField
                    label="법인등록 등기부등본"
                    name="corporateRegistration"
                    type="file"
                    onChange={handleInputChange}
                    error={errors.corporateRegistration}
                    accept=".pdf,.jpg,.jpeg,.png"
                    required
                  />

                  <FormField
                    label="강의실이 포함된 건물의 등기부 등본 또는 임대차 계약서"
                    name="buildingRegistration"
                    type="file"
                    onChange={handleInputChange}
                    error={errors.buildingRegistration}
                    accept=".pdf,.jpg,.jpeg,.png"
                    required
                  />

                  <FormField
                    label="사업자등록증 사본"
                    name="businessLicense"
                    type="file"
                    onChange={handleInputChange}
                    error={errors.businessLicense}
                    accept=".pdf,.jpg,.jpeg,.png"
                    required
                  />

                  <FormField
                    label="회계감사보고서 또는 결산재무제표(최근 3개년)"
                    name="auditReport"
                    type="file"
                    onChange={handleInputChange}
                    error={errors.auditReport}
                    accept=".pdf,.doc,.docx,.xls,.xlsx"
                    required
                  />

                  <FormField
                    label="최근 3년 간 실적증명원"
                    name="performanceCertificate"
                    type="file"
                    onChange={handleInputChange}
                    error={errors.performanceCertificate}
                    accept=".pdf,.doc,.docx"
                    required
                  />

                  <FormField
                    label="개인정보&과세정보 제공활용동의서, 윤리청렴&보안서약서"
                    name="privacyConsent"
                    type="file"
                    onChange={handleInputChange}
                    error={errors.privacyConsent}
                    accept=".pdf,.doc,.docx"
                    required
                  />

                  <FormField
                    label="신청기관 대표의 참여의사 확인서"
                    name="participationConfirmation"
                    type="file"
                    onChange={handleInputChange}
                    error={errors.participationConfirmation}
                    accept=".pdf,.doc,.docx"
                    required
                  />

                  <FormField
                    label="전담인력과 강의인력 이력서 및 경력증명서"
                    name="personnelResume"
                    type="file"
                    onChange={handleInputChange}
                    error={errors.personnelResume}
                    accept=".pdf,.doc,.docx"
                    required
                  />

                  <FormField
                    label="안전관리형 과제 자가점검표"
                    name="safetyChecklist"
                    type="file"
                    onChange={handleInputChange}
                    error={errors.safetyChecklist}
                    accept=".pdf,.doc,.docx"
                    required
                  />

                  <FormField
                    label="공동운영협약서 (2개 이상의 기업이 공동운영하는 경우)"
                    name="cooperationAgreement"
                    type="file"
                    onChange={handleInputChange}
                    error={errors.cooperationAgreement}
                    accept=".pdf,.doc,.docx"
                  />
                </div>

                {/* 첨부된 파일 목록 표시 */}
                <div className="mt-6">
                  <h4 className="text-sm font-medium text-gray-700 mb-3">첨부된 파일</h4>
                  <div className="space-y-2">
                    {Object.entries(formData).map(([key, file]) => {
                      if (
                        key.startsWith('applicationForm') ||
                        key.startsWith('activityOverview') ||
                        key.startsWith('smeConfirmation') ||
                        key.startsWith('corporateRegistration') ||
                        key.startsWith('buildingRegistration') ||
                        key.startsWith('businessLicense') ||
                        key.startsWith('auditReport') ||
                        key.startsWith('performanceCertificate') ||
                        key.startsWith('privacyConsent') ||
                        key.startsWith('participationConfirmation') ||
                        key.startsWith('personnelResume') ||
                        key.startsWith('safetyChecklist') ||
                        key.startsWith('cooperationAgreement')
                      ) {
                        if (file) {
                          const fieldLabels = {
                            applicationForm: '기업인재개발기관 지정신청서',
                            activityOverview: '첨단산업 인재혁신 활동 개요서',
                            smeConfirmation: '중견기업 및 중소기업 확인서',
                            corporateRegistration: '법인등록 등기부등본',
                            buildingRegistration: '강의실이 포함된 건물의 등기부 등본 또는 임대차 계약서',
                            businessLicense: '사업자등록증 사본',
                            auditReport: '회계감사보고서 또는 결산재무제표',
                            performanceCertificate: '최근 3년 간 실적증명원',
                            privacyConsent: '개인정보 및 과세정보 제공활용동의서, 윤리청렴 및 보안서약서',
                            participationConfirmation: '신청기관 대표의 참여의사 확인서',
                            personnelResume: '전담인력과 강의인력 이력서 및 경력증명서',
                            safetyChecklist: '안전관리형 과제 자가점검표',
                            cooperationAgreement: '공동운영협약서',
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
                      첨단산업 인재혁신 특별법 제5조제2항, 같은 법 시행령 제17조제2항 및 같은 법 시행규칙 제2조제1항에
                      따라
                      <br /> 기업인재개발기관등의 지정을 신청합니다.
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
