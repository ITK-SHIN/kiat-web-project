import React, { memo, useState } from 'react';
import FormField from '../../common/FormField';

// Person-register 첨부파일 섹션 컴포넌트
const FileSection = memo(({ formData, errors, handleInputChange, theme, handleFileUpload, getFileStats }) => {
  const [isCareerGuideOpen, setIsCareerGuideOpen] = useState(false);

  return (
    <div className="space-y-6">
      {/* 파일첨부안내 */}
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
            <h4 className="text-sm font-medium text-blue-800 mb-1">첨부 파일 안내</h4>
            <p className="text-sm text-blue-700">
              전문양성인 등록을 위해 필요한 서류를 첨부해주세요. 파일은 PDF, DOC, DOCX, JPG, PNG 형식을 지원합니다.
              (최대 10MB)
            </p>
          </div>
        </div>
      </div>

      {/* 경력증명서 포함 내용 안내 (토글 가능) */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <button
          type="button"
          onClick={() => setIsCareerGuideOpen(!isCareerGuideOpen)}
          className="w-full flex items-center justify-between text-left"
        >
          <div>
            <p className="text-sm text-blue-800 font-medium">* 경력증명서 포함 내용</p>
            <p className="text-xs text-blue-600 mt-1">클릭하여 상세 내용 확인</p>
          </div>
          <svg
            className={`w-5 h-5 text-blue-600 transition-transform duration-200 ${
              isCareerGuideOpen ? 'rotate-180' : ''
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {isCareerGuideOpen && (
          <div className="mt-4 pt-4 border-t border-blue-200">
            <div className="text-sm text-blue-700 space-y-2 text-left">
              <p>• 첨단산업 관련 기술 보유 또는 종사 경력을 증빙할 수 있는 기술사 자격증명서</p>
              <p>• 기능장 자격증명서</p>
              <p>• 재직증명서</p>
              <p>• 기타 자격증 등</p>
            </div>
          </div>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <FormField
          label="경력증명서"
          name="careerCertificate"
          type="file"
          onChange={handleInputChange}
          error={errors.careerCertificate}
          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
          required
          theme={theme}
        />

        <FormField
          label="주민등록등본"
          name="residentRegistration"
          type="file"
          onChange={handleInputChange}
          error={errors.residentRegistration}
          accept=".pdf,.jpg,.jpeg,.png"
          required
          theme={theme}
        />

        <FormField
          label="개인정보 제공활용동의서"
          name="privacyConsent"
          type="file"
          onChange={handleInputChange}
          error={errors.privacyConsent}
          accept=".pdf,.doc,.docx"
          required
          theme={theme}
        />

        <FormField
          label="윤리청렴 및 보안서약서"
          name="ethicsPledge"
          type="file"
          onChange={handleInputChange}
          error={errors.ethicsPledge}
          accept=".pdf,.doc,.docx"
          required
          theme={theme}
        />
      </div>

      {/* 첨부된 파일 목록 표시 */}
      <div className="mt-6">
        <h4 className="text-sm font-medium text-gray-700 mb-3">첨부된 파일</h4>
        <div className="space-y-2">
          {Object.entries(formData).map(([key, file]) => {
            if (
              key.startsWith('careerCertificate') ||
              key.startsWith('residentRegistration') ||
              key.startsWith('privacyConsent') ||
              key.startsWith('ethicsPledge')
            ) {
              if (file) {
                const fieldLabels = {
                  careerCertificate: '경력증명서',
                  residentRegistration: '주민등록등본',
                  privacyConsent: '개인정보 제공활용동의서',
                  ethicsPledge: '윤리청렴 및 보안서약서',
                };

                return (
                  <div key={key} className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
          {Object.values(formData).filter(file => file && typeof file === 'object' && file.name).length === 0 && (
            <p className="text-sm text-gray-500 italic">첨부된 파일이 없습니다.</p>
          )}
        </div>
      </div>
    </div>
  );
});

FileSection.displayName = 'FileSection';

export default FileSection;
