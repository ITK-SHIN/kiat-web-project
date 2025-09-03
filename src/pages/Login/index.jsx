import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function Login() {
  const [certNumber, setCertNumber] = useState('');
  const [empId, setEmpId] = useState('');
  const [empPassword, setEmpPassword] = useState('');
  const navigate = useNavigate();

  const handleCertLogin = () => {
    if (!certNumber.trim()) {
      alert('본사 사업자 번호를 입력해주세요.');
      return;
    }
    // 공동인증서 로그인 처리 로직
    navigate('/steps');
  };

  const handleEmpLogin = () => {
    if (!empId.trim()) {
      alert('인정번호를 입력해주세요.');
      return;
    }
    if (!empPassword.trim()) {
      alert('비밀번호를 입력해주세요.');
      return;
    }
    // 인정번호 로그인 처리 로직
    navigate('/steps');
  };

  // 버튼 활성화 상태 확인
  const isCertLoginEnabled = certNumber.trim().length > 0;
  const isEmpLoginEnabled = empId.trim().length > 0 && empPassword.trim().length > 0;

  return (
    <main className="min-h-screen bg-gray-50">
      {/* 상단 네비게이션 */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <Link to="/" className="hover:text-blue-600">🏠</Link>
            <span>&gt;</span>
            <span className="text-gray-900 font-medium">기업 로그인</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">기업 로그인</h1>
          
          {/* 다운로드 버튼들 */}
          <div className="flex flex-wrap gap-3 mb-8 justify-between items-center">
            <button className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg font-semibold flex items-center gap-2 hover:bg-gray-300 transition-colors duration-150 border-2 border-gray-300 hover:border-gray-400 shadow-none">
              <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M12 20a8 8 0 100-16 8 8 0 000 16z" />
              </svg>
              로그인 오류 해결방안
            </button>
            <div className="flex flex-wrap gap-3">
              <button className="px-5 py-2 bg-white border border-gray-300 rounded-lg shadow-sm text-gray-800 text-sm font-medium flex items-center gap-2 hover:bg-blue-50 hover:border-blue-400 transition-colors duration-150">
                오즈뷰어 프로그램 다운로드
                <span className="text-blue-500">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v12m0 0l-4-4m4 4l4-4M4 20h16" />
                  </svg>
                </span>
              </button>
              <button className="px-5 py-2 bg-white border border-gray-300 rounded-lg shadow-sm text-gray-800 text-sm font-medium flex items-center gap-2 hover:bg-blue-50 hover:border-blue-400 transition-colors duration-150">
                위변조 프로그램 다운로드
                <span className="text-blue-500">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v12m0 0l-4-4m4 4l4-4M4 20h16" />
                  </svg>
                </span>
              </button>
              <button className="px-5 py-2 bg-white border border-gray-300 rounded-lg shadow-sm text-gray-800 text-sm font-medium flex items-center gap-2 hover:bg-blue-50 hover:border-blue-400 transition-colors duration-150">
                공동인증서 로그인 프로그램 다운로드
                <span className="text-blue-500">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v12m0 0l-4-4m4 4l4-4M4 20h16" />
                  </svg>
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* 로그인 섹션들 */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* 공동인증서(기업) 로그인 */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="text-center mb-6">
              <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">공동인증서(기업) 로그인</h2>
            </div>
            
            <div className="space-y-4">
              <input
                type="text"
                placeholder="본사 사업자 번호"
                value={certNumber}
                onChange={(e) => setCertNumber(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <div className="flex gap-2">
                <button className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50">
                  인증서 안내/신청
                </button>
                <button 
                  className={`px-6 py-3 rounded-md font-medium transition-colors ${
                    isCertLoginEnabled
                      ? 'bg-blue-600 text-white hover:bg-blue-700 cursor-pointer'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                  onClick={handleCertLogin}
                  disabled={!isCertLoginEnabled}
                >
                  로그인
                </button>
              </div>
            </div>

            <hr className="border-t border-gray-200 my-6 mt-13" />
            <div className="mt-6 text-sm text-gray-600 space-y-2 text-left">
              <p>- 로그인이 안될 시 <Link to="#" className="text-blue-600 hover:underline"> 로그인 오류 해결방안</Link>을 클릭하세요</p>
              <p>- 최초 신규신고는 공동인증서(기업)로만 가능합니다.</p>
              <p>- 기업용(범용,KOITA특수목적용)공동인증서(기업)만 사용 가능합니다.</p>
              <p>- 현 시스템에서 사용가능한 인증서만 보입니다.</p>
            </div>

            <div className="mt-18 p-4 bg-blue-50 rounded-md min-h-[140px] flex flex-col">
              <div className="flex items-start gap-2 flex-1">
                <span className="text-blue-600 mt-1 flex-shrink-0">✓</span>
                <div className="text-sm text-blue-800 flex-1">
                  <strong className="block mb-2 text-left">공동인증서(기업) 로그인</strong>
                  <p className="leading-relaxed text-left">
                  신규설립신고 및 보완 | 변경신고 및 보완 | 신고내역 보기 |양수 신청 | 
                  </p>
                  <p className="leading-relaxed text-left">
                  연구소 자진 취소 | 보유 연구소 조회 및 인정서 출력 | 담당자 변경 | 
                  </p>
                  <p className="leading-relaxed text-left">
                  비밀번호 변경(인정번호 로그인) | 
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 임직번호 로그인 */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="text-center mb-6">
              <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2 ">인정번호 로그인</h2>
            </div>

            <div className="flex gap-2">
              <div className="flex flex-col gap-2 flex-1">
                <input
                  type="text"
                  placeholder="인정번호"
                  value={empId}
                  onChange={(e) => setEmpId(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <input
                  type="password"
                  placeholder="비밀번호"
                  value={empPassword}
                  onChange={(e) => setEmpPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
                             <button
                 className={`rounded-md font-medium flex-shrink-0 flex items-center justify-center text-lg transition-colors ${
                   isEmpLoginEnabled
                     ? 'bg-blue-600 text-white hover:bg-blue-700 cursor-pointer'
                     : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                 }`}
                 style={{ width: "150px", height: "110px" }}
                 onClick={handleEmpLogin}
                 disabled={!isEmpLoginEnabled}
               >
                 로그인
               </button>
            </div>

            <div className="mt-4 flex justify-center space-x-4 text-sm">
              <Link to="#" className="text-blue-600 hover:underline">비밀번호 등록</Link>
              <span className="text-gray-400">|</span>
              <Link to="#" className="text-blue-600 hover:underline">비밀번호 찾기</Link>
            </div>

            <hr className="border-t border-gray-200 my-6" />
            <div className="text-sm text-gray-600 space-y-2 text-left">
              <p>- 연구소 비밀번호를 등록하면 공동인증서(기업) 없이 서비스를 이용할 수 있습니다.</p>
              <p>- 담당자 변경 (퇴사, 인사이동)시 정보보호를 위해 반드시 비밀번호를 변경해주십시오.</p>
              <p>- 인정번호로 로그인시 신규신고, 자진취소 등 기능이 일부 제한됩니다.</p>
            </div>

            <div className="mt-24 p-4 bg-red-50 rounded-md min-h-[140px] flex flex-col">
              <div className="flex items-start gap-2 flex-1">
                <span className="text-red-600 mt-1 flex-shrink-0">✓</span>
                <div className="text-sm text-red-800 flex-1">
                  <strong className="block mb-2 text-left">임직번호 로그인</strong>
                  <p className="leading-relaxed mb-2 text-left">
                    변경신고 및 보완 | 신고내역 보기 | 보고 연수 조회 및 인쇄서 출력 |
                  </p>
                  <p className="leading-relaxed mb-2 text-left">
                    담당자 변경 | 비밀번호 변경 |
                  </p>
                  <p className="text-red-600 font-medium">
                    위 기능은 인정번호에 해당하는 연구소만 가능합니다.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 로그인 안내사항 */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="text-blue-600">📋</span>
            로그인 안내사항
          </h3>
          <div className="space-y-3 text-sm text-gray-600 text-left">
            <p>• 현재 보안패치가 종료된 윈도우XP 및 익스플로러 8 이하 버전 사용시 시스템 이용이 정상적이지 않을 수있습니다.</p>
            <p>• 가급적 윈도우7 서비스팩 1 이상의 OS 버전을 설치하고 인터넷 익스플로러(IE, Internet Explorer)를 10이상 버전으로 설치해 주시기 바랍니다.</p>
          </div>
        </div>
      </div>
    </main>
  );
}