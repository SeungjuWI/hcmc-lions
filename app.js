/* ============================================================
   HCMC Lions — app (KO/VI 공용)
   window.LANG('ko'|'vi') 를 읽어 content.js 의 카피로 렌더 +
   세로 스크롤 진행바 / WHAT 가로 핀 / reveal 애니메이션.
   라이브러리 없음.
   ============================================================ */
(function () {
  "use strict";
  var LANG = window.LANG === "vi" ? "vi" : "ko";
  var t = (window.CONTENT && window.CONTENT[LANG]) || {};
  document.documentElement.lang = t.lang || LANG;

  /* ---------- helpers ---------- */
  function esc(s) { return String(s == null ? "" : s); }
  function videoSlot() { return '<video class="bg-video" autoplay muted loop playsinline></video>'; }

  function whatCards() {
    return (t.what_cards || []).map(function (c) {
      return '<article class="h-card reveal">' +
        '<span class="ctag">' + esc(c.tag) + "</span>" +
        "<h3>" + esc(c.h) + "</h3>" +
        "<p>" + esc(c.p) + "</p>" +
      "</article>";
    }).join("");
  }
  function whatDots() {
    return (t.what_cards || []).map(function (_, i) {
      return '<i' + (i === 0 ? ' class="on"' : "") + "></i>";
    }).join("");
  }

  /* ---------- render ---------- */
  var html =
    '<header class="topbar">' +
      '<div class="brand">HCMC <b>LIONS</b></div>' +
      '<nav class="lang">' +
        '<span class="active">' + (LANG === "ko" ? "KO" : "VI") + "</span>" +
        '<a href="' + esc(t.other_href) + '">' + esc(t.other_label) + "</a>" +
      "</nav>" +
    "</header>" +
    '<div class="scroll-progress" id="scrollProgress"></div>' +

    /* 00–01 COSMOS — 시계 별들이 사라지지 않고 그대로 사람-점 그리드로 이어지는 다크 장면 */
    '<section id="s-cosmos">' +
      '<div class="pin-space" id="cosmosPin">' +
        '<div class="pin-sticky cosmos">' +
          '<canvas class="clock-canvas" id="clockCanvas"></canvas>' +
          '<div class="cosmos-text">' +
            '<div class="ct-layer ct-beat ct-intro" id="ctIntro">' +
              '<div class="ct-key">' + esc(t.intro_key) + "</div>" +
              '<div class="ct-sub"><span id="introTyped"></span><span class="type-caret">|</span></div>' +
            "</div>" +
            '<div class="ct-layer ct-beat ct-shift2" id="ctShift2">' +
              '<div class="ct-key">' + esc(t.hook_key) + "</div>" +
              '<p class="ct-sub">' + esc(t.hook_sub) + "</p>" +
            "</div>" +
            '<div class="ct-layer ct-beat ct-hook" id="ctHook">' +
              '<div class="ct-top">' +
                '<div class="ct-key">' + esc(t.scale_key) + "</div>" +
                '<p class="ct-sub">' + esc(t.scale_sub) + "</p>" +
              "</div>" +
              '<div class="cosmos-foot">' +
                '<div class="count-lead">' + esc(t.count_lead) + "</div>" +
                '<div class="count-eq">' +
                  '<span class="ce-unit">₫10,000</span><span class="ce-op">×</span>' +
                  '<span class="ce-people"><b id="cePeople">0</b>' + esc(t.people_suffix) + "</span>" +
                  '<span class="ce-op">=</span><span class="ce-total" id="ceTotal">₫0</span>' +
                "</div>" +
              "</div>" +
            "</div>" +
            '<div class="ct-layer ct-beat ct-ai" id="ctAi">' +
              '<div class="ct-key ct-key-ai">' + esc(t.ai_key) + "</div>" +
              '<p class="ct-sub">' + esc(t.ai_sub) + "</p>" +
            "</div>" +
          "</div>" +
        "</div>" +
      "</div>" +
    "</section>" +

    /* 02 SHIFT — 핀 스크럽(그래프) */
    '<section id="s-shift">' +
      '<div class="pin-space" id="shiftPin">' +
        '<div class="pin-sticky is-pad">' + videoSlot() +
          /* 프롬프트 C: 화면 전체 배경 그래프 모션 */
          '<div class="graph-bg" id="graph" aria-hidden="true">' +
            '<svg viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid slice">' +
              '<path class="g-base" d="M0,520 L1000,520" opacity="0.18"></path>' +
              '<path class="g-side" id="gSide" d="M0,520 L1000,350"></path>' +
              '<path class="g-biz"  id="gBiz"  d="M0,565 C520,562 700,545 825,430 C905,345 965,135 1000,32"></path>' +
            "</svg>" +
            '<span class="g-tag g-tag-biz">' + esc(t.shift_biz_label) + "</span>" +
            '<span class="g-tag g-tag-side">' + esc(t.shift_side_label) + "</span>" +
          "</div>" +
          '<div class="inner">' +
            '<div class="eyebrow reveal">' + esc(t.shift_eyebrow) + "</div>" +
            '<h1 class="title reveal">' + esc(t.shift_title) + "</h1>" +
            '<p class="shift-lead reveal">' + esc(t.shift_lead) + "</p>" +
            '<div class="paths">' +
              '<div class="path reveal"><div class="plabel">' + esc(t.shift_side_label) + "</div>" +
                '<div class="ptext">' + esc(t.shift_side_text) + "</div></div>" +
              '<div class="path biz reveal"><div class="plabel">' + esc(t.shift_biz_label) + "</div>" +
                '<div class="ptext">' + esc(t.shift_biz_text) + "</div></div>" +
            "</div>" +
            '<p class="shift-punch reveal">' + esc(t.shift_punch) + "</p>" +
          "</div>" +
        "</div>" +
      "</div>" +
    "</section>" +

    /* 03 WHAT — 가로 핀 */
    '<section id="s-what">' +
      '<div class="pin-space" id="pinSpace">' +
        '<div class="pin-sticky">' + videoSlot() +
          '<div class="what-head">' +
            '<div class="eyebrow reveal">' + esc(t.what_eyebrow) + "</div>" +
            '<h1 class="title reveal">' + esc(t.what_title) + "</h1>" +
          "</div>" +
          '<div class="h-track" id="hTrack">' + whatCards() + '<div class="h-end" aria-hidden="true"></div>' + "</div>" +
          '<div class="h-dots" id="hDots">' + whatDots() + "</div>" +
        "</div>" +
      "</div>" +
    "</section>" +

    /* 04 WHO */
    '<section class="section" id="s-who">' + videoSlot() +
      '<div class="inner">' +
        '<div class="eyebrow reveal">' + esc(t.who_eyebrow) + "</div>" +
        '<h1 class="title reveal">' + esc(t.who_title) + "</h1>" +
        '<div class="who-name reveal">' + esc(t.who_name) + "</div>" +
        '<div class="story reveal">' + (t.who_story || "") + "</div>" +
      "</div>" +
    "</section>" +

    /* 05 JOIN */
    '<section class="section" id="s-join">' + videoSlot() +
      '<div class="inner">' +
        '<div class="eyebrow reveal">' + esc(t.join_eyebrow) + "</div>" +
        '<h1 class="title reveal">' + esc(t.join_title) + "</h1>" +
        '<div class="price-wrap reveal">' +
          '<div class="price-hanger" id="priceHanger">' +
            '<div class="price-string"></div>' +
            '<div class="price">' +
              '<div class="krw">' + esc(t.price_krw) + "</div>" +
              '<div class="vnd">' + esc(t.price_vnd) + "</div>" +
            "</div>" +
          "</div>" +
        "</div>" +
        '<button class="cta reveal" type="button">' + esc(t.cta) + "</button>" +
      "</div>" +
    "</section>";

  document.getElementById("app").innerHTML = html;

  /* ---------- reveal on scroll ---------- */
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
    }, { threshold: 0.18 });
    document.querySelectorAll(".reveal").forEach(function (el) { io.observe(el); });
  } else {
    document.querySelectorAll(".reveal").forEach(function (el) { el.classList.add("in"); });
  }

  /* ============================================================
     스크롤-스크럽 엔진: 핀 섹션마다 진행도 p(0~1)를 스크롤에서 뽑아
     인터랙션을 구동. 내리면 진행 / 올리면 역순. lerp로 부드럽게.
     ============================================================ */
  var progressBar = document.getElementById("scrollProgress");
  var mq = window.matchMedia("(max-width: 768px)");
  var clamp01 = function (v) { return v < 0 ? 0 : v > 1 ? 1 : v; };
  var LERP = 0.10;
  var scrubs = [];   // { el, travel, cur, tgt, apply }

  /* (01 카운터는 00–01 COSMOS 캔버스 장면에 통합됨) */

  /* ----- 프롬프트 C: 02 두 갈래 그래프 (stroke 드로잉 + 추월점) ----- */
  (function () {
    var pin = document.getElementById("shiftPin");
    var side = document.getElementById("gSide");
    var biz = document.getElementById("gBiz");
    if (!pin || !side || !biz) return;
    var sLen = side.getTotalLength(), bLen = biz.getTotalLength();
    side.style.strokeDasharray = sLen; biz.style.strokeDasharray = bLen;
    scrubs.push({
      el: pin, travel: 0.85, cur: 0, tgt: 0,
      apply: function (p) {
        side.style.strokeDashoffset = sLen * (1 - clamp01(p / 0.55));
        biz.style.strokeDashoffset = bLen * (1 - clamp01((p - 0.12) / 0.88));
      }
    });
  })();

  /* ----- WHAT: 03 가로 핀 ----- */
  (function () {
    var pin = document.getElementById("pinSpace");
    var track = document.getElementById("hTrack");
    var dotsBox = document.getElementById("hDots");
    if (!pin || !track) return;
    var lastDot = -1;
    scrubs.push({
      el: pin, travel: 0.78, cur: 0, tgt: 0,
      apply: function (p) {
        if (mq.matches) { track.style.transform = ""; return; }
        var maxX = Math.max(0, track.scrollWidth - window.innerWidth);
        track.style.transform = "translate3d(" + (-(p * maxX)) + "px,0,0)";
        if (dotsBox && dotsBox.children.length) {
          var active = Math.round(p * (dotsBox.children.length - 1));
          if (active !== lastDot) {
            for (var i = 0; i < dotsBox.children.length; i++) dotsBox.children[i].classList.toggle("on", i === active);
            lastDot = active;
          }
        }
      }
    });
  })();

  /* ----- 프롬프트 D: 05 달랑거리는 가격표 (감쇠 진자, 스크롤 방향 반응) ----- */
  (function () {
    var hng = document.getElementById("priceHanger");
    var join = document.getElementById("s-join");
    if (!hng) return;
    var angle = 0, vel = 0, raf = null, visible = false, lastY = window.pageYOffset;
    var K = 0.012, DAMP = 0.04;
    function loop() {
      vel += -K * angle - DAMP * vel; angle += vel;
      hng.style.transform = "rotate(" + angle.toFixed(3) + "deg)";
      if (Math.abs(angle) > 0.05 || Math.abs(vel) > 0.05) raf = requestAnimationFrame(loop);
      else { angle = 0; hng.style.transform = "rotate(0deg)"; raf = null; }
    }
    function push(f) { vel += f; if (!raf) raf = requestAnimationFrame(loop); }
    hng.addEventListener("mouseenter", function () { push(2.4); });
    hng.addEventListener("click", function () { push(3.2); });
    if ("IntersectionObserver" in window && join) {
      new IntersectionObserver(function (es) {
        es.forEach(function (e) { visible = e.isIntersecting; if (e.isIntersecting) push(1.8); });
      }, { threshold: 0.4 }).observe(join);
    }
    window.addEventListener("scroll", function () {
      var y = window.pageYOffset, d = y - lastY; lastY = y;
      if (visible) push(Math.max(-1.4, Math.min(1.4, d * 0.05)));   // 스크롤 방향대로 좌우로
    }, { passive: true });
  })();

  /* ----- 00–01 COSMOS: 시계 별들이 그대로 사람-점 그리드로 모핑(실제 시각) ----- */
  (function () {
    var cv = document.getElementById("clockCanvas");
    if (!cv || !cv.getContext) return;
    var ctx = cv.getContext("2d");

    /* 글로우 스프라이트(한 번만 생성) — 입자마다 shadowBlur 켜는 대신 drawImage 로 그려 GPU 가속 */
    var glowSprite = (function () {
      var c = document.createElement("canvas"), s = 48;
      c.width = c.height = s;
      var g2 = c.getContext("2d");
      var rg = g2.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
      rg.addColorStop(0, "rgba(255,150,95,0.95)");
      rg.addColorStop(0.35, "rgba(255,122,60,0.45)");
      rg.addColorStop(1, "rgba(255,122,60,0)");
      g2.fillStyle = rg; g2.beginPath(); g2.arc(s / 2, s / 2, s / 2, 0, 6.2832); g2.fill();
      return c;
    })();

    /* 원자 궤도: 3개의 타원 궤도(Z축 기준 120°씩 회전, 공통 틸트)의 3D 기저벡터 U,V 를 한 번 계산 */
    var ATOM = (function () {
      var tilt = 1.15, U0 = [1, 0, 0], V0 = [0, Math.cos(tilt), Math.sin(tilt)], orbits = [];
      for (var i = 0; i < 3; i++) {
        var b = i * 2.0944, cb = Math.cos(b), sb = Math.sin(b);   // 120°
        orbits.push({
          ux: U0[0] * cb - U0[1] * sb, uy: U0[0] * sb + U0[1] * cb, uz: U0[2],
          vx: V0[0] * cb - V0[1] * sb, vy: V0[0] * sb + V0[1] * cb, vz: V0[2]
        });
      }
      return orbits;
    })();
    var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var W = 0, H = 0, cx = 0, cy = 0, R = 0, maxD = 1, tphase = 0;
    var P = [], stars = [], handLen = [0, 0, 0], N = 1000, lastPeople = -1;
    var start = null, asmDone = false, DUR = 2200;
    if (window.location && window.location.hash === "#noanim") asmDone = true;  // 디버그: 응집 건너뛰기
    var ORANGE = [255, 122, 60], WARM = [255, 234, 216];
    var rippleR = 80, mx = -9999, my = -9999, mouseOn = false;   // 마우스 물길 효과
    var pmx = -9999, pmy = -9999, mvx = 0, mvy = 0;              // 커서 속도(끌고 가는 결)
    var WAKE = 0.6, PUSHR = 2.0, DECAY = 0.988;                  // 결 세기 / 바깥 밀림 / 감쇠(1에 가까울수록 더 오래 남음)
    var pin = document.getElementById("cosmosPin");
    var pinTop = 0, pinTravel = 1, sprog = 0, gyShift = 0;   // 핀 기하 캐시 + 보간 진행도 + 그리드 하강량
    var ctIntro = document.getElementById("ctIntro"), ctHook = document.getElementById("ctHook");
    var ctShift2 = document.getElementById("ctShift2");
    var ctAi = document.getElementById("ctAi");
    var cePeople = document.getElementById("cePeople"), ceTotal = document.getElementById("ceTotal");

    /* 화면 바깥에서 날아올 출발 좌표 */
    function scatter() { var a = Math.random() * 6.2832, rad = R * 1.3 + Math.random() * maxD; return { sx: cx + Math.cos(a) * rad, sy: cy + Math.sin(a) * rad }; }

    function resize() {
      var dpr = Math.min(2, window.devicePixelRatio || 1);
      W = cv.clientWidth; H = cv.clientHeight;
      if (!W || !H) return;
      cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cx = W * 0.5; cy = H * 0.46;
      R = Math.min(W, H) * (W < 720 ? 0.34 : 0.30);
      maxD = Math.max(W, H) * 0.62;
      rippleR = R * 0.95;
      handLen = [R * 0.50, R * 0.78, R * 0.92];

      // 배경 별
      var n = Math.min(260, Math.round((W * H) / 9000));
      stars = [];
      for (var i = 0; i < n; i++) stars.push({
        x: Math.random() * W, y: Math.random() * H, r: Math.random() * 1.5 + 0.25,
        a: Math.random() * 6.28, tw: Math.random() * 0.025 + 0.004,
        vx: (Math.random() - 0.5) * 0.045, vy: (Math.random() - 0.5) * 0.045,
        base: 0.45 + Math.random() * 0.55
      });

      // 사람-점 그리드 좌표
      var cols = W < 720 ? 25 : 40, rows = Math.ceil(N / cols);
      var gw = Math.min(W * (W < 720 ? 0.86 : 0.6), 760), cell = gw / cols, gh = rows * cell;
      // 그리드는 시계 중심보다 살짝 아래로 → 상단 hook 타이틀과 겹치지 않게(시계는 중앙 유지)
      gyShift = H * 0.07;
      var gx0 = cx - gw / 2 + cell / 2, gy0 = cy - gh / 2 + cell / 2 + gyShift;

      // ★ step2 '부업선': 시간에 비례해 오르다 천장에서 평평해지는 선(부업의 한계)
      var Lx0 = cx - gw * 0.45, Lx1 = cx + gw * 0.45, Lxk = cx;
      var LyB = cy + gh * 0.55 + gyShift * 0.5, LyT = cy + gh * 0.05 + gyShift * 0.5, Lknee = 0.55;

      // 입자 풀: 시계(별) 목표 + 그리드 목표를 동시에 보유 → 스크롤로 모핑
      var rIn = R * 0.90, rOut = R * 1.16, band = rOut - rIn;
      var keep = (P.length === N), nHub = 24, nHands = 240;
      for (var k = 0; k < N; k++) {
        var p = keep ? P[k] : { ox: 0, oy: 0, m: 0.55 + Math.random() * 0.9 };
        p.gx = gx0 + (k % cols) * cell; p.gy = gy0 + ((k / cols) | 0) * cell;
        p.perp = 0;
        // 모핑 웨이브: 대각선(좌상→우하) 순서로 시차 출발 + 입자별 곡선 휨/흔들림 위상
        p.delay = ((k % cols) / cols + (((k / cols) | 0) / rows)) * 0.5;
        if (p.curve === undefined) {
          p.curve = (k % 2 ? 1 : -1) * (0.45 + Math.random() * 0.85);
          p.ph = Math.random() * 6.2832;
          p.lj = (Math.random() - 0.5);
        }
        // 부업선 위 위치(인덱스 순서대로): 무릎(Lknee)까지 비례 상승 → 이후 천장에서 평평
        var t2 = N > 1 ? k / (N - 1) : 0;
        if (t2 < Lknee) { var f2 = t2 / Lknee; p.lx = Lx0 + (Lxk - Lx0) * f2; p.ly = LyB + (LyT - LyB) * f2; }
        else { var f3 = (t2 - Lknee) / (1 - Lknee); p.lx = Lxk + (Lx1 - Lxk) * f3; p.ly = LyT; }
        p.ly += p.lj * 3.5;
        // ★ step4 'AI 코어': 1000명 → 하나의 빛나는 응축 코어(다수→하나). 중심 작은 원반(가운데로 갈수록 빽빽)
        // 원자: 약 14%는 핵(중심 구), 나머지는 3개 궤도의 전자로 분배 (한 번만 배정)
        if (p.atype === undefined) {
          if (k < N * 0.14) {                                   // 핵: 작은 구 안 랜덤 분포
            p.atype = 0;
            var u1 = Math.random() * 2 - 1, u2 = Math.random() * 6.2832, rr = Math.cbrt(Math.random()), ss = Math.sqrt(1 - u1 * u1);
            p.nx = ss * Math.cos(u2) * rr; p.ny = u1 * rr; p.nz = ss * Math.sin(u2) * rr;
          } else {                                              // 전자: 궤도 + 시작 위상 + 진행 방향
            p.atype = 1; p.orb = k % 3; p.phi = Math.random() * 6.2832; p.pdir = (k % 2) ? 1 : -1;
          }
        }
        if (k < nHub) {                                  // 중심 허브: 작고 정돈된 코어(2겹 동심원)
          var hr0 = (k < 12) ? R * 0.016 : R * 0.032, ha0 = ((k % 12) / 12) * 6.2832;
          p.role = 3; p.cxp = cx + Math.cos(ha0) * hr0; p.cyp = cy + Math.sin(ha0) * hr0; p.rr = hr0;
          p.size = 1.5; p.bAdd = 0.5;
        } else if (k < nHub + nHands) {                  // 시·분·초 바늘: 중심에서 살짝 띄워 끝으로 갈수록 가늘게
          var hi = k - nHub, role, idx, cnt;
          if (hi < 90) { role = 0; idx = hi; cnt = 90; }
          else if (hi < 170) { role = 1; idx = hi - 90; cnt = 80; }
          else { role = 2; idx = hi - 170; cnt = 70; }
          p.role = role; p.frac = 0.14 + (idx / (cnt - 1)) * 0.86;
          var base = role === 0 ? 2.6 : role === 1 ? 2.0 : 1.4;
          p.size = base * (1 - p.frac * 0.6); p.bAdd = 0.15;
        } else {                                         // 문자판: 깔끔한 동심원 링 + 12시 표시
          var di = k - (nHub + nHands);
          if (di < 12) { var ha = (di / 12) * 6.2832; p.role = 4; p.cxp = cx + Math.sin(ha) * R; p.cyp = cy - Math.cos(ha) * R; p.rr = R; p.size = 2.6; p.bAdd = 0.5; }
          else {
            var dj = di - 12, rings = 6, perRing = 121;
            var ring = dj % rings, pos = (dj / rings) | 0;
            var rad = R * (0.955 + ring * 0.016), aa = (pos / perRing) * 6.2832 + ring * 0.28;
            p.role = 4; p.cxp = cx + Math.sin(aa) * rad; p.cyp = cy - Math.cos(aa) * rad; p.rr = rad;
            p.size = 0.7 + 0.5 * (1 - ring / rings); p.bAdd = 0.06 + (ring < 2 ? 0.12 : 0);
          }
        }
        if (!keep) { var sc = scatter(); p.sx = sc.sx; p.sy = sc.sy; P[k] = p; }
      }
      if (pin) { pinTop = pin.offsetTop; pinTravel = Math.max(1, pin.offsetHeight - window.innerHeight); }
      start = asmDone ? -1 : null;
    }

    function bright(d) { var b = 1 - 0.72 * (d / R); return b < 0.1 ? 0.1 : b > 1 ? 1 : b; }

    /* 커서가 지나가며 점을 끌고 가(물길), 흐트러진 자리가 남았다가 아주 천천히 감쇠하며 정렬 */
    function disturb(p, bx, by) {
      if (p.ox === undefined) { p.ox = 0; p.oy = 0; p.m = 0.55 + Math.random() * 0.9; }
      if (mouseOn) {
        var dx = bx - mx, dy = by - my, dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < rippleR) {
          var f = 1 - dist / rippleR; f = f * f * p.m;
          var inv = dist > 0.001 ? 1 / dist : 0;
          p.ox += mvx * f * WAKE + dx * inv * f * PUSHR;   // 커서 진행 방향으로 끌림 + 약한 바깥 밀림
          p.oy += mvy * f * WAKE + dy * inv * f * PUSHR;
        }
      }
      p.ox *= DECAY; p.oy *= DECAY;                        // 천천히 제자리로
      var lim = rippleR * 0.8, m2 = p.ox * p.ox + p.oy * p.oy;
      if (m2 > lim * lim) { var sc = lim / Math.sqrt(m2); p.ox *= sc; p.oy *= sc; }
    }

    function particle(x, y, b, sizeBase) {
      if (b <= 0.012) return; if (b > 1) b = 1;
      var t = Math.pow(b, 1.3);
      if (b > 0.4) {                                  // 밝은 점만 글로우 스프라이트로(저렴) — shadowBlur 미사용
        var gsz = sizeBase * (4 + 6 * b);
        ctx.globalAlpha = (b - 0.4) * 0.85;
        ctx.drawImage(glowSprite, x - gsz * 0.5, y - gsz * 0.5, gsz, gsz);
      }
      ctx.fillStyle = "rgb(" + Math.round(ORANGE[0] + (WARM[0] - ORANGE[0]) * t) + ","
                             + Math.round(ORANGE[1] + (WARM[1] - ORANGE[1]) * t) + ","
                             + Math.round(ORANGE[2] + (WARM[2] - ORANGE[2]) * t) + ")";
      ctx.globalAlpha = 0.18 + 0.82 * b;
      ctx.beginPath(); ctx.arc(x, y, sizeBase * (0.55 + 0.7 * b), 0, 6.2832); ctx.fill();
      ctx.globalAlpha = 1;
    }

    function frame() {
      if (!W || !H) { requestAnimationFrame(frame); return; }
      tphase += 1;
      var e;
      if (reduce || asmDone) e = 1;
      else if (start === null) { start = Date.now(); e = 0; }
      else if (start < 0) e = 1;
      else { var pp = (Date.now() - start) / DUR; if (pp >= 1) { pp = 1; asmDone = true; } e = 1 - Math.pow(1 - pp, 3); }
      var ix = 1 - e;

      // 스크롤 진행도(0~1) over cosmos pin → 부드럽게 보간(sprog) 후 모핑/카운트/문구 구동.
      // 스크롤 이벤트가 띄엄띄엄 와도 매 프레임 목표로 lerp 하므로 모핑이 끊기지 않음.
      var raw = (window.pageYOffset - pinTop) / pinTravel;
      raw = raw < 0 ? 0 : raw > 1 ? 1 : raw;
      sprog += (raw - sprog) * 0.06;   // 낮을수록 모션이 천천히 미끄러지듯 따라감
      if (Math.abs(raw - sprog) < 0.0004) sprog = raw;
      var prog = sprog;
      // ★ 4비트: 시계(1·시간) → 부업선(2·한계) → 사람그리드+카운트(3·사업/스케일) → 코어(4·AI, 다수→하나)
      var m1 = (prog - 0.12) / 0.22; m1 = m1 < 0 ? 0 : m1 > 1 ? 1 : m1;   // 시계 → 부업선
      var m2 = (prog - 0.42) / 0.18; m2 = m2 < 0 ? 0 : m2 > 1 ? 1 : m2;   // 부업선 → 그리드
      var countP = (prog - 0.60) / 0.16; countP = countP < 0 ? 0 : countP > 1 ? 1 : countP;
      var m3 = (prog - 0.80) / 0.12; m3 = m3 < 0 ? 0 : m3 > 1 ? 1 : m3;   // 그리드 → AI 코어
      var exitP = (prog - 0.96) / 0.04; exitP = exitP < 0 ? 0 : exitP > 1 ? 1 : exitP;
      var introOp = 1 - (prog - 0.10) / 0.06; introOp = introOp < 0 ? 0 : introOp > 1 ? 1 : introOp;   // 1: ~0.16 사라짐
      var shiftOp = Math.min((prog - 0.26) / 0.05, (0.42 - prog) / 0.05);                               // 2: 0.26~0.31 등장 / 0.37~0.42 사라짐
      shiftOp = shiftOp < 0 ? 0 : shiftOp > 1 ? 1 : shiftOp;
      var hookOp = Math.min((prog - 0.54) / 0.05, (0.80 - prog) / 0.05);                                // 3: 0.54~0.59 등장 / 0.75~0.80 사라짐
      hookOp = hookOp < 0 ? 0 : hookOp > 1 ? 1 : hookOp;
      var aiOp = (prog - 0.87) / 0.05; aiOp = aiOp < 0 ? 0 : aiOp > 1 ? 1 : aiOp;                        // 4: 0.87~0.92 등장
      if (ctIntro) ctIntro.style.opacity = introOp.toFixed(3);
      if (ctShift2) ctShift2.style.opacity = shiftOp.toFixed(3);
      if (ctHook) ctHook.style.opacity = hookOp.toFixed(3);
      if (ctAi) ctAi.style.opacity = (aiOp * (1 - exitP)).toFixed(3);
      var people = Math.round(countP * 1000);
      if (people !== lastPeople && cePeople) {
        cePeople.textContent = people.toLocaleString();
        ceTotal.textContent = "₫" + (people * 10000).toLocaleString();
        lastPeople = people;
      }

      ctx.clearRect(0, 0, W, H);
      var nf = 1 - m1 * 0.7;
      var g = ctx.createRadialGradient(cx, cy, R * 0.1, cx, cy, maxD);
      g.addColorStop(0, "rgba(255,122,60," + (0.08 * e * nf * (1 - exitP)).toFixed(3) + ")"); g.addColorStop(1, "rgba(10,7,18,0)");
      ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);

      // 배경 별
      var sf = 1 - m1 * 0.65;
      for (var i = 0; i < stars.length; i++) {
        var s = stars[i];
        if (!reduce) { s.x += s.vx; s.y += s.vy; s.a += s.tw;
          if (s.x < 0) s.x += W; else if (s.x > W) s.x -= W;
          if (s.y < 0) s.y += H; else if (s.y > H) s.y -= H; }
        var dd = Math.sqrt((s.x - cx) * (s.x - cx) + (s.y - cy) * (s.y - cy));
        var df = 1 - dd / maxD; if (df < 0.07) df = 0.07;
        var tw = 0.4 + 0.6 * Math.abs(Math.sin(s.a));
        ctx.globalAlpha = s.base * tw * df * 0.7 * sf * (1 - exitP);
        ctx.fillStyle = (i % 5 === 0) ? "#ff9a5c" : "#ffe6d2";
        ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, 6.2832); ctx.fill();
        ctx.globalAlpha = 1;
      }

      // 바늘 각도(실제 시각)
      var now = new Date();
      var sc2 = now.getSeconds() + now.getMilliseconds() / 1000;
      var mn2 = now.getMinutes() + sc2 / 60;
      var hr2 = (now.getHours() % 12) + mn2 / 60;
      var ang = [(hr2 / 12) * 6.2832, (mn2 / 60) * 6.2832, (sc2 / 60) * 6.2832];

      // 커서 속도(끌고 가는 결) — 정지 시 0
      if (mouseOn && pmx !== -9999) { var dmx = mx - pmx, dmy = my - pmy; mvx = dmx < -60 ? -60 : dmx > 60 ? 60 : dmx; mvy = dmy < -60 ? -60 : dmy > 60 ? 60 : dmy; }
      else { mvx = 0; mvy = 0; }
      pmx = mx; pmy = my;

      // 입자: 시계 → 부업선 → 사람그리드 2단계 모핑(둘 다 대각 시차 웨이브), 카운트만큼 점등
      var STAG = 0.62;                 // 시차 폭(클수록 웨이브가 길게/천천히 번짐)
      var exitRise = exitP * exitP * 110;  // 핸드오프 상승량(px)
      var mf = (1 - m1) * e;
      // AI 코어(회전하는 원자) — Y축 턴테이블 회전 + 전자 궤도 진행값을 프레임당 1회 계산
      var atomA = tphase * 0.011, atomCos = Math.cos(atomA), atomSin = Math.sin(atomA);
      var atomScale = R * 0.72, atomCY = cy + gyShift * 0.3, eFlow = tphase * 0.022;
      for (var k = 0; k < N; k++) {
        var p = P[k], clxp, clyp, cdist;
        if (p.role < 3) { var th = ang[p.role], ux = Math.sin(th), uy = -Math.cos(th), pp = p.perp || 0; cdist = p.frac * handLen[p.role]; clxp = cx + ux * cdist - uy * pp; clyp = cy + uy * cdist + ux * pp; }
        else { clxp = p.cxp; clyp = p.cyp; cdist = p.rr; }
        var clx = clxp * e + p.sx * ix, cly = clyp * e + p.sy * ix;

        // 세 단계 시차 모핑값(대각 웨이브)
        var d = p.delay;
        var pm1 = (m1 - d * STAG) / (1 - STAG); pm1 = pm1 < 0 ? 0 : pm1 > 1 ? 1 : pm1; pm1 = pm1 * pm1 * (3 - 2 * pm1);
        var pm2 = (m2 - d * STAG) / (1 - STAG); pm2 = pm2 < 0 ? 0 : pm2 > 1 ? 1 : pm2; pm2 = pm2 * pm2 * (3 - 2 * pm2);
        var pm3 = (m3 - d * STAG) / (1 - STAG); pm3 = pm3 < 0 ? 0 : pm3 > 1 ? 1 : pm3; pm3 = pm3 * pm3 * (3 - 2 * pm3);

        // 1단계: 시계 → 부업선 (직선 수렴)
        var ax = clx + (p.lx - clx) * pm1, ay = cly + (p.ly - cly) * pm1;

        // 2단계: 부업선 → 그리드 (수직 곡선 궤적 + 비행 중 미세 흔들림 — 스케일로 '흩어짐')
        var ddx = p.gx - ax, ddy = p.gy - ay;
        var dist = Math.sqrt(ddx * ddx + ddy * ddy);
        var arc = pm2 * (1 - pm2) * 4;                // 0→1→0
        var ca = p.curve * dist * 0.20 * arc;
        var nlen = dist > 0.001 ? 1 / dist : 0;
        var shimmer = arc * 2.0 * Math.sin(tphase * 0.06 + p.ph);
        var gx = ax + ddx * pm2 - ddy * nlen * ca + Math.cos(p.ph) * shimmer;
        var gy = ay + ddy * pm2 + ddx * nlen * ca + Math.sin(p.ph) * shimmer;

        // 3단계: 그리드(1000명) → 회전하는 AI '원자'로 응축
        var aX, aY, aZ;
        if (p.atype === 0) {                                      // 핵: 작은 중심 구
          aX = p.nx * 0.20; aY = p.ny * 0.20; aZ = p.nz * 0.20;
        } else {                                                  // 전자: 궤도 위를 흐름
          var o = ATOM[p.orb], ph = p.phi + eFlow * p.pdir, cph = Math.cos(ph), sph = Math.sin(ph);
          aX = o.ux * cph + o.vx * sph; aY = o.uy * cph + o.vy * sph; aZ = o.uz * cph + o.vz * sph;
        }
        var rX = aX * atomCos + aZ * atomSin;                     // 전체 Y축 회전
        var rZ = -aX * atomSin + aZ * atomCos;
        var persp = 1 / (1 + rZ * 0.32);                          // 가까운 쪽(앞) 크게
        var aix = cx + rX * atomScale * persp;
        var aiy = atomCY + aY * atomScale * persp;
        var aishade = 0.5 - rZ * 0.5;                             // 앞면(rZ<0) 밝게
        var asz = (p.atype === 0 ? 1.7 : 1.1) * (0.7 + 0.55 * aishade) * persp;
        var bx = gx + (aix - gx) * pm3;
        var by = gy + (aiy - gy) * pm3 - exitRise;

        disturb(p, bx, by);
        var flick = 0.86 + 0.14 * Math.sin(tphase * 0.04 + k);
        var bClock = (p.role === 3) ? 1 : (bright(cdist) + (p.bAdd || 0));
        var bLine = 0.55 + 0.28 * flick;                          // 부업선: 균일하게 빛나되 천장에 막힘
        var bGrid = (k < people) ? (0.72 + 0.28 * flick) : 0.14;  // 그리드: 카운트만큼 점등
        var bCore = (p.atype === 0) ? (0.85 + 0.15 * flick) : (0.32 + 0.6 * aishade); // 핵 밝게 / 전자 앞면 밝게
        var bA = bClock * (1 - pm1) + bLine * pm1;
        var b12 = bA * (1 - pm2) + bGrid * pm2;
        var b = (b12 * (1 - pm3) + bCore * pm3) * (0.32 + 0.68 * e) * (1 - exitP);
        var szA = p.size * (1 - pm1) + 1.2 * pm1;
        var sz12 = szA * (1 - pm2) + 1.5 * pm2;
        var sz = sz12 * (1 - pm3) + asz * pm3;
        particle(bx + p.ox * mf, by + p.oy * mf, b, sz);
      }
      requestAnimationFrame(frame);
    }

    window.addEventListener("pointermove", function (ev) {
      var r = cv.getBoundingClientRect();
      mx = ev.clientX - r.left; my = ev.clientY - r.top;
      mouseOn = mx >= 0 && my >= 0 && mx <= r.width && my <= r.height;
    }, { passive: true });

    resize();
    window.addEventListener("resize", resize);
    requestAnimationFrame(frame);
  })();

  /* ----- 00 인트로 문구 타이핑 ----- */
  (function () {
    var el = document.getElementById("introTyped");
    if (!el) return;
    var full = t.intro_line || "";
    var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) { el.textContent = full; return; }
    var i = 0;
    function tick() {
      el.textContent = full.slice(0, i);
      if (i++ <= full.length) setTimeout(tick, 95);
    }
    setTimeout(tick, 2400);   // 시계가 응집된 뒤 타이핑 시작
  })();

  /* ----- read + render ----- */
  function readScroll() {
    var doc = document.documentElement;
    var scrollable = doc.scrollHeight - window.innerHeight;
    var sy = window.pageYOffset || doc.scrollTop;
    if (progressBar) progressBar.style.width = (scrollable > 0 ? (sy / scrollable) * 100 : 0) + "%";

    for (var i = 0; i < scrubs.length; i++) {
      var s = scrubs[i];
      if (mq.matches) { s.tgt = 1; continue; }          // 모바일: 핀 해제 → 인터랙션 최종 상태로
      var dist = (s.el.offsetHeight - window.innerHeight) * s.travel;
      var p = dist > 0 ? (sy - s.el.offsetTop) / dist : 0;
      s.tgt = clamp01(p);
    }
  }

  function frame() {
    for (var i = 0; i < scrubs.length; i++) {
      var s = scrubs[i];
      s.cur += (s.tgt - s.cur) * LERP;
      if (Math.abs(s.tgt - s.cur) < 0.0008) s.cur = s.tgt;
      s.apply(s.cur);
    }
    requestAnimationFrame(frame);
  }

  window.addEventListener("scroll", readScroll, { passive: true });
  window.addEventListener("resize", readScroll);
  if (mq.addEventListener) mq.addEventListener("change", readScroll);
  readScroll();
  requestAnimationFrame(frame);
})();
