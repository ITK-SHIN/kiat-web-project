import { useCallback } from 'react';

// 장비 관리 커스텀 훅
const useEquipmentManagement = (formData, setFormData) => {
  // 장비 추가
  const addEquipment = useCallback(
    equipmentData => {
      const newEquipment = {
        id: Date.now(),
        order: formData.equipment.length + 1,
        ...equipmentData,
      };

      setFormData(prev => ({
        ...prev,
        equipment: [...prev.equipment, newEquipment],
      }));
    },
    [formData.equipment.length, setFormData]
  );

  // 장비 수정
  const updateEquipment = useCallback(
    (equipmentId, field, value) => {
      setFormData(prev => ({
        ...prev,
        equipment: prev.equipment.map(equipment =>
          equipment.id === equipmentId ? { ...equipment, [field]: value } : equipment
        ),
      }));
    },
    [setFormData]
  );

  // 장비 삭제
  const removeEquipment = useCallback(
    equipmentId => {
      setFormData(prev => {
        // 해당 장비를 삭제
        const filteredEquipment = prev.equipment.filter(equipment => equipment.id !== equipmentId);
        
        // 삭제 후 순번을 1부터 연속되도록 재정렬
        const reorderedEquipment = filteredEquipment.map((equipment, index) => ({
          ...equipment,
          order: index + 1,
        }));
        
        return {
          ...prev,
          equipment: reorderedEquipment,
        };
      });
    },
    [setFormData]
  );

  // 장비 순서 재정렬
  const reorderEquipment = useCallback(
    (equipmentId, newOrder) => {
      setFormData(prev => ({
        ...prev,
        equipment: prev.equipment.map(equipment =>
          equipment.id === equipmentId ? { ...equipment, order: newOrder } : equipment
        ),
      }));
    },
    [setFormData]
  );

  // 장비 통계
  const getEquipmentStats = useCallback(() => {
    const total = formData.equipment.length;
    const totalQuantity = formData.equipment.reduce((sum, equipment) => sum + (parseInt(equipment.quantity) || 0), 0);

    return { total, totalQuantity };
  }, [formData.equipment]);

  return {
    addEquipment,
    updateEquipment,
    removeEquipment,
    reorderEquipment,
    getEquipmentStats,
  };
};

export default useEquipmentManagement;
