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
      title: '제1조(목적)',
      content:
        '이 법은 첨단산업 분야의 산업계가 주도적으로 인재를 양성ㆍ활용ㆍ관리할 수 있는 생태계를 조성하고, 관련 산업계의 수요에 맞추어 우수인재를 지속적이고 안정적으로 공급할 수 있는 기반을 구축함으로써 첨단산업의 발전과 국민경제에 이바지하는 것을 목적으로 한다.',
    },
    {
      title: '제5조(기업인재개발기관등의 지정)',
      content:
        '① 산업통상자원부장관은 첨단산업 관련 기업의 인재혁신 활동을 효율적으로 지원하고 관리하기 위하여 관계 중앙행정기관의 장과 협의하여 대통령령으로 정하는 기준을 충족하는 기업부설 교육훈련기관(여러 기업이 공동으로 운영하는 기관을 포함한다) 또는 기업의 교육훈련부서를 기업인재개발기관 또는 인재혁신전담부서(이하 "기업인재개발기관등"이라 한다)로 지정할 수 있다.',
    },
    {
      title: '제7조(첨단산업아카데미의 지정 등)',
      content:
        '① 정부는 첨단산업인재 양성을 활성화하기 위하여 대통령령으로 정하는 기준을 충족하는 기관ㆍ단체 또는 사업체를 첨단산업아카데미(이하 "첨단산업아카데미"라 한다)로 지정할 수 있다.',
    },
    {
      title: '제8조(인재혁신전문기업의 등록 등)',
      content:
        '① 첨단산업 분야에서 다음 각 호의 어느 하나에 해당하는 사업을 하려는 자로서 관계 중앙행정기관의 장과 협의하여 대통령령으로 정하는 일정한 요건을 갖춘 자는 산업통상자원부장관에게 첨단산업 인재혁신 전문기업(이하 "인재혁신전문기업"이라 한다)으로 등록할 수 있다.',
    },
    {
      title: '제10조(전문양성인의 등록 등)',
      content:
        '① 첨단산업 관련 전문지식과 경험이 풍부한 사람으로서 대통령령으로 정하는 일정한 요건을 갖춘 사람은 산업통상자원부장관에게 첨단산업인재 전문양성인(이하 "전문양성인"이라 한다)으로 등록할 수 있다.',
    },
    {
      title: '제14조(인재혁신센터의 설치)',
      content:
        '① 첨단산업 분야의 인재혁신 활성화를 위하여 「공공기관의 운영에 관한 법률」 제4조에 따른 공공기관(이하 "공공기관"이라 한다) 중 대통령령으로 정하는 공공기관에 첨단산업 인재혁신센터(이하 "인재혁신센터"라 한다)를 둔다.',
    },
  ],
  enforcementDecree: [
    {
      title: '제20조(첨단산업 인재혁신 전문기업의 등록 등)',
      content:
        '① 법 제8조제1항 각 호 외의 부분에서 "대통령령으로 정하는 일정한 요건을 갖춘 자"란 다음 각 호의 요건을 모두 갖춘 자를 말한다. 1. 다음 각 목의 어느 하나에 해당하는 전문인력을 첨단산업 분야별로 각각 3명 이상 보유할 것 가. 대학이나 공인된 연구기관에서 첨단산업 인재혁신과 관련된 분야의 조교수 이상 또는 이에 상당하는 직에 있는 사람 나. 첨단산업 분야의 학사 이상의 학위를 취득한 후 해당 분야의 인재혁신 활동에 관한 실무경력이 4년 이상인 사람 다. 가목 및 나목에 해당하는 사람과 동등한 자격이 있다고 산업통상자원부장관이 정하여 고시하는 자격을 갖춘 사람',
    },
    {
      title: '제21조(전문양성인의 등록 등)',
      content:
        '⑦ 산업통상자원부장관은 법 제10조제2항에 따라 전문양성인 또는 전문양성인의 소속·활용 기관을 지원하려는 경우에는 지원대상의 선정기준, 지원내용 및 지원절차가 포함된 지원계획을 수립하여 산업통상자원부 인터넷 홈페이지에 게시해야 한다.',
    },
    {
      title: '제23조(첨단산업 인재혁신센터의 설치 등)',
      content:
        '① 법 제14조제1항에서 "대통령령으로 정하는 공공기관"이란 「산업기술혁신 촉진법」 제38조에 따라 설립된 한국산업기술진흥원을 말한다.',
    },
    {
      title: '제28조(첨단산업 인력수급분석)',
      content:
        '③ 산업통상자원부장관은 인력수급분석을 위하여 수집한 정보를 체계적으로 관리 및 활용하기 위하여 첨단산업인력수급 종합정보시스템을 구축ㆍ운영할 수 있다.',
    },
  ],
  enforcementRules: [
    {
      title: '제2조(기업인재개발기관등의 지정 신청 등)',
      content:
        '② 영 제17조제2항에 따라 기업인재개발기관등 지정신청서를 제출받은 첨단산업 인재혁신센터의 장은 「전자정부법」 제36조제1항에 따른 행정정보의 공동이용을 통하여 신청인의 법인 등기사항증명서(법인인 경우만 해당한다. 이하 같다) 또는 사업자등록증명(주민등록번호가 제외된 사업자등록증명을 말한다. 이하 같다)을 확인해야 한다. 다만, 신청인이 사업자등록증명의 확인에 동의하지 않는 경우에는 그 서류를 첨부하도록 해야 한다.',
    },
    {
      title: '제3조(첨단산업아카데미 지정 신청 등)',
      content:
        '① 영 제19조제2항 각 호 외의 부분에 따른 첨단산업아카데미 지정신청서는 별지 제5호서식과 같다. ② 영 제19조제2항에 따라 첨단산업아카데미 지정신청서를 제출받은 소관 중앙행정기관의 장 또는 첨단산업 인재혁신센터의 장은 「전자정부법」 제36조제1항에 따른 행정정보의 공동이용을 통하여 다음 각 호의 사항을 확인해야 한다.',
    },
    {
      title: '제4조(인재혁신전문기업 등록 신청 등)',
      content:
        '② 영 제20조제3항에 따라 인재혁신전문기업 등록신청서를 제출받은 첨단산업 인재혁신센터의 장은 「전자정부법」 제36조제1항에 따른 행정정보의 공동이용을 통하여 신청인의 법인 등기사항증명서 또는 사업자등록증명을 확인해야 한다. 다만, 신청인이 사업자등록증명의 확인에 동의하지 않는 경우에는 그 서류를 첨부하도록 해야 한다.',
    },
    {
      title: '제5조(전문양성인 등록 신청 등)',
      content:
        '② 영 제21조제3항에 따라 전문양성인 등록신청서를 제출받은 산업통상자원부장관(영 제39조제2항에 따라 업무를 위탁한 경우에는 해당 수탁기관의 장을 말한다)은 신청인이 영 제21조제1항제1호 또는 제2호에 해당하는 경우 「전자정부법」 제36조제1항에 따른 행정정보의 공동이용을 통하여 국가기술자격취득사항확인서를 확인해야 한다. 다만, 신청인이 확인에 동의하지 않는 경우에는 그 서류를 첨부하도록 해야 한다.',
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
                <LawSection
                  title="첨단산업 인재혁신 특별법 ( 약칭:첨단산업인재혁신법 )"
                  laws={lawData.advancedIndustry}
                />

                {/* 첨단산업 인재혁신 특별법 시행령 섹션 */}
                <LawSection title="첨단산업 인재혁신 특별법 시행령" laws={lawData.enforcementDecree} />

                {/* 첨단산업 인재혁신 특별법 시행규칙 섹션 */}
                <LawSection title="첨단산업 인재혁신 특별법 시행규칙" laws={lawData.enforcementRules} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
