import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavigationButtons from '../../components/register/NavigationButtons';
import ProgressSteps from '../../components/register/ProgressSteps';
import EquipmentModal from '../../components/register/modals/EquipmentModal';
import PersonnelModal from '../../components/register/modals/PersonnelModal';
import ActivitySection from '../../components/register/sections/ActivitySection';
import ApplicantSection from '../../components/register/sections/ApplicantSection';
import FileSection from '../../components/register/sections/FileSection';
import { useAddressSearch } from '../../hooks/useAddressSearch';
import { useFormLogic } from '../../hooks/useFormLogic';
import { getFormHeaderStyles } from '../../utils/formStyles';

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

// 테마 설정
const theme = 'blue';

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
    organizationChart: { required: true, message: '기업의 조직도를 첨부해주세요' },
    trainingOrganization: { required: true, message: '기업부설 교육훈련기관 조직을 첨부해주세요' },
    trainingFloorPlan: { required: true, message: '교육훈련부서 전체 도면 및 내부 도면을 첨부해주세요' },
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

export default function Register() {
  const navigate = useNavigate();
  const [isPersonnelModalOpen, setIsPersonnelModalOpen] = useState(false);
  const [isEquipmentModalOpen, setIsEquipmentModalOpen] = useState(false);

  // 초기 폼 데이터
  const initialFormData = {
    // 신청인 정보
    companyName: '',
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
  };

  // 폼 로직 커스텀 훅 사용
  const {
    formData,
    setFormData,
    errors,
    currentStep,
    handleInputChange,
    handleNext,
    handlePrev,
    handleSubmit: validateAndSubmit,
    handlePersonnelSave,
    handleEquipmentSave,
  } = useFormLogic(initialFormData, validationRules);

  // 주소 검색 커스텀 훅 사용
  const { handleAddressSearch } = useAddressSearch(setFormData, 'officeAddress');

  const handleHome = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    navigate('/steps');
  }, [navigate]);

  // 폼 제출 핸들러
  const handleSubmit = useCallback(
    e => {
      e.preventDefault();
      if (validateAndSubmit(e)) {
        alert('등록 신청이 완료되었습니다! (데모)');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        navigate('/');
      }
    },
    [validateAndSubmit, navigate]
  );

  return (
    <>
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
          <ProgressSteps currentStep={currentStep} sections={formSections} theme={theme} />

          {/* Form Card */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
            <div className={`${getFormHeaderStyles(theme)} px-8 py-6`}>
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
                <ApplicantSection
                  formData={formData}
                  errors={errors}
                  handleInputChange={handleInputChange}
                  handleAddressSearch={handleAddressSearch}
                  theme={theme}
                />
              )}

              {/* Step 1: 첨단산업 인재혁신 활동 개요서 */}
              {currentStep === 1 && (
                <ActivitySection
                  formData={formData}
                  errors={errors}
                  setFormData={setFormData}
                  setIsPersonnelModalOpen={setIsPersonnelModalOpen}
                  setIsEquipmentModalOpen={setIsEquipmentModalOpen}
                />
              )}

              {/* Step 2: 첨부 파일 */}
              {currentStep === 2 && (
                <FileSection formData={formData} errors={errors} handleInputChange={handleInputChange} theme={theme} />
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
