import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const checklistData = [
  {
    id: 0,
    title: '자격 요건',
    question: '다음의 자격 중 한가지 이상 자격에 해당하는 사람(1~3중 하나이상)',
    details: [
      {
        content: `1. 「국가기술자격법」에 따른 첨단산업 분야의 기술사 자격을 취득한 사람`,
        table: {
          headers: ['구분', '전문양성인 등록 해당 분야'],
          rows: [
            {
              category: '기술사',
              fields: [
                '생산관리분야',
                '기계제작분야',
                '기계장비설비·설치분야 중 산업기계설비',
                '자동차분야',
                '금형·공작기계분야',
                '금속·재료분야',
                '용접분야',
                '도장·도금분야',
                '화공분야',
                '전기분야 중 전기응용',
                '전자분야',
                '정보기술분야',
                '통신분야',
                '비파괴검사분야',
              ],
            },
          ],
        },
      },
      {
        content: `2. 「국가기술자격법」에 따른 첨단산업 분야의 기능장 자격을 취득한 사람`,
        table: {
          headers: ['구분', '전문양성인 등록 해당 분야'],
          rows: [
            {
              category: '기능장',
              fields: [
                '생산관리분야',
                '기계제작분야',
                '기계장비설비·설치분야 중 산업기계설비',
                '자동차분야',
                '금형·공작기계분야',
                '금속·재료분야',
                '용접분야',
                '도장·도금분야',
                '화공분야',
                '전기분야 중 전기응용',
                '전자분야',
                '정보기술분야',
                '통신분야',
                '비파괴검사분야',
              ],
            },
          ],
        },
      },
      {
        content: `3. 첨단산업 분야의 학사 이상의 학위를 취득한 후 해당 분야에서 10년 이상의 실무경력이 있는 사람 또는 첨단산업 분야의 전문학사 학위를 취득한 후 해당 분야에서 13년 이상의 실무경력이 있는 사람`,
      },
    ],
  },
];

export default function PersonChecklist() {
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

  const anyConfirmed = checks.some(check => check === true);
  const completedCount = checks.filter(check => check === true).length;
  const progressPercentage = (completedCount / checklistData.length) * 100;

  const handleNext = () => {
    if (anyConfirmed) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      navigate('/person-register');
    } else {
      alert('자격 요건 중 하나라도 해당하는지 확인해 주세요.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 py-8">
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
            전문양성인 등록 체크리스트
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">전문양성인 등록 자격 체크리스트</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            전문양성인 등록을 위한 자격 요건을 체크해보세요. <br />
            다음 자격 중 어느 하나에 해당하면 등록 신청이 가능합니다.
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
              {anyConfirmed ? '자격 요건을 확인했습니다! 🎉' : '자격 요건을 확인해주세요.'}
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
            {anyConfirmed ? '자격 요건을 확인했습니다! 🎉' : '자격 요건을 확인해주세요.'}
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
                            <h5 className="text-lg font-bold text-blue-900">분야별 세부 영역</h5>
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
                                      </div>
                                    </td>
                                    <td className="px-4 py-3 text-sm text-gray-700 text-left">
                                      <div className="space-y-1">
                                        {row.fields.map((field, fieldIndex) => (
                                          <div key={fieldIndex} className="flex items-start">
                                            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                            <span className="leading-relaxed">{field}</span>
                                          </div>
                                        ))}
                                      </div>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
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
              전문양성인 등록 자격 요건 확인을 완료하셨습니다. 자격 요건 중 하나라도 해당되면 전문양성인 등록 신청이
              가능합니다.
            </p>
          </div>

          {!anyConfirmed && (
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
              <div className="flex items-center justify-center">
                <svg className="w-5 h-5 text-amber-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-amber-800 font-medium">자격 요건 중 하나라도 해당하는지 확인해주세요.</span>
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={handleNext}
              disabled={!anyConfirmed}
              className={`inline-flex items-center px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 ${
                anyConfirmed
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {anyConfirmed ? (
                <>
                  자격 확인 후 등록 신청
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </>
              ) : (
                '자격 요건을 확인해주세요'
              )}
            </button>
          </div>
        </div>

        {/* Important Notice */}
        <div className="mt-8 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-200">
          <div className="text-center">
            <h4 className="text-xl font-bold text-gray-900 mb-4">📋 전문양성인 등록 안내</h4>
            <div className="grid md:grid-cols-2 gap-6 text-left">
              <div>
                <h5 className="font-semibold text-purple-700 mb-2">등록 절차</h5>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• 1단계: 자격 요건 확인 (현재 단계)</li>
                  <li>• 2단계: 온라인 등록 신청</li>
                  <li>• 3단계: 서류 심사</li>
                  <li>• 4단계: 면접 및 최종 심사</li>
                  <li>• 5단계: 등록증 발급</li>
                </ul>
              </div>
              <div>
                <h5 className="font-semibold text-purple-700 mb-2">문의사항</h5>
                <div className="text-sm text-gray-600 space-y-2">
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                    <span>전화: 1379 → 4번</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    <span>이메일: expert@kiat.or.kr</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">운영시간: 평일 09:00~18:00 (점심시간 12:00~13:00 제외)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
