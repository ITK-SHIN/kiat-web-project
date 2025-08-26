import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


export default function Checklist(){
const nav = useNavigate();
const [checks, setChecks] = useState([false,false,false,false]);
const all = checks.every(Boolean);
const toggle = (i) => setChecks(cs => cs.map((c,idx)=> idx===i ? !c : c));
return (
<main className="container-max py-12">
<h2 className="mb-4 text-xl font-bold">고시 및 체크리스트</h2>
<div className="card">
<p className="mt-0"><b>※</b> 아래 항목을 모두 확인해야 다음 단계로 이동합니다.</p>
{[
'신청기업은 국내 법인사업자이며, 필수 첨부서류를 준비했습니다.',
'거짓 또는 부정한 방법으로 신청하지 않습니다.',
'처리 기한 및 보완 요청에 동의합니다.',
'개인정보 수집·이용 동의(데모)'
].map((t,i)=>(
<label key={i} className="block">
<input type="checkbox" className="mr-2" checked={checks[i]} onChange={()=>toggle(i)} /> {t}
</label>
))}
<div className="mt-4">
<button className="btn" onClick={()=> all ? nav('/steps') : alert('모든 항목을 확인해 주세요.')}>확인 후 다음</button>
</div>
</div>
</main>
);
}