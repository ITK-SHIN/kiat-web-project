import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const checklistData = [
  {
    id: 0,
    title: "설치대상자 기준 확인",
    question:
      "귀사는 아래와 같은 설치대상자 기준 중 한가지에 해당하고 관련 서류를 가지고 있습니까?",
    details: [
      {
        title: "대규모 사업장",
        content:
          "｢상법｣또는 특별법에 따라 설립된 법인으로, 종업원의 수가 200명 이상*인 사업장을 경영하는 자(여러 사업장이 공동으로 참여하는 경우도 포함)",
        note: "* 해당 사업장에 고용된 종업원 및 해당 사업장에서 일하는 다른 업체 종업원도 포함",
      },
      {
        title: "산업단지 입주기업의 연합체",
        content:
          "｢산업입지 및 개발에 관한 법률｣에 따라 설립된 산업단지에 입주한 기업들의 연합체(연합체의 종업원의 수 200명 이상)",
      },
      {
        title: "산업부문별 인적자원개발협의체",
        content:
          "｢산업발전법｣제12조제2항에 따라 구성된 산업부문별 인적자원개발협의체(종업원의 수 200명 이상)",
      },
    ],
  },
  {
    id: 1,
    title: "첨단산업 분야 해당 여부",
    question:
      "귀사는 설치를 원하는 사내대학원이 아래와 같은 국가첨단산업 범위에 포함됩니까?",
    subtitle: "｢첨단산업인재혁신법｣제2조제1호 각 목에 따른 '첨단산업' 분야",
    details: [
      {
        title: "반도체",
        content:
          "△첨단 메모리반도체 산업 △첨단 시스템반도체 산업 △첨단 패키징 산업 △연관 산업(자동차, 통신, 사물인터넷 등)에 미치는 파급효과가 현저한 반도체 산업",
      },
      {
        title: "이차전지",
        content:
          "△고에너지밀도 배터리 산업 △고용량 양극재 산업 △초고성능 전극 또는 차세대 배터리 산업",
      },
      {
        title: "디스플레이",
        content:
          "△능동형 유기발광다이오드(AMOLED) 패널 산업 △친환경 퀀텀닷(QD)소재 패널 산업 △마이크로 발광다이오드(LED) 패널 산업 △나노 발광다이오드(LED) 패널 산업 △차세대 디스플레이 산업",
      },
      {
        title: "바이오",
        content: "△바이오의약품 산업 △오가노이드 재생치료제 산업",
      },
    ],
  },
  {
    id: 2,
    title: "교사(校舍) 설치기준",
    question:
      "귀사는 사내대학원 설치기준 중 아래와 같은 교사(校舍) 설치기준을 만족하는 시설을 보유하고 계십니까?",
    details: [
      {
        title: "교사시설 구분",
        subtitle: "｢평생교육법 시행령｣[별표5] '사내대학 교사의 구분' 준용",
        items: [
          {
            category: "교육기본시설",
            content:
              "강의실(원격교육시설* 포함), 실험실습실, 교수연구실 및 그 부대시설",
            note: "* ｢평생교육법 시행규칙｣제15조제2항 각호의 시설: ①100㎡ 이상의 원격교육 학사관리실 1실 이상 ②100㎡ 이상의 서버 및 통신장비 관리실 ③원격교육 운영을 위한 1대 이상의 서버와 네트워크 장비",
          },
          {
            category: "지원시설",
            content: "도서관, 학생복지시설, 행정실 및 그 부대시설",
          },
        ],
      },
      {
        title: "학생 1인당 교사 기준면적",
        subtitle: "｢평생교육법 시행령｣｢별표6｣'사내대학 교사의 기준면적' 준용",
      },
      {
        title: "교사 면적 산출 기준",
        items: [
          {
            content:
              "편제 완성연도 기준 계열별 학생정원* × 학생 1명당 교사 기준면적 × 0.5",
            note: "* 편제정원이 50명 미만인 경우 50명 기준으로 산출하며, 사내대학원은 첨단분야에 한해 설치되므로 계열은 자연과학·공학 계열에 한정",
          },
          {
            content:
              "원격교육시설을 갖춘 경우에는 교사 면적을 1/2까지 감축 가능",
          },
        ],
      },
    ],
  },
  {
    id: 3,
    title: "교원확보 기준",
    question:
      "귀사는 사내대학원 설치기준 중 아래와 같은 교원확보 기준을 만족하십니까?",
    details: [
      {
        title: "확보 시기",
        content:
          "개교 시 교원 정원의 2분의 1 이상을 반드시 확보, 나머지 교원은 개교 후 1년 이내에 확보",
      },
      {
        title: "교원 1인당 학생 수",
        subtitle: "｢평생교육법 시행령｣[별표7] '사내대학의 교원산출기준' 준용",
      },
      {
        title: "교원 확보 산출 기준",
        content: "편제정원* × 1.5배 ÷ 교원 1인당 학생 수",
        note: "* 편제정원이 50명 미만인 경우 50명 기준으로 산출하며, 사내대학원은 첨단 분야에 한해 설치되므로 계열은 자연과학·공학 계열에 한정",
        example: {
          title:
            "(예) 첨단산업 분야 사내대학원 석사 과정(2년)의 입학정원이 30명인 경우:",
          steps: [
            "편제정원 = 입학정원 30명 × 수업연한 2년 = 60명",
            "교원 확보 수 = 편제정원 60명 × 1.5 ÷ 교원 1인당 학생 수 20명 = 4.5명(소수점 이하는 올림)",
            "단, 박사학위 과정을 운영하는 경우 ｢첨단산업인재혁신법 시행령｣ 제8조제2항에 따라 7명 이상의 관련 분야 교원 확보 필요",
          ],
        },
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

  const scrollToSection = (index) => {
    const element = document.getElementById(`section-${index}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = checklistData.map((_, index) =>
        document.getElementById(`section-${index}`)
      );
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(i);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const allConfirmed = checks.every((check) => check === true);
  const completedCount = checks.filter((check) => check === true).length;
  const progressPercentage = (completedCount / checklistData.length) * 100;

  const handleNext = () => {
    if (allConfirmed) {
      navigate("/register");
    } else {
      alert("모든 항목을 확인으로 체크해 주세요.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="container-max max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-4">
            <svg
              className="w-4 h-4 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            설립인가 신청 체크리스트
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            사내대학원 설립인가 신청 체크리스트
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            사내대학원 설치를 위한 필수 요건들을 체크해보세요. 모든 항목을
            만족해야 다음 단계로 진행할 수 있습니다.
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
                ? "모든 항목을 완료했습니다! 🎉"
                : `${
                    checklistData.length - completedCount
                  }개 항목이 남았습니다.`}
            </p>

            {/* Progress Steps */}
            <div className="space-y-2">
              {checklistData.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(index)}
                  className={`flex items-center text-xs w-full text-left p-2 rounded-lg transition-all hover:bg-gray-50 ${
                    activeSection === index
                      ? "bg-blue-50 border-l-2 border-blue-500"
                      : ""
                  }`}
                >
                  <div
                    className={`w-3 h-3 rounded-full mr-2 flex-shrink-0 ${
                      checks[index] === true
                        ? "bg-green-500"
                        : checks[index] === false
                        ? "bg-red-500"
                        : "bg-gray-300"
                    }`}
                  ></div>
                  <span
                    className={`truncate ${
                      checks[index] === true
                        ? "text-green-700 font-medium"
                        : checks[index] === false
                        ? "text-red-700"
                        : activeSection === index
                        ? "text-blue-700 font-medium"
                        : "text-gray-600"
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
              ? "모든 항목을 완료했습니다! 🎉"
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
                  ? "border-green-200 bg-green-50"
                  : checks[index] === false
                  ? "border-red-200 bg-red-50"
                  : "border-gray-200 hover:border-blue-200"
              }`}
            >
              <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex-1">
                    <div className="flex items-center mb-3">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold mr-3 ${
                          checks[index] === true
                            ? "bg-green-500"
                            : checks[index] === false
                            ? "bg-red-500"
                            : "bg-gray-400"
                        }`}
                      >
                        {checks[index] === true
                          ? "✓"
                          : checks[index] === false
                          ? "✗"
                          : index + 1}
                      </div>
                      <h3 className="text-xl font-bold text-gray-900">
                        {item.title}
                      </h3>
                    </div>
                    <p className="text-gray-700 font-medium mb-4">
                      {item.question}
                    </p>
                    {item.subtitle && (
                      <p className="text-sm font-medium text-blue-700 bg-blue-50 p-3 rounded-lg mb-4">
                        {item.subtitle}
                      </p>
                    )}
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-4 mb-6">
                  {item.details.map((detail, detailIndex) => (
                    <div
                      key={detailIndex}
                      className="border-l-4 border-blue-200 pl-4"
                    >
                      <h4 className="font-semibold text-gray-900 mb-2">
                        {detail.title}
                      </h4>
                      {detail.subtitle && (
                        <p className="text-sm text-gray-600 mb-2">
                          {detail.subtitle}
                        </p>
                      )}
                      {detail.content && (
                        <p className="text-gray-700 mb-2">{detail.content}</p>
                      )}
                      {detail.note && (
                        <p className="text-xs text-gray-500 bg-gray-50 p-2 rounded italic">
                          {detail.note}
                        </p>
                      )}
                      {detail.items && (
                        <div className="space-y-2 mt-2">
                          {detail.items.map((subItem, subIndex) => (
                            <div key={subIndex} className="ml-4">
                              {subItem.category && (
                                <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mr-2">
                                  {subItem.category}
                                </span>
                              )}
                              <span className="text-gray-700">
                                {subItem.content}
                              </span>
                              {subItem.note && (
                                <p className="text-xs text-gray-500 mt-1 ml-2">
                                  {subItem.note}
                                </p>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                      {detail.example && (
                        <div className="mt-3 bg-amber-50 border border-amber-200 rounded-lg p-3">
                          <p className="text-sm font-medium text-amber-800 mb-2">
                            {detail.example.title}
                          </p>
                          <ul className="text-sm text-amber-700 space-y-1">
                            {detail.example.steps.map((step, stepIndex) => (
                              <li key={stepIndex} className="ml-2">
                                • {step}
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
                        ? "bg-green-100 border-2 border-green-300"
                        : "hover:bg-green-50 border-2 border-transparent"
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
                      <svg
                        className="w-5 h-5 inline mr-2"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
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
                        ? "bg-red-100 border-2 border-red-300"
                        : "hover:bg-red-50 border-2 border-transparent"
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
                      <svg
                        className="w-5 h-5 inline mr-2"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
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
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              체크리스트 완료
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto mb-6">
              사내대학원 설치인가 신청을 위한 체크를 하시느라 수고 많으셨습니다.
              귀사가 체크항목 중 4가지 모두에 해당되면 사내대학원 설치인가
              신청이 가능하십니다.
            </p>
          </div>

          {!allConfirmed && (
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
              <div className="flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-amber-600 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-amber-800 font-medium">
                  모든 항목을 '확인'으로 체크해야 다음 단계로 이동할 수
                  있습니다.
                </span>
              </div>
            </div>
          )}

          <button
            onClick={handleNext}
            disabled={!allConfirmed}
            className={`inline-flex items-center px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 ${
              allConfirmed
                ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            확인 후 다음 단계로
            {allConfirmed && (
              <svg
                className="w-5 h-5 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
