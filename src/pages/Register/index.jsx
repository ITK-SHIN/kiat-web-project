import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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

  const handleInputChange = e => {
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
  };

  const validateStep = step => {
    const newErrors = {};

    switch (step) {
      case 0: // Basic Info
        if (!formData.companyName.trim()) newErrors.companyName = '기업명을 입력해주세요';
        if (!formData.businessNumber.trim()) newErrors.businessNumber = '사업자등록번호를 입력해주세요';
        if (!formData.address.trim()) newErrors.address = '주소를 입력해주세요';
        if (!formData.establishedYear.trim()) newErrors.establishedYear = '설립년도를 입력해주세요';
        if (!formData.employeeCount.trim()) newErrors.employeeCount = '직원 수를 선택해주세요';
        break;
      case 1: // Contact Info
        if (!formData.contactName.trim()) newErrors.contactName = '담당자 이름을 입력해주세요';
        if (!formData.contactPhone.trim()) newErrors.contactPhone = '연락처를 입력해주세요';
        if (!formData.contactEmail.trim()) newErrors.contactEmail = '이메일을 입력해주세요';
        if (!formData.department.trim()) newErrors.department = '부서/직책을 입력해주세요';
        break;
      case 2: // Facility Info
        if (!formData.facilityOverview.trim()) newErrors.facilityOverview = '교육시설 개요를 입력해주세요';
        if (!formData.facilitySize.trim()) newErrors.facilitySize = '시설 규모를 입력해주세요';
        if (!formData.facilityLocation.trim()) newErrors.facilityLocation = '시설 위치를 입력해주세요';
        if (!formData.equipment.trim()) newErrors.equipment = '주요 장비 및 시설을 입력해주세요';
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < formSections.length - 1) {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (validateStep(currentStep)) {
      alert('등록 신청이 완료되었습니다! (데모)');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      navigate('/');
    }
  };

  const progressPercentage = ((currentStep + 1) / formSections.length) * 100;

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
        <div className="bg-white rounded-2xl p-6 shadow-lg mb-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-gray-900">진행 단계</h3>
            <span className="text-sm text-gray-600">
              {currentStep + 1} / {formSections.length}
            </span>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
            <div
              className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {formSections.map((section, index) => (
              <div
                key={section.id}
                className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                  index === currentStep
                    ? 'border-blue-300 bg-blue-50'
                    : index < currentStep
                      ? 'border-green-300 bg-green-50'
                      : 'border-gray-200 bg-gray-50'
                }`}
              >
                <div className="flex items-center space-x-3 mb-2">
                  <span className="text-2xl">{section.icon}</span>
                  <h4
                    className={`font-medium ${
                      index === currentStep ? 'text-blue-700' : index < currentStep ? 'text-green-700' : 'text-gray-600'
                    }`}
                  >
                    {section.title}
                  </h4>
                </div>
                <p className="text-sm text-gray-600">{section.description}</p>
              </div>
            ))}
          </div>
        </div>

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
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      기업명 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${
                        errors.companyName ? 'border-red-300 bg-red-50' : 'border-gray-300'
                      }`}
                      placeholder="기업명을 입력해주세요"
                    />
                    {errors.companyName && <p className="mt-1 text-sm text-red-600">{errors.companyName}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      사업자등록번호 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="businessNumber"
                      value={formData.businessNumber}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${
                        errors.businessNumber ? 'border-red-300 bg-red-50' : 'border-gray-300'
                      }`}
                      placeholder="000-00-00000"
                    />
                    {errors.businessNumber && <p className="mt-1 text-sm text-red-600">{errors.businessNumber}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    주소 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${
                      errors.address ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                    placeholder="기업 주소를 입력해주세요"
                  />
                  {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address}</p>}
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      설립년도 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="establishedYear"
                      value={formData.establishedYear}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${
                        errors.establishedYear ? 'border-red-300 bg-red-50' : 'border-gray-300'
                      }`}
                      placeholder="2020"
                      min="1900"
                      max="2024"
                    />
                    {errors.establishedYear && <p className="mt-1 text-sm text-red-600">{errors.establishedYear}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      직원 수 <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="employeeCount"
                      value={formData.employeeCount}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${
                        errors.employeeCount ? 'border-red-300 bg-red-50' : 'border-gray-300'
                      }`}
                    >
                      <option value="">선택해주세요</option>
                      <option value="200-500">200-500명</option>
                      <option value="500-1000">500-1,000명</option>
                      <option value="1000+">1,000명 이상</option>
                    </select>
                    {errors.employeeCount && <p className="mt-1 text-sm text-red-600">{errors.employeeCount}</p>}
                  </div>
                </div>
              </div>
            )}

            {/* Step 1: Contact Info */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      담당자 이름 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="contactName"
                      value={formData.contactName}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${
                        errors.contactName ? 'border-red-300 bg-red-50' : 'border-gray-300'
                      }`}
                      placeholder="담당자 성명을 입력해주세요"
                    />
                    {errors.contactName && <p className="mt-1 text-sm text-red-600">{errors.contactName}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      부서/직책 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="department"
                      value={formData.department}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${
                        errors.department ? 'border-red-300 bg-red-50' : 'border-gray-300'
                      }`}
                      placeholder="인사팀 과장"
                    />
                    {errors.department && <p className="mt-1 text-sm text-red-600">{errors.department}</p>}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      연락처 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="contactPhone"
                      value={formData.contactPhone}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${
                        errors.contactPhone ? 'border-red-300 bg-red-50' : 'border-gray-300'
                      }`}
                      placeholder="010-0000-0000"
                    />
                    {errors.contactPhone && <p className="mt-1 text-sm text-red-600">{errors.contactPhone}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      이메일 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="contactEmail"
                      value={formData.contactEmail}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${
                        errors.contactEmail ? 'border-red-300 bg-red-50' : 'border-gray-300'
                      }`}
                      placeholder="contact@company.com"
                    />
                    {errors.contactEmail && <p className="mt-1 text-sm text-red-600">{errors.contactEmail}</p>}
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Facility Info */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    교육시설 개요 <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="facilityOverview"
                    value={formData.facilityOverview}
                    onChange={handleInputChange}
                    rows="4"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all resize-none ${
                      errors.facilityOverview ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                    placeholder="교육시설의 규모, 위치, 주요 장비 등을 간략히 설명해주세요"
                  />
                  {errors.facilityOverview && <p className="mt-1 text-sm text-red-600">{errors.facilityOverview}</p>}
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      시설 규모 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="facilitySize"
                      value={formData.facilitySize}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${
                        errors.facilitySize ? 'border-red-300 bg-red-50' : 'border-gray-300'
                      }`}
                      placeholder="예: 연면적 1,000㎡"
                    />
                    {errors.facilitySize && <p className="mt-1 text-sm text-red-600">{errors.facilitySize}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      시설 위치 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="facilityLocation"
                      value={formData.facilityLocation}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${
                        errors.facilityLocation ? 'border-red-300 bg-red-50' : 'border-gray-300'
                      }`}
                      placeholder="예: 본사 5층"
                    />
                    {errors.facilityLocation && <p className="mt-1 text-sm text-red-600">{errors.facilityLocation}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    주요 장비 및 시설 <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="equipment"
                    value={formData.equipment}
                    onChange={handleInputChange}
                    rows="3"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all resize-none ${
                      errors.equipment ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                    placeholder="강의실, 실습실, 장비 등 보유 시설을 나열해주세요"
                  />
                  {errors.equipment && <p className="mt-1 text-sm text-red-600">{errors.equipment}</p>}
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="border-t pt-8 mt-8">
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={() => {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    navigate('/steps');
                  }}
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
                      onClick={handlePrev}
                      className="inline-flex items-center px-6 py-3 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-all duration-200"
                    >
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                      이전
                    </button>
                  )}

                  {currentStep < formSections.length - 1 ? (
                    <button
                      type="button"
                      onClick={handleNext}
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
