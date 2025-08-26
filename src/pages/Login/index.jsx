import { Link } from 'react-router-dom';


export default function Login(){
return (
<main className="container-max py-12">
<h2 className="mb-4 text-xl font-bold">로그인</h2>
<div className="grid-2">
<div className="card">
<h3 className="mt-0">공동인증서(사업자)</h3>
<p>데모에선 버튼 클릭으로 다음 단계로 이동합니다.</p>
<Link className="btn" to="/checklist">인증 후 진입(데모)</Link>
</div>
<div className="card">
<h3 className="mt-0">아이디/비밀번호</h3>
<div className="grid gap-3">
<input className="input" placeholder="아이디" />
<input className="input" type="password" placeholder="비밀번호" />
<div><Link className="btn" to="/checklist">로그인(데모)</Link></div>
</div>
</div>
</div>
</main>
);
}