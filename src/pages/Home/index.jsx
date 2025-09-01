import { Link } from "react-router-dom";
import Carousel from "../../components/common/Carousel";
import Card from "../../components/common/Card";

export default function Home() {
  return (
    <>
      <Carousel /> {/* 상단 히어로 */}
      <section className="section bg-gradient-to-br from-blue-50 to-indigo-100 py-6 mt-12">
        <div className="container-max">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                <svg
                  className="w-4 h-4 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clipRule="evenodd"
                  />
                </svg>
                필수 확인사항
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                연구소/전담부서 변경신고
                <span className="text-blue-600">유의사항</span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                기업인재개발기관·사내대학원 등 지정/등록·운영 시 필수 확인사항을
                안내합니다.
              </p>
              <Link
                className="inline-flex items-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                to="/checklist"
              >
                체크리스트로 바로가기
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
              </Link>
            </div>

            <div className="grid gap-6">
              <div className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-shadow duration-300 border border-gray-100">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mr-4">
                    <svg
                      className="w-6 h-6 text-emerald-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">
                    자주 찾는 정보
                  </h3>
                </div>
                <p className="text-gray-600">지정요건, 서류양식, 처리기한</p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-shadow duration-300 border border-gray-100">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mr-4">
                    <svg
                      className="w-6 h-6 text-purple-600"
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
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">민원상담</h3>
                </div>
                <p className="text-gray-600">
                  <span className="inline-flex items-center px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                    1379 → 3번
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* 공지/정책/자료 */}
      <section className="section section-muted">
        <div className="container-max grid md:grid-cols-3 gap-6">
          <div>
            <div className="section-title">
              <span className="dot" /> 공지사항
            </div>
            <div className="card">
              <ul className="notice-list">
                <li className="notice-item">
                  <a href="#">[공지] 신청접수 시스템 점검 안내</a>
                  <span className="date">2025-06-12</span>
                </li>
                <li className="notice-item">
                  <a href="#">[발표] 지정평가 일정 공지</a>
                  <span className="date">2025-06-10</span>
                </li>
                <li className="notice-item">
                  <a href="#">[안내] 제출서류 양식 개정</a>
                  <span className="date">2025-06-07</span>
                </li>
              </ul>
            </div>
          </div>
          <div>
            <div className="section-title">
              <span className="dot" /> 정책간행물
            </div>
            <div className="card">
              <ul className="notice-list">
                <li className="notice-item">
                  <span className="pill">PDF</span>
                  <a href="#" className="ml-2">
                    기업인재개발기관 가이드북 v2.1
                  </a>
                  <span className="date">2025-05-28</span>
                </li>
                <li className="notice-item">
                  <span className="pill">HWP</span>
                  <a href="#" className="ml-2">
                    신규 지정 신청서 양식
                  </a>
                  <span className="date">2025-05-22</span>
                </li>
                <li className="notice-item">
                  <span className="pill">XLSX</span>
                  <a href="#" className="ml-2">
                    시설 보유현황 서식
                  </a>
                  <span className="date">2025-05-19</span>
                </li>
              </ul>
            </div>
          </div>
          <div>
            <div className="section-title">
              <span className="dot" /> 공개자료
            </div>
            <div className="card">
              <ul className="notice-list">
                <li className="notice-item">
                  <a href="#">심사위원회 심의 결과 요약</a>
                  <span className="date">2025-06-02</span>
                </li>
                <li className="notice-item">
                  <a href="#">운영실태 조사 결과</a>
                  <span className="date">2025-05-30</span>
                </li>
                <li className="notice-item">
                  <a href="#">성과지표 현황</a>
                  <span className="date">2025-05-17</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      {/* 바로가기 */}
      <section className="section">
        <div className="section-title">
          <span className="dot" /> 바로가기
        </div>
        <div className="quick-grid">
          <Link to="/steps" className="quick">
            <div className="icon">📄</div>신규처리절차
          </Link>
          <Link to="/login" className="quick">
            <div className="icon">📝</div>지정 등록하기
          </Link>
          <Link to="/" className="quick">
            <div className="icon">📚</div>자료실
          </Link>
          <Link to="/" className="quick">
            <div className="icon">❓</div>자주 묻는 질문
          </Link>
          <Link to="/" className="quick">
            <div className="icon">📞</div>민원상담 1379→3
          </Link>
          <Link to="/" className="quick">
            <div className="icon">🧭</div>사이트 맵
          </Link>
        </div>
      </section>
    </>
  );
}
