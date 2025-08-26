const nav = {
    top: [
    {
    label: '제도소개',
    children: [
    { title: '기업용', links: [ {label:'기업인재개발기관', to:'/steps'}, {label:'사내대학원', to:'/'} ] },
    { title: '지정·등록', links: [ {label:'첨단산업아카데미', to:'/'}, {label:'인재혁신전문기업', to:'/'} ] },
    { title: '안내', links: [ {label:'신규처리절차', to:'/steps'}, {label:'사후관리', to:'/'} ] },
    { title: '자료', links: [ {label:'공지사항', to:'/'}, {label:'FAQ', to:'/'} ] }
    ]
    },
    { label: '신규/지정 등록', to: '/login' },
    { label: '사후관리', to: '/' },
    { label: '고객지원', to: '/' }
    ]
    };
    export default nav;