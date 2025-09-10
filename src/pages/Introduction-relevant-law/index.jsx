import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

// 네비게이션 메뉴 데이터
const navigationItems = [
  { id: 'overview', label: '개요', path: '/introduction-overview', isActive: false },
  { id: 'law', label: '관련법', path: '/introduction-relevant-law', isActive: true },
  { id: 'notice', label: '산업통산자원부고시', path: '/', isActive: false },
  { id: 'policy', label: '정책제안', path: '/', isActive: false },
];

// 법령 데이터
const lawData = {
  advancedIndustry: [
    {
      title: '첨단산업 인재혁신 특별법/시행령/시행규칙',
      content:
        '첨단산업 분야가 주도적으로 인재를 양성·활용·관리할 수 있는 체계를 마련하고, 산업 수요에 맞춰 우수한 인재를 지속적이고 안정적으로 공급할 수 있는 기반을 구축하여 첨단산업의 발전과 국가경제 발전에 기여함을 목적으로 함',
    },
    {
      title: '국가첨단전략산업 경쟁력 강화 및 보호에 관한 특별조치법',
      content:
        '국가첨단전략산업의 혁신 생태계와 기술역량을 강화하여 산업의 지속가능한 성장 기반을 구축함으로써 국가 및 경제안보와 국가경제 발전에 기여함을 목적으로 함',
    },
    {
      title: '고등교육법',
      content: '「교육기본법」 제9조에 따라 고등교육에 관한 사항을 규정함을 목적으로 함',
    },
    {
      title: '평생교육법',
      content:
        '「헌법」과 「교육기본법」에서 규정한 평생교육 진흥에 대한 국가와 지방자치단체의 책임을 명확히 하고, 모든 국민이 일생에 걸쳐 학습하고 교육받을 권리를 보장하여 모든 국민의 삶의 질 향상과 행복 추구에 기여함을 목적으로 함',
    },
    {
      title: '국가연구개발혁신법',
      content:
        '국가연구개발사업의 추진체계를 혁신하고 자율적이고 책임감 있는 연구환경을 조성하여 국가혁신역량을 제고하고 국가경제 발전과 국민의 삶의 질 향상에 기여함을 목적으로 함',
    },
    {
      title: '산업기술혁신 촉진법',
      content:
        '산업기술혁신을 촉진하고 산업경쟁력 강화와 국가혁신역량 제고를 위한 산업기술혁신 기반을 구축하여 국가경제의 지속적 발전과 국민의 삶의 질 향상에 기여함을 목적으로 함',
    },
    {
      title: '국가첨단전략산업 특성화대학 등 지정 및 지원에 관한 운영지침',
      content:
        '「국가첨단전략산업 경쟁력 강화 및 보호에 관한 특별조치법」(이하 "국가첨단전략산업법"이라 함) 제37조 제3항 및 동법 시행령 제45조 제6항에 따른 특성화대학 등의 지정 기준·절차 및 지원에 필요한 사항을 규정함을 목적으로 함',
    },
    {
      title: '산업기술혁신사업 공통 운영요령',
      content:
        '「산업기술혁신 촉진법」(이하 "산업촉진법"이라 함) 및 동법 시행령과 「국가연구개발혁신법」(이하 "국가R&D법"이라 함) 및 동법 시행령에 따른 산업기술혁신사업의 효율적 추진을 위하여 필요한 세부사항을 규정함을 목적으로 함',
    },
  ],
  information: [
    {
      title: '개인정보 보호법',
      content:
        '개인정보의 처리 및 보호에 관한 사항을 규정함으로써 개인의 자유와 권리를 보호하고, 나아가 개인의 존엄과 가치를 구현함을 목적으로 함',
    },
    {
      title: '공공 데이터법',
      content:
        '공공기관이 보유·관리하는 데이터의 제공 및 활용 활성화에 관한 사항을 규정하여 국민의 공공데이터 이용권을 보장하고, 공공데이터의 민간 활용을 통한 국민의 삶의 질 향상과 국가경제 발전에 기여함을 목적으로 함',
    },
    {
      title: '데이터 기반행정법',
      content:
        '객관적이고 과학적인 행정을 통한 데이터 기반행정의 활성화에 필요한 사항을 규정하여 공공기관의 책임성·반응성·신뢰성을 높이고 국민의 삶의 질 향상을 도모함을 목적으로 함',
    },
    {
      title: '전자정부법',
      content:
        '행정업무의 전자적 처리를 위한 기본원칙·절차 및 방법을 규정하여 전자정부를 효율적으로 구현하고 행정의 생산성·투명성·민주성을 높여 국민의 삶의 질을 향상시킴을 목적으로 함',
    },
    {
      title: '클라우드 컴퓨팅 발전 및 이용자 보호에 관한 법률',
      content:
        '클라우드 컴퓨팅의 발전과 이용을 촉진하고 클라우드 컴퓨팅 서비스를 안전하게 이용할 수 있는 환경을 조성하여 국민생활의 향상과 국가경제 발전에 기여함을 목적으로 함',
    },
  ],
};

