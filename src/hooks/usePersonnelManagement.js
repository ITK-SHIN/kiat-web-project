import { useCallback } from 'react';

// 인력 관리 커스텀 훅
const usePersonnelManagement = (formData, setFormData) => {
  // 인력 추가
  const addPersonnel = useCallback(
    personnelData => {
      const newPersonnel = {
        id: Date.now(),
        ...personnelData,
      };

      setFormData(prev => ({
        ...prev,
        personnel: [...prev.personnel, newPersonnel],
      }));
    },
    [setFormData]
  );

  // 인력 수정
  const updatePersonnel = useCallback(
    (personnelId, field, value) => {
      setFormData(prev => ({
        ...prev,
        personnel: prev.personnel.map(person => (person.id === personnelId ? { ...person, [field]: value } : person)),
      }));
    },
    [setFormData]
  );

  // 인력 삭제
  const removePersonnel = useCallback(
    personnelId => {
      setFormData(prev => ({
        ...prev,
        personnel: prev.personnel.filter(person => person.id !== personnelId),
      }));
    },
    [setFormData]
  );

  // 인력 통계
  const getPersonnelStats = useCallback(() => {
    const total = formData.personnel.length;
    const dedicated = formData.personnel.filter(p => p.type === '전담').length;
    const lecture = formData.personnel.filter(p => p.type === '강의').length;

    return { total, dedicated, lecture };
  }, [formData.personnel]);

  return {
    addPersonnel,
    updatePersonnel,
    removePersonnel,
    getPersonnelStats,
  };
};

export default usePersonnelManagement;
