// Carousel 슬라이드 데이터
export const carouselData = [
  {
    id: 1,
    title: '기업인재개발기관 지정',
    description: '체계적인 인재양성 프로그램으로 기업 경쟁력을 강화하세요',
    buttonText: '자세히 보기',
    buttonPath: '/login',
    theme: 'blue',
    backgroundImage: 'https://www.koita.or.kr/common/front/kor/images/main/bg_visual01.png',
  },
  {
    id: 2,
    title: '첨단산업아카데미',
    description: '미래 기술 인재 양성을 위한 전문 교육기관 등록',
    buttonText: '신청하기',
    buttonPath: '/register',
    theme: 'green',
    backgroundImage: 'https://www.koita.or.kr/common/front/kor/images/main/bg_visual01.png',
  },
  {
    id: 3,
    title: '인재혁신전문기업',
    description: '혁신적인 인재개발 솔루션으로 기업 성장을 지원합니다',
    buttonText: '등록안내',
    buttonPath: '/steps',
    theme: 'purple',
    backgroundImage: 'https://www.koita.or.kr/common/front/kor/images/main/bg_visual01.png',
  },
  {
    id: 4,
    title: '전문양성인 등록',
    description: '전문 역량을 갖춘 인재양성 전문가가 되어보세요',
    buttonText: '등록절차',
    buttonPath: '/person-login',
    theme: 'orange',
    backgroundImage: 'https://www.koita.or.kr/common/front/kor/images/main/bg_visual01.png',
  },
];

// 테마별 스타일 매핑
export const themeStyles = {
  blue: {
    gradient: 'from-blue-900/70 to-blue-600/50',
    buttonColor: 'text-blue-600',
  },
  green: {
    gradient: 'from-green-900/70 to-green-600/50',
    buttonColor: 'text-green-600',
  },
  purple: {
    gradient: 'from-purple-900/70 to-purple-600/50',
    buttonColor: 'text-purple-600',
  },
  orange: {
    gradient: 'from-orange-900/70 to-orange-600/50',
    buttonColor: 'text-orange-600',
  },
};
