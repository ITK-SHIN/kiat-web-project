import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
      case 0: // Personal Info
        if (!formData.name.trim()) newErrors.name = '이름을 입력해주세요';
        if (!formData.birthDate.trim()) newErrors.birthDate = '생년월일을 입력해주세요';
        if (!formData.gender.trim()) newErrors.gender = '성별을 선택해주세요';
        if (!formData.address.trim()) newErrors.address = '주소를 입력해주세요';
        if (!formData.phone.trim()) newErrors.phone = '연락처를 입력해주세요';
        if (!formData.email.trim()) newErrors.email = '이메일을 입력해주세요';
        break;
      case 1: // Education Info
        if (!formData.finalEducation.trim()) newErrors.finalEducation = '최종학력을 선택해주세요';
        if (!formData.university.trim()) newErrors.university = '대학교명을 입력해주세요';
        if (!formData.major.trim()) newErrors.major = '전공을 입력해주세요';
        if (!formData.graduationYear.trim()) newErrors.graduationYear = '졸업년도를 입력해주세요';
        break;
      case 2: // Career Info
        if (!formData.currentCompany.trim()) newErrors.currentCompany = '현재 소속을 입력해주세요';
        if (!formData.currentPosition.trim()) newErrors.currentPosition = '현재 직책을 입력해주세요';
        if (!formData.workExperience.trim()) newErrors.workExperience = '총 경력을 선택해주세요';
        if (!formData.industryExperience.trim()) newErrors.industryExperience = '산업 분야 경력을 입력해주세요';
        break;
      case 3: // Expertise Info
        if (!formData.expertiseField.trim()) newErrors.expertiseField = '전문 분야를 선택해주세요';
        if (!formData.teachableSubjects.trim()) newErrors.teachableSubjects = '강의 가능 과목을 입력해주세요';
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
      alert('전문양성인 등록 신청이 완료되었습니다! (데모)');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      navigate('/');
    }
  };

  const progressPercentage = ((currentStep + 1) / formSections.length) * 100;

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
        <div className="bg-white rounded-2xl p-6 shadow-lg mb-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-gray-900">진행 단계</h3>
            <span className="text-sm text-gray-600">
              {currentStep + 1} / {formSections.length}
            </span>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
            <div
              className="bg-gradient-to-r from-purple-500 to-pink-600 h-2 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {formSections.map((section, index) => (
              <div
                key={section.id}
                className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                  index === currentStep
                    ? 'border-purple-300 bg-purple-50'
                    : index < currentStep
                      ? 'border-green-300 bg-green-50'
                      : 'border-gray-200 bg-gray-50'
                }`}
              >
                <div className="flex items-center space-x-3 mb-2">
                  <span className="text-2xl">{section.icon}</span>
                  <h4
                    className={`font-medium ${
                      index === currentStep
                        ? 'text-purple-700'
                        : index < currentStep
                          ? 'text-green-700'
                          : 'text-gray-600'
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
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      성명 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all ${
                        errors.name ? 'border-red-300 bg-red-50' : 'border-gray-300'
                      }`}
                      placeholder="홍길동"
                    />
                    {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      생년월일 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      name="birthDate"
                      value={formData.birthDate}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all ${
                        errors.birthDate ? 'border-red-300 bg-red-50' : 'border-gray-300'
                      }`}
                    />
                    {errors.birthDate && <p className="mt-1 text-sm text-red-600">{errors.birthDate}</p>}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      성별 <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all ${
                        errors.gender ? 'border-red-300 bg-red-50' : 'border-gray-300'
                      }`}
                    >
                      <option value="">선택해주세요</option>
                      <option value="남성">남성</option>
                      <option value="여성">여성</option>
                    </select>
                    {errors.gender && <p className="mt-1 text-sm text-red-600">{errors.gender}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">국적</label>
                    <input
                      type="text"
                      name="nationality"
                      value={formData.nationality}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                      placeholder="대한민국"
                      defaultValue="대한민국"
                    />
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
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all ${
                      errors.address ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                    placeholder="서울시 강남구 테헤란로 123"
                  />
                  {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address}</p>}
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      연락처 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all ${
                        errors.phone ? 'border-red-300 bg-red-50' : 'border-gray-300'
                      }`}
                      placeholder="010-0000-0000"
                    />
                    {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      이메일 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all ${
                        errors.email ? 'border-red-300 bg-red-50' : 'border-gray-300'
                      }`}
                      placeholder="example@email.com"
                    />
                    {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                  </div>
                </div>
              </div>
            )}

            {/* Step 1: Education Info */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      최종학력 <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="finalEducation"
                      value={formData.finalEducation}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all ${
                        errors.finalEducation ? 'border-red-300 bg-red-50' : 'border-gray-300'
                      }`}
                    >
                      <option value="">선택해주세요</option>
                      <option value="학사">학사</option>
                      <option value="석사">석사</option>
                      <option value="박사">박사</option>
                    </select>
                    {errors.finalEducation && <p className="mt-1 text-sm text-red-600">{errors.finalEducation}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">학위 구분</label>
                    <input
                      type="text"
                      name="degree"
                      value={formData.degree}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                      placeholder="예: 공학박사, 경영학석사"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    대학교명 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="university"
                    value={formData.university}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all ${
                      errors.university ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                    placeholder="○○대학교"
                  />
                  {errors.university && <p className="mt-1 text-sm text-red-600">{errors.university}</p>}
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      전공 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="major"
                      value={formData.major}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all ${
                        errors.major ? 'border-red-300 bg-red-50' : 'border-gray-300'
                      }`}
                      placeholder="컴퓨터공학, 경영학 등"
                    />
                    {errors.major && <p className="mt-1 text-sm text-red-600">{errors.major}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      졸업년도 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="graduationYear"
                      value={formData.graduationYear}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all ${
                        errors.graduationYear ? 'border-red-300 bg-red-50' : 'border-gray-300'
                      }`}
                      placeholder="2020"
                      min="1970"
                      max="2024"
                    />
                    {errors.graduationYear && <p className="mt-1 text-sm text-red-600">{errors.graduationYear}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">추가 교육이력</label>
                  <textarea
                    name="additionalEducation"
                    value={formData.additionalEducation}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all resize-none"
                    placeholder="연수, 자격증, 추가 학위 등 관련 교육 이력을 입력해주세요"
                  />
                </div>
              </div>
            )}

            {/* Step 2: Career Info */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      현재 소속 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="currentCompany"
                      value={formData.currentCompany}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all ${
                        errors.currentCompany ? 'border-red-300 bg-red-50' : 'border-gray-300'
                      }`}
                      placeholder="회사명 또는 기관명"
                    />
                    {errors.currentCompany && <p className="mt-1 text-sm text-red-600">{errors.currentCompany}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      현재 직책 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="currentPosition"
                      value={formData.currentPosition}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all ${
                        errors.currentPosition ? 'border-red-300 bg-red-50' : 'border-gray-300'
                      }`}
                      placeholder="부장, 교수, 연구원 등"
                    />
                    {errors.currentPosition && <p className="mt-1 text-sm text-red-600">{errors.currentPosition}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    총 경력 <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="workExperience"
                    value={formData.workExperience}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all ${
                      errors.workExperience ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                  >
                    <option value="">선택해주세요</option>
                    <option value="5년 미만">5년 미만</option>
                    <option value="5-10년">5-10년</option>
                    <option value="10-15년">10-15년</option>
                    <option value="15-20년">15-20년</option>
                    <option value="20년 이상">20년 이상</option>
                  </select>
                  {errors.workExperience && <p className="mt-1 text-sm text-red-600">{errors.workExperience}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    산업 분야 경력 <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="industryExperience"
                    value={formData.industryExperience}
                    onChange={handleInputChange}
                    rows="4"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all resize-none ${
                      errors.industryExperience ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                    placeholder="해당 산업 분야에서의 주요 경력 사항을 구체적으로 기술해주세요"
                  />
                  {errors.industryExperience && (
                    <p className="mt-1 text-sm text-red-600">{errors.industryExperience}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">교육/강의 경험</label>
                  <textarea
                    name="teachingExperience"
                    value={formData.teachingExperience}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all resize-none"
                    placeholder="교육, 강의, 멘토링 등의 경험이 있다면 기술해주세요"
                  />
                </div>
              </div>
            )}

            {/* Step 3: Expertise Info */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    전문 분야 <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="expertiseField"
                    value={formData.expertiseField}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all ${
                      errors.expertiseField ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                  >
                    <option value="">선택해주세요</option>
                    <option value="반도체">반도체</option>
                    <option value="이차전지">이차전지</option>
                    <option value="디스플레이">디스플레이</option>
                    <option value="바이오">바이오</option>
                    <option value="인공지능">인공지능</option>
                    <option value="기타">기타</option>
                  </select>
                  {errors.expertiseField && <p className="mt-1 text-sm text-red-600">{errors.expertiseField}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">보유 자격증 및 인증</label>
                  <textarea
                    name="certifications"
                    value={formData.certifications}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all resize-none"
                    placeholder="관련 자격증, 전문 인증, 면허 등을 나열해주세요"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">논문 및 출간물</label>
                  <textarea
                    name="publications"
                    value={formData.publications}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all resize-none"
                    placeholder="주요 논문, 저서, 특허 등이 있다면 기술해주세요"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">연구 분야</label>
                  <textarea
                    name="researchAreas"
                    value={formData.researchAreas}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all resize-none"
                    placeholder="현재 진행 중이거나 관심 있는 연구 분야를 기술해주세요"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    강의 가능 과목 <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="teachableSubjects"
                    value={formData.teachableSubjects}
                    onChange={handleInputChange}
                    rows="4"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all resize-none ${
                      errors.teachableSubjects ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                    placeholder="강의 가능한 과목명과 간단한 설명을 기술해주세요"
                  />
                  {errors.teachableSubjects && <p className="mt-1 text-sm text-red-600">{errors.teachableSubjects}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">포트폴리오 URL</label>
                  <input
                    type="url"
                    name="portfolioUrl"
                    value={formData.portfolioUrl}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                    placeholder="https://example.com (선택사항)"
                  />
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
                    navigate('/');
                  }}
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
