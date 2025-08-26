import { Link } from 'react-router-dom';
import nav from '../../constants/nav';
import logo from '../../assets/images/kiat-logo.png';


export default function Header(){
return (
<header>
{/* 상단 유틸바 */}
<div className="bg-slate-50 border-b border-slate-200 text-sm">
<div className="container-max flex items-center justify-end gap-4 h-8">
<Link to="/login" className="hover:underline">로그인</Link>
<Link to="/" className="hover:underline">고객센터</Link>
<Link to="/" className="hover:underline">사이트맵</Link>
</div>
</div>

{/* 메인 헤더: 로고 + 액션 */}
<Link className="brand flex items-center gap-2" to="/">
<img src={logo} alt="KIAT 로고" className="h-7 w-auto" />
</Link>
<div className="container-max h-16 flex items-center gap-6">
<div className="ml-auto hidden md:flex items-center gap-2">
<Link className="btn btn-secondary" to="/login">지정 등록하기</Link>
</div>
<button className="md:hidden ml-auto px-3 py-2" aria-label="메뉴 열기">☰</button>
</div>

{/* 네비게이션 + 메가메뉴 */}
<nav className="nav" role="navigation" aria-label="주 메뉴">
<div className="nav-row">
<ul className="menu" role="menubar">
{nav.top.map(item => (
<li key={item.label} className="menu-item" role="none">
<Link role="menuitem" to={item.to ?? '#'}>{item.label}</Link>
{item.children?.length ? (
<div className="mega" aria-label={`${item.label} 하위`}>
<div className="grid gap-2 md:grid-cols-4">
{item.children.map((col, idx) => (
<div key={idx} className="min-w-40 px-2">
{col.title && <div className="badge mb-1">{col.title}</div>}
{col.links.map(l => (
<div key={l.to}><Link to={l.to} className="hover:underline">{l.label}</Link></div>
))}
</div>
))}
</div>
</div>
) : null}
</li>
))}
</ul>
</div>
</nav>
</header>
);
}