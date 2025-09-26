import React from 'react';

// Tailwind CSS 클래스 유틸리티 함수
const cn = (...classes) => classes.filter(Boolean).join(' ');

// 스타일 변형 함수들
const getInputStyles = (error, value, theme = 'blue') => {
  const baseClasses = 'w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-blue-500 transition-all';
  const themeClasses = {
    blue: 'focus:ring-blue-500',
    purple: 'focus:ring-purple-500',
  };
  const focusClass = themeClasses[theme] || themeClasses.blue;

  if (error) {
    return cn(baseClasses, 'border-red-300 bg-red-50', focusClass);
  } else if (value && (typeof value === 'string' ? value.trim() !== '' : value !== null)) {
    return cn(baseClasses, 'border-gray-300 bg-gray-100', focusClass);
  } else {
    return cn(baseClasses, 'border-gray-300', focusClass);
  }
};

const getTextareaStyles = (error, value, theme = 'blue') => {
  const baseClasses =
    'w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-blue-500 transition-all resize-none';
  const themeClasses = {
    blue: 'focus:ring-blue-500',
    purple: 'focus:ring-purple-500',
  };
  const focusClass = themeClasses[theme] || themeClasses.blue;

  if (error) {
    return cn(baseClasses, 'border-red-300 bg-red-50', focusClass);
  } else if (value && (typeof value === 'string' ? value.trim() !== '' : value !== null)) {
    return cn(baseClasses, 'border-gray-300 bg-gray-100', focusClass);
  } else {
    return cn(baseClasses, 'border-gray-300', focusClass);
  }
};

// FormField 컴포넌트
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
  theme = 'blue', // 테마 추가
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
        className={getTextareaStyles(error, value, theme)}
        placeholder={placeholder}
      />
    ) : type === 'select' ? (
      <select name={name} value={value} onChange={onChange} className={getInputStyles(error, value, theme)}>
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
        className={getInputStyles(error, value, theme)}
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
          className={`${getInputStyles(error, value, theme)} cursor-pointer pr-12 [color-scheme:light] [appearance:none]`}
          placeholder={placeholder}
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
          value={value?.replace('(주)', '') || ''}
          onChange={onChange}
          className={`${getInputStyles(error, value, theme)} rounded-l-none border-l-0`}
          placeholder="기업명을 입력해주세요"
        />
      </div>
    ) : type === 'address' ? (
      <div className="space-y-3">
        <div className="flex gap-2">
          <input
            type="text"
            name={name}
            value={value}
            onChange={onChange}
            onClick={onChange}
            className={`${getInputStyles(error, value, theme)} cursor-pointer`}
            placeholder="주소를 검색해주세요"
            readOnly
          />
          <button
            type="button"
            onClick={onChange}
            className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200 whitespace-nowrap"
          >
            주소 검색
          </button>
        </div>
        {formData && (
          <input
            type="text"
            name={`${name}Detail`}
            value={formData[`${name}Detail`] || ''}
            onChange={handleInputChange}
            className={getInputStyles(errors?.[`${name}Detail`], formData[`${name}Detail`], theme)}
            placeholder="상세주소를 입력해주세요"
          />
        )}
        {errors?.[`${name}Detail`] && <p className="mt-1 text-sm text-red-600">{errors[`${name}Detail`]}</p>}
      </div>
    ) : type === 'checkbox' ? (
      <div className="space-y-3">
        <div
          className={`p-4 rounded-lg border transition-all duration-200 ${
            value && value.length > 0 ? 'bg-gray-100 border-gray-200' : 'bg-transparent border-gray-200'
          }`}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {options?.map(option => (
              <label
                key={option.value}
                className={`flex items-center space-x-3 cursor-pointer p-3 rounded-lg border transition-all duration-200 ${
                  value?.includes(option.value)
                    ? 'bg-white border-gray-300'
                    : 'bg-white border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <div className="relative">
                  <input
                    type="checkbox"
                    name={name}
                    value={option.value}
                    checked={value?.includes(option.value) || false}
                    onChange={e => {
                      console.log('FormField 체크박스 onChange:', {
                        name,
                        value: e.target.value,
                        checked: e.target.checked,
                      });
                      if (onChange) {
                        onChange(e);
                      }
                    }}
                    className="sr-only"
                  />
                  <div
                    className={`w-4 h-4 border-2 rounded transition-all duration-200 flex items-center justify-center ${
                      value?.includes(option.value) ? 'bg-blue-600 border-blue-600' : 'bg-white border-gray-300'
                    }`}
                  >
                    {value?.includes(option.value) && (
                      <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                </div>
                <span
                  className={`text-sm transition-colors duration-200 ${
                    value?.includes(option.value) ? 'text-blue-700 font-medium' : 'text-gray-700'
                  }`}
                >
                  {option.label}
                </span>
              </label>
            ))}
          </div>
        </div>
        {/* 기타 입력 필드 */}
        {value?.includes('other') && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <label className="block text-sm font-medium text-gray-700 mb-2">기타 분야를 입력해주세요</label>
            <input
              type="text"
              name={`${name}Other`}
              value={formData?.[`${name}Other`] || ''}
              onChange={onChange}
              placeholder="기타 분야를 입력해주세요"
              className={getInputStyles(errors?.[`${name}Other`], formData?.[`${name}Other`], theme)}
            />
            {errors?.[`${name}Other`] && <p className="mt-1 text-sm text-red-600">{errors[`${name}Other`]}</p>}
          </div>
        )}
      </div>
    ) : (
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className={getInputStyles(error, value, theme)}
        placeholder={placeholder}
        maxLength={maxLength}
        onKeyPress={onKeyPress}
        {...(type === 'number' && { min: '1970', max: '2024' })}
      />
    )}

    {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
  </div>
);

export default FormField;
