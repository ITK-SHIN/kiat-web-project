import { useCallback } from 'react';

// 파일 관리 커스텀 훅
const useFileManagement = (formData, setFormData) => {
  // 파일 업로드
  const uploadFile = useCallback(
    (fieldName, file) => {
      setFormData(prev => ({
        ...prev,
        [fieldName]: file,
      }));
    },
    [setFormData]
  );

  // 파일 삭제
  const removeFile = useCallback(
    fieldName => {
      setFormData(prev => ({
        ...prev,
        [fieldName]: null,
      }));
    },
    [setFormData]
  );

  // 파일 크기 검증
  const validateFileSize = useCallback((file, maxSizeMB = 100) => {
    const maxSizeBytes = maxSizeMB * 1024 * 1024;
    return file.size <= maxSizeBytes;
  }, []);

  // 파일 형식 검증
  const validateFileType = useCallback((file, allowedTypes = []) => {
    if (allowedTypes.length === 0) return true;
    const fileExtension = file.name.split('.').pop().toLowerCase();
    return allowedTypes.includes(`.${fileExtension}`);
  }, []);

  // 파일 정보 가져오기
  const getFileInfo = useCallback(
    fieldName => {
      const file = formData[fieldName];
      if (!file) return null;

      return {
        name: file.name,
        size: file.size,
        sizeMB: (file.size / 1024 / 1024).toFixed(2),
        type: file.type,
      };
    },
    [formData]
  );

  // 업로드된 파일 목록
  const getUploadedFiles = useCallback(() => {
    const fileFields = [
      'applicationForm',
      'activityOverview',
      'smeConfirmation',
      'corporateRegistration',
      'buildingRegistration',
      'businessLicense',
      'auditReport',
      'performanceCertificate',
      'privacyConsent',
      'participationConfirmation',
      'personnelResume',
      'safetyChecklist',
      'cooperationAgreement',
    ];

    return fileFields
      .map(fieldName => ({
        fieldName,
        file: formData[fieldName],
        info: getFileInfo(fieldName),
      }))
      .filter(({ file }) => file);
  }, [formData, getFileInfo]);

  // 파일 통계
  const getFileStats = useCallback(() => {
    const uploadedFiles = getUploadedFiles();
    const totalFiles = uploadedFiles.length;
    const totalSize = uploadedFiles.reduce((sum, { info }) => sum + (info ? parseFloat(info.sizeMB) : 0), 0);

    return { totalFiles, totalSize };
  }, [getUploadedFiles]);

  return {
    uploadFile,
    removeFile,
    validateFileSize,
    validateFileType,
    getFileInfo,
    getUploadedFiles,
    getFileStats,
  };
};

export default useFileManagement;
