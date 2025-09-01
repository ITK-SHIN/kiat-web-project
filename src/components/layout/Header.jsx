import { Link } from "react-router-dom";
import nav from "../../constants/nav";
import logo from "../../assets/images/logo.png";

export default function Header() {
  return (
    <header>
      {/* 상단 유틸바 */}
      <div className="flex justify-between bg-slate-50 pb-4 border-b border-slate-200 text-sm">
        <div>
          <Link className="brand flex items-center gap-2" to="/">
            <img src={logo} alt="KIAT 로고" className="h-9 w-60" />
          </Link>
        </div>
        <div className="flex items-center gap-4 h-8">
          <Link to="/login" className="hover:underline">
            로그인
          </Link>
          <Link to="/" className="hover:underline">
            회원사 신청
          </Link>
          <Link to="/" className="hover:underline">
            이용자등록
          </Link>
          <Link to="/" className="hover:underline">
            사이트맵
          </Link>
          <Link to="/" className="hover:underline">
            ENGLISH
          </Link>
        </div>
      </div>

      {/* 네비게이션 + 메가메뉴 */}
      <nav
        className="bg-slate-50 border-b border-slate-200"
        role="navigation"
        aria-label="주 메뉴"
      >
        <div className="container-max">
          <div className="dropdown dropdown-hover w-full group">
            <ul className="menu menu-horizontal bg-slate-50 w-full flex justify-between">
              {nav.top.map((item) => (
                <li key={item.label} className="text-center">
                  <Link
                    to={item.to ?? "#"}
                    className="hover:bg-slate-100 whitespace-nowrap font-medium hover:text-blue-600"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="dropdown-content z-[1] menu shadow bg-slate-50 w-full group-hover:block hidden">
              <div className="container-max p-4">
                <div className="flex justify-between gap-4">
                  {nav.top.map(
                    (item) =>
                      item.children?.length && (
                        <div
                          key={item.label}
                          className="flex flex-col gap-4 hover:bg-blue-100"
                        >
                          <h3 className="font-bold text-lg text-blue-600">
                            {item.label}
                          </h3>
                          {item.children.map((col, idx) => (
                            <div key={idx} className="flex flex-col gap-2">
                              {col.title !== col.links[0].label &&
                                col.title && (
                                  <h4 className="font-semibold text-slate-800 hover:text-blue-600 hover:bg-blue-200 text-base">
                                    {col.title}
                                  </h4>
                                )}
                              <div className="flex flex-col gap-1">
                                {col.links.map((l) => (
                                  <Link
                                    key={l.to}
                                    to={l.to}
                                    className="hover:bg-slate-100 py-1 text-slate-500 hover:text-blue-500 text-sm"
                                    onClick={() => {
                                      // 링크 클릭 시 메가메뉴를 즉시 숨김
                                      const dropdown =
                                        document.querySelector(".dropdown");
                                      if (dropdown) {
                                        dropdown.classList.remove("group");
                                        dropdown.classList.add("group");
                                        // 강제로 hover 상태 해제하여 메뉴 닫기
                                        const dropdownContent =
                                          dropdown.querySelector(
                                            ".dropdown-content"
                                          );
                                        if (dropdownContent) {
                                          dropdownContent.style.display =
                                            "none";
                                          setTimeout(() => {
                                            dropdownContent.style.display = "";
                                          }, 50);
                                        }
                                      }
                                    }}
                                  >
                                    {l.label}
                                  </Link>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      )
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
