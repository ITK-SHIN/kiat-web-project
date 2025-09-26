import React, { memo } from 'react';
import FormField from '../../common/FormField';

// Person-register 신청인 정보 섹션 컴포넌트
const ApplicantSection = memo(({ formData, errors, handleInputChange, handleAddressSearch, theme }) => {
  // 전문 분야 옵션
  const expertiseOptions = [
    { value: 'ai', label: '인공지능' },
    { value: 'semiconductor', label: '반도체' },
    { value: 'battery', label: '이차전지' },
    { value: 'display', label: '디스플레이' },
    { value: 'bio', label: '바이오' },
    { value: 'robot', label: '로봇' },
    { value: 'energy', label: '신재생에너지' },
    { value: 'other', label: '기타' },
  ];

  // 자격 옵션
  const qualificationOptions = [
    { value: 'engineer', label: '기술사' },
    { value: 'master', label: '기능장' },
    { value: 'none', label: '해당없음' },
  ];

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <FormField
          label="이름"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          error={errors.name}
          placeholder="홍길동"
          required
          theme={theme}
        />
        <FormField
          label="생년월일"
          name="birthDate"
          type="date"
          value={formData.birthDate}
          onChange={handleInputChange}
          error={errors.birthDate}
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
          placeholder="숫자만 입력 (예: 01012345678)"
          required
          theme={theme}
        />
        <FormField
          label="전자우편"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          error={errors.email}
          placeholder="example@email.com"
          required
          theme={theme}
        />
      </div>

      <FormField
        label="주소"
        name="address"
        type="address"
        value={formData.address}
        onChange={handleAddressSearch}
        error={errors.address}
        formData={formData}
        errors={errors}
        handleInputChange={handleInputChange}
        required
        theme={theme}
      />

      <FormField
        label="전문 분야"
        name="expertiseField"
        type="checkbox"
        value={formData.expertiseField}
        onChange={handleInputChange}
        error={errors.expertiseField}
        options={expertiseOptions}
        formData={formData}
        errors={errors}
        required
        theme={theme}
      />

      <FormField
        label="국가기술자격 취득여부"
        name="qualificationStatus"
        type="select"
        value={formData.qualificationStatus}
        onChange={handleInputChange}
        error={errors.qualificationStatus}
        options={qualificationOptions}
        required
        theme={theme}
      />
    </div>
  );
});

ApplicantSection.displayName = 'ApplicantSection';

export default ApplicantSection;
