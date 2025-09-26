import React, { memo } from 'react';
import FormField from '../../common/FormField';

// Person-register 활동계획서 섹션 컴포넌트
const ActivitySection = memo(({ formData, errors, handleInputChange, theme }) => {
  return (
    <div className="space-y-6">
      <FormField
        label="목표 설정"
        name="goalSetting"
        type="textarea"
        value={formData.goalSetting}
        onChange={handleInputChange}
        error={errors.goalSetting}
        placeholder="전문양성인으로서 달성하고자 하는 목표를 구체적으로 작성해주세요"
        rows={8}
        required
        theme={theme}
      />

      <FormField
        label="현재 역량 및 부족한 점 분석"
        name="currentCapabilityAnalysis"
        type="textarea"
        value={formData.currentCapabilityAnalysis}
        onChange={handleInputChange}
        error={errors.currentCapabilityAnalysis}
        placeholder="현재 보유한 역량과 부족한 점을 분석하여 작성해주세요"
        rows={8}
        required
        theme={theme}
      />

      <FormField
        label="세부 실행 계획"
        name="detailedExecutionPlan"
        type="textarea"
        value={formData.detailedExecutionPlan}
        onChange={handleInputChange}
        error={errors.detailedExecutionPlan}
        placeholder="목표 달성을 위한 구체적인 실행 계획을 작성해주세요"
        rows={8}
        required
        theme={theme}
      />
    </div>
  );
});

ActivitySection.displayName = 'ActivitySection';

export default ActivitySection;
