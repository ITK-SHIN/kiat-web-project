import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const checklistData = [
  {
    id: 0,
    title: '첨단산업분야 국내 기업',
    question: '귀사는 아래의 첨단산업분야 국내 기업 기준에 해당합니까?',
    details: [
      {
        content: `* 「국가첨단전략산업 경쟁력 강화 및 보호에 관한 특별조치법」 제2조제2호에 따른 국가첨단전략산업
* 「인적자원개발 기본법」 제7조제2항제2호가목의 첨단분야 중 같은 법에 따른 국가인적자원위원회가 산업통상자원부장관과 협의하여 지정하는 첨단분야
* 그 밖에 산업통상자원부장관이 대통령령으로 정하는 바에 따라 관계 중앙행정기관의 장과 협의하여 지정하는 산업`,
        note: `※ ’25.1월 현재 반도체, 디스플레이, 이차전지, 바이오 등 4개 산업이 첨단산업에 해당
※ <부록>의 한국표준산업분류에 해당하지는 않으나 4개 첨단산업에 종사하는 경우 인재혁신협의체의 확인서를 발급받아 제출`,
      },
      {
        content: `- (기업) 「중소기업기본법」, 「중견기업 성장촉진 및 경쟁력 강화에 관한 특별법」 등 관계 법령에 의거한 중소기업, 중견기업 및 그 밖의 기업
  * (중소기업) 「중소기업기본법」 제2조에 따른 중소기업
  * (중견기업) 「중견기업 성장촉진 및 경쟁력 강화에 관한 특별법」 제2조제1호에 따른 중견기업
  * (그 밖의 기업) 중소기업과 중견기업 이외의 기업`,
      },
    ],
  },
  {
    id: 1,
    title: '강의･전담인력',
    question: '귀사는 아래의 강의･전담인력 기준을 충족합니까?',
    details: [
      {
        content: `(강의인력 자격) ▲대학이나 공인된 연구기관에서 첨단산업 또는 첨단산업 인재혁신과 관련된 분야의 조교수 이상 또는 이에 상당하는 직에 있는 사람 ▲첨단산업 분야의 학사 이상의 학위를 취득한 후 해당 분야의 인재혁신 활동에 관한 실무경력이 4년 이상인 사람 ▲이와 동등한 자격이 있다고 산업통상자원부장관이 정하여 고시하는 자격을 갖춘 사람`,
      },
      {
        content: `(전담인력 수) ▲중소기업 3명 이상 ▲중견기업 7명 이상 ▲그 밖의 기업 10명 이상`,
      },
    ],
  },
  {
    id: 2,
    title: '교육프로그램',
    question: '귀사는 첨단산업 분야에 적합한 교육프로그램을 운영하고 있습니까?',
    details: [
      {
        content: `- 첨단산업 분야에 적합한 교육프로그램을 운영`,
      },
    ],
  },
  {
    id: 3,
    title: '강의실 및 장비',
    question: '귀사는 아래의 강의실 및 장비 기준을 충족합니까?',
    details: [
      {
        content: `(강의실) 인재개발교육 및 인재혁신활동을 위한 50제곱미터 이상의 강의실 
  * 강의실은 강의 전용공간 이외에도 회의실 등 병용공간도 강의실로 인정하되, 병용공간의 경우에도 인재개발교육 및 인재혁신활동을 위한 시설은 반드시 갖추어야 함
  * 50제곱미터 이상에는 강의 전용공간뿐만 아니라 강사 사무실 등 공용공간도 포함 가능
  * 강의실은 임차도 가능하며, 이 경우 인재혁신센터는 단기임차 여부, 지정기간 내 임차 지속 여부, 임차기간 연장 가능 여부 등 임차계약서 내용을 확인하여 강의실 임차계약 내용이 기업인재개발기관 활동에 적합하지 않을 경우 해당 기관에 보완 요청 실시`,
      },
      {
        content: `(장비) 교육실습에 필요한 장비`,
      },
      {
        title: '기업 규모별 요구사항',
        content: `다음 표는 기업 규모에 따른 인적요건, 물적요건, 교육요건을 보여줍니다.`,
        table: {
          headers: ['구분', '중소기업', '중견기업', '그 밖의 기업'],
          rows: [
            {
              category: '인적요건',
              subcategory: '전담인력',
              small: '3명 이상',
              medium: '7명 이상',
              large: '10명 이상',
            },
            {
              category: '물적요건',
              subcategory: '강의실',
              small: '-',
              medium: '50m² 이상',
              large: '-',
            },
            {
              category: '물적요건',
              subcategory: '장비',
              small: '-',
              medium: '교육실습에 필요한 장비',
              large: '-',
            },
            {
              category: '교육요건',
              subcategory: '교육프로그램',
              small: '-',
              medium: '-',
              large: '-',
            },
          ],
        },
        note: '강의실은 임차도 가능',
      },
    ],
  },
];

