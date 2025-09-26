// Tailwind CSS 클래스 유틸리티 함수
export const cn = (...classes) => classes.filter(Boolean).join(' ');

// 테마별 색상 정의
export const themes = {
  blue: {
    primary: 'blue',
    focus: 'focus:ring-blue-500',
    border: 'border-blue-300',
    bg: 'bg-blue-50',
    text: 'text-blue-700',
    gradient: 'from-blue-600 to-indigo-600',
  },
  purple: {
    primary: 'purple',
    focus: 'focus:ring-purple-500',
    border: 'border-purple-300',
    bg: 'bg-purple-50',
    text: 'text-purple-700',
    gradient: 'from-purple-600 to-pink-600',
  },
};

// 스타일 변형 함수들
export const getStepStyles = (index, currentStep, theme = 'blue') => {
  const baseClasses = 'p-4 rounded-xl border-2 transition-all duration-300';
  const themeConfig = themes[theme];

  if (index === currentStep) {
    return cn(baseClasses, `${themeConfig.border} ${themeConfig.bg}`);
  } else if (index < currentStep) {
    return cn(baseClasses, 'border-green-300 bg-green-50');
  } else {
    return cn(baseClasses, 'border-gray-200 bg-gray-50');
  }
};

export const getStepTitleStyles = (index, currentStep, theme = 'blue') => {
  const baseClasses = 'font-bold';
  const themeConfig = themes[theme];

  if (index === currentStep) {
    return cn(baseClasses, themeConfig.text);
  } else if (index < currentStep) {
    return cn(baseClasses, 'text-green-700');
  } else {
    return cn(baseClasses, 'text-gray-600');
  }
};

export const getInputStyles = (error, value, theme = 'blue') => {
  const baseClasses = 'w-full px-4 py-3 border rounded-lg focus:ring-2 transition-all';
  const themeConfig = themes[theme];

  if (error) {
    return cn(baseClasses, 'border-red-300 bg-red-50', themeConfig.focus);
  } else if (value && (typeof value === 'string' ? value.trim() !== '' : value !== null)) {
    return cn(baseClasses, 'border-gray-300 bg-gray-100', themeConfig.focus);
  } else {
    return cn(baseClasses, 'border-gray-300', themeConfig.focus);
  }
};

export const getTextareaStyles = (error, value, theme = 'blue') => {
  const baseClasses = 'w-full px-4 py-3 border rounded-lg focus:ring-2 transition-all resize-none';
  const themeConfig = themes[theme];

  if (error) {
    return cn(baseClasses, 'border-red-300 bg-red-50', themeConfig.focus);
  } else if (value && (typeof value === 'string' ? value.trim() !== '' : value !== null)) {
    return cn(baseClasses, 'border-gray-300 bg-gray-100', themeConfig.focus);
  } else {
    return cn(baseClasses, 'border-gray-300', themeConfig.focus);
  }
};

export const getFormHeaderStyles = (theme = 'blue') => {
  const themeConfig = themes[theme];
  return `bg-gradient-to-r ${themeConfig.gradient}`;
};
