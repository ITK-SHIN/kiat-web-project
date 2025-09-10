import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

// 네비게이션 메뉴 데이터
const navigationItems = [
  { id: 'overview', label: '개요', path: '/introduction-overview', isActive: true },
  { id: 'law', label: '관련법', path: '/introduction-relevant-law', isActive: false },
  { id: 'notice', label: '산업통산자원부고시', path: '/', isActive: false },
  { id: 'policy', label: '정책제안', path: '/', isActive: false },
];

// 스크롤 투 탑 함수
const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

// 섹션 헤더 컴포넌트
const SectionHeader = ({ title }) => (
  <div className="flex items-start mb-4">
    <div className="w-3 h-3 bg-blue-500 rounded-sm mt-2 mr-3 flex-shrink-0"></div>
    <h2 className="text-xl font-bold text-gray-900">{title}</h2>
  </div>
);

// 테이블 컴포넌트
const DataTable = ({ data }) => (
  <div className="bg-white rounded-lg shadow-sm border-t-4 border-blue-600 overflow-hidden">
    <table className="w-full">
      <thead>
        <tr className="bg-gray-50 border-b border-gray-200">
          <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">구분</th>
          <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">내용</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index} className="border-b border-gray-100">
            <td className="px-6 py-4 text-sm font-medium text-gray-900 bg-gray-50">{row.category}</td>
            <td className="px-6 py-4 text-sm text-gray-700 text-left">{row.content}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default function IntroductionOverview() {
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
        <div className="fixed top-[230px] left-[100px] w-64 bg-white shadow-lg rounded-b-lg max-h-[370px] min-h-auto z-30">
          {/* 네비게이션 헤더 */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 rounded-t-lg">
            <h2 className="text-lg font-bold">제도소개</h2>
          </div>

          {/* 네비게이션 메뉴 */}
          <nav className="py-1">
            <ul className="space-y-0">
              {navigationItems.map(item => (
                <li key={item.id}>
                  <button
                    className={`w-full text-left px-6 py-3 text-base ${
                      item.isActive
                        ? 'text-orange-600 font-medium'
                        : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
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
        <div className="flex-1 py-8">
          <div className="max-w-6xl mx-auto px-4">
            {/* 상단 네비게이션 */}
            <div className="bg-white border-b mb-8 -mx-4 px-4 py-3">
              <nav className="flex items-center space-x-2 text-sm text-gray-600">
                <button className="hover:text-blue-600" onClick={() => handleNavigation('/')}>
                  🏠
                </button>
                <span>&gt;</span>
                <span className="text-gray-900">제도소개</span>
                <span>&gt;</span>
                <span className="text-gray-900 font-medium">개요</span>
              </nav>
            </div>

            {/* 메인 콘텐츠 */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              {/* 제목 */}
              <h1 className="text-3xl font-bold text-gray-900 mb-8">개요</h1>

              {/* 제도 목적 */}
              <div className="mb-8">
                <SectionHeader title="제도 목적" />
                <div className="ml-6">
                  <p className="text-gray-700 leading-relaxed">
                    기업 주도 인재양성 체계 마련을 위해 제정된 「첨단산업 인재혁신 특별법」에 따른 각종 지원 제도 운영
                  </p>
                </div>
              </div>

              {/* 법적근거 */}
              <div className="mb-8">
                <SectionHeader title="법적근거" />
                <div className="ml-6">
                  <p className="text-gray-700 leading-relaxed mb-3">
                    정부 국정과제의 일환으로 기업 주도 인재양성 체계 마련을 위해 「첨단산업 인재혁신 특별법」 제정 및
                    시행(’25.1월)
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="text-gray-500 mr-2">-</span>
                      <span className="text-gray-700">
                        기업인재 개발기관 지정 및 관리 첨단산업 인재혁신특별법 제5조~6조, 시행령 제 17조~18조
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-gray-500 mr-2">-</span>
                      <span className="text-gray-700">
                        첨단산업 아카데미 지정 및 관리 첨단산업 인재혁신특별법 제7조, 시행령 제 19조
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-gray-500 mr-2">-</span>
                      <span className="text-gray-700">
                        인재혁신전문기업 등록 및 관리 첨단산업 인재혁신특별법 제8조, 시행령 제 20조
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-gray-500 mr-2">-</span>
                      <span className="text-gray-700">
                        전문인양성 등록 및 관리 첨단산업 인재혁신특별법 제10조, 시행령 제 21조
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-gray-500 mr-2">-</span>
                      <span className="text-gray-700">인력수분석 통계 첨단산업 인재혁신특별법 제23조</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* 담당기관 및 수행업무 */}
              <div className="mb-8">
                <SectionHeader title="담당기관 및 수행업무" />
                <div className="ml-6">
                  <p className="text-gray-700 leading-relaxed mb-4">
                    한국산업기술진흥원의 인재혁신센터는 첨단산업 인재혁신특별법 제14조 및 동법 시행령 제23조 1항에
                    근거하여 다음 각 호의 업무를 수행한다.
                  </p>
                  <ol className="space-y-3">
                    <li className="flex items-start">
                      <span className="text-gray-500 mr-2 font-medium">1.</span>
                      <span className="text-gray-700">
                        기업인재개발기관등, 첨단산업아카데미, 인재혁신전문기업 등 산업계의 인재혁신 활동의 지원
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-gray-500 mr-2 font-medium">2.</span>
                      <span className="text-gray-700">
                        산업계 시설의 개방ㆍ공유, 생태계 활성화, 인재데이터의 관리ㆍ활용 등 기반 조성의 지원
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-gray-500 mr-2 font-medium">3.</span>
                      <span className="text-gray-700">
                        제19조에 따른 인력수급분석, 통계 작성 등 정부의 정책 검토 지원
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-gray-500 mr-2 font-medium">4.</span>
                      <span className="text-gray-700">
                        「인적자원개발 기본법」 제12조에 따른 인적자원개발평가센터와의 협력에 관한 업무
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-gray-500 mr-2 font-medium">5.</span>
                      <span className="text-gray-700">국내외 인재혁신 조사ㆍ연구 및 국제협력 사업</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-gray-500 mr-2 font-medium">6.</span>
                      <span className="text-gray-700">
                        그 밖에 첨단산업 인재혁신을 위하여 필요한 사업으로서 대통령령으로 정하는 사업
                      </span>
                    </li>
                  </ol>
                </div>
              </div>

              {/* 지정 및 등록 주체 */}
              <div className="mb-8">
                <SectionHeader title="지정 및 등록 주체" />
                <div className="ml-6">
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="text-gray-500 mr-2">-</span>
                      <span className="text-gray-700">첨단산업분야 인재양성을 수행하는 기업/단체</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-gray-500 mr-2">-</span>
                      <span className="text-gray-700">
                        첨단산업분야 기술사/기능장, 첨단산업분야에 종사한 사람으로 법에 정한 기준에 부합하는 인재
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* 제도 운영 및 세부 추진 내용 */}
              <div className="mb-8">
                <SectionHeader title="제도 운영 및 세부 추진 내용" />
                <div className="ml-6">
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="text-gray-500 mr-2">ㅇ</span>
                      <span className="text-gray-700">기업인재개발기관 지정 제도 운영</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* 기업인재개발기관 지정 제도 운영 표 */}
              <div className="mb-8">
                <div className="bg-white rounded-lg shadow-sm border-t-4 border-blue-600 overflow-hidden">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-200">
                        <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">구분</th>
                        <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">내용</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-gray-100">
                        <td className="px-6 py-4 text-sm font-medium text-gray-900 bg-gray-50">목적</td>
                        <td className="px-6 py-4 text-sm text-gray-700 text-left">
                          첨단산업 분야의 기술 변화 및 경쟁 심화에 대응하여 관련 기업의 인재혁신 활동에 대해 효율적으로
                          지원·관리할 수 있도록 기업인재개발기관 지정
                        </td>
                      </tr>
                      <tr className="border-b border-gray-100">
                        <td className="px-6 py-4 text-sm font-medium text-gray-900 bg-gray-50">추진내용</td>
                        <td className="px-6 py-4 text-sm text-gray-700 text-left">
                          제도 홍보, 신청 접수·검토, 심사위원회 구성·운영, 결과 보고, 지정기관 관리 (연중 기업 수요에
                          따라 공고 추진)
                        </td>
                      </tr>
                      <tr className="border-b border-gray-100">
                        <td className="px-6 py-4 text-sm font-medium text-gray-900 bg-gray-50">절차</td>
                        <td className="px-6 py-4 text-sm text-gray-700 text-left">
                          신청 서류 검토 → 현장실사 → 종합심사(심사위원회) → 결과 보고 → 지정
                        </td>
                      </tr>
                      <tr className="border-b border-gray-100">
                        <td className="px-6 py-4 text-sm font-medium text-gray-900 bg-gray-50">지정기준</td>
                        <td className="px-6 py-4 text-sm text-gray-700 text-left">
                          <table className="w-full">
                            <tbody>
                              <tr className="border-b border-gray-200">
                                <td className="py-2 pr-4 text-sm font-medium text-gray-900 w-32 border-r border-gray-200 text-center">
                                  지원·관리
                                  <br /> 전담인력
                                </td>
                                <td className="py-2 pl-4 text-sm text-gray-700 text-left">
                                  <ul className="space-y-1">
                                    <li className="flex items-start">
                                      <span className="text-gray-500 mr-2">•</span>
                                      <span>
                                        소기업은 2명 이상, 중기업은 3명 이상, 중견기업은 7명 이상, 그 외 기업은 10명
                                        이상의 전담인력을 보유하고 있을 것
                                      </span>
                                    </li>
                                  </ul>
                                </td>
                              </tr>
                              <tr className="border-b border-gray-200">
                                <td className="py-2 pr-4 text-sm font-medium text-gray-900 w-32 border-r border-gray-200 text-center">
                                  강의실
                                </td>
                                <td className="py-2 pl-4 text-sm text-gray-700 text-left">
                                  <ul className="space-y-1">
                                    <li className="flex items-start">
                                      <span className="text-gray-500 mr-2">•</span>
                                      <span>첨단산업 인재혁신 활동을 위해 필요한 강의실을 갖출 것</span>
                                    </li>
                                  </ul>
                                </td>
                              </tr>
                              <tr>
                                <td className="py-2 pr-4 text-sm font-medium text-gray-900 w-32 border-r border-gray-200 text-center">
                                  기타
                                </td>
                                <td className="py-2 pl-4 text-sm text-gray-700 text-left">
                                  <ul className="space-y-1">
                                    <li className="flex items-start">
                                      <span className="text-gray-500 mr-2">•</span>
                                      <span>첨단산업 분야에 적합한 교육프로그램을 운영하고 있을 것</span>
                                    </li>
                                    <li className="flex items-start">
                                      <span className="text-gray-500 mr-2">•</span>
                                      <span>교육 실습에 필요한 장비를 보유하고 있을 것</span>
                                    </li>
                                  </ul>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* 첨단산업아카데미 지정 제도 운영 */}
              <div className="mb-8">
                <div className="ml-6">
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="text-gray-500 mr-2">ㅇ</span>
                      <span className="text-gray-700">첨단산업아카데미 지정 제도 운영</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* 첨단산업아카데미 지정 제도 운영 표 */}
              <div className="mb-8">
                <div className="bg-white rounded-lg shadow-sm border-t-4 border-blue-600 overflow-hidden">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-200">
                        <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">구분</th>
                        <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">내용</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-gray-100">
                        <td className="px-6 py-4 text-sm font-medium text-gray-900 bg-gray-50">목적</td>
                        <td className="px-6 py-4 text-sm text-gray-700 text-left">
                          첨단산업별 특성과 현장 수요에 부합하는 인재를 산업계 주도로 신속히 양성·공급할 수 있도록
                          첨단산업 아카데미 지정
                        </td>
                      </tr>
                      <tr className="border-b border-gray-100">
                        <td className="px-6 py-4 text-sm font-medium text-gray-900 bg-gray-50">추진내용</td>
                        <td className="px-6 py-4 text-sm text-gray-700 text-left">
                          제도 홍보, 신청 접수·검토, 심사위원회 구성·운영, 심사 결과 보고, 지정기관 관리 (연간 2회 이내
                          개최 예정)
                        </td>
                      </tr>
                      <tr className="border-b border-gray-100">
                        <td className="px-6 py-4 text-sm font-medium text-gray-900 bg-gray-50">절차</td>
                        <td className="px-6 py-4 text-sm text-gray-700 text-left">
                          신청 서류 검토 → 현장실사 → 종합심사(심사위원회) → 결과 보고 → 지정
                        </td>
                      </tr>
                      <tr className="border-b border-gray-100">
                        <td className="px-6 py-4 text-sm font-medium text-gray-900 bg-gray-50">참고</td>
                        <td className="px-6 py-4 text-sm text-gray-700 text-left">
                          기존 예산사업을 추진 중인 산업별 아카데미(반도체, 배터리)는 상반기 중, '25년 신규로 추진되는
                          디스플레이 아카데미는 3분기 중 지정 예정
                        </td>
                      </tr>
                      <tr className="border-b border-gray-100">
                        <td className="px-6 py-4 text-sm font-medium text-gray-900 bg-gray-50">지정기준</td>
                        <td className="px-6 py-4 text-sm text-gray-700 text-left">
                          <table className="w-full">
                            <tbody>
                              <tr className="border-b border-gray-200">
                                <td className="py-2 pr-4 text-sm font-medium text-gray-900 w-32 border-r border-gray-200 text-center">
                                  교육시설·장비
                                </td>
                                <td className="py-2 pl-4 text-sm text-gray-700 text-left">
                                  <ul className="space-y-1">
                                    <li className="flex items-start">
                                      <span className="text-gray-500 mr-2">•</span>
                                      <span>교육에 필요한 시설을 갖출 것</span>
                                    </li>
                                    <li className="flex items-start">
                                      <span className="text-gray-500 mr-2">•</span>
                                      <span>
                                        소유·전세·임대차 또는 사용대차의 방법으로 해당 시설에 대한 정당한 권원을 확보
                                      </span>
                                    </li>
                                  </ul>
                                </td>
                              </tr>
                              <tr className="border-b border-gray-200">
                                <td className="py-2 pr-4 text-sm font-medium text-gray-900 w-32 border-r border-gray-200 text-center">
                                  전문인력
                                </td>
                                <td className="py-2 pl-4 text-sm text-gray-700 text-left">
                                  <ul className="space-y-1">
                                    <li className="flex items-start">
                                      <span className="text-gray-500 mr-2">•</span>
                                      <span>전문인력을 4명 이상 보유하고 있을 것</span>
                                    </li>
                                  </ul>
                                </td>
                              </tr>
                              <tr>
                                <td className="py-2 pr-4 text-sm font-medium text-gray-900 w-32 border-r border-gray-200 text-center">
                                  기타
                                </td>
                                <td className="py-2 pl-4 text-sm text-gray-700 text-left">
                                  <ul className="space-y-1">
                                    <li className="flex items-start">
                                      <span className="text-gray-500 mr-2">•</span>
                                      <span>연간 180일 이상 교육 프로그램 운영</span>
                                    </li>
                                  </ul>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* 제도 운영 및 세부 추진 내용 */}
              <div className="mb-8">
                <SectionHeader title="제도 운영 및 세부 추진 내용" />
                <div className="ml-6">
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="text-gray-500 mr-2">ㅇ</span>
                      <span className="text-gray-700">인재혁신전문기업 등록 제도 운영</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* 인재혁신전문기업 등록 제도 운영 표 */}
              <div className="mb-8">
                <div className="bg-white rounded-lg shadow-sm border-t-4 border-blue-600 overflow-hidden">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-200">
                        <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">구분</th>
                        <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">내용</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-gray-100">
                        <td className="px-6 py-4 text-sm font-medium text-gray-900 bg-gray-50">목적</td>
                        <td className="px-6 py-4 text-sm text-gray-700 text-left">
                          첨단산업 분야 기술 교육 수요 증가에 대응하여 산업현장에 필요한 기반 기술 교육을 실시하는
                          민간기업을 인재혁신전문기업으로 등록
                        </td>
                      </tr>
                      <tr className="border-b border-gray-100">
                        <td className="px-6 py-4 text-sm font-medium text-gray-900 bg-gray-50">추진내용</td>
                        <td className="px-6 py-4 text-sm text-gray-700 text-left">
                          제도 홍보, 등록 신청 접수·검토, 등록 심사위원회 구성·운영, 결과보고 (연중 기업 수요에 따라
                          공고 추진)
                        </td>
                      </tr>
                      <tr className="border-b border-gray-100">
                        <td className="px-6 py-4 text-sm font-medium text-gray-900 bg-gray-50">절차</td>
                        <td className="px-6 py-4 text-sm text-gray-700 text-left">
                          신청 서류 검토 → 현장실사 → 종합심사(심사위원회) → 결과 보고 → 등록
                        </td>
                      </tr>
                      <tr className="border-b border-gray-100">
                        <td className="px-6 py-4 text-sm font-medium text-gray-900 bg-gray-50">등록기준</td>
                        <td className="px-6 py-4 text-sm text-gray-700 text-left">
                          <table className="w-full">
                            <tbody>
                              <tr className="border-b border-gray-200">
                                <td className="py-2 pr-4 text-sm font-medium text-gray-900 w-32 border-r border-gray-200 text-center">
                                  전문인력
                                </td>
                                <td className="py-2 pl-4 text-sm text-gray-700 text-left">
                                  <ul className="space-y-1">
                                    <li className="flex items-start">
                                      <span className="text-gray-500 mr-2">•</span>
                                      <span>전문인력을 첨단산업 분야별 각각 3명 이상 보유하고 있을 것</span>
                                    </li>
                                  </ul>
                                </td>
                              </tr>
                              <tr>
                                <td className="py-2 pr-4 text-sm font-medium text-gray-900 w-32 border-r border-gray-200 text-center">
                                  기타
                                </td>
                                <td className="py-2 pl-4 text-sm text-gray-700 text-left">
                                  <ul className="space-y-1">
                                    <li className="flex items-start">
                                      <span className="text-gray-500 mr-2">•</span>
                                      <span>사업을 운영하기 위해 필요한 시설 및 기자재를 보유하고 있을 것</span>
                                    </li>
                                  </ul>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* 전문양성인 등록 제도 및 교육 운영 */}
              <div className="mb-8">
                <div className="ml-6">
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="text-gray-500 mr-2">ㅇ</span>
                      <span className="text-gray-700">전문양성인 등록 제도 및 교육 운영</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* 전문양성인 등록 제도 및 교육 운영 표 */}
              <div className="mb-8">
                <div className="bg-white rounded-lg shadow-sm border-t-4 border-blue-600 overflow-hidden">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-200">
                        <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">구분</th>
                        <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">내용</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-gray-100">
                        <td className="px-6 py-4 text-sm font-medium text-gray-900 bg-gray-50">목적</td>
                        <td className="px-6 py-4 text-sm text-gray-700 text-left">
                          첨단산업 분야 전문지식과 경험이 풍부한 전문인력을 교육 현장에 투입할 수 있도록 전문양성인 등록
                          및 교육 지원
                        </td>
                      </tr>
                      <tr className="border-b border-gray-100">
                        <td className="px-6 py-4 text-sm font-medium text-gray-900 bg-gray-50">추진내용</td>
                        <td className="px-6 py-4 text-sm text-gray-700 text-left">
                          제도 홍보, 등록 신청 접수·검토, 서류 심사, 결과보고, 교육기관 및 전문양성인 관리 (연중 수요에
                          따라 공고 추진)
                        </td>
                      </tr>
                      <tr className="border-b border-gray-100">
                        <td className="px-6 py-4 text-sm font-medium text-gray-900 bg-gray-50">교육운영</td>
                        <td className="px-6 py-4 text-sm text-gray-700 text-left">
                          전문양성인 교육기관을 별도로 지정하고, 전문양성인 자격을 갖추기 위한 교수법 등 전문양성인
                          등록교육 추진
                        </td>
                      </tr>
                      <tr className="border-b border-gray-100">
                        <td className="px-6 py-4 text-sm font-medium text-gray-900 bg-gray-50">절차</td>
                        <td className="px-6 py-4 text-sm text-gray-700 text-left">
                          신청 서류 검토 → 서류 심사 → 전문양성인 교육 → 결과 보고 → 등록
                        </td>
                      </tr>
                      <tr className="border-b border-gray-100">
                        <td className="px-6 py-4 text-sm font-medium text-gray-900 bg-gray-50">등록자격</td>
                        <td className="px-6 py-4 text-sm text-gray-700 text-left">
                          <table className="w-full">
                            <tbody>
                              <tr className="border-b border-gray-200">
                                <td className="py-2 pr-4 text-sm font-medium text-gray-900 w-32 border-r border-gray-200 text-center">
                                  교육시설·장비
                                </td>
                                <td className="py-2 pl-4 text-sm text-gray-700 text-left">
                                  <ul className="space-y-1">
                                    <li className="flex items-start">
                                      <span className="text-gray-500 mr-2">•</span>
                                      <span>국가기술자격법에 따른 첨단산업 분야 기술사 자격을 취득한 자</span>
                                    </li>
                                    <li className="flex items-start">
                                      <span className="text-gray-500 mr-2">•</span>
                                      <span>국가기술자격법에 따른 첨단산업 분야 기능장 자격을 취득한 자</span>
                                    </li>
                                    <li className="flex items-start">
                                      <span className="text-gray-500 mr-2">•</span>
                                      <span>학사 이상 학위 취득 후 해당 분야 10년 이상 실무경력이 있는 자</span>
                                    </li>
                                    <li className="flex items-start">
                                      <span className="text-gray-500 mr-2">•</span>
                                      <span>전문학사 학위 취득 후 해당 분야 13년 이상 실무경력이 있는 자</span>
                                    </li>
                                  </ul>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
