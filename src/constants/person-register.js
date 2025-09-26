// Person-register 페이지 상수 데이터

// 폼 섹션 데이터
export const formSections = [
  {
    id: 'applicant',
    title: '전문양성인 등록 신청서',
    icon: '👤',
    description: '신청인 기본 정보를 입력해주세요',
  },
  {
    id: 'activity',
    title: '전문양성인 활동계획서',
    icon: '📋',
    description: '활동 목표 및 계획을 입력해주세요',
  },
  {
    id: 'file',
    title: '첨부 파일',
    icon: '📁',
    description: '필요한 서류를 첨부해주세요',
  },
];

// 전문 분야 옵션
export const expertiseOptions = [
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
export const qualificationOptions = [
  { value: 'engineer', label: '기술사' },
  { value: 'master', label: '기능장' },
  { value: 'none', label: '해당없음' },
];

// 폼 검증 규칙
export const validationRules = {
  applicant: {
    name: { required: true, message: '이름을 입력해주세요' },
    birthDate: { required: true, message: '생년월일을 입력해주세요' },
    phone: { required: true, message: '전화번호를 입력해주세요' },
    email: { required: true, message: '전자우편을 입력해주세요' },
    address: { required: true, message: '주소를 입력해주세요' },
    expertiseField: { required: true, message: '전문 분야를 하나 이상 선택해주세요' },
    expertiseFieldOther: { required: false, message: '기타 전문 분야를 입력해주세요' },
    qualificationStatus: { required: true, message: '국가기술자격 취득여부를 선택해주세요' },
  },
  activity: {
    goalSetting: { required: true, message: '목표 설정을 입력해주세요' },
    currentCapabilityAnalysis: { required: true, message: '현재 역량 및 부족한 점 분석을 입력해주세요' },
    detailedExecutionPlan: { required: true, message: '세부 실행 계획을 입력해주세요' },
  },
  file: {
    careerCertificate: { required: true, message: '경력증명서를 첨부해주세요' },
    residentRegistration: { required: true, message: '주민등록등본을 첨부해주세요' },
    privacyConsent: { required: true, message: '개인정보 제공활용동의서를 첨부해주세요' },
    ethicsPledge: { required: true, message: '윤리청렴 및 보안서약서를 첨부해주세요' },
  },
};

// 초기 폼 데이터
export const initialFormData = {
  // 신청인 정보
  name: '',
  birthDate: '',
  phone: '',
  email: '',
  address: '',
  addressDetail: '',
  expertiseField: [],
  expertiseFieldOther: '',
  qualificationStatus: '', // 기술사, 기능장, 해당없음

  // 활동계획서
  goalSetting: '',
  currentCapabilityAnalysis: '',
  detailedExecutionPlan: '',

  // 첨부 파일
  careerCertificate: null,
  residentRegistration: null,
  privacyConsent: null,
  ethicsPledge: null,
};
