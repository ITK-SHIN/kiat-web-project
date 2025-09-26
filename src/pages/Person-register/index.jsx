import { useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import NavigationButtons from '../../components/person-register/NavigationButtons';
import ProgressSteps from '../../components/person-register/ProgressSteps';
import ActivitySection from '../../components/person-register/sections/ActivitySection';
import ApplicantSection from '../../components/person-register/sections/ApplicantSection';
import FileSection from '../../components/person-register/sections/FileSection';
import { formSections, initialFormData, validationRules } from '../../constants/person-register';
import { usePersonFileManagement } from '../../hooks/person-register/usePersonFileManagement';
import { usePersonFormLogic } from '../../hooks/person-register/usePersonFormLogic';
import { useAddressSearch } from '../../hooks/useAddressSearch';
import { getFormHeaderStyles } from '../../utils/formStyles';

// 테마 설정
const theme = 'purple';

export default function PersonRegister() {
  const navigate = useNavigate();

  // Person-register 전용 폼 로직 커스텀 훅 사용
  const {
    formData,
    setFormData,
    errors,
    currentStep,
    handleInputChange,
    handleNext,
    handlePrev,
    handleSubmit: validateAndSubmit,
  } = usePersonFormLogic(initialFormData, validationRules);

  // Person-register 전용 파일 관리 커스텀 훅 사용
  const { handleFileUpload, getFileStats } = usePersonFileManagement(formData, setFormData);

  // 주소 검색 커스텀 훅 사용
  const { handleAddressSearch } = useAddressSearch(setFormData, 'address');

  // 폼 제출 핸들러
  const handleSubmit = useCallback(
    e => {
      e.preventDefault();
      if (validateAndSubmit(e)) {
        alert('전문양성인 등록 신청이 완료되었습니다! (데모)');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        navigate('/');
      }
    },
    [validateAndSubmit, navigate]
  );

  const handleHome = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    navigate('/person-steps');
  }, [navigate]);

  // 메모이제이션된 값들
  const memoizedFormSections = useMemo(() => formSections, []);
  const memoizedTheme = useMemo(() => theme, []);

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
        <ProgressSteps currentStep={currentStep} sections={memoizedFormSections} theme={memoizedTheme} />

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
          <div className={`${getFormHeaderStyles(memoizedTheme)} px-8 py-6`}>
            <div className="flex items-center space-x-3">
              <span className="text-3xl">{memoizedFormSections[currentStep].icon}</span>
              <div>
                <h3 className="text-white text-xl font-bold">{memoizedFormSections[currentStep].title}</h3>
                <p className="text-purple-100">{memoizedFormSections[currentStep].description}</p>
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
                theme={memoizedTheme}
              />
            )}

            {/* Step 1: 전문양성인 활동계획서 */}
            {currentStep === 1 && (
              <ActivitySection
                formData={formData}
                errors={errors}
                handleInputChange={handleInputChange}
                theme={memoizedTheme}
              />
            )}

            {/* Step 2: 첨부 파일 */}
            {currentStep === 2 && (
              <FileSection
                formData={formData}
                errors={errors}
                handleInputChange={handleInputChange}
                theme={memoizedTheme}
                handleFileUpload={handleFileUpload}
                getFileStats={getFileStats}
              />
            )}

            {/* 법적 근거 안내 */}
            {currentStep === memoizedFormSections.length - 1 && (
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
              totalSteps={memoizedFormSections.length}
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