// 스타일 상수
const STYLES = {
  navigation: {
    container: 'fixed top-[230px] left-[100px] w-64 bg-white shadow-lg rounded-b-lg max-h-[370px] min-h-auto z-30',
    header: 'bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 rounded-t-lg',
    menu: 'py-1',
    menuList: 'space-y-0',
    menuItem: 'w-full text-left px-6 py-3 text-base',
    activeItem: 'text-orange-600 font-medium',
    inactiveItem: 'text-gray-700 hover:bg-gray-50 hover:text-gray-900',
  },
  content: {
    container: 'flex-1 py-8',
    wrapper: 'max-w-6xl mx-auto px-4',
    breadcrumb: 'bg-white border-b mb-8 -mx-4 px-4 py-3',
    main: 'bg-white rounded-lg shadow-lg p-8',
    title: 'text-3xl font-bold text-gray-900 mb-8',
  },
  section: {
    header: 'flex items-start mb-4',
    icon: 'w-3 h-3 bg-blue-500 rounded-sm mt-2 mr-3 flex-shrink-0',
    title: 'text-xl font-bold text-gray-900 text-left',
  },
  lawItem: {
    container: 'mb-8',
    wrapper: 'border-l-4 border-blue-600 pl-6 py-4',
    title: 'text-lg font-bold text-gray-900 mb-3 text-left',
    content: 'ml-4',
    articleTitle: 'text-base font-semibold text-gray-800 mb-2 text-left',
    articleContent: 'text-gray-700 leading-relaxed text-sm text-left',
  },
};

// 스크롤 투 탑 함수
const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

// 섹션 헤더 컴포넌트
const SectionHeader = ({ title }) => (
  <div className={STYLES.section.header}>
    <div className={STYLES.section.icon}></div>
    <h2 className={STYLES.section.title}>{title}</h2>
  </div>
);

// 법령 아이템 컴포넌트
const LawItem = ({ title, content }) => (
  <div className={STYLES.lawItem.container}>
    <div className={STYLES.lawItem.wrapper}>
      <h4 className={STYLES.lawItem.title}>{title}</h4>
      <div className={STYLES.lawItem.content}>
        <h5 className={STYLES.lawItem.articleTitle}>제1조(목적)</h5>
        <p className={STYLES.lawItem.articleContent}>{content}</p>
      </div>
    </div>
  </div>
);

// 법령 섹션 컴포넌트
const LawSection = ({ title, laws }) => (
  <>
    <div className="mb-8">
      <div className="flex items-start mb-6">
        <div className={STYLES.section.icon}></div>
        <h2 className={STYLES.section.title}>{title}</h2>
      </div>
    </div>
    {laws.map((law, index) => (
      <LawItem key={index} title={law.title} content={law.content} />
    ))}
  </>
);

export default function IntroductionRelevantLaw() {
  const navigate = useNavigate();

  // 네비게이션 핸들러
  const handleNavigation = useCallback(
    path => {
      scrollToTop();
      navigate(path);
    },
    [navigate]
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* 좌측 네비게이션 바 */}
        <div className={STYLES.navigation.container}>
          {/* 네비게이션 헤더 */}
          <div className={STYLES.navigation.header}>
            <h2 className="text-lg font-bold">제도소개</h2>
          </div>

          {/* 네비게이션 메뉴 */}
          <nav className={STYLES.navigation.menu}>
            <ul className={STYLES.navigation.menuList}>
              {navigationItems.map(item => (
                <li key={item.id}>
                  <button
                    className={`${STYLES.navigation.menuItem} ${
                      item.isActive ? STYLES.navigation.activeItem : STYLES.navigation.inactiveItem
                    }`}
                    onClick={() => handleNavigation(item.path)}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* 메인 콘텐츠 영역 */}
        <div className={STYLES.content.container}>
          <div className={STYLES.content.wrapper}>
            {/* 상단 네비게이션 */}
            <div className={STYLES.content.breadcrumb}>
              <nav className="flex items-center space-x-2 text-sm text-gray-600">
                <button className="hover:text-blue-600" onClick={() => handleNavigation('/')}>
                  🏠
                </button>
                <span>&gt;</span>
                <span className="text-gray-900">제도소개</span>
                <span>&gt;</span>
                <span className="text-gray-900 font-medium">관련법</span>
              </nav>
            </div>

            {/* 메인 콘텐츠 */}
            <div className={STYLES.content.main}>
              {/* 제목 */}
              <h1 className={STYLES.content.title}>관련법</h1>

              {/* 법령·제도 분석 범위 */}
              <div className="mb-8">
                {/* 첨단산업 관련 법령 섹션 */}
                <LawSection title="첨단산업 인재혁신센터 관련 법령·규칙" laws={lawData.advancedIndustry} />

                {/* 정보화 관련 법령 섹션 */}
                <LawSection title="정보화 관련 법령" laws={lawData.information} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
