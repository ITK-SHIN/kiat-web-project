import React, { memo } from 'react';
import { getStepStyles, getStepTitleStyles } from '../../utils/formStyles';

// Person-register 전용 진행 단계 컴포넌트
const ProgressSteps = memo(({ currentStep, sections, theme = 'purple' }) => {
  const progressPercentage = ((currentStep + 1) / sections.length) * 100;

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg mb-8">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900">진행 단계</h3>
        <span className="text-sm text-gray-600">
          {currentStep + 1} / {sections.length}
        </span>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
        <div
          className="bg-gradient-to-r from-purple-500 to-pink-600 h-2 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>

      <div className="flex flex-col space-y-4">
        {sections.map((section, index) => (
          <div key={section.id} className={getStepStyles(index, currentStep, theme)}>
            <div className="flex items-center space-x-3 mb-2">
              <span className="text-2xl">{section.icon}</span>
              <h4 className={getStepTitleStyles(index, currentStep, theme)}>{section.title}</h4>
            </div>
            <p className="text-sm text-gray-600">{section.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
});

ProgressSteps.displayName = 'ProgressSteps';

export default ProgressSteps;
