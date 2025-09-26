import { useCallback, useMemo } from 'react';

// Person-register 전용 파일 관리 커스텀 훅
export const usePersonFileManagement = (formData, setFormData) => {
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

  // 파일 크기 검증 (Person-register는 10MB 제한)
  const validateFileSize = useCallback((file, maxSizeMB = 10) => {
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

  // Person-register 전용 파일 필드 목록
  const getPersonFileFields = useCallback(() => {
    return ['careerCertificate', 'residentRegistration', 'privacyConsent', 'ethicsPledge'];
  }, []);

  // 업로드된 파일 목록
  const getUploadedFiles = useCallback(() => {
    const fileFields = getPersonFileFields();

    return fileFields
      .map(fieldName => ({
        fieldName,
        file: formData[fieldName],
        info: getFileInfo(fieldName),
      }))
      .filter(({ file }) => file);
  }, [formData, getPersonFileFields, getFileInfo]);

  // 파일 통계
  const getFileStats = useCallback(() => {
    const uploadedFiles = getUploadedFiles();
    const totalFiles = uploadedFiles.length;
    const totalSize = uploadedFiles.reduce((sum, { info }) => sum + (info ? parseFloat(info.sizeMB) : 0), 0);

    return { totalFiles, totalSize };
  }, [getUploadedFiles]);

  // 필수 파일 검증
  const validateRequiredFiles = useCallback(() => {
    const fileFields = getPersonFileFields();
    const missingFiles = fileFields.filter(fieldName => !formData[fieldName]);

    return {
      isValid: missingFiles.length === 0,
      missingFiles,
    };
  }, [formData, getPersonFileFields]);

  // 파일 업로드 핸들러 (FormField와 연동)
  const handleFileUpload = useCallback(
    (fieldName, file) => {
      // 파일 크기 검증
      if (!validateFileSize(file)) {
        throw new Error('파일 크기가 10MB를 초과합니다.');
      }

      // 파일 형식 검증
      const allowedTypes = ['.pdf', '.doc', '.docx', '.jpg', '.jpeg', '.png'];
      if (!validateFileType(file, allowedTypes)) {
        throw new Error('지원하지 않는 파일 형식입니다.');
      }

      uploadFile(fieldName, file);
    },
    [uploadFile, validateFileSize, validateFileType]
  );

  // 메모이제이션된 파일 통계
  const memoizedFileStats = useMemo(() => getFileStats(), [getFileStats]);
  const memoizedUploadedFiles = useMemo(() => getUploadedFiles(), [getUploadedFiles]);

  return {
    uploadFile,
    removeFile,
    validateFileSize,
    validateFileType,
    getFileInfo,
    getUploadedFiles: memoizedUploadedFiles,
    getFileStats: memoizedFileStats,
    validateRequiredFiles,
    handleFileUpload,
  };
};
