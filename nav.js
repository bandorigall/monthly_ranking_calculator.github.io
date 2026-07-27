/* 공통 사이트 이동 네비게이션
   각 저장소(도메인)가 서로 다르므로 절대 URL을 사용한다.
   페이지에서 <script src="nav.js"></script> 로 삽입.

   [배치] 각 사이트가 자체 헤더(우상단 메뉴/햄버거)를 쓰므로 겹치지 않도록
   화면 오른쪽 '세로 중앙'에 얇은 탭 형태로 붙인다. 메뉴는 왼쪽으로 펼쳐진다. */
(function () {
  var items = [
    ['오프이벤',    'https://bandorigall.github.io/bangdream_events.github.io/'],
    ['발매곡목록',  'https://bandorigall.github.io/bandori_songs.github.io/'],
    ['갤대회',      'https://bandorigall.github.io/bangdream_competition.github.io/'],
    ['맛집',        'https://bandorigall.github.io/banggall_food.github.io/'],
    ['걸파툴',      'https://bandorigall.github.io/tools_girlsbandparty.github.io/'],
    ['생일페이지',  'https://bandorigall.github.io/others.github.io/birthday/'],
    ['MBTI테스트',  'https://bandorigall.github.io/others.github.io/bangdream_mbti_korean/'],
    ['마이고센터',  'https://bandorigall.github.io/others.github.io/mygocenter/'],
    ['캐릭터프로필', 'https://bandorigall.github.io/others.github.io/our_notes_profile/'],
    ['김치쿠라',    'https://bandorigall.github.io/others.github.io/kimchikura/'],
    ['마이고라이브', 'https://bandorigall.github.io/others.github.io/mygo_live/'],
    ['기타도감',    'https://bandorigall.github.io/others.github.io/guitar/']
  ];

  var curPath = location.pathname.replace(/index\.html$/, '');

  var css = '' +
    /* 오른쪽 가장자리 세로 중앙 — 사이트 자체 상단 헤더와 겹치지 않는다. */
    '#site-nav{position:fixed;top:50%;right:0;transform:translateY(-50%);' +
      'z-index:2147483647;display:flex;flex-direction:row-reverse;align-items:center;' +
      'font-family:"Pretendard","Malgun Gothic",-apple-system,sans-serif;}' +
    /* 닫힌 상태에서는 살짝 투명해 본문을 덜 가린다. */
    '#site-nav-btn{cursor:pointer;border:none;border-radius:10px 0 0 10px;' +
      'padding:14px 7px;font-size:13px;font-weight:700;color:#fff;' +
      'background:#ff4081;box-shadow:0 3px 10px rgba(0,0,0,.25);' +
      'display:flex;flex-direction:column;align-items:center;gap:4px;line-height:1.1;' +
      'writing-mode:vertical-rl;text-orientation:upright;letter-spacing:1px;' +
      'opacity:.72;transition:opacity .15s,filter .15s;}' +
    '#site-nav-btn:hover,#site-nav.open #site-nav-btn{opacity:1;filter:brightness(1.05);}' +
    '#site-nav-menu{display:none;flex-direction:column;margin-right:8px;' +
      'background:#fff;border-radius:12px;overflow-y:auto;min-width:150px;max-height:80vh;' +
      'box-shadow:0 8px 24px rgba(0,0,0,.22);border:1px solid rgba(0,0,0,.06);}' +
    '#site-nav.open #site-nav-menu{display:flex;}' +
    '#site-nav-menu a{padding:11px 16px;text-decoration:none;color:#333;' +
      'font-size:14px;font-weight:500;border-bottom:1px solid #f0f0f0;white-space:nowrap;' +
      'transition:background .15s;}' +
    '#site-nav-menu a:last-child{border-bottom:none;}' +
    '#site-nav-menu a:hover{background:#fff0f5;}' +
    '#site-nav-menu a.active{background:#ff4081;color:#fff;font-weight:700;}' +
    /* 화면이 낮은 기기에서는 버튼을 더 작게 */
    '@media (max-height:520px){#site-nav-btn{padding:10px 6px;font-size:12px;}' +
      '#site-nav-menu{max-height:70vh;}}';
  var st = document.createElement('style');
  st.textContent = css;
  document.head.appendChild(st);

  var wrap = document.createElement('div');
  wrap.id = 'site-nav';

  var btn = document.createElement('button');
  btn.id = 'site-nav-btn';
  btn.setAttribute('aria-label', '다른 사이트로 이동');
  btn.setAttribute('title', '다른 사이트로 이동');
  btn.innerHTML = '<span>☰</span><span>메뉴</span>';
  btn.addEventListener('click', function (e) {
    e.stopPropagation();
    wrap.classList.toggle('open');
  });

  var menu = document.createElement('nav');
  menu.id = 'site-nav-menu';
  items.forEach(function (it) {
    var a = document.createElement('a');
    a.href = it[1];
    a.textContent = it[0];
    // 현재 페이지 강조: 링크의 경로가 현재 경로에 포함되면 active
    try {
      var p = new URL(it[1]).pathname.replace(/index\.html$/, '');
      if (p !== '/' && curPath.indexOf(p) === 0) a.className = 'active';
    } catch (e) {}
    menu.appendChild(a);
  });

  wrap.appendChild(btn);
  wrap.appendChild(menu);

  document.addEventListener('click', function () {
    wrap.classList.remove('open');
  });
  // 메뉴 내부 클릭이 '바깥 클릭'으로 오인돼 닫히지 않도록
  menu.addEventListener('click', function (e) { e.stopPropagation(); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') wrap.classList.remove('open');
  });

  function mount() { document.body.appendChild(wrap); }
  if (document.body) mount();
  else document.addEventListener('DOMContentLoaded', mount);
})();
