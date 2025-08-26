import { Link } from 'react-router-dom';


export default function Steps(){
const Step = ({n, t}) => (
<div className="card step"><div className="step-num">{n}</div><div>{t}</div></div>
);
return (
<main className="container-max py-12">
<h2 className="mb-2 text-xl font-bold">신규처리절차</h2>
<p className="badge">기업인재개발기관</p>
<div className="grid gap-4 mt-6">
<Step n={1} t={<><b>기업</b> → 온라인 신청서 작성</>} />
<Step n={2} t={<><b>KIAT</b> → 서류 검토 및 보완요청</>} />
<Step n={3} t={<><b>심사위원회</b> → 심의·의결</>} />
<Step n={4} t={<><b>결과통지</b> → 지정서 발급/반려</>} />
</div>
<div className="mt-6 flex gap-2">
<Link className="btn" to="/register">등록하기</Link>
<Link className="btn btn-secondary" to="/">홈으로</Link>
</div>
</main>
);
}