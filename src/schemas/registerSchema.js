import * as yup from 'yup';

// 첨단산업 분야 옵션
export const industryFieldOptions = [
  { value: 'ai', label: '인공지능' },
  { value: 'bigdata', label: '빅데이터' },
  { value: 'cloud', label: '클라우드' },
  { value: 'iot', label: '사물인터넷' },
  { value: 'blockchain', label: '블록체인' },
  { value: 'cybersecurity', label: '사이버보안' },
  { value: 'robotics', label: '로봇' },
  { value: 'bio', label: '바이오' },
  { value: 'nano', label: '나노' },
  { value: 'energy', label: '신재생에너지' },
  { value: 'other', label: '기타' },
];

// 기본 폼 데이터 스키마
export const registerSchema = yup.object({
  // 신청인 정보
  companyName: yup
    .string()
    .required('기업명을 입력해주세요')
    .test('not-default', '기업명을 입력해주세요', value => value && value.trim() !== '(주)'),
  establishedDate: yup.string().required('설립일을 입력해주세요'),
  representative: yup.string().required('대표자명을 입력해주세요'),
  businessNumber: yup
    .string()
    .required('사업자등록번호(법인등록번호)를 입력해주세요')
    .matches(/^[0-9]{3}-[0-9]{2}-[0-9]{5}$/, '올바른 사업자등록번호 형식을 입력해주세요 (예: 123-45-67890)'),
  phone: yup
    .string()
    .required('전화번호를 입력해주세요')
    .matches(/^[0-9-+\s()]{10,15}$/, '올바른 전화번호 형식을 입력해주세요 (예: 02-1234-5678)'),
  fax: yup
    .string()
    .matches(/^[0-9]{2}-[0-9]{4}-[0-9]{4}$/, '올바른 팩스번호 형식을 입력해주세요 (예: 02-1111-1111)')
    .nullable(),
  email: yup
    .string()
    .required('전자우편을 입력해주세요')
    .email('올바른 이메일 형식을 입력해주세요 (예: example@company.com)'),
  officeAddress: yup.string().required('사무소 소재지를 입력해주세요'),
  officeAddressDetail: yup.string().nullable(),
  industryField: yup.array().min(1, '첨단산업 분야를 하나 이상 선택해주세요').required('첨단산업 분야를 선택해주세요'),
  industryFieldOther: yup.string().when('industryField', {
    is: industryField => industryField && industryField.includes('other'),
    then: schema => schema.required('기타 분야를 입력해주세요'),
    otherwise: schema => schema.nullable(),
  }),
  applicationDate: yup.string().required('신청일자를 입력해주세요'),
  applicant: yup.string().required('신청인을 입력해주세요'),

  // 활동 정보
  programContent: yup.string().required('교육프로그램 내용을 입력해주세요'),
  personnel: yup
    .array()
    .min(1, '최소 1명의 인력 정보를 입력해주세요')
    .test('complete-personnel', '모든 인력의 구분, 직위, 이름을 입력해주세요', function (personnel) {
      if (!personnel || personnel.length === 0) return false;
      return personnel.every(person => person.type && person.position?.trim() && person.name?.trim());
    }),
  equipment: yup
    .array()
    .min(1, '최소 1개의 교육장비 정보를 입력해주세요')
    .test('complete-equipment', '모든 장비의 장비명과 용도를 입력해주세요', function (equipment) {
      if (!equipment || equipment.length === 0) return false;
      return equipment.every(item => item.name?.trim() && item.purpose?.trim());
    }),

  // 첨부파일
  smeConfirmation: yup.mixed().required('중견기업 및 중소기업 확인서를 첨부해주세요'),
  corporateRegistration: yup.mixed().required('법인등록 등기부등본을 첨부해주세요'),
  buildingRegistration: yup.mixed().required('강의실이 포함된 건물의 등기부 등본 또는 임대차 계약서를 첨부해주세요'),
  businessLicense: yup.mixed().required('사업자등록증 사본을 첨부해주세요'),
  auditReport: yup.mixed().required('회계감사보고서 또는 결산재무제표를 첨부해주세요'),
  performanceCertificate: yup.mixed().required('최근 3년 간 실적증명원을 첨부해주세요'),
  privacyConsent: yup.mixed().required('개인정보 및 과세정보 제공활용동의서를 첨부해주세요'),
  participationConfirmation: yup.mixed().required('신청기관 대표의 참여의사 확인서를 첨부해주세요'),
  personnelResume: yup.mixed().required('전담인력과 강의인력 이력서 및 경력증명서를 첨부해주세요'),
  safetyChecklist: yup.mixed().required('안전관리형 과제 자가점검표를 첨부해주세요'),
  cooperationAgreement: yup.mixed().nullable(),

  // 활동 관련 파일
  activityFiles: yup
    .object()
    .test(
      'required-activity-files',
      '기업의 조직도, 교육훈련기관 조직, 교육훈련부서 도면을 모두 첨부해주세요',
      function (activityFiles) {
        const requiredFiles = ['organizationChart', 'trainingOrganization', 'trainingFloorPlan'];
        return requiredFiles.every(fileType => activityFiles?.[fileType]);
      }
    ),
});

// 인력 정보 스키마
export const personnelSchema = yup.object({
  type: yup.string().required('구분을 선택해주세요'),
  position: yup.string().required('직위를 입력해주세요'),
  name: yup.string().required('이름을 입력해주세요'),
  phone: yup.string().required('연락처를 입력해주세요'),
  email: yup.string().email('올바른 이메일 형식을 입력해주세요').required('이메일을 입력해주세요'),
  career: yup.string().required('경력을 입력해주세요'),
  education: yup.string().required('학력을 입력해주세요'),
  major: yup.string().required('전공을 입력해주세요'),
  experience: yup.string().required('경험을 입력해주세요'),
  certificate: yup.string().nullable(),
});

// 장비 정보 스키마
export const equipmentSchema = yup.object({
  name: yup.string().required('장비명을 입력해주세요'),
  purpose: yup.string().required('용도를 입력해주세요'),
  quantity: yup.string().required('수량을 입력해주세요'),
  remarks: yup.string().nullable(),
});

// 기본값
export const defaultValues = {
  companyName: '(주)',
  establishedDate: '',
  representative: '',
  businessNumber: '',
  phone: '',
  fax: '',
  email: '',
  officeAddress: '',
  officeAddressDetail: '',
  industryField: [],
  industryFieldOther: '',
  applicationDate: '',
  applicant: '',
  programContent: '',
  personnel: [],
  equipment: [],
  smeConfirmation: null,
  corporateRegistration: null,
  buildingRegistration: null,
  businessLicense: null,
  auditReport: null,
  performanceCertificate: null,
  privacyConsent: null,
  participationConfirmation: null,
  personnelResume: null,
  safetyChecklist: null,
  cooperationAgreement: null,
  activityFiles: {
    organizationChart: null,
    trainingOrganization: null,
    trainingFloorPlan: null,
  },
};
