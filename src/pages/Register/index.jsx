import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// CSS 스타일 추가
const inputStyles = `
  .date-input-fix {
    position: relative;
    isolation: isolate;
  }
  
  /* 입사일자 필드 - 정상 작동 */
  .join-date-input {
    position: relative;
    z-index: 1;
    pointer-events: auto !important;
  }
  
  .join-date-input:focus {
    z-index: 10;
  }
  
  /* 모달 내 date input - 정상 작동 */
  .modal-date-input {
    position: relative;
    z-index: 1;
    pointer-events: auto !important;
  }
  
  .modal-date-input:focus {
    z-index: 10;
  }
  
  /* 테이블 내 다른 input 필드들 */
  table input[type="text"],
  table input[type="number"],
  table select {
    pointer-events: auto;
    position: relative;
    z-index: 1;
  }
  
  /* 다른 date input들에 대한 hover 방지 */
  input[type="date"]:not(.join-date-input):not(.modal-date-input) {
    position: relative;
    z-index: 1;
  }
`;

// 폼 섹션 데이터
const formSections = [
  {
    id: 'applicant',
    title: '지정신청서',
    icon: '🏢',
    description: '신청인 및 기업 정보를 입력해주세요',
  },
  {
    id: 'activity',
    title: '첨단산업 인재혁신 활동 개요서',
    icon: '📋',
    description: '교육프로그램 및 인력 정보를 입력해주세요',
  },
  {
    id: 'file',
    title: '첨부 파일',
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
  const baseClasses = 'font-bold';

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
  maxLength = null,
  onKeyPress = null,
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
        {...(maxLength && { maxLength })}
        {...(onKeyPress && { onKeyPress })}
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

      <div className="flex flex-col space-y-4">
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
    applicationDate: { required: true, message: '신청일자를 입력해주세요' },
    applicant: { required: true, message: '신청인을 입력해주세요' },
  },
  activity: {
    programContent: { required: true, message: '교육프로그램 내용을 입력해주세요' },
    personnel: { required: true, message: '전담인력과 강의인력 정보를 입력해주세요' },
    equipment: { required: true, message: '교육장비 정보를 입력해주세요' },
    activityFiles: { required: true, message: '필요한 첨부파일을 업로드해주세요' },
  },
  file: {
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
  const [isPersonnelModalOpen, setIsPersonnelModalOpen] = useState(false);
  const [isEquipmentModalOpen, setIsEquipmentModalOpen] = useState(false);
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
    // 신청 정보
    applicationDate: new Date().toISOString().split('T')[0], // 오늘 날짜 자동 입력
    applicant: '',
    // 활동 개요서
    programContent: '',
    personnel: [],
    equipment: [],
    activityFiles: {
      organizationChart: null,
      trainingOrganization: null,
      trainingFloorPlan: null,
    },
    // 첨부 파일
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
              // 교육장비 정보 검증
              if (!formData.equipment || formData.equipment.length === 0) {
                newErrors[field] = '최소 1개의 교육장비 정보를 입력해주세요';
              } else {
                // 각 장비의 필수 정보 검증
                const hasIncompleteEquipment = formData.equipment.some(
                  item => !item.name?.trim() || !item.purpose?.trim()
                );
                if (hasIncompleteEquipment) {
                  newErrors[field] = '모든 장비의 장비명과 용도를 입력해주세요';
                }
              }
            } else if (field === 'activityFiles') {
              // 첨부파일 검증
              const requiredFiles = ['organizationChart', 'trainingOrganization', 'trainingFloorPlan'];
              const missingFiles = requiredFiles.filter(fileType => !formData.activityFiles?.[fileType]);
              if (missingFiles.length > 0) {
                newErrors[field] = '기업의 조직도, 교육훈련기관 조직, 교육훈련부서 도면을 모두 첨부해주세요';
              }
            }
          } else {
            // applicant 단계의 검증
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

  const handlePersonnelSave = useCallback(personnelData => {
    // 항상 추가 모드로만 작동
    const newPersonnel = {
      id: Date.now(),
      ...personnelData,
    };
    setFormData(prev => ({
      ...prev,
      personnel: [...prev.personnel, newPersonnel],
    }));
  }, []);

  const handleEquipmentSave = useCallback(
    equipmentData => {
      // 항상 추가 모드로만 작동
      const newEquipment = {
        id: Date.now(),
        order: formData.equipment.length + 1,
        ...equipmentData,
      };
      setFormData(prev => ({
        ...prev,
        equipment: [...prev.equipment, newEquipment],
      }));
    },
    [formData.equipment.length]
  );

  return (
    <>
      <style>{inputStyles}</style>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
        <div className="container-max max-w-4xl mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-4">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 2L3 7v11a1 1 0 001 1h3v-6h6v6h3a1 1 0 001-1V7l-7-5z"
                  clipRule="evenodd"
                />
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
                      placeholder="전화번호를 입력해주세요 (숫자만)"
                      maxLength={11}
                      onKeyPress={e => {
                        // 숫자가 아닌 키는 입력 차단
                        if (
                          !/[0-9]/.test(e.key) &&
                          !['Backspace', 'Delete', 'Tab', 'Enter', 'ArrowLeft', 'ArrowRight'].includes(e.key)
                        ) {
                          e.preventDefault();
                        }
                      }}
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

                  {/* 법적 근거 텍스트 */}
                  <div className="mt-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
                    <p className="text-sm text-gray-700 leading-relaxed">
                      「첨단산업 인재혁신 특별법」 제5조제2항, 같은 법 시행령 제17조제2항 및 같은 법 시행규칙
                      제2조제1항에 따라
                    </p>
                    <p className="text-sm text-gray-700 leading-relaxed">기업인재개발기관등의 지정을 신청합니다.</p>
                  </div>

                  {/* 신청일자 및 신청인 */}
                  <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      label="신청일자"
                      name="applicationDate"
                      type="date"
                      value={formData.applicationDate}
                      onChange={handleInputChange}
                      error={errors.applicationDate}
                      required
                    />

                    <FormField
                      label="신청인"
                      name="applicant"
                      type="text"
                      value={formData.applicant}
                      onChange={handleInputChange}
                      error={errors.applicant}
                      placeholder="신청인명을 입력해주세요"
                      required
                    />
                  </div>
                </div>
              )}

              {/* Step 1: 첨단산업 인재혁신 활동 개요서 */}
              {currentStep === 1 && (
                <div className="space-y-8">
                  {/* 교육프로그램 내용 */}
                  <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    <div className="lg:col-span-1">
                      <h3 className="text-lg font-semibold text-gray-900">교육프로그램 내용</h3>
                    </div>
                    <div className="lg:col-span-3">
                      <textarea
                        className={getInputStyles(errors.programContent, formData.programContent)}
                        placeholder="내용 입력"
                        value={formData.programContent}
                        onChange={e => setFormData(prev => ({ ...prev, programContent: e.target.value }))}
                        rows={4}
                      />
                      {errors.programContent && <p className="mt-1 text-sm text-red-600">{errors.programContent}</p>}
                    </div>
                  </div>

                  {/* 전담인력과 강의인력 */}
                  <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    <div className="lg:col-span-1">
                      <h3 className="text-lg font-semibold text-gray-900">전담인력과 강의인력</h3>
                    </div>
                    <div className="lg:col-span-3">
                      {errors.personnel && (
                        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                          <p className="text-sm text-red-600 flex items-center">
                            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                              <path
                                fillRule="evenodd"
                                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                clipRule="evenodd"
                              />
                            </svg>
                            {errors.personnel}
                          </p>
                        </div>
                      )}
                      <div className="overflow-x-auto">
                        <table className="w-full border-collapse border border-gray-300" style={{ minWidth: '1400px' }}>
                          <thead>
                            <tr className="bg-blue-50">
                              <th
                                className="border border-gray-300 px-4 py-3 text-left font-medium text-gray-900"
                                style={{ width: '100px' }}
                              >
                                구분
                              </th>
                              <th
                                className="border border-gray-300 px-4 py-3 text-left font-medium text-gray-900"
                                style={{ width: '120px' }}
                              >
                                직위
                              </th>
                              <th
                                className="border border-gray-300 px-4 py-3 text-left font-medium text-gray-900"
                                style={{ width: '120px' }}
                              >
                                이름
                              </th>
                              <th
                                className="border border-gray-300 px-4 py-3 text-left font-medium text-gray-900"
                                style={{ width: '130px' }}
                              >
                                생년월일
                              </th>
                              <th
                                className="border border-gray-300 px-4 py-3 text-left font-medium text-gray-900"
                                style={{ width: '150px' }}
                              >
                                최종학교
                              </th>
                              <th
                                className="border border-gray-300 px-4 py-3 text-left font-medium text-gray-900"
                                style={{ width: '100px' }}
                              >
                                학위
                              </th>
                              <th
                                className="border border-gray-300 px-4 py-3 text-left font-medium text-gray-900"
                                style={{ width: '120px' }}
                              >
                                전문분야
                              </th>
                              <th
                                className="border border-gray-300 px-4 py-3 text-left font-medium text-gray-900"
                                style={{ width: '130px' }}
                              >
                                입사일자
                              </th>
                              <th
                                className="border border-gray-300 px-4 py-3 text-left font-medium text-gray-900"
                                style={{ width: '100px' }}
                              >
                                삭제
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {formData.personnel.length === 0 ? (
                              <tr>
                                <td colSpan="8" className="border border-gray-300 px-4 py-8 text-center text-gray-500">
                                  등록된 인력이 없습니다. "인력 추가" 버튼을 클릭하여 인력을 추가해주세요.
                                </td>
                              </tr>
                            ) : (
                              formData.personnel.map(person => (
                                <tr key={person.id}>
                                  <td className="border border-gray-300 px-3 py-4">
                                    <select
                                      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white focus:outline-none"
                                      value={person.type}
                                      onChange={e => {
                                        setFormData(prev => ({
                                          ...prev,
                                          personnel: prev.personnel.map(p =>
                                            p.id === person.id ? { ...p, type: e.target.value } : p
                                          ),
                                        }));
                                      }}
                                      onBlur={e => e.target.blur()}
                                      onMouseLeave={e => {
                                        setTimeout(() => {
                                          if (document.activeElement === e.target) {
                                            e.target.blur();
                                          }
                                        }, 100);
                                      }}
                                    >
                                      <option value="강의">강의</option>
                                      <option value="전담">전담</option>
                                    </select>
                                  </td>
                                  <td className="border border-gray-300 px-3 py-4">
                                    <input
                                      type="text"
                                      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all focus:outline-none"
                                      value={person.position}
                                      onChange={e => {
                                        setFormData(prev => ({
                                          ...prev,
                                          personnel: prev.personnel.map(p =>
                                            p.id === person.id ? { ...p, position: e.target.value } : p
                                          ),
                                        }));
                                      }}
                                      onBlur={e => e.target.blur()}
                                      onMouseLeave={e => {
                                        setTimeout(() => {
                                          if (document.activeElement === e.target) {
                                            e.target.blur();
                                          }
                                        }, 100);
                                      }}
                                      placeholder="직위"
                                    />
                                  </td>
                                  <td className="border border-gray-300 px-3 py-4">
                                    <input
                                      type="text"
                                      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all focus:outline-none"
                                      value={person.name}
                                      onChange={e => {
                                        setFormData(prev => ({
                                          ...prev,
                                          personnel: prev.personnel.map(p =>
                                            p.id === person.id ? { ...p, name: e.target.value } : p
                                          ),
                                        }));
                                      }}
                                      onBlur={e => e.target.blur()}
                                      onMouseLeave={e => {
                                        setTimeout(() => {
                                          if (document.activeElement === e.target) {
                                            e.target.blur();
                                          }
                                        }, 100);
                                      }}
                                      placeholder="이름"
                                    />
                                  </td>
                                  <td className="border border-gray-300 px-3 py-4">
                                    <input
                                      type="text"
                                      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all focus:outline-none"
                                      value={person.birthDate}
                                      onChange={e => {
                                        // 숫자만 허용
                                        const value = e.target.value.replace(/[^0-9]/g, '');
                                        setFormData(prev => ({
                                          ...prev,
                                          personnel: prev.personnel.map(p =>
                                            p.id === person.id ? { ...p, birthDate: value } : p
                                          ),
                                        }));
                                      }}
                                      onKeyPress={e => {
                                        // 숫자가 아닌 키는 입력 차단
                                        if (
                                          !/[0-9]/.test(e.key) &&
                                          !['Backspace', 'Delete', 'Tab', 'Enter', 'ArrowLeft', 'ArrowRight'].includes(
                                            e.key
                                          )
                                        ) {
                                          e.preventDefault();
                                        }
                                      }}
                                      onBlur={e => e.target.blur()}
                                      onMouseLeave={e => {
                                        setTimeout(() => {
                                          if (document.activeElement === e.target) {
                                            e.target.blur();
                                          }
                                        }, 100);
                                      }}
                                      placeholder="YYYYMMDD"
                                      maxLength={8}
                                    />
                                  </td>
                                  <td className="border border-gray-300 px-3 py-4">
                                    <input
                                      type="text"
                                      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all focus:outline-none"
                                      value={person.school}
                                      onChange={e => {
                                        setFormData(prev => ({
                                          ...prev,
                                          personnel: prev.personnel.map(p =>
                                            p.id === person.id ? { ...p, school: e.target.value } : p
                                          ),
                                        }));
                                      }}
                                      onBlur={e => e.target.blur()}
                                      onMouseLeave={e => {
                                        setTimeout(() => {
                                          if (document.activeElement === e.target) {
                                            e.target.blur();
                                          }
                                        }, 100);
                                      }}
                                      placeholder="학교명"
                                    />
                                  </td>
                                  <td className="border border-gray-300 px-3 py-4">
                                    <input
                                      type="text"
                                      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all focus:outline-none"
                                      value={person.degree}
                                      onChange={e => {
                                        setFormData(prev => ({
                                          ...prev,
                                          personnel: prev.personnel.map(p =>
                                            p.id === person.id ? { ...p, degree: e.target.value } : p
                                          ),
                                        }));
                                      }}
                                      onBlur={e => e.target.blur()}
                                      onMouseLeave={e => {
                                        setTimeout(() => {
                                          if (document.activeElement === e.target) {
                                            e.target.blur();
                                          }
                                        }, 100);
                                      }}
                                      placeholder="학위"
                                    />
                                  </td>
                                  <td className="border border-gray-300 px-3 py-4">
                                    <input
                                      type="text"
                                      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all focus:outline-none"
                                      value={person.specialty}
                                      onChange={e => {
                                        setFormData(prev => ({
                                          ...prev,
                                          personnel: prev.personnel.map(p =>
                                            p.id === person.id ? { ...p, specialty: e.target.value } : p
                                          ),
                                        }));
                                      }}
                                      onBlur={e => e.target.blur()}
                                      onMouseLeave={e => {
                                        setTimeout(() => {
                                          if (document.activeElement === e.target) {
                                            e.target.blur();
                                          }
                                        }, 100);
                                      }}
                                      placeholder="전문분야"
                                    />
                                  </td>
                                  <td className="border border-gray-300 px-3 py-4">
                                    <div className="date-input-fix">
                                      <input
                                        type="date"
                                        className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all focus:outline-none join-date-input"
                                        value={person.joinDate}
                                        onChange={e => {
                                          setFormData(prev => ({
                                            ...prev,
                                            personnel: prev.personnel.map(p =>
                                              p.id === person.id ? { ...p, joinDate: e.target.value } : p
                                            ),
                                          }));
                                        }}
                                      />
                                    </div>
                                  </td>
                                  <td className="border border-gray-300 px-4 py-3">
                                    <button
                                      type="button"
                                      onClick={() => {
                                        setFormData(prev => ({
                                          ...prev,
                                          personnel: prev.personnel.filter(p => p.id !== person.id),
                                        }));
                                      }}
                                      className="px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
                                    >
                                      삭제
                                    </button>
                                  </td>
                                </tr>
                              ))
                            )}
                          </tbody>
                        </table>
                      </div>
                      <div className="mt-4 flex justify-between">
                        <button
                          type="button"
                          onClick={() => {
                            setIsPersonnelModalOpen(true);
                          }}
                          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
                        >
                          인력 추가
                        </button>
                        <div className="flex space-x-4 text-sm">
                          <span>전담인력: {formData.personnel.filter(p => p.type === '전담').length}</span>
                          <span>강의인력: {formData.personnel.filter(p => p.type === '강의').length}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 교육장비 */}
                  <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    <div className="lg:col-span-1">
                      <h3 className="text-lg font-semibold text-gray-900">교육장비</h3>
                    </div>
                    <div className="lg:col-span-3">
                      {errors.equipment && (
                        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                          <p className="text-sm text-red-600 flex items-center">
                            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                              <path
                                fillRule="evenodd"
                                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                clipRule="evenodd"
                              />
                            </svg>
                            {errors.equipment}
                          </p>
                        </div>
                      )}
                      <div className="overflow-x-auto">
                        <table className="w-full border-collapse border border-gray-300" style={{ minWidth: '800px' }}>
                          <thead>
                            <tr className="bg-blue-50">
                              <th
                                className="border border-gray-300 px-4 py-3 text-left font-medium text-gray-900"
                                style={{ width: '80px' }}
                              >
                                No.
                              </th>
                              <th
                                className="border border-gray-300 px-4 py-3 text-left font-medium text-gray-900"
                                style={{ width: '150px' }}
                              >
                                장비명
                              </th>
                              <th
                                className="border border-gray-300 px-4 py-3 text-left font-medium text-gray-900"
                                style={{ width: '200px' }}
                              >
                                용도
                              </th>
                              <th
                                className="border border-gray-300 px-4 py-3 text-left font-medium text-gray-900"
                                style={{ width: '100px' }}
                              >
                                수량
                              </th>
                              <th
                                className="border border-gray-300 px-4 py-3 text-left font-medium text-gray-900"
                                style={{ width: '150px' }}
                              >
                                비고
                              </th>
                              <th
                                className="border border-gray-300 px-4 py-3 text-left font-medium text-gray-900"
                                style={{ width: '100px' }}
                              >
                                삭제
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {formData.equipment.length === 0 ? (
                              <tr>
                                <td colSpan="6" className="border border-gray-300 px-4 py-8 text-center text-gray-500">
                                  등록된 교육장비가 없습니다. "장비 추가" 버튼을 클릭하여 장비를 추가해주세요.
                                </td>
                              </tr>
                            ) : (
                              formData.equipment.map(item => (
                                <tr key={item.id}>
                                  <td className="border border-gray-300 px-3 py-4">
                                    <input
                                      type="number"
                                      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                      value={item.order}
                                      onChange={e => {
                                        setFormData(prev => ({
                                          ...prev,
                                          equipment: prev.equipment.map(eq =>
                                            eq.id === item.id ? { ...eq, order: parseInt(e.target.value) } : eq
                                          ),
                                        }));
                                      }}
                                      min="1"
                                    />
                                  </td>
                                  <td className="border border-gray-300 px-3 py-4">
                                    <input
                                      type="text"
                                      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                      value={item.name}
                                      onChange={e => {
                                        setFormData(prev => ({
                                          ...prev,
                                          equipment: prev.equipment.map(eq =>
                                            eq.id === item.id ? { ...eq, name: e.target.value } : eq
                                          ),
                                        }));
                                      }}
                                      placeholder="장비명"
                                    />
                                  </td>
                                  <td className="border border-gray-300 px-3 py-4">
                                    <input
                                      type="text"
                                      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                      value={item.purpose}
                                      onChange={e => {
                                        setFormData(prev => ({
                                          ...prev,
                                          equipment: prev.equipment.map(eq =>
                                            eq.id === item.id ? { ...eq, purpose: e.target.value } : eq
                                          ),
                                        }));
                                      }}
                                      placeholder="용도"
                                    />
                                  </td>
                                  <td className="border border-gray-300 px-3 py-4">
                                    <input
                                      type="text"
                                      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                      value={item.quantity}
                                      onChange={e => {
                                        const value = e.target.value.replace(/[^0-9]/g, '');
                                        setFormData(prev => ({
                                          ...prev,
                                          equipment: prev.equipment.map(eq =>
                                            eq.id === item.id ? { ...eq, quantity: value } : eq
                                          ),
                                        }));
                                      }}
                                      onKeyPress={e => {
                                        if (!/[0-9]/.test(e.key)) {
                                          e.preventDefault();
                                        }
                                      }}
                                      placeholder="수량"
                                    />
                                  </td>
                                  <td className="border border-gray-300 px-3 py-4">
                                    <input
                                      type="text"
                                      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                      value={item.remarks}
                                      onChange={e => {
                                        setFormData(prev => ({
                                          ...prev,
                                          equipment: prev.equipment.map(eq =>
                                            eq.id === item.id ? { ...eq, remarks: e.target.value } : eq
                                          ),
                                        }));
                                      }}
                                      placeholder="비고"
                                    />
                                  </td>
                                  <td className="border border-gray-300 px-4 py-3">
                                    <button
                                      type="button"
                                      onClick={() => {
                                        setFormData(prev => ({
                                          ...prev,
                                          equipment: prev.equipment.filter(eq => eq.id !== item.id),
                                        }));
                                      }}
                                      className="px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
                                    >
                                      삭제
                                    </button>
                                  </td>
                                </tr>
                              ))
                            )}
                          </tbody>
                        </table>
                      </div>
                      <div className="mt-4 flex justify-between">
                        <button
                          type="button"
                          onClick={() => {
                            setIsEquipmentModalOpen(true);
                          }}
                          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
                        >
                          장비 추가
                        </button>
                        <div className="flex space-x-4 text-sm">
                          <span>총 장비: {formData.equipment.length}개</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 첨부파일 섹션들 */}
                  {errors.activityFiles && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-sm text-red-600 flex items-center">
                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {errors.activityFiles}
                      </p>
                    </div>
                  )}
                  <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    <div className="lg:col-span-1">
                      <h3 className="text-lg font-semibold text-gray-900">기업의 조직도 (첨부)</h3>
                    </div>
                    <div className="lg:col-span-3">
                      <div className="w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 transition-colors cursor-pointer">
                        <input
                          type="file"
                          accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                          onChange={e => {
                            setFormData(prev => ({
                              ...prev,
                              activityFiles: {
                                ...prev.activityFiles,
                                organizationChart: e.target.files[0],
                              },
                            }));
                          }}
                          className="hidden"
                          id="organizationChart"
                        />
                        <label htmlFor="organizationChart" className="cursor-pointer block text-center py-4">
                          {formData.activityFiles.organizationChart ? (
                            <span className="text-green-600">✓ {formData.activityFiles.organizationChart.name}</span>
                          ) : (
                            <span className="text-gray-500">파일을 선택하거나 드래그하여 업로드하세요</span>
                          )}
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    <div className="lg:col-span-1">
                      <h3 className="text-lg font-semibold text-gray-900">기업부설 교육훈련기관 조직 (첨부)</h3>
                    </div>
                    <div className="lg:col-span-3">
                      <div className="w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 transition-colors cursor-pointer">
                        <input
                          type="file"
                          accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                          onChange={e => {
                            setFormData(prev => ({
                              ...prev,
                              activityFiles: {
                                ...prev.activityFiles,
                                trainingOrganization: e.target.files[0],
                              },
                            }));
                          }}
                          className="hidden"
                          id="trainingOrganization"
                        />
                        <label htmlFor="trainingOrganization" className="cursor-pointer block text-center py-4">
                          {formData.activityFiles.trainingOrganization ? (
                            <span className="text-green-600">✓ {formData.activityFiles.trainingOrganization.name}</span>
                          ) : (
                            <span className="text-gray-500">파일을 선택하거나 드래그하여 업로드하세요</span>
                          )}
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    <div className="lg:col-span-1">
                      <h3 className="text-lg font-semibold text-gray-900">
                        교육훈련부서 전체 도면 및 내부 도면 (첨부)
                      </h3>
                    </div>
                    <div className="lg:col-span-3">
                      <div className="w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 transition-colors cursor-pointer">
                        <input
                          type="file"
                          accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                          onChange={e => {
                            setFormData(prev => ({
                              ...prev,
                              activityFiles: {
                                ...prev.activityFiles,
                                trainingFloorPlan: e.target.files[0],
                              },
                            }));
                          }}
                          className="hidden"
                          id="trainingFloorPlan"
                        />
                        <label htmlFor="trainingFloorPlan" className="cursor-pointer block text-center py-4">
                          {formData.activityFiles.trainingFloorPlan ? (
                            <span className="text-green-600">✓ {formData.activityFiles.trainingFloorPlan.name}</span>
                          ) : (
                            <span className="text-gray-500">파일을 선택하거나 드래그하여 업로드하세요</span>
                          )}
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: 첨부 파일 */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                    <div className="flex items-start space-x-3">
                      <svg
                        className="w-5 h-5 text-blue-600 mt-0.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <div>
                        <h4 className="text-sm font-medium text-blue-800 mb-1">첨부 파일 안내</h4>
                        <p className="text-sm text-blue-700">
                          기업인재개발기관 등록을 위해 필요한 서류를 첨부해주세요. 파일은 PDF, DOC, DOCX, JPG, PNG
                          형식을 지원합니다. <br />
                          (최대 100MB)
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
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

      {/* 인력 추가 모달 */}
      {isPersonnelModalOpen && (
        <PersonnelModal
          isOpen={isPersonnelModalOpen}
          onClose={() => {
            setIsPersonnelModalOpen(false);
          }}
          onSave={handlePersonnelSave}
        />
      )}

      {/* 장비 추가 모달 */}
      {isEquipmentModalOpen && (
        <EquipmentModal
          isOpen={isEquipmentModalOpen}
          onClose={() => {
            setIsEquipmentModalOpen(false);
          }}
          onSave={handleEquipmentSave}
        />
      )}
    </>
  );
}

