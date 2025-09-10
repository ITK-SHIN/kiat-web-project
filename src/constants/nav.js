const nav = {
  top: [
    {
      label: '제도소개',
      children: [
        {
          title: '개요',
          links: [{ label: '개요', to: '/introduction-overview' }],
        },
        {
          title: '관련법',
          links: [{ label: '관련법', to: '/introduction-relevant-law' }],
        },
        {
          title: '산업통산자원부고시',
          links: [{ label: '산업통산자원부고시', to: '/' }],
        },
        {
          title: '정책제안',
          links: [{ label: '정책제안', to: '/' }],
        },
      ],
    },
    {
      label: '기업인재개발기관',
      children: [
        {
          title: '지정등록하기',
          links: [
            { label: '고시 및 체크리스트', to: '/login' },
            { label: '절차소개', to: '/login' },
            { label: '등록하기', to: '/login' },
          ],
        },
        {
          title: '변경하기',
          links: [
            { label: '변경대상 체크', to: '/' },
            { label: '절차소개', to: '/steps' },
            { label: '변경하기', to: '/' },
          ],
        },
        {
          title: '취소하기',
          links: [
            { label: '절차소개', to: '/steps' },
            { label: '취소하기', to: '/' },
          ],
        },
      ],
    },
    {
      label: '첨단산업아카데미',
      children: [
        {
          title: '지정등록하기',
          links: [
            { label: '고시 및 체크리스트', to: '/checklist' },
            { label: '절차소개', to: '/steps' },
            { label: '등록하기', to: '/register' },
          ],
        },
        {
          title: '변경하기',
          links: [
            { label: '변경대상 체크', to: '/' },
            { label: '절차소개', to: '/steps' },
            { label: '변경하기', to: '/' },
          ],
        },
        {
          title: '취소하기',
          links: [
            { label: '절차소개', to: '/steps' },
            { label: '취소하기', to: '/' },
          ],
        },
        {
          title: '첨단산업아카데미바로가기',
          links: [{ label: '첨단산업아카데미바로가기', to: '/' }],
        },
      ],
    },
    {
      label: '인재혁신전문기업',
      children: [
        {
          title: '등록하기',
          links: [
            { label: '고시 및 체크리스트', to: '/checklist' },
            { label: '절차소개', to: '/steps' },
            { label: '등록하기', to: '/register' },
          ],
        },
        {
          title: '변경하기',
          links: [
            { label: '변경대상 체크', to: '/' },
            { label: '절차소개', to: '/steps' },
            { label: '변경하기', to: '/' },
          ],
        },
        {
          title: '취소하기',
          links: [
            { label: '절차소개', to: '/steps' },
            { label: '취소하기', to: '/' },
          ],
        },
      ],
    },
    {
      label: '전문양성인',
      children: [
        {
          title: '등록하기',
          links: [
            { label: '고시 및 체크리스트', to: '/person-login' },
            { label: '절차소개', to: '/person-login' },
            { label: '등록하기', to: '/person-login' },
          ],
        },
        {
          title: '변경하기',
          links: [
            { label: '변경대상 체크', to: '/' },
            { label: '절차소개', to: '/steps' },
            { label: '변경하기', to: '/' },
          ],
        },
        {
          title: '취소하기',
          links: [
            { label: '절차소개', to: '/steps' },
            { label: '취소하기', to: '/' },
          ],
        },
      ],
    },
    {
      label: '심위위원회',
      children: [
        {
          title: '심위위원회구성',
          links: [{ label: '위원회별임무및구성', to: '/' }],
        },
        {
          title: '심위위원선정신청',
          links: [
            { label: '위원회별위원등록신청', to: '/' },
            { label: '신청진행현황', to: '/' },
          ],
        },
        {
          title: '심위위원 관리',
          links: [
            { label: '로그인', to: '/login' },
            { label: '심위위원확인', to: '/' },
            { label: '심위위원갱신', to: '/' },
          ],
        },
      ],
    },
    {
      label: '회원관리',
      children: [
        {
          title: '기관',
          links: [
            { label: '로그인', to: '/login' },
            { label: '등록진행현황', to: '/' },
            { label: '등록증확인', to: '/' },
            { label: '등록증출력', to: '/' },
            { label: '등록증갱신', to: '/' },
          ],
        },
        {
          title: '개인',
          links: [
            { label: '로그인', to: '/login' },
            { label: '등록진행현황', to: '/' },
            { label: '등록증확인', to: '/' },
            { label: '등록증출력', to: '/' },
            { label: '등록증갱신', to: '/' },
          ],
        },
      ],
    },
    {
      label: '정보공개',
      children: [
        {
          title: '등록기관검색/통계',
          links: [
            { label: '기업인재개발기관', to: '/' },
            { label: '첨단산업아카데미', to: '/' },
            { label: '인재혁신전문기업', to: '/' },
            { label: '전문양성인', to: '/' },
          ],
        },
        {
          title: '국민제보(부실기관신고)',
          links: [
            { label: '부실기관신고접수', to: '/' },
            { label: '신고내역확인및출력', to: '/' },
          ],
        },
        {
          title: '사내대학원설치 및 인가',
          links: [
            { label: '고시안내', to: '/notice-examination' },
            { label: '자가진단 체크', to: '/' },
          ],
        },
      ],
    },
    {
      label: '기관소개',
      children: [
        {
          title: '설립목적및주요기능',
          links: [{ label: '설립목적및주요기능', to: '/' }],
        },
        {
          title: '조직도',
          links: [{ label: '조직도', to: '/' }],
        },
      ],
    },
    {
      label: '고객지원',
      children: [
        {
          title: '공지사항',
          links: [{ label: '공지사항', to: '/' }],
        },
        {
          title: '자료실',
          links: [{ label: '자료실', to: '/' }],
        },
        {
          title: 'FAQ',
          links: [{ label: 'FAQ', to: '/' }],
        },
        {
          title: '원격지원',
          links: [{ label: '원격지원', to: '/' }],
        },
        {
          title: '공동인증센터',
          links: [{ label: '공동인증센터', to: '/' }],
        },
      ],
    },
  ],
};
export default nav;
