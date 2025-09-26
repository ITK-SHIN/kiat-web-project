import React from 'react';
import FormField from '../../common/FormField';

// 첨부 파일 섹션 컴포넌트
const FileSection = ({ formData, errors, handleInputChange, theme = 'blue' }) => {
  return (
    <div className="space-y-6">
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
              기업인재개발기관 등록을 위해 필요한 서류를 첨부해주세요. 파일은 PDF, DOC, DOCX, JPG, PNG 형식을
              지원합니다. <br />
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
          theme={theme}
        />

        <FormField
          label="법인등록 등기부등본"
          name="corporateRegistration"
          type="file"
          onChange={handleInputChange}
          error={errors.corporateRegistration}
          accept=".pdf,.jpg,.jpeg,.png"
          required
          theme={theme}
        />

        <FormField
          label="강의실이 포함된 건물의 등기부 등본 또는 임대차 계약서"
          name="buildingRegistration"
          type="file"
          onChange={handleInputChange}
          error={errors.buildingRegistration}
          accept=".pdf,.jpg,.jpeg,.png"
          required
          theme={theme}
        />

        <FormField
          label="사업자등록증 사본"
          name="businessLicense"
          type="file"
          onChange={handleInputChange}
          error={errors.businessLicense}
          accept=".pdf,.jpg,.jpeg,.png"
          required
          theme={theme}
        />

        <FormField
          label="회계감사보고서 또는 결산재무제표(최근 3개년)"
          name="auditReport"
          type="file"
          onChange={handleInputChange}
          error={errors.auditReport}
          accept=".pdf,.doc,.docx,.xls,.xlsx"
          required
          theme={theme}
        />

        <FormField
          label="최근 3년 간 실적증명원"
          name="performanceCertificate"
          type="file"
          onChange={handleInputChange}
          error={errors.performanceCertificate}
          accept=".pdf,.doc,.docx"
          required
          theme={theme}
        />

        <FormField
          label="개인정보&과세정보 제공활용동의서, 윤리청렴&보안서약서"
          name="privacyConsent"
          type="file"
          onChange={handleInputChange}
          error={errors.privacyConsent}
          accept=".pdf,.doc,.docx"
          required
          theme={theme}
        />

        <FormField
          label="신청기관 대표의 참여의사 확인서"
          name="participationConfirmation"
          type="file"
          onChange={handleInputChange}
          error={errors.participationConfirmation}
          accept=".pdf,.doc,.docx"
          required
          theme={theme}
        />

        <FormField
          label="전담인력과 강의인력 이력서 및 경력증명서"
          name="personnelResume"
          type="file"
          onChange={handleInputChange}
          error={errors.personnelResume}
          accept=".pdf,.doc,.docx"
          required
          theme={theme}
        />

        <FormField
          label="안전관리형 과제 자가점검표"
          name="safetyChecklist"
          type="file"
          onChange={handleInputChange}
          error={errors.safetyChecklist}
          accept=".pdf,.doc,.docx"
          required
          theme={theme}
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
};

export default FileSection;
