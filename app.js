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

    /* 00 INTRO — 우주 별-시계 (독립 첫 화면) */
    '<section class="section intro" id="s-intro">' +
      '<canvas class="clock-canvas" id="clockCanvas"></canvas>' +
      '<div class="inner intro-inner">' +
        '<div class="intro-line reveal">' + esc(t.intro_line) + "</div>" +
        '<div class="scroll-cue"><span>' + esc(t.scroll_cue) + "</span><i></i></div>" +
      "</div>" +
    "</section>" +

    /* 01 HOOK — 핀 스크럽(카운터) */
    '<section id="s-hook">' +
      '<div class="pin-space" id="hookPin">' +
        '<div class="pin-sticky is-pad">' + videoSlot() +
          '<div class="inner">' +
            '<div class="eyebrow reveal">' + esc(t.hook_eyebrow) + "</div>" +
            '<h1 class="title reveal">' + esc(t.hook_title) + "</h1>" +
            '<p class="sub reveal">' + esc(t.hook_sub) + "</p>" +
            '<div class="counter reveal" id="counter">' +
              '<div class="count-lead">' + esc(t.count_lead) + "</div>" +
              '<div class="count-people" id="countPeople"></div>' +
              '<div class="count-eq">' +
                '<span class="ce-unit">₫10,000</span>' +
                '<span class="ce-op">×</span>' +
                '<span class="ce-people"><b id="cePeople">0</b>' + esc(t.people_suffix) + "</span>" +
                '<span class="ce-op">=</span>' +
                '<span class="ce-total" id="ceTotal">₫0</span>' +
              "</div>" +
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

  /* ----- 프롬프트 B: 01 카운터 (사람 1→1,000, ₫ 합계) ----- */
  (function () {
    var pin = document.getElementById("hookPin");
    var box = document.getElementById("countPeople");
    if (!pin || !box) return;
    var pEl = document.getElementById("cePeople");
    var tEl = document.getElementById("ceTotal");
    var DOTS = 120, h = ""; for (var i = 0; i < DOTS; i++) h += "<i></i>";
    box.innerHTML = h;
    var dots = box.children, lastOn = 0, lastPeople = -1;
    scrubs.push({
      el: pin, travel: 0.82, cur: 0, tgt: 0,
      apply: function (p) {
        var people = Math.round(p * 1000);
        if (people !== lastPeople) {
          pEl.textContent = people.toLocaleString();
          tEl.textContent = "₫" + (people * 10000).toLocaleString();
          lastPeople = people;
        }
        var on = Math.round(p * DOTS);
        if (on > lastOn) for (var i = lastOn; i < on; i++) dots[i].classList.add("on");
        else if (on < lastOn) for (var j = on; j < lastOn; j++) dots[j].classList.remove("on");
        lastOn = on;
      }
    });
  })();

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

  /* ----- 00 인트로: 우주 별-시계 (흩어진 점 → 시계로 응집, 실제 시각) ----- */
  (function () {
    var cv = document.getElementById("clockCanvas");
    if (!cv || !cv.getContext) return;
    var ctx = cv.getContext("2d");
    var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var W = 0, H = 0, cx = 0, cy = 0, R = 0, maxD = 1, tphase = 0;
    var stars = [], dial = [], hHour = [], hMin = [], hSec = [];
    var start = null, asmDone = false, DUR = 2200;
    var ORANGE = [255, 122, 60], WARM = [255, 234, 216];
    var rippleR = 80, mx = -9999, my = -9999, mouseOn = false;   // 마우스 가루 효과
    var DRIVE = 0.06, RETURN = 0.006, STR = 60;                  // 퍼질 때(느릿) / 가라앉을 때(아주 느림) / 최대 퍼짐(px)

    /* 화면 바깥에서 날아올 출발 좌표 */
    function scatter() { var a = Math.random() * 6.2832, rad = R * 1.3 + Math.random() * maxD; return { sx: cx + Math.cos(a) * rad, sy: cy + Math.sin(a) * rad }; }
    function buildHand(len, size, step) {
      var arr = [];
      for (var r = R * 0.05; r <= len; r += step) { var s = scatter(); arr.push({ r: r, size: size, sx: s.sx, sy: s.sy }); }
      return arr;
    }

    function resize() {
      var dpr = Math.min(2, window.devicePixelRatio || 1);
      W = cv.clientWidth; H = cv.clientHeight;
      if (!W || !H) return;
      cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cx = W * 0.5; cy = H * 0.44;
      R = Math.min(W, H) * (W < 720 ? 0.36 : 0.32);
      maxD = Math.max(W, H) * 0.62;
      rippleR = R * 1.0; STR = R * 0.26;

      // 배경 별
      var n = Math.min(280, Math.round((W * H) / 9000));
      stars = [];
      for (var i = 0; i < n; i++) stars.push({
        x: Math.random() * W, y: Math.random() * H, r: Math.random() * 1.5 + 0.25,
        a: Math.random() * 6.28, tw: Math.random() * 0.025 + 0.004,
        vx: (Math.random() - 0.5) * 0.045, vy: (Math.random() - 0.5) * 0.045,
        base: 0.45 + Math.random() * 0.55
      });

      // 베젤: 두꺼운 점들의 띠(안쪽 밝고 바깥 어둡게, 크기·밝기 제각각)
      dial = [];
      var rIn = R * 0.90, rOut = R * 1.14, band = rOut - rIn;
      var nBezel = Math.max(300, Math.min(680, Math.round(R * 3.4)));
      for (var k = 0; k < nBezel; k++) {
        var ang = Math.random() * 6.2832, rad = rIn + Math.random() * band;
        var ux = Math.sin(ang), uy = -Math.cos(ang), s = scatter();
        dial.push({ tx: cx + ux * rad, ty: cy + uy * rad, rr: rad,
          size: 0.55 + Math.random() * 1.5, bAdd: -0.06 + Math.random() * 0.18, sx: s.sx, sy: s.sy });
      }
      // 시(時) 표시 12개: 진한 별무리
      for (var hh = 0; hh < 12; hh++) {
        var ha = (hh / 12) * 6.2832, hx = Math.sin(ha), hy = -Math.cos(ha);
        var hs = scatter();
        dial.push({ tx: cx + hx * R, ty: cy + hy * R, rr: R, size: 2.7, bAdd: 0.38, sx: hs.sx, sy: hs.sy });
        for (var q = 0; q < 5; q++) {
          var rr2 = rIn + Math.random() * band, aa = ha + (Math.random() - 0.5) * 0.16;
          var u2 = Math.sin(aa), v2 = -Math.cos(aa), sq = scatter();
          dial.push({ tx: cx + u2 * rr2, ty: cy + v2 * rr2, rr: rr2,
            size: 0.8 + Math.random() * 1.1, bAdd: 0.16, sx: sq.sx, sy: sq.sy });
        }
      }
      hHour = buildHand(R * 0.50, 2.6, R * 0.020);
      hMin = buildHand(R * 0.76, 2.0, R * 0.018);
      hSec = buildHand(R * 0.90, 1.3, R * 0.017);

      start = asmDone ? -1 : null;   // 이미 응집 끝났으면 다시 흩어지지 않음
    }

    function bright(d) { var b = 1 - 0.72 * (d / R); return b < 0.1 ? 0.1 : b > 1 ? 1 : b; }

    /* 커서 주변으로 가루처럼 부드럽게 퍼졌다가 스르륵 다시 모임 (튕김 없는 ease 추종) */
    function disturb(p, bx, by) {
      if (p.ox === undefined) { p.ox = 0; p.oy = 0; p.m = 0.55 + Math.random() * 0.9; }
      var tx = 0, ty = 0;
      if (mouseOn) {
        var dx = bx - mx, dy = by - my, dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < rippleR) {
          var f = 1 - dist / rippleR; f = f * f;            // 부드러운 falloff
          var inv = dist > 0.001 ? 1 / dist : 0, s = STR * f * p.m;
          tx = (dx * inv) * s - (dy * inv) * s * 0.25;       // 약간의 소용돌이 → 더 유체같이
          ty = (dy * inv) * s + (dx * inv) * s * 0.25;
        }
      }
      // 밀릴 땐 빠르게 반응, 풀릴 땐 천천히 제자리로
      var k = (tx * tx + ty * ty) > (p.ox * p.ox + p.oy * p.oy) ? DRIVE : RETURN;
      p.ox += (tx - p.ox) * k;
      p.oy += (ty - p.oy) * k;
    }

    function particle(x, y, b, sizeBase) {
      if (b <= 0.01) return; if (b > 1) b = 1;
      var t = Math.pow(b, 1.3);
      ctx.fillStyle = "rgb(" + Math.round(ORANGE[0] + (WARM[0] - ORANGE[0]) * t) + ","
                             + Math.round(ORANGE[1] + (WARM[1] - ORANGE[1]) * t) + ","
                             + Math.round(ORANGE[2] + (WARM[2] - ORANGE[2]) * t) + ")";
      ctx.shadowBlur = b > 0.45 ? (3 + 7 * b) : 0;
      if (ctx.shadowBlur) ctx.shadowColor = "#ff7a3c";
      ctx.globalAlpha = 0.16 + 0.84 * b;
      ctx.beginPath(); ctx.arc(x, y, sizeBase * (0.55 + 0.7 * b), 0, 6.2832); ctx.fill();
      ctx.globalAlpha = 1; ctx.shadowBlur = 0;
    }

    function drawHand(arr, theta, e, ix) {
      var ux = Math.sin(theta), uy = -Math.cos(theta);
      for (var i = 0; i < arr.length; i++) {
        var h = arr[i];
        var bx = (cx + ux * h.r) * e + h.sx * ix, by = (cy + uy * h.r) * e + h.sy * ix;
        disturb(h, bx, by);
        var sh = 0.9 + 0.1 * Math.sin(tphase * 0.05 + h.r * 0.06);
        particle(bx + h.ox * e, by + h.oy * e, bright(h.r) * sh * (0.32 + 0.68 * e), h.size);
      }
    }

    function frame() {
      if (!W || !H) { requestAnimationFrame(frame); return; }
      tphase += 1;
      var e;
      if (reduce || asmDone) e = 1;
      else if (start === null) { start = Date.now(); e = 0; }
      else if (start < 0) e = 1;
      else { var p = (Date.now() - start) / DUR; if (p >= 1) { p = 1; asmDone = true; } e = 1 - Math.pow(1 - p, 3); }
      var ix = 1 - e;

      ctx.clearRect(0, 0, W, H);
      var g = ctx.createRadialGradient(cx, cy, R * 0.1, cx, cy, maxD);
      g.addColorStop(0, "rgba(255,122,60," + (0.08 * e).toFixed(3) + ")"); g.addColorStop(1, "rgba(10,7,18,0)");
      ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);

      // 배경 별 (중심에서 멀수록 어둡게)
      for (var i = 0; i < stars.length; i++) {
        var s = stars[i];
        if (!reduce) { s.x += s.vx; s.y += s.vy; s.a += s.tw;
          if (s.x < 0) s.x += W; else if (s.x > W) s.x -= W;
          if (s.y < 0) s.y += H; else if (s.y > H) s.y -= H; }
        var dd = Math.sqrt((s.x - cx) * (s.x - cx) + (s.y - cy) * (s.y - cy));
        var df = 1 - dd / maxD; if (df < 0.07) df = 0.07;
        var tw = 0.4 + 0.6 * Math.abs(Math.sin(s.a));
        ctx.globalAlpha = s.base * tw * df * 0.7;
        ctx.fillStyle = (i % 5 === 0) ? "#ff9a5c" : "#ffe6d2";
        ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, 6.2832); ctx.fill();
        ctx.globalAlpha = 1;
      }

      // 문자판 (흩어진 위치 → 제자리로)
      for (var d2 = 0; d2 < dial.length; d2++) {
        var dp = dial[d2];
        var bx = dp.tx * e + dp.sx * ix, by = dp.ty * e + dp.sy * ix;
        disturb(dp, bx, by);
        var fl = 0.85 + 0.15 * Math.sin(tphase * 0.04 + d2);
        particle(bx + dp.ox * e, by + dp.oy * e, (bright(dp.rr) + dp.bAdd) * fl * (0.32 + 0.68 * e), dp.size);
      }

      // 실제 시각 바늘
      var now = new Date();
      var sec = now.getSeconds() + now.getMilliseconds() / 1000;
      var min = now.getMinutes() + sec / 60;
      var hr = (now.getHours() % 12) + min / 60;
      drawHand(hHour, (hr / 12) * 6.2832, e, ix);
      drawHand(hMin, (min / 60) * 6.2832, e, ix);
      if (!reduce) drawHand(hSec, (sec / 60) * 6.2832, e, ix);

      // 중심 허브 (응집 끝날수록 또렷)
      particle(cx, cy, e, 4.6); particle(cx, cy, e, 2.2);
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
    var el = document.querySelector(".intro-line");
    if (!el) return;
    var full = el.textContent;
    var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var txt = document.createElement("span");
    var caret = document.createElement("span");
    caret.className = "type-caret"; caret.textContent = "|";
    el.textContent = ""; el.appendChild(txt); el.appendChild(caret);
    if (reduce) { txt.textContent = full; return; }
    var i = 0;
    function tick() {
      txt.textContent = full.slice(0, i);
      if (i++ <= full.length) setTimeout(tick, 95);
    }
    setTimeout(tick, 2400);   // 시계가 다 응집된 뒤 타이핑 시작 (커서는 그 전부터 깜빡)
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
