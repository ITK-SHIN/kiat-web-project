import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const checklistData = [
  {
    id: 0,
    title: "학력 자격 요건",
    question: "귀하는 아래와 같은 학력 자격 요건 중 하나에 해당하십니까?",
    details: [
      {
        title: "최소 학력 요건",
        content: "학사학위 이상 보유자 (단, 전문 분야에 따라 예외 가능)",
        note: "전문대학 졸업자의 경우 해당 분야 10년 이상 실무 경력 시 인정 가능",
      },
      {
        title: "전공 관련성",
        content: "지원하고자 하는 전문 분야와 관련된 전공 또는 학위 보유",
        note: "첨단산업 분야: 반도체, 이차전지, 디스플레이, 바이오 등",
      },
      {
        title: "추가 학력 사항",
        content:
          "석사·박사학위 보유 시 우대, 해외 학위의 경우 교육부 인정 학위",
        note: "교육부에서 인정하는 외국 대학의 학위 또는 이에 상응하는 학력",
      },
    ],
  },
  {
    id: 1,
    title: "실무 경력 요건",
    question: "귀하는 아래와 같은 실무 경력 요건을 만족하십니까?",
    details: [
      {
        title: "최소 경력 기간",
        content: "해당 전문 분야에서 5년 이상의 실무 경력 보유",
        note: "산업체, 연구소, 대학 등에서의 관련 업무 경력 포함",
      },
      {
        title: "경력의 연관성",
        content: "지원 분야와 직접적으로 관련된 업무 경력",
        note: "관련 업무: 연구개발, 제품개발, 기술지원, 품질관리, 생산관리 등",
      },
      {
        title: "경력 증빙",
        content: "재직증명서, 경력증명서 등 객관적 증빙 자료 보유",
        note: "4대보험 가입 이력, 사업자등록증(프리랜서의 경우) 등으로 증빙 가능",
      },
      {
        title: "리더십 경험",
        content: "프로젝트 리더, 팀장급 이상의 리더십 경험 보유 (우대사항)",
        note: "연구과제 책임자, 개발팀장, 기술자문 등의 경험",
      },
    ],
  },
  {
    id: 2,
    title: "전문성 및 교육 역량",
    question: "귀하는 아래와 같은 전문성 및 교육 역량을 보유하고 계십니까?",
    details: [
      {
        title: "전문 지식 보유",
        content: "해당 분야의 최신 기술 동향 및 전문 지식 보유",
        note: "관련 학회 활동, 세미나 참석, 전문 교육 이수 등으로 증빙",
      },
      {
        title: "교육 경험",
        content: "교육, 강의, 멘토링 등의 경험 보유 (필수는 아니나 우대)",
        note: "사내 교육, 외부 강의, 신입사원 멘토링, 기술 지도 등",
      },
      {
        title: "자격증 및 인증",
        content: "관련 분야의 국가기술자격증 또는 국제인증 보유",
        note: "기술사, 기사, 산업기사 등 국가자격증 또는 국제공인자격증",
      },
      {
        title: "연구 성과",
        content: "논문, 특허, 기술개발 성과 등 전문성을 입증할 수 있는 실적",
        note: "SCI급 논문, 국내외 특허, 기술이전 실적, 상품화 성과 등",
      },
    ],
  },
  {
    id: 3,
    title: "윤리 및 품성",
    question: "귀하는 아래와 같은 윤리 및 품성 요건을 만족하십니까?",
    details: [
      {
        title: "결격사유 없음",
        content:
          "금고 이상의 형을 받고 그 집행이 끝나지 아니하거나 그 집행을 받지 아니하기로 확정되지 아니한 자",
        note: "범죄경력조회서 또는 관련 증명서로 확인",
      },
      {
        title: "직업윤리 준수",
        content: "해당 분야의 직업윤리 및 연구윤리를 준수할 의지와 능력 보유",
        note: "연구부정행위, 기술유출 등의 이력이 없어야 함",
      },
      {
        title: "교육자 품성",
        content: "교육자로서 적합한 인격과 품성을 갖춘 자",
        note: "추천서, 인성검증 등을 통해 확인 가능",
      },
      {
        title: "보안서약",
        content: "교육 과정에서 알게 되는 기업 기밀 정보에 대한 보안 유지 서약",
        note: "보안서약서 작성 및 관련 교육 이수 필요",
      },
    ],
  },
  {
    id: 4,
    title: "추가 우대 사항",
    question: "귀하는 아래와 같은 추가 우대 사항에 해당하십니까?",
    details: [
      {
        title: "다양한 경력 배경",
        content: "산업체, 연구소, 대학 등 다양한 기관에서의 경력 보유",
        note: "다양한 관점에서의 실무 경험은 교육 효과를 높일 수 있음",
      },
      {
        title: "국제 경험",
        content: "해외 연수, 국제 프로젝트 참여, 글로벌 기업 근무 경험",
        note: "국제적 시각과 글로벌 트렌드에 대한 이해도 평가",
      },
      {
        title: "네트워크 보유",
        content: "해당 분야의 전문가 네트워크 및 산업체 연결망 보유",
        note: "기업과의 연계 교육 및 실무진과의 협력 가능성",
      },
      {
        title: "커뮤니케이션 역량",
        content: "우수한 의사소통 능력 및 프레젠테이션 스킬 보유",
        note: "교육 효과 극대화를 위한 핵심 역량",
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
      navigate("/person-register");
    } else {
      alert("모든 항목을 확인으로 체크해 주세요.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 py-8">
      <div className="container-max max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center px-4 py-2 bg-purple-100 text-purple-800 rounded-full text-sm font-medium mb-4">
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
            전문양성인 등록 체크리스트
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            전문양성인 등록 자격 체크리스트
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            첨단산업 분야 전문양성인 등록을 위한 자격 요건들을 체크해보세요.
            모든 항목을 만족해야 등록 신청이 가능합니다.
          </p>
        </div>

        {/* Fixed Progress Sidebar */}
        <div className="fixed top-1/2 right-8 transform -translate-y-1/2 z-50 hidden xl:block">
          <div className="bg-white rounded-2xl p-4 shadow-xl border border-gray-200 w-72">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-sm font-semibold text-gray-900">진행률</h3>
              <span className="text-lg font-bold text-purple-600">
                {completedCount}/{checklistData.length}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
              <div
                className="bg-gradient-to-r from-purple-500 to-pink-600 h-2 rounded-full transition-all duration-500 ease-out"
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
                      ? "bg-purple-50 border-l-2 border-purple-500"
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
                        ? "text-purple-700 font-medium"
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
            <span className="text-2xl font-bold text-purple-600">
              {completedCount}/{checklistData.length}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
            <div
              className="bg-gradient-to-r from-purple-500 to-pink-600 h-3 rounded-full transition-all duration-500 ease-out"
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
                  : "border-gray-200 hover:border-purple-200"
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
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-4 mb-6">
                  {item.details.map((detail, detailIndex) => (
                    <div
                      key={detailIndex}
                      className="border-l-4 border-purple-200 pl-4"
                    >
                      <h4 className="font-semibold text-gray-900 mb-2">
                        {detail.title}
                      </h4>
                      {detail.content && (
                        <p className="text-gray-700 mb-2">{detail.content}</p>
                      )}
                      {detail.note && (
                        <p className="text-xs text-gray-500 bg-gray-50 p-2 rounded italic">
                          💡 {detail.note}
                        </p>
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
                      해당함
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
                      해당하지 않음
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
              <svg
                className="w-8 h-8 text-purple-600"
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
              자격 확인 완료
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto mb-6">
              전문양성인 등록 자격 요건 확인을 완료하셨습니다. 모든 요건을
              만족하시면 전문양성인 등록 신청이 가능합니다.
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
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              {allConfirmed ? (
                <>
                  자격 확인 후 등록 신청
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
                </>
              ) : (
                "모든 항목을 확인해주세요"
              )}
            </button>

            <button
              onClick={() => navigate("/")}
              className="inline-flex items-center px-6 py-3 text-gray-600 font-medium hover:text-purple-600 transition-colors duration-200"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              홈으로
            </button>
          </div>
        </div>

        {/* Important Notice */}
        <div className="mt-8 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-200">
          <div className="text-center">
            <h4 className="text-xl font-bold text-gray-900 mb-4">
              📋 전문양성인 등록 안내
            </h4>
            <div className="grid md:grid-cols-2 gap-6 text-left">
              <div>
                <h5 className="font-semibold text-purple-700 mb-2">
                  등록 절차
                </h5>
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
                    <svg
                      className="w-4 h-4 mr-2 text-purple-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
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
                    <svg
                      className="w-4 h-4 mr-2 text-purple-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    <span>이메일: expert@kiat.or.kr</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    운영시간: 평일 09:00~18:00 (점심시간 12:00~13:00 제외)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
