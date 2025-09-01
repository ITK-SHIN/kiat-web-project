import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Checklist() {
  const nav = useNavigate();
  const [checks, setChecks] = useState([false, false, false, false]);
  const all = checks.every(Boolean);
  const toggle = (i) =>
    setChecks((cs) => cs.map((c, idx) => (idx === i ? !c : c)));
  return (
    <main className="container-max py-12">
      <h2 className="mb-4 text-xl font-bold text-center">
        사내대학원 설립인가 신청 체크리스트
      </h2>

      <div className="card">
        <table className="w-full border-collapse border border-gray-400">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-400 p-3 text-center w-24">
                구분
              </th>
              <th className="border border-gray-400 p-3 text-center">
                체크리스트 항목
              </th>
              <th className="border border-gray-400 p-3 text-center w-20">
                확인
              </th>
              <th className="border border-gray-400 p-3 text-center w-20">
                미확인
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td
                className="border border-gray-400 p-3 text-center bg-gray-50 font-medium"
                rowSpan="5"
              >
                설치대상자 기준
              </td>
              <td className="border border-gray-400 p-3 text-left">
                <div className="mb-2 font-medium">
                  귀사는 아래와 같은 설치대상자 기준 중 한가지에 해당하고 관련
                  서류를 가지고 있습니까?
                </div>
                <div className="text-sm space-y-1">
                  <div>
                    1. (대규모 사업장) ｢상법｣또는 특별법에 따라 설립된 법인으로,
                    종업원의 수가 200명 이상*인 사업장을 경영하는 자(여러
                    사업장이 공동으로 참여하는 경우도 포함)
                  </div>
                  <div className="ml-4 text-xs text-gray-600">
                    * 해당 사업장에 고용된 종업원 및 해당 사업장에서 일하는 다른
                    업체 종업원도 포함
                  </div>
                  <div>
                    2. (산업단지 입주기업의 연합체) ｢산업입지 및 개발에 관한
                    법률｣에 따라 설립된 산업단지에 입주한 기업들의
                    연합체(연합체의 종업원의 수 200명 이상)
                  </div>
                  <div>
                    3. (산업부문별 인적자원개발협의체) ｢산업발전법｣제12조제2항에
                    따라 구성된 산업부문별 인적자원개발협의체(종업원의 수 200명
                    이상)
                  </div>
                </div>
              </td>
              <td className="border border-gray-400 p-3 text-center">
                <input
                  type="radio"
                  name="check-0"
                  checked={checks[0] === true}
                  onChange={() => {
                    const newChecks = [...checks];
                    newChecks[0] = true;
                    setChecks(newChecks);
                  }}
                  className="w-4 h-4"
                />
              </td>
              <td className="border border-gray-400 p-3 text-center">
                <input
                  type="radio"
                  name="check-0"
                  checked={checks[0] === false}
                  onChange={() => {
                    const newChecks = [...checks];
                    newChecks[0] = false;
                    setChecks(newChecks);
                  }}
                  className="w-4 h-4"
                />
              </td>
            </tr>
            <tr>
              <td className="border border-gray-400 p-3 text-left">
                <div className="mb-2 font-medium">
                  귀사는 설치를 원하는 사내대학원이 아래와 같은 국가첨단산업
                  범위에 포함됩니까?
                </div>
                <div className="text-sm space-y-1">
                  <div className="font-medium">
                    (｢첨단산업인재혁신법｣제2조제1호 각 목에 따른 '첨단산업'
                    분야)
                  </div>
                  <div>
                    1. 반도체: △첨단 메모리반도체 산업 △첨단 시스템반도체 산업
                    △첨단 패키징 산업 △연관 산업(자동차, 통신, 사물인터넷 등)에
                    미치는 파급효과가 현저한 반도체 산업
                  </div>
                  <div>
                    2. 이차전지: △고에너지밀도 배터리 산업 △고용량 양극재 산업
                    △초고성능 전극 또는 차세대 배터리 산업
                  </div>
                  <div>
                    3. 디스플레이: △능동형 유기발광다이오드(AMOLED) 패널 산업
                    △친환경 퀀텀닷(QD)소재 패널 산업 △마이크로 발광다이오드(LED)
                    패널 산업 △나노 발광다이오드(LED) 패널 산업 △차세대
                    디스플레이 산업
                  </div>
                  <div>
                    4. 바이오: △바이오의약품 산업 △오가노이드 재생치료제 산업
                  </div>
                </div>
              </td>
              <td className="border border-gray-400 p-3 text-center">
                <input
                  type="radio"
                  name="check-1"
                  checked={checks[1] === true}
                  onChange={() => {
                    const newChecks = [...checks];
                    newChecks[1] = true;
                    setChecks(newChecks);
                  }}
                  className="w-4 h-4"
                />
              </td>
              <td className="border border-gray-400 p-3 text-center">
                <input
                  type="radio"
                  name="check-1"
                  checked={checks[1] === false}
                  onChange={() => {
                    const newChecks = [...checks];
                    newChecks[1] = false;
                    setChecks(newChecks);
                  }}
                  className="w-4 h-4"
                />
              </td>
            </tr>
            <tr>
              <td className="border border-gray-400 p-3 text-left">
                <div className="mb-2 font-medium">
                  귀사는 사내대학원 설치기준 중 아래와 같은 교사(校舍)
                  설치기준을 만족하는 시설을 보유하고 계십니까?
                </div>
                <div className="text-sm space-y-1">
                  <div className="font-medium">
                    ○ 교사시설 구분(｢평생교육법 시행령｣[별표5] '사내대학 교사의
                    구분' 준용)
                  </div>
                  <div className="ml-4">
                    - (교육기본시설) 강의실(원격교육시설* 포함), 실험실습실,
                    교수연구실 및 그 부대시설
                  </div>
                  <div className="ml-8 text-xs text-gray-600">
                    * ｢평생교육법 시행규칙｣제15조제2항 각호의 시설: ①100㎡
                    이상의 원격교육 학사관리실 1실 이상 ②100㎡ 이상의 서버 및
                    통신장비 관리실 ③원격교육 운영을 위한 1대 이상의 서버와
                    네트워크 장비
                  </div>
                  <div className="ml-4">
                    - (지원시설) 도서관, 학생복지시설, 행정실 및 그 부대시설
                  </div>
                  <div className="font-medium">
                    ○ 학생 1인당 교사 기준면적(｢평생교육법
                    시행령｣｢별표6｣'사내대학 교사의 기준면적' 준용)
                  </div>
                  <div className="font-medium">○ 교사 면적 산출 기준</div>
                  <div className="ml-4">
                    - 편제 완성연도 기준 계열별 학생정원* × 학생 1명당 교사
                    기준면적 × 0.5
                  </div>
                  <div className="ml-8 text-xs text-gray-600">
                    * 편제정원이 50명 미만인 경우 50명 기준으로 산출하며,
                    사내대학원은 첨단분야에 한해 설치되므로 계열은 자연과학·공학
                    계열에 한정
                  </div>
                  <div className="ml-4">
                    - 원격교육시설을 갖춘 경우에는 교사 면적을 1/2까지 감축 가능
                  </div>
                </div>
              </td>
              <td className="border border-gray-400 p-3 text-center">
                <input
                  type="radio"
                  name="check-2"
                  checked={checks[2] === true}
                  onChange={() => {
                    const newChecks = [...checks];
                    newChecks[2] = true;
                    setChecks(newChecks);
                  }}
                  className="w-4 h-4"
                />
              </td>
              <td className="border border-gray-400 p-3 text-center">
                <input
                  type="radio"
                  name="check-2"
                  checked={checks[2] === false}
                  onChange={() => {
                    const newChecks = [...checks];
                    newChecks[2] = false;
                    setChecks(newChecks);
                  }}
                  className="w-4 h-4"
                />
              </td>
            </tr>
            <tr>
              <td className="border border-gray-400 p-3 text-left">
                <div className="mb-2 font-medium">
                  귀사는 사내대학원 설치기준 중 아래와 같은 교원확보 기준을
                  만족하십니까?
                </div>
                <div className="text-sm space-y-1">
                  <div className="font-medium">
                    ○ (확보 시기) 개교 시 교원 정원의 2분의 1 이상을 반드시
                    확보, 나머지 교원은 개교 후 1년 이내에 확보
                  </div>
                  <div className="font-medium">
                    ○ 교원 1인당 학생 수(｢평생교육법 시행령｣[별표7] '사내대학의
                    교원산출기준' 준용)
                  </div>
                  <div className="font-medium">○ 교원 확보 산출 기준</div>
                  <div className="ml-4">
                    - 편제정원* × 1.5배 ÷ 교원 1인당 학생 수
                  </div>
                  <div className="ml-8 text-xs text-gray-600">
                    * 편제정원이 50명 미만인 경우 50명 기준으로 산출하며,
                    사내대학원은 첨단 분야에 한해 설치되므로 계열은
                    자연과학·공학 계열에 한정
                  </div>
                  <div className="ml-8 text-xs text-gray-600">
                    ※ (예) 첨단산업 분야 사내대학원 석사 과정(2년)의 입학정원이
                    30명인 경우:
                  </div>
                  <div className="ml-4">
                    - 편제정원 = 입학정원 30명 × 수업연한 2년 = 60명
                  </div>
                  <div className="ml-4">
                    - 교원 확보 수 = 편제정원 60명 × 1.5 ÷ 교원 1인당 학생 수
                    20명 = 4.5명(소수점 이하는 올림)
                  </div>
                  <div className="ml-4 text-xs text-gray-600">
                    - 단, 박사학위 과정을 운영하는 경우 ｢첨단산업인재혁신법
                    시행령｣ 제8조제2항에 따라 7명 이상의 관련 분야 교원 확보
                    필요
                  </div>
                  <div className="font-medium">○ 교원 자격 기준</div>
                  <div className="ml-4">
                    - (자격기준) ｢평생교육법 시행령｣제41조제2항에 따라 ｢대학교원
                    자격기준 등에 관한 규정｣[별표]*에 해당하는 자
                  </div>
                  <div className="ml-8 text-xs text-gray-600">
                    * [별표] 교원 및 조교의 자격 기준
                  </div>
                  <div className="ml-4">
                    - (겸임교원) 위 자격기준에 해당하는 자로 대학의 총장 또는
                    학장, 교수·부교수·조교수, 국공립연구소 및 민간연구소
                    연구원*, 사업장 임직원을 겸임시킬 수 있음
                  </div>
                  <div className="ml-8 text-xs text-gray-600">
                    * (예) 출연연 연구자가 실무･실험･실기 등 현장실무가 필요한
                    교과를 가르치기 위해 대학에 일시적으로 임용되어 학생 대상
                    강의·지도 활동 가능
                  </div>
                  <div className="ml-4">
                    - (전문양성인 임용) 개별법상 특례 조항*에 따라 ｢대학교원
                    자격기준 등에 관한 규정｣을 충족하지 않는 전문양성인을
                    전임교원(겸임·초빙교원도 포함)으로 임용 가능
                  </div>
                  <div className="ml-8 text-xs text-gray-600">
                    * ｢첨단산업 인재혁신 특별법｣제11조: 첨단산업에 필요한
                    전문인재의 육성을목적으로 전문양성인을 교원으로 임용할 경우
                    ｢대학교원 자격기준 등에 관한 규정｣에도 불구하고 학칙으로 그
                    자격기준을 달리 정할 수 있음
                  </div>
                  <div className="ml-4">
                    - (박사학위 과정 교원) ｢대학설립·운영 규정｣제2조의2제4항에
                    따라 박사학위 과정을 신설하려는 경우에는 참여 교원 중
                    학칙으로 정한 인원은 설치 학기 개시일 이전 5년간 학칙으로
                    정하는 연구실적* 확보 필요
                  </div>
                  <div className="ml-8 text-xs text-gray-600">
                    * 세부적인 연구실적 인정 범위와 기준 등에 대해서는 ｢박사학위
                    과정 설치를 위한 교원 연구실적 인정 범위 및 기준｣(교육부고시
                    제2024-7호) 참고
                  </div>
                  <div className="font-medium">
                    ○ 겸임교원 산정기준(｢평생교육법 시행규칙｣제16조 준용)
                  </div>
                  <div className="ml-4">
                    - 계열별로 겸임교원이 담당하는 주당 교수시간을 합산한 시간
                    수 ÷ 9시간(소숫점 이하는 버림)
                  </div>
                </div>
              </td>
              <td className="border border-gray-400 p-3 text-center">
                <input
                  type="radio"
                  name="check-3"
                  checked={checks[3] === true}
                  onChange={() => {
                    const newChecks = [...checks];
                    newChecks[3] = true;
                    setChecks(newChecks);
                  }}
                  className="w-4 h-4"
                />
              </td>
              <td className="border border-gray-400 p-3 text-center">
                <input
                  type="radio"
                  name="check-3"
                  checked={checks[3] === false}
                  onChange={() => {
                    const newChecks = [...checks];
                    newChecks[3] = false;
                    setChecks(newChecks);
                  }}
                  className="w-4 h-4"
                />
              </td>
            </tr>
            <tr>
              <td className="border border-gray-400 p-3 text-left">
                <div className="mb-2 font-medium">
                  사내대학원 설치인가 신청을 위한 체크를 하시느라 수고
                  많으셨습니다. 귀사가 체크항목 중 4가지 모두에 해당되면
                  사내대학원 설치인가 신청이 가능하십니다.
                </div>
              </td>
              <td className="border border-gray-400 p-3 text-center">
                <input
                  type="radio"
                  name="check-4"
                  checked={checks.length >= 5 && checks[4] === true}
                  onChange={() => {
                    const newChecks = [...checks];
                    newChecks[4] = true;
                    setChecks(newChecks);
                  }}
                  className="w-4 h-4"
                />
              </td>
              <td className="border border-gray-400 p-3 text-center">
                <input
                  type="radio"
                  name="check-4"
                  checked={checks.length >= 5 && checks[4] === false}
                  onChange={() => {
                    const newChecks = [...checks];
                    newChecks[4] = false;
                    setChecks(newChecks);
                  }}
                  className="w-4 h-4"
                />
              </td>
            </tr>
          </tbody>
        </table>

        <div className="mt-8 text-center">
          <p className="mb-4 text-sm text-gray-600">
            <b>※</b> 모든 항목을 '확인'으로 체크해야 다음 단계로 이동할 수
            있습니다.
          </p>
          <button
            className="btn bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            onClick={() => {
              const totalItems = 5; // 총 항목 수
              const allConfirmed =
                checks.length >= totalItems &&
                checks.slice(0, totalItems).every((check) => check === true);

              if (allConfirmed) {
                nav("/steps");
              } else {
                alert("모든 항목을 확인으로 체크해 주세요.");
              }
            }}
          >
            확인 후 다음 단계로
          </button>
        </div>
      </div>
    </main>
  );
}
