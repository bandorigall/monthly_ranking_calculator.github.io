/* 공통 상단 네비게이션 바
   각 저장소(도메인)가 서로 다르므로 절대 URL을 사용한다.
   페이지에서 <script src="nav.js"></script> 로 삽입. */
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
    ['김치쿠라',    'https://bandorigall.github.io/others.github.io/kimchikura/']
  ];

  var curPath = location.pathname.replace(/index\.html$/, '');

  var css = '' +
    '#site-nav{position:fixed;top:12px;right:12px;z-index:2147483647;' +
      'font-family:"Pretendard","Malgun Gothic",-apple-system,sans-serif;}' +
    '#site-nav-btn{cursor:pointer;border:none;border-radius:10px;' +
      'padding:9px 14px;font-size:14px;font-weight:700;color:#fff;' +
      'background:#ff4081;box-shadow:0 3px 10px rgba(0,0,0,.25);' +
      'display:flex;align-items:center;gap:6px;line-height:1;}' +
    '#site-nav-btn:hover{filter:brightness(1.05);}' +
    '#site-nav-menu{display:none;flex-direction:column;margin-top:8px;' +
      'background:#fff;border-radius:12px;overflow:hidden;min-width:150px;' +
      'box-shadow:0 8px 24px rgba(0,0,0,.22);border:1px solid rgba(0,0,0,.06);}' +
    '#site-nav.open #site-nav-menu{display:flex;}' +
    '#site-nav-menu a{padding:11px 16px;text-decoration:none;color:#333;' +
      'font-size:14px;font-weight:500;border-bottom:1px solid #f0f0f0;' +
      'transition:background .15s;}' +
    '#site-nav-menu a:last-child{border-bottom:none;}' +
    '#site-nav-menu a:hover{background:#fff0f5;}' +
    '#site-nav-menu a.active{background:#ff4081;color:#fff;font-weight:700;}';
  var st = document.createElement('style');
  st.textContent = css;
  document.head.appendChild(st);

  var wrap = document.createElement('div');
  wrap.id = 'site-nav';

  var btn = document.createElement('button');
  btn.id = 'site-nav-btn';
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

  function mount() { document.body.appendChild(wrap); }
  if (document.body) mount();
  else document.addEventListener('DOMContentLoaded', mount);
})();