// 인력 추가 모달 컴포넌트
function PersonnelModal({ isOpen, onClose, onSave }) {
  const [formData, setFormData] = useState({
    type: '강의',
    position: '',
    name: '',
    birthDate: '',
    school: '',
    degree: '',
    specialty: '',
    joinDate: '',
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // 에러 제거
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.type) newErrors.type = '구분을 선택해주세요';
    if (!formData.position?.trim()) newErrors.position = '직위를 입력해주세요';
    if (!formData.name?.trim()) newErrors.name = '이름을 입력해주세요';
    if (!formData.birthDate?.trim()) newErrors.birthDate = '생년월일을 입력해주세요';
    if (!formData.school?.trim()) newErrors.school = '최종학교를 입력해주세요';
    if (!formData.degree?.trim()) newErrors.degree = '학위를 입력해주세요';
    if (!formData.specialty?.trim()) newErrors.specialty = '전문분야를 입력해주세요';
    if (!formData.joinDate?.trim()) newErrors.joinDate = '입사일자를 입력해주세요';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (validateForm()) {
      onSave(formData);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900">인력 추가</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* 구분 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  구분 <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.type}
                  onChange={e => handleInputChange('type', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    errors.type ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  }`}
                >
                  <option value="강의">강의</option>
                  <option value="전담">전담</option>
                </select>
                {errors.type && <p className="mt-1 text-sm text-red-600">{errors.type}</p>}
              </div>

              {/* 직위 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  직위 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.position}
                  onChange={e => handleInputChange('position', e.target.value)}
                  placeholder="직위를 입력하세요"
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    errors.position ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  }`}
                />
                {errors.position && <p className="mt-1 text-sm text-red-600">{errors.position}</p>}
              </div>

              {/* 이름 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  이름 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={e => handleInputChange('name', e.target.value)}
                  placeholder="이름을 입력하세요"
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    errors.name ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  }`}
                />
                {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
              </div>

              {/* 생년월일 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  생년월일 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.birthDate}
                  onChange={e => {
                    const value = e.target.value.replace(/[^0-9]/g, '');
                    handleInputChange('birthDate', value);
                  }}
                  placeholder="YYYYMMDD"
                  maxLength={8}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    errors.birthDate ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  }`}
                />
                {errors.birthDate && <p className="mt-1 text-sm text-red-600">{errors.birthDate}</p>}
              </div>

              {/* 최종학교 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  최종학교 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.school}
                  onChange={e => handleInputChange('school', e.target.value)}
                  placeholder="최종학교를 입력하세요"
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    errors.school ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  }`}
                />
                {errors.school && <p className="mt-1 text-sm text-red-600">{errors.school}</p>}
              </div>

              {/* 학위 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  학위 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.degree}
                  onChange={e => handleInputChange('degree', e.target.value)}
                  placeholder="학위를 입력하세요"
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    errors.degree ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  }`}
                />
                {errors.degree && <p className="mt-1 text-sm text-red-600">{errors.degree}</p>}
              </div>

              {/* 전문분야 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  전문분야 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.specialty}
                  onChange={e => handleInputChange('specialty', e.target.value)}
                  placeholder="전문분야를 입력하세요"
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    errors.specialty ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  }`}
                />
                {errors.specialty && <p className="mt-1 text-sm text-red-600">{errors.specialty}</p>}
              </div>

              {/* 입사일자 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  입사일자 <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={formData.joinDate}
                  onChange={e => handleInputChange('joinDate', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 modal-date-input ${
                    errors.joinDate ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  }`}
                />
                {errors.joinDate && <p className="mt-1 text-sm text-red-600">{errors.joinDate}</p>}
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-4 border-t">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                취소
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                추가
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

// 장비 추가 모달 컴포넌트
function EquipmentModal({ isOpen, onClose, onSave }) {
  const [formData, setFormData] = useState({
    name: '',
    purpose: '',
    quantity: '',
    remarks: '',
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // 에러 제거
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name?.trim()) newErrors.name = '장비명을 입력해주세요';
    if (!formData.purpose?.trim()) newErrors.purpose = '용도를 입력해주세요';
    if (!formData.quantity?.trim()) newErrors.quantity = '수량을 입력해주세요';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (validateForm()) {
      onSave(formData);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900">장비 추가</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* 장비명 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  장비명 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={e => handleInputChange('name', e.target.value)}
                  placeholder="장비명을 입력하세요"
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    errors.name ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  }`}
                />
                {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
              </div>

              {/* 용도 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  용도 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.purpose}
                  onChange={e => handleInputChange('purpose', e.target.value)}
                  placeholder="용도를 입력하세요"
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    errors.purpose ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  }`}
                />
                {errors.purpose && <p className="mt-1 text-sm text-red-600">{errors.purpose}</p>}
              </div>

              {/* 수량 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  수량 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.quantity}
                  onChange={e => {
                    const value = e.target.value.replace(/[^0-9]/g, '');
                    handleInputChange('quantity', value);
                  }}
                  onKeyPress={e => {
                    if (!/[0-9]/.test(e.key)) {
                      e.preventDefault();
                    }
                  }}
                  placeholder="수량을 입력하세요"
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    errors.quantity ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  }`}
                />
                {errors.quantity && <p className="mt-1 text-sm text-red-600">{errors.quantity}</p>}
              </div>

              {/* 비고 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">비고</label>
                <input
                  type="text"
                  value={formData.remarks}
                  onChange={e => handleInputChange('remarks', e.target.value)}
                  placeholder="비고를 입력하세요 (선택사항)"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-4 border-t">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                취소
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                추가
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
