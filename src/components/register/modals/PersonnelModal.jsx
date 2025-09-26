import React, { useState } from 'react';

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
    <div className="fixed inset-0 bg-transparent flex items-center justify-center z-50 p-4">
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
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 relative z-10 pointer-events-auto ${
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

export default PersonnelModal;
