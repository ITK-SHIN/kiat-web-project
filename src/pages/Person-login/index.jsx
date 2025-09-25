import { Link, useNavigate } from 'react-router-dom';

export default function PersonLogin() {
  const navigate = useNavigate();

  const handlePhoneAuth = () => {
    // 휴대폰 인증 처리 로직
    window.scrollTo({ top: 0, behavior: 'smooth' });
    navigate('/person-steps');
  };

  const handleSNSLogin = () => {
    // SNS 로그인 처리 로직
    // console.log(`${provider}로 로그인`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    navigate('/person-steps');
  };

  const handleHomeClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    navigate('/');
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* 상단 네비게이션 */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <button onClick={handleHomeClick} className="hover:text-blue-600">
              🏠
            </button>
            <span>&gt;</span>
            <span className="text-gray-900 font-medium">개인회원 로그인</span>
          </nav>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* 페이지 제목 */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">개인회원 로그인</h1>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* 휴대폰 인증 섹션 */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="text-center mb-6">
              <div className="mx-auto w-20 h-20 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">휴대폰인증</h2>
            </div>

            {/* 본인인증 버튼 */}
            <button
              className="w-full py-4 bg-blue-600 text-white text-lg font-medium rounded-md hover:bg-blue-700 transition-colors mb-6"
              onClick={handlePhoneAuth}
            >
              본인인증
            </button>

            {/* 안내 텍스트 */}
            <div className="bg-blue-50 p-4 rounded-md mb-6">
              <div className="text-sm text-blue-800 space-y-2 text-left mt-8 mb-16">
                <p>
                  - <span className="text-red-600">본인 명의로 가입한 휴대전화번호로만 인증 가능</span>하며,{' '}
                  <span className="text-red-600">본인명의의 휴대전화번호가 아닌경우 인증이 어려우니</span> 이점 참고해
                  주시기 바랍니다.
                </p>
                <p>
                  - 해당 사이트(KIST)의 본인인증은 한국신용평가정보(주)의 본인인증 서비스를 통해 이루어집니다.
                  본인인증에 대한 문의가 있으신 분은 한국신용평가정보(주)의 본인인증 콜센터에 문의 주시기 바랍니다.
                </p>
                <p>
                  - 휴대전화 본인인증 후 화면전화이 <span className="font-medium">안되는 경우</span>
                </p>
                <p className="ml-2">
                  익스플로러(IE) -&gt; 인터넷옵션 -&gt; 보안 -&gt; 신뢰할 수 있는 사이트 -&gt; 사이트*.checkplus.co.kr
                  추가
                </p>
                <p className="text-xs mt-2">(이 영역에 있는 모든 사이트에 대해 서버 검증(https:) 필요(S) 해제)</p>
                <p className="text-xs">※권장 인터넷 브라우저 : 크롬(Chrome), 엣지(Edge)</p>
              </div>
            </div>
          </div>

          {/* SNS 로그인 섹션 */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">로그인</h2>
              <p className="text-gray-600">KIAT에 오신것을 환영합니다.</p>
            </div>

            <div className="space-y-4 mb-8 mt-20">
              {/* 사용자 아이디로 시작하기 */}
              <button
                className="w-full py-4 bg-blue-600 text-white text-lg font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-start gap-3"
                onClick={() => handleSNSLogin('KIAT통합')}
              >
                <svg className="w-6 h-6 ml-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                </svg>
                <span>사용자 아이디로 시작하기</span>
              </button>

              {/* 카카오 계정으로 시작하기 */}
              <button
                className="w-full py-4 bg-yellow-400 text-gray-900 text-lg font-medium rounded-lg hover:bg-yellow-500 transition-colors flex items-center justify-start gap-3"
                onClick={() => handleSNSLogin('카카오')}
              >
                <div className="w-6 h-6 bg-gray-900 rounded-full flex items-center justify-center ml-4">
                  <span className="text-yellow-400 text-xs font-bold">talk</span>
                </div>
                <span>카카오 계정으로 시작하기</span>
              </button>

              {/* 네이버 계정으로 시작하기 */}
              <button
                className="w-full py-4 bg-green-500 text-white text-lg font-medium rounded-lg hover:bg-green-600 transition-colors flex items-center justify-start gap-3"
                onClick={() => handleSNSLogin('네이버')}
              >
                <div className="w-6 h-6 bg-white rounded flex items-center justify-center ml-4">
                  <span className="text-green-500 text-sm font-bold">N</span>
                </div>
                <span>네이버 계정으로 시작하기</span>
              </button>
            </div>

            {/* 주의사항 */}
            <div className="text-sm text-gray-600 space-y-2 text-left">
              <p className="text-red-600">• 14세 미만 이용자는 간편가입(카카오, 네이버) 불가능니다.</p>
              <p>• 공공PC 이용 시 타인의 세션이 존재할 수 있으므로</p>
              <p className="ml-2">로그인 하기 전 PC에 네이버/카카오가 모두 로그아웃 상태인지 확인하세요.</p>
            </div>

            {/* 문의처 정보 */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <h3 className="font-medium text-gray-900 mb-3">문의처 정보</h3>
              <div className="text-sm text-gray-600 space-y-1 text-left">
                <p>
                  • 카카오, 네이버 계정 문의 :{' '}
                  <Link to="#" className="text-blue-600 hover:underline">
                    고객센터 플러스
                  </Link>
                  ,{' '}
                  <Link to="#" className="text-blue-600 hover:underline">
                    네이버 고객센터 플러스
                  </Link>
                </p>
                <p>• 카카오, 네이버 간편로그인 시 오류 문의 : 1599-3665</p>
              </div>
            </div>
          </div>
        </div>

        {/* 고객 지원 안내 */}
        <div className="mt-8 bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="text-blue-600">📞</span>
            문의가 필요하신가요?
          </h3>
          <div className="text-sm text-gray-600">
            <p>- 시스템 이용 및 회원가입 관련 문의: 042-724-6123(내선), 6114</p>
          </div>
          <div className="mt-3 text-xs text-gray-500">
            궁금하신 점이 있으시면 언제든 연락해 주세요. 신속하게 안내해드리겠습니다.
          </div>
        </div>
      </div>
    </main>
  );
}