export default function Checklist() {
  const navigate = useNavigate();
  const [checks, setChecks] = useState(Array(checklistData.length).fill(null));
  const [activeSection, setActiveSection] = useState(0);

  const handleCheckChange = (index, value) => {
    const newChecks = [...checks];
    newChecks[index] = value;
    setChecks(newChecks);
  };

  const scrollToSection = index => {
    const element = document.getElementById(`section-${index}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = checklistData.map((_, index) => document.getElementById(`section-${index}`));
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(i);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const allConfirmed = checks.every(check => check === true);
  const completedCount = checks.filter(check => check === true).length;
  const progressPercentage = (completedCount / checklistData.length) * 100;

  const handleNext = () => {
    if (allConfirmed) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      navigate('/register');
    } else {
      alert('모든 항목을 확인으로 체크해 주세요.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="container-max max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-4">
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            설립인가 신청 체크리스트
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">기업인재개발기관 신청 체크리스트</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            기업인재개발기관 신청을 위한 필수 요건들을 체크해보세요. <br />
            모든 항목을 만족해야 다음 단계로 진행할 수 있습니다.
          </p>
        </div>

        {/* Fixed Progress Sidebar */}
        <div className="fixed top-1/2 right-8 transform -translate-y-1/2 z-50 hidden xl:block">
          <div className="bg-white rounded-2xl p-4 shadow-xl border border-gray-200 w-72">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-sm font-semibold text-gray-900">진행률</h3>
              <span className="text-lg font-bold text-blue-600">
                {completedCount}/{checklistData.length}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
              <div
                className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
            <p className="text-xs text-gray-600 mb-3">
              {allConfirmed
                ? '모든 항목을 완료했습니다! 🎉'
                : `${checklistData.length - completedCount}개 항목이 남았습니다.`}
            </p>

            {/* Progress Steps */}
            <div className="space-y-2">
              {checklistData.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(index)}
                  className={`flex items-center text-xs w-full text-left p-2 rounded-lg transition-all hover:bg-gray-50 ${
                    activeSection === index ? 'bg-blue-50 border-l-2 border-blue-500' : ''
                  }`}
                >
                  <div
                    className={`w-3 h-3 rounded-full mr-2 flex-shrink-0 ${
                      checks[index] === true ? 'bg-green-500' : checks[index] === false ? 'bg-red-500' : 'bg-gray-300'
                    }`}
                  ></div>
                  <span
                    className={`truncate ${
                      checks[index] === true
                        ? 'text-green-700 font-medium'
                        : checks[index] === false
                          ? 'text-red-700'
                          : activeSection === index
                            ? 'text-blue-700 font-medium'
                            : 'text-gray-600'
                    }`}
                  >
                    {item.title}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Progress Bar */}
        <div className="bg-white rounded-2xl p-6 shadow-lg mb-8 xl:hidden">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900">진행률</h3>
            <span className="text-2xl font-bold text-blue-600">
              {completedCount}/{checklistData.length}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
            <div
              className="bg-gradient-to-r from-blue-500 to-indigo-600 h-3 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-600">
            {allConfirmed
              ? '모든 항목을 완료했습니다! 🎉'
              : `${checklistData.length - completedCount}개 항목이 남았습니다.`}
          </p>
        </div>

        {/* Checklist Items */}
        <div className="space-y-6 mb-8">
          {checklistData.map((item, index) => (
            <div
              key={item.id}
              id={`section-${index}`}
              className={`bg-white rounded-2xl shadow-lg border-2 transition-all duration-300 ${
                checks[index] === true
                  ? 'border-green-200 bg-green-50'
                  : checks[index] === false
                    ? 'border-red-200 bg-red-50'
                    : 'border-gray-200 hover:border-blue-200'
              }`}
            >
              <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-8">
                  <div className="flex-1">
                    <div className="flex items-center mb-4">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold mr-4 shadow-lg transition-all duration-300 ${
                          checks[index] === true
                            ? 'bg-gradient-to-r from-green-500 to-emerald-600'
                            : checks[index] === false
                              ? 'bg-gradient-to-r from-red-500 to-rose-600'
                              : 'bg-gradient-to-r from-gray-400 to-gray-500'
                        }`}
                      >
                        {checks[index] === true ? (
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                        ) : checks[index] === false ? (
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                              clipRule="evenodd"
                            />
                          </svg>
                        ) : (
                          <span className="text-lg">{index + 1}</span>
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-gray-900 mb-2 leading-tight">{item.title}</h3>
                        <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full"></div>
                      </div>
                    </div>
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100/50 mb-6">
                      <div className="flex items-start">
                        <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path
                              fillRule="evenodd"
                              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <p className="text-lg text-gray-800 font-semibold leading-relaxed">{item.question}</p>
                      </div>
                    </div>
                    {item.subtitle && (
                      <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 rounded-xl p-4 mb-6">
                        <div className="flex items-center">
                          <div className="w-5 h-5 bg-amber-500 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path
                                fillRule="evenodd"
                                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                          <p className="text-sm font-semibold text-amber-800">{item.subtitle}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-6 mb-6">
                  {item.details.map((detail, detailIndex) => (
                    <div
                      key={detailIndex}
                      className="bg-gradient-to-r from-blue-50/30 to-indigo-50/30 rounded-xl p-6 border border-blue-100/50"
                    >
                      {detail.title && (
                        <div className="flex items-center mb-4">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                          <h4 className="text-lg font-bold text-gray-900">{detail.title}</h4>
                        </div>
                      )}
                      {detail.subtitle && (
                        <div className="bg-blue-100/50 border-l-4 border-blue-400 p-4 rounded-r-lg mb-4">
                          <p className="text-sm font-medium text-blue-800">{detail.subtitle}</p>
                        </div>
                      )}
                      {detail.content && (
                        <div className="bg-white/70 backdrop-blur-sm rounded-lg p-5 border border-gray-200/50 shadow-sm">
                          <div className="text-left">
                            {detail.content.split('\n').map((line, lineIndex) => {
                              if (line.trim().startsWith('*')) {
                                return (
                                  <div key={lineIndex} className="flex items-start mb-3 text-left">
                                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                    <p className="text-gray-800 leading-relaxed font-medium text-left">
                                      {line.replace('*', '').trim()}
                                    </p>
                                  </div>
                                );
                              } else if (line.trim().startsWith('-')) {
                                return (
                                  <div key={lineIndex} className="flex items-start mb-2 ml-4 text-left">
                                    <div className="w-1 h-1 bg-gray-400 rounded-full mt-2.5 mr-3 flex-shrink-0"></div>
                                    <p className="text-gray-700 leading-relaxed text-left">
                                      {line.replace('-', '').trim()}
                                    </p>
                                  </div>
                                );
                              } else if (line.trim().startsWith('  *')) {
                                return (
                                  <div key={lineIndex} className="flex items-start mb-1 ml-8 text-left">
                                    <div className="w-1 h-1 bg-gray-300 rounded-full mt-2.5 mr-3 flex-shrink-0"></div>
                                    <p className="text-gray-600 leading-relaxed text-sm text-left">
                                      {line.replace('  *', '').trim()}
                                    </p>
                                  </div>
                                );
                              } else if (line.trim()) {
                                return (
                                  <p
                                    key={lineIndex}
                                    className="text-gray-800 leading-relaxed mb-3 font-medium text-left"
                                  >
                                    {line.trim()}
                                  </p>
                                );
                              }
                              return null;
                            })}
                          </div>
                        </div>
                      )}
                      {detail.note && (
                        <div className="mt-4 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-lg p-4">
                          <div className="flex items-start">
                            <div className="w-5 h-5 bg-amber-500 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path
                                  fillRule="evenodd"
                                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-amber-800 mb-1">참고사항</p>
                              <p className="text-sm text-amber-700 leading-relaxed">{detail.note}</p>
                            </div>
                          </div>
                        </div>
                      )}
                      {detail.table && (
                        <div className="mt-6 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6">
                          <div className="flex items-center mb-4">
                            <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path
                                  fillRule="evenodd"
                                  d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </div>
                            <h5 className="text-lg font-bold text-blue-900">기업 규모별 요구사항</h5>
                          </div>
                          <div className="overflow-x-auto">
                            <table className="w-full bg-white rounded-lg shadow-sm border border-gray-200">
                              <thead>
                                <tr className="bg-gradient-to-r from-blue-100 to-indigo-100">
                                  {detail.table.headers.map((header, headerIndex) => (
                                    <th
                                      key={headerIndex}
                                      className={`px-4 py-3 text-sm font-semibold text-gray-800 text-center border-r border-gray-200 last:border-r-0 ${
                                        headerIndex === 0 ? 'text-left' : ''
                                      }`}
                                    >
                                      {header}
                                    </th>
                                  ))}
                                </tr>
                              </thead>
                              <tbody>
                                {detail.table.rows.map((row, rowIndex) => (
                                  <tr
                                    key={rowIndex}
                                    className={`border-b border-gray-100 last:border-b-0 ${rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}
                                  >
                                    <td className="px-4 py-3 text-sm font-medium text-gray-800 border-r border-gray-200">
                                      <div>
                                        <div className="font-semibold text-blue-800">{row.category}</div>
                                        <div className="text-xs text-gray-600 mt-1">{row.subcategory}</div>
                                      </div>
                                    </td>
                                    <td className="px-4 py-3 text-sm text-gray-700 text-center border-r border-gray-200">
                                      {row.small}
                                    </td>
                                    <td className="px-4 py-3 text-sm text-gray-700 text-center border-r border-gray-200">
                                      {row.medium}
                                    </td>
                                    <td className="px-4 py-3 text-sm text-gray-700 text-center">{row.large}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                          {detail.note && (
                            <div className="mt-4 bg-amber-50 border border-amber-200 rounded-lg p-3">
                              <div className="flex items-center">
                                <div className="w-4 h-4 bg-amber-500 rounded-full flex items-center justify-center mr-2 flex-shrink-0">
                                  <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path
                                      fillRule="evenodd"
                                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                </div>
                                <p className="text-sm text-amber-800 font-medium">{detail.note}</p>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                      {detail.items && (
                        <div className="mt-4 space-y-3">
                          {detail.items.map((subItem, subIndex) => (
                            <div key={subIndex} className="bg-white/50 rounded-lg p-4 border border-gray-200/50">
                              {subItem.category && (
                                <div className="flex items-center mb-2">
                                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 mr-3">
                                    {subItem.category}
                                  </span>
                                </div>
                              )}
                              <p className="text-gray-800 leading-relaxed">{subItem.content}</p>
                              {subItem.note && (
                                <p className="text-sm text-gray-600 mt-2 italic bg-gray-50 p-2 rounded">
                                  {subItem.note}
                                </p>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                      {detail.example && (
                        <div className="mt-4 bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-lg p-5">
                          <div className="flex items-center mb-3">
                            <div className="w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center mr-3">
                              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path
                                  fillRule="evenodd"
                                  d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </div>
                            <p className="text-sm font-bold text-emerald-800">{detail.example.title}</p>
                          </div>
                          <ul className="text-sm text-emerald-700 space-y-2">
                            {detail.example.steps.map((step, stepIndex) => (
                              <li key={stepIndex} className="flex items-start">
                                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                <span className="leading-relaxed">{step}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Radio Buttons */}
                <div className="flex justify-center space-x-8 pt-6 border-t border-gray-200">
                  <label
                    className={`flex items-center space-x-3 cursor-pointer p-4 rounded-lg transition-all ${
                      checks[index] === true
                        ? 'bg-green-100 border-2 border-green-300'
                        : 'hover:bg-green-50 border-2 border-transparent'
                    }`}
                  >
                    <input
                      type="radio"
                      name={`check-${index}`}
                      checked={checks[index] === true}
                      onChange={() => handleCheckChange(index, true)}
                      className="w-5 h-5 text-green-600 focus:ring-green-500"
                    />
                    <span className="font-medium text-green-700">
                      <svg className="w-5 h-5 inline mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      확인
                    </span>
                  </label>
                  <label
                    className={`flex items-center space-x-3 cursor-pointer p-4 rounded-lg transition-all ${
                      checks[index] === false
                        ? 'bg-red-100 border-2 border-red-300'
                        : 'hover:bg-red-50 border-2 border-transparent'
                    }`}
                  >
                    <input
                      type="radio"
                      name={`check-${index}`}
                      checked={checks[index] === false}
                      onChange={() => handleCheckChange(index, false)}
                      className="w-5 h-5 text-red-600 focus:ring-red-500"
                    />
                    <span className="font-medium text-red-700">
                      <svg className="w-5 h-5 inline mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                          clipRule="evenodd"
                        />
                      </svg>
                      미확인
                    </span>
                  </label>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Final Message & Action */}
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
          <div className="mb-6">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">자격 확인 완료</h3>
            <p className="text-gray-600 max-w-2xl mx-auto mb-6">
              기업인재개발기관 신청을 위한 체크를 하시느라 수고 많으셨습니다. 귀사가 체크항목 중 4가지 모두에 해당되면
              기업인재개발기관 신청이 가능하십니다.
            </p>
          </div>

          {!allConfirmed && (
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
              <div className="flex items-center justify-center">
                <svg className="w-5 h-5 text-amber-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-amber-800 font-medium">
                  모든 항목을 '해당함'으로 체크해야 등록 신청이 가능합니다.
                </span>
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={handleNext}
              disabled={!allConfirmed}
              className={`inline-flex items-center px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 ${
                allConfirmed
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {allConfirmed ? (
                <>
                  자격 확인 후 등록 신청
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </>
              ) : (
                '모든 항목을 확인해주세요'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
