import { Link } from "react-router-dom";

const stepsData = [
  {
    id: 1,
    step: "1단계",
    title: "온라인 신청서 작성",
    actor: "기업",
    actorColor: "bg-blue-500",
    description:
      "사내대학원 설치인가를 위한 온라인 신청서를 작성하고 필요 서류를 준비합니다.",
    details: [
      "온라인 신청시스템 접속",
      "기본정보 및 설치계획서 작성",
      "필수 첨부서류 업로드",
      "신청서 최종 제출",
    ],
    icon: "📝",
    estimatedTime: "1-2주",
  },
  {
    id: 2,
    step: "2단계",
    title: "서류 검토 및 보완요청",
    actor: "KIAT",
    actorColor: "bg-green-500",
    description:
      "한국산업기술진흥원에서 제출된 서류를 검토하고 필요시 보완을 요청합니다.",
    details: [
      "제출서류 접수 확인",
      "서류 완비성 검토",
      "보완사항 통지",
      "보완서류 재검토",
    ],
    icon: "🔍",
    estimatedTime: "2-3주",
  },
  {
    id: 3,
    step: "3단계",
    title: "심의·의결",
    actor: "심사위원회",
    actorColor: "bg-purple-500",
    description:
      "전문가로 구성된 심사위원회에서 설치 요건 충족 여부를 심의하고 의결합니다.",
    details: [
      "심사위원회 구성",
      "서류심사 및 현장실사",
      "종합심의 및 의결",
      "심사결과 확정",
    ],
    icon: "👥",
    estimatedTime: "3-4주",
  },
  {
    id: 4,
    step: "4단계",
    title: "결과통지 및 지정서 발급",
    actor: "결과통지",
    actorColor: "bg-orange-500",
    description: "심사 결과에 따라 지정서를 발급하거나 반려 사유를 통지합니다.",
    details: [
      "심사결과 통지서 발송",
      "지정서 발급 (승인시)",
      "반려사유 안내 (반려시)",
      "이의신청 안내",
    ],
    icon: "📋",
    estimatedTime: "1주",
  },
];

export default function Steps() {
  const totalEstimatedTime = "7-10주";

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="container-max max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-4">
            <svg
              className="w-4 h-4 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm0 4a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1V8zm8 0a1 1 0 011-1h4a1 1 0 011 1v6a1 1 0 01-1 1h-4a1 1 0 01-1-1V8z"
                clipRule="evenodd"
              />
            </svg>
            처리절차 안내
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            신규처리절차
          </h1>
          <div className="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium mb-4">
            기업인재개발기관
          </div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-6">
            사내대학원 설치인가 신청부터 지정서 발급까지의 전체 과정을
            안내합니다.
          </p>
          <div className="bg-white rounded-2xl p-4 shadow-lg inline-block">
            <div className="flex items-center space-x-2">
              <svg
                className="w-5 h-5 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="text-sm text-gray-600">예상 소요시간:</span>
              <span className="font-semibold text-blue-600">
                {totalEstimatedTime}
              </span>
            </div>
          </div>
        </div>

        {/* Progress Timeline */}
        <div className="mb-12">
          <div className="flex justify-center mb-8">
            <div className="flex items-center space-x-4">
              {stepsData.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-12 h-12 rounded-full ${step.actorColor} flex items-center justify-center text-white font-bold text-lg shadow-lg`}
                    >
                      {step.id}
                    </div>
                    <span className="text-xs text-gray-600 mt-2 text-center max-w-16">
                      {step.estimatedTime}
                    </span>
                  </div>
                  {index < stepsData.length - 1 && (
                    <div className="hidden sm:block w-16 h-1 bg-gradient-to-r from-gray-300 to-gray-400 mx-2"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Steps Cards */}
        <div className="grid gap-8 mb-12">
          {stepsData.map((step, index) => (
            <div
              key={step.id}
              className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="text-4xl">{step.icon}</div>
                    <div>
                      <div className="flex items-center space-x-3 mb-2">
                        <span className="text-sm font-medium text-gray-500">
                          {step.step}
                        </span>
                        <div
                          className={`px-3 py-1 rounded-full text-white text-sm font-medium ${step.actorColor}`}
                        >
                          {step.actor}
                        </div>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900">
                        {step.title}
                      </h3>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span>{step.estimatedTime}</span>
                  </div>
                </div>

                <p className="text-gray-700 text-lg mb-6 leading-relaxed">
                  {step.description}
                </p>

                <div className="bg-gray-50 rounded-xl p-6">
                  <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                    <svg
                      className="w-5 h-5 mr-2 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                      />
                    </svg>
                    세부 진행사항
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {step.details.map((detail, detailIndex) => (
                      <div
                        key={detailIndex}
                        className="flex items-start space-x-2"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0"></div>
                        <span className="text-gray-700 text-sm">{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Connection Line */}
              {index < stepsData.length - 1 && (
                <div className="flex justify-center">
                  <div className="w-px h-8 bg-gradient-to-b from-gray-300 to-transparent"></div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
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
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              신청을 시작하시겠습니까?
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto mb-8">
              체크리스트를 통해 요건을 확인하신 후, 온라인 신청을 진행하실 수
              있습니다. 궁금한 사항이 있으시면 언제든지 문의해 주세요.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/register"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
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
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
              등록하기
            </Link>
            <Link
              to="/checklist"
              className="inline-flex items-center px-8 py-4 bg-white text-gray-700 font-semibold rounded-lg border-2 border-gray-300 hover:border-gray-400 transition-all duration-200 hover:shadow-lg"
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
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              체크리스트 확인
            </Link>
            <Link
              to="/"
              className="inline-flex items-center px-6 py-3 text-gray-600 font-medium hover:text-blue-600 transition-colors duration-200"
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
            </Link>
          </div>
        </div>

        {/* Help Section */}
        <div className="mt-12 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-200">
          <div className="text-center">
            <h4 className="text-xl font-bold text-gray-900 mb-4">
              도움이 필요하시나요?
            </h4>
            <p className="text-gray-600 mb-6">
              신청 과정에서 궁금한 사항이나 도움이 필요하시면 언제든지
              연락주세요.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="flex items-center space-x-2 text-blue-700">
                <svg
                  className="w-5 h-5"
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
                <span className="font-medium">1379 → 3번</span>
              </div>
              <div className="flex items-center space-x-2 text-blue-700">
                <svg
                  className="w-5 h-5"
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
                <span className="font-medium">문의하기</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
