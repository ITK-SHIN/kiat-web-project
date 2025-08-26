import { Link } from 'react-router-dom';
import Card from '../../components/common/Card';


export default function Home(){
return (
<>
{/* 상단 히어로 */}
<section className="section">
<div className="hero grid-2">
<div>
<h1 className="m-0 mb-2 text-2xl font-bold">연구소/전담부서 변경신고 유의사항</h1>
<p className="mb-4">기업인재개발기관·사내대학원 등 지정/등록·운영 시 필수 확인사항을 안내합니다.</p>
<Link className="btn" to="/checklist">체크리스트로 바로가기</Link>
</div>
<div className="grid gap-4">
<Card title="자주 찾는 정보">지정요건, 서류양식, 처리기한</Card>
<Card title="민원상담">1379 → 3번</Card>
</div>
</div>
</section>

{/* 공지/정책/자료 */}
<section className="section section-muted">
<div className="container-max grid md:grid-cols-3 gap-6">
<div>
<div className="section-title"><span className="dot" /> 공지사항</div>
<div className="card">
<ul className="notice-list">
<li className="notice-item"><a href="#">[공지] 신청접수 시스템 점검 안내</a><span className="date">2025-06-12</span></li>
<li className="notice-item"><a href="#">[발표] 지정평가 일정 공지</a><span className="date">2025-06-10</span></li>
<li className="notice-item"><a href="#">[안내] 제출서류 양식 개정</a><span className="date">2025-06-07</span></li>
</ul>
</div>
</div>
<div>
<div className="section-title"><span className="dot" /> 정책간행물</div>
<div className="card">
<ul className="notice-list">
<li className="notice-item"><span className="pill">PDF</span><a href="#" className="ml-2">기업인재개발기관 가이드북 v2.1</a><span className="date">2025-05-28</span></li>
<li className="notice-item"><span className="pill">HWP</span><a href="#" className="ml-2">신규 지정 신청서 양식</a><span className="date">2025-05-22</span></li>
<li className="notice-item"><span className="pill">XLSX</span><a href="#" className="ml-2">시설 보유현황 서식</a><span className="date">2025-05-19</span></li>
</ul>
</div>
</div>
<div>
<div className="section-title"><span className="dot" /> 공개자료</div>
<div className="card">
<ul className="notice-list">
<li className="notice-item"><a href="#">심사위원회 심의 결과 요약</a><span className="date">2025-06-02</span></li>
<li className="notice-item"><a href="#">운영실태 조사 결과</a><span className="date">2025-05-30</span></li>
<li className="notice-item"><a href="#">성과지표 현황</a><span className="date">2025-05-17</span></li>
</ul>
</div>
</div>
</div>
</section>

{/* 바로가기 */}
<section className="section">
<div className="section-title"><span className="dot" /> 바로가기</div>
<div className="quick-grid">
<Link to="/steps" className="quick"><div className="icon">📄</div>신규처리절차</Link>
<Link to="/login" className="quick"><div className="icon">📝</div>지정 등록하기</Link>
<Link to="/" className="quick"><div className="icon">📚</div>자료실</Link>
<Link to="/" className="quick"><div className="icon">❓</div>자주 묻는 질문</Link>
<Link to="/" className="quick"><div className="icon">📞</div>민원상담 1379→3</Link>
<Link to="/" className="quick"><div className="icon">🧭</div>사이트 맵</Link>
</div>
</section>
</>
);
}