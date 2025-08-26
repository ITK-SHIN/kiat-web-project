import { useNavigate } from 'react-router-dom';


export default function Register(){
const nav = useNavigate();
const submit = (e)=>{e.preventDefault(); alert('제출 완료 (데모)'); nav('/')};
return (
<main className="container-max py-12">
<h2 className="mb-4 text-xl font-bold">기업인재개발기관 등록(데모)</h2>
<form className="card grid md:grid-cols-2 gap-4" onSubmit={submit}>
<label className="block">기업명<input className="input" required /></label>
<label className="block">사업자등록번호<input className="input" required /></label>
<label className="block">담당자 이름<input className="input" required /></label>
<label className="block">연락처<input className="input" required /></label>
<label className="block md:col-span-2">교육시설 개요<textarea className="input" rows="5" /></label>
<div className="md:col-span-2 flex gap-2">
<button className="btn" type="submit">제출(데모)</button>
<button className="btn btn-secondary" type="button" onClick={()=>nav('/steps')}>이전</button>
</div>
</form>
</main>
);
}