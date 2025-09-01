import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  const goHome = () => {
    navigate("/");
  };

  const goBack = () => {
    window.history.back();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="text-center max-w-2xl mx-auto">
        {/* 404 Big Number */}
        <div className="mb-8">
          <h1 className="text-9xl md:text-[12rem] font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 leading-none">
            404
          </h1>
        </div>

        {/* Error Message */}
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            페이지를 찾을 수 없습니다
          </h2>
          <p className="text-lg text-gray-600 mb-2">
            요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
          </p>
          <p className="text-md text-gray-500">
            URL을 다시 확인해주시거나 홈페이지로 돌아가 주세요.
          </p>
        </div>

        {/* Illustration */}
        <div className="mb-8">
          <div className="w-32 h-32 md:w-40 md:h-40 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mx-auto flex items-center justify-center opacity-20">
            <svg
              className="w-16 h-16 md:w-20 md:h-20 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={goHome}
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200"
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
            홈으로 돌아가기
          </button>

          <button
            onClick={goBack}
            className="inline-flex items-center px-6 py-3 text-gray-600 font-medium border-2 border-gray-300 rounded-lg hover:border-blue-500 hover:text-blue-600 transition-colors duration-200"
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
                d="M15 19l-7-7 7-7"
              />
            </svg>
            이전 페이지로
          </button>
        </div>

        {/* Help Section */}
        <div className="mt-12 p-6 bg-white rounded-2xl shadow-lg border border-gray-200">
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            🔍 도움이 필요하신가요?
          </h3>
          <div className="grid md:grid-cols-2 gap-6 text-left">
            <div>
              <h4 className="font-semibold text-blue-700 mb-2">주요 페이지</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>
                  <button
                    onClick={() => navigate("/")}
                    className="hover:text-blue-600 transition-colors"
                  >
                    • 홈페이지
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate("/checklist")}
                    className="hover:text-blue-600 transition-colors"
                  >
                    • 기업인재개발기관 체크리스트
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate("/person-checklist")}
                    className="hover:text-blue-600 transition-colors"
                  >
                    • 전문양성인 체크리스트
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate("/steps")}
                    className="hover:text-blue-600 transition-colors"
                  >
                    • 신규처리절차
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-blue-700 mb-2">문의사항</h4>
              <div className="text-sm text-gray-600 space-y-2">
                <div className="flex items-center">
                  <svg
                    className="w-4 h-4 mr-2 text-blue-600"
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
                  <span>전화: 1379</span>
                </div>
                <div className="flex items-center">
                  <svg
                    className="w-4 h-4 mr-2 text-blue-600"
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
                  <span>이메일: contact@kiat.or.kr</span>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  운영시간: 평일 09:00~18:00 (점심시간 12:00~13:00 제외)
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            © 2024 한국산업기술진흥원(KIAT). All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
