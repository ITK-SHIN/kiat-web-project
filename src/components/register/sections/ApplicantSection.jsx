import React from 'react';
import FormField from '../../common/FormField';

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

// 신청인 정보 섹션 컴포넌트
const ApplicantSection = ({ formData, errors, handleInputChange, handleAddressSearch, theme = 'blue' }) => {
  return (
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
          theme={theme}
        />
        <FormField
          label="설립일"
          name="establishedDate"
          type="date"
          value={formData.establishedDate}
          onChange={handleInputChange}
          error={errors.establishedDate}
          required
          theme={theme}
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
          theme={theme}
        />
        <FormField
          label="사업자등록번호(법인등록번호)"
          name="businessNumber"
          value={formData.businessNumber}
          onChange={handleInputChange}
          error={errors.businessNumber}
          placeholder="000-00-00000"
          required
          theme={theme}
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
          theme={theme}
        />
        <FormField
          label="팩스"
          name="fax"
          value={formData.fax}
          onChange={handleInputChange}
          error={errors.fax}
          placeholder="02-1234-5679"
          maxLength={12}
          onKeyPress={e => {
            // 숫자가 아닌 키는 입력 차단
            if (
              !/[0-9]/.test(e.key) &&
              !['Backspace', 'Delete', 'Tab', 'Enter', 'ArrowLeft', 'ArrowRight'].includes(e.key)
            ) {
              e.preventDefault();
            }
          }}
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
          「첨단산업 인재혁신 특별법」 제5조제2항, 같은 법 시행령 제17조제2항 및 같은 법 시행규칙 제2조제1항에 따라
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
          theme={theme}
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
          theme={theme}
        />
      </div>
    </div>
  );
};

export default ApplicantSection;
