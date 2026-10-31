(function () {
  'use strict';

  /* ============================================================
     Dữ liệu & hằng số
     ============================================================ */
  const DATA = window.PM_DATA || {};
  const BANK = Array.isArray(window.EXAM_QUESTIONS) ? window.EXAM_QUESTIONS.slice() : [];
  const Q_MAP = DATA.questions && typeof DATA.questions === 'object' ? DATA.questions : {};
  const MODULES = Array.isArray(DATA.modules) ? DATA.modules : [];
  const DURATION = 7 * 60 * 1000;
  const STORAGE_KEY = 'pmstudy.exam.v1';
  const THEME_KEY = 'pmstudy.theme';
  const SIZES = [1, 3, 5, 8];

  const ICONS = {
    check: '<path d="m5 12.5 4.2 4.2L19 7"/>',
    'check-circle': '<circle cx="12" cy="12" r="9"/><path d="m8 12.5 2.8 2.8L16.5 9"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/>',
    shuffle: '<path d="M3 7h3.5c5 0 5 10 10 10H21"/><path d="m18 14 3 3-3 3"/><path d="M3 17h3.5c1.8 0 3-1.3 4-3"/><path d="M14 9c1-1.2 2-2 3.5-2H21"/><path d="m18 4 3 3-3 3"/>',
    layers: '<path d="m12 3 9 5-9 5-9-5 9-5Z"/><path d="m3 12 9 5 9-5"/><path d="m3 16 9 5 9-5"/>',
    save: '<path d="M5 3h11l3 3v15H5Z"/><path d="M8 3v6h7V3"/><path d="M8 21v-7h8v7"/>',
    x: '<path d="m6 6 12 12M18 6 6 18"/>',
    moon: '<path d="M20 15.5A8.5 8.5 0 0 1 8.5 4 8.5 8.5 0 1 0 20 15.5Z"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
    'arrow-up-right': '<path d="M7 17 17 7"/><path d="M9 7h8v8"/>',
    'arrow-left': '<path d="M19 12H5"/><path d="m11 6-6 6 6 6"/>',
    sparkles: '<path d="m12 3 1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5Z"/><path d="m18.5 15 .8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8Z"/>',
    target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.3"/>',
    note: '<path d="M4 4h16v12l-4 4H4Z"/><path d="M16 20v-4h4"/><path d="M8 9h8M8 13h5"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5"/><path d="M12 8h.01"/>',
    print: '<path d="M6 9V3h12v6"/><rect x="3" y="9" width="18" height="8" rx="2"/><path d="M6 14h12v7H6Z"/>'
  };

  function icon(name) {
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
      (ICONS[name] || ICONS.info) + '</svg>';
  }

  const els = {
    root: document.getElementById('exam-root'),
    themeBtn: document.getElementById('theme-btn'),
    modalOverlay: document.getElementById('modal-overlay'),
    modalCard: document.getElementById('modal-card'),
    toast: document.getElementById('toast')
  };

  const ui = {
    view: 'start',
    timerId: null,
    saveTimer: null,
    toastTimer: null,
    warned: {},
    lastTickSecond: null,
    lastFocus: null
  };

  const store = loadStore();

  /* ============================================================
     Tiện ích
     ============================================================ */
  function escapeHtml(value) {
    return String(value == null ? '' : value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function pad2(value) {
    return String(value).padStart(2, '0');
  }

  function formatClock(totalSeconds) {
    const safe = Math.max(0, Math.ceil(totalSeconds));
    const minutes = Math.floor(safe / 60);
    const seconds = safe % 60;
    return pad2(minutes) + ':' + pad2(seconds);
  }

  function formatDuration(ms) {
    const total = Math.max(0, Math.round(ms / 1000));
    return Math.floor(total / 60) + ':' + pad2(total % 60);
  }

  function formatDate(timestamp) {
    try {
      return new Intl.DateTimeFormat('vi-VN', {
        day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit'
      }).format(new Date(timestamp)).replace(',', ' ·');
    } catch (e) {
      return new Date(timestamp).toLocaleString('vi-VN');
    }
  }

  function randomInt(max) {
    if (window.crypto && window.crypto.getRandomValues) {
      const buffer = new Uint32Array(1);
      window.crypto.getRandomValues(buffer);
      return buffer[0] % max;
    }
    return Math.floor(Math.random() * max);
  }

  function shuffle(list) {
    const result = list.slice();
    for (let i = result.length - 1; i > 0; i--) {
      const j = randomInt(i + 1);
      const temp = result[i];
      result[i] = result[j];
      result[j] = temp;
    }
    return result;
  }

  function sameSet(a, b) {
    if (!Array.isArray(a) || !Array.isArray(b) || a.length !== b.length) return false;
    const left = a.slice().sort(function (x, y) { return x - y; }).join(',');
    const right = b.slice().sort(function (x, y) { return x - y; }).join(',');
    return left === right;
  }

  function questionById(id) {
    return BANK.find(function (q) { return Number(q.id) === Number(id); }) || null;
  }

  function moduleForQuestion(id) {
    return MODULES.find(function (m) {
      return Array.isArray(m.questionIds) && m.questionIds.indexOf(Number(id)) !== -1;
    }) || null;
  }

  function moduleStyle(m) {
    return m ? '--m:' + (m.color || '#6366f1') : '';
  }

  function answerText(session, id) {
    return session && session.answers && typeof session.answers[id] === 'string' ? session.answers[id] : '';
  }

  function countAnswered(session) {
    if (!session || !Array.isArray(session.qids)) return 0;
    return session.qids.filter(function (id) {
      return answerText(session, id).trim().length > 0;
    }).length;
  }

  function referenceFor(id) {
    const item = Q_MAP[Number(id)];
    if (!item) return null;
    const points = Array.isArray(item.keyPoints) ? item.keyPoints.filter(Boolean) : [];
    const hasContent = typeof item.content === 'string' && item.content.trim().length > 0;
    if (!points.length && !hasContent) return null;
    return {
      summary: item.summary || '',
      points: points,
      hasFullAnswer: hasContent
    };
  }

  /* ============================================================
     Lưu trữ
     ============================================================ */
  function defaultStore() {
    return { active: null, last: null, size: 3 };
  }

  function validSession(value) {
    if (!value || typeof value !== 'object') return false;
    if (!Array.isArray(value.qids) || !value.qids.length) return false;
    if (typeof value.startedAt !== 'number' || typeof value.endAt !== 'number') return false;
    return true;
  }

  function loadStore() {
    const base = defaultStore();
    try {
      const raw = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
      if (!raw || typeof raw !== 'object') return base;
      if (SIZES.indexOf(Number(raw.size)) !== -1) base.size = Number(raw.size);
      if (validSession(raw.active)) {
        const active = raw.active;
        active.qids = active.qids.map(Number).filter(function (id) { return Boolean(questionById(id)); });
        active.answers = active.answers && typeof active.answers === 'object' ? active.answers : {};
        active.duration = typeof active.duration === 'number' ? active.duration : DURATION;
        active.id = active.id || makeId();
        if (active.qids.length) base.active = active;
      }
      if (validSession(raw.last)) {
        const last = raw.last;
        last.qids = last.qids.map(Number).filter(function (id) { return Boolean(questionById(id)); });
        last.answers = last.answers && typeof last.answers === 'object' ? last.answers : {};
        last.duration = typeof last.duration === 'number' ? last.duration : DURATION;
        if (last.qids.length) base.last = last;
      }
    } catch (e) {
      console.warn('PM Study: không đọc được dữ liệu thi thử.', e);
    }
    return base;
  }

  function saveStore() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
    } catch (e) {
      console.warn('PM Study: không lưu được dữ liệu thi thử.', e);
    }
  }

  function makeId() {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let code = '';
    for (let i = 0; i < 4; i++) code += chars.charAt(randomInt(chars.length));
    return 'EX-' + code;
  }

  /* ============================================================
     Giao diện chung
     ============================================================ */
  function setThemeIcon() {
    if (!els.themeBtn) return;
    const dark = document.documentElement.dataset.theme === 'dark';
    els.themeBtn.innerHTML = icon(dark ? 'sun' : 'moon');
    els.themeBtn.setAttribute('aria-label', dark ? 'Chuyển sang giao diện sáng' : 'Chuyển sang giao diện tối');
    els.themeBtn.setAttribute('title', dark ? 'Giao diện sáng' : 'Giao diện tối');
  }

  function applyTheme(theme, persist) {
    const next = theme === 'dark' ? 'dark' : 'light';
    document.documentElement.dataset.theme = next;
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', next === 'dark' ? '#0c1218' : '#f6f4ee');
    setThemeIcon();
    if (persist) {
      try { localStorage.setItem(THEME_KEY, next); } catch (e) { /* bỏ qua */ }
    }
  }

  function showToast(message) {
    if (!els.toast) return;
    window.clearTimeout(ui.toastTimer);
    els.toast.textContent = message;
    els.toast.classList.add('show');
    ui.toastTimer = window.setTimeout(function () {
      els.toast.classList.remove('show');
    }, 2800);
  }

  function focusRoot() {
    if (!els.root) return;
    try { els.root.focus({ preventScroll: true }); } catch (e) { els.root.focus(); }
  }

  /* ============================================================
     Modal
     ============================================================ */
  function openModal(html, focusSelector) {
    if (!els.modalOverlay || !els.modalCard) return;
    ui.lastFocus = document.activeElement;
    els.modalCard.innerHTML =
      '<button class="modal-close" type="button" data-action="close-modal" aria-label="Đóng">' + icon('x') + '</button>' +
      html;
    els.modalOverlay.hidden = false;
    document.body.classList.add('is-locked');
    const target = els.modalCard.querySelector(focusSelector || '[data-action="close-modal"]');
    if (target) {
      window.requestAnimationFrame(function () { target.focus(); });
    }
  }

  function closeModal(restoreFocus) {
    if (!els.modalOverlay || els.modalOverlay.hidden) return;
    els.modalOverlay.hidden = true;
    els.modalCard.innerHTML = '';
    document.body.classList.remove('is-locked');
    if (restoreFocus !== false && ui.lastFocus && typeof ui.lastFocus.focus === 'function') {
      ui.lastFocus.focus();
    }
    ui.lastFocus = null;
  }

  /* ============================================================
     Chọn đề
     ============================================================ */
  function pickQuestions(size) {
    const allIds = BANK.map(function (q) { return Number(q.id); });
    const count = Math.min(Math.max(1, Number(size) || 3), allIds.length);
    let picked = shuffle(allIds).slice(0, count);

    if (store.last && Array.isArray(store.last.qids) && store.last.qids.length === count) {
      for (let attempt = 0; attempt < 10 && sameSet(picked, store.last.qids); attempt++) {
        picked = shuffle(allIds).slice(0, count);
      }
    }
    return picked;
  }

  function startExam(size) {
    if (!BANK.length) {
      showToast('Chưa tìm thấy ngân hàng câu hỏi.');
      return;
    }
    const chosen = SIZES.indexOf(Number(size)) !== -1 ? Number(size) : 3;
    const normalized = Math.min(chosen, BANK.length);
    const now = Date.now();
    const qids = pickQuestions(normalized);
    const answers = {};
    qids.forEach(function (id) { answers[id] = ''; });

    store.active = {
      id: makeId(),
      startedAt: now,
      endAt: now + DURATION,
      duration: DURATION,
      qids: qids,
      answers: answers,
      lastSavedAt: now
    };
    store.size = chosen;
    saveStore();
    ui.warned = {};
    ui.lastTickSecond = null;
    closeModal(false);
    renderExam();
    showToast('Đề đã sẵn sàng. Đồng hồ bắt đầu chạy.');
  }

  /* ============================================================
     Màn hình bắt đầu
     ============================================================ */
  function renderStart() {
    stopTimer();
    closeModal(false);
    ui.view = 'start';
    document.title = 'Thi thử 7 phút — PM Study';

    const last = store.last;
    const lastSummary = last
      ? countAnswered(last) + '/' + last.qids.length + ' câu · ' + formatDuration(last.timeUsedMs || 0) + ' · ' + formatDate(last.submittedAt || Date.now())
      : '';

    els.root.innerHTML =
      '<section class="exam-start">' +
        '<div class="start-copy">' +
          '<div class="eyebrow">Phòng thi ngẫu nhiên</div>' +
          '<h1>Một bộ đề mới,<br><em>trong 7 phút.</em></h1>' +
          '<p class="start-lede">Mỗi lượt, hệ thống rút ngẫu nhiên câu hỏi từ ngân hàng 38 câu môn Quản lý dự án phần mềm. Bạn có đúng 7 phút để trả lời trước khi bài làm được nộp tự động.</p>' +
          '<ul class="start-points">' +
            '<li><span class="point-check">' + icon('check') + '</span><span>Câu hỏi và thứ tự được xáo ngẫu nhiên mỗi lần bắt đầu.</span></li>' +
            '<li><span class="point-check">' + icon('check') + '</span><span>Đồng hồ chạy ngay khi mở đề; bài làm được tự lưu trên trình duyệt.</span></li>' +
            '<li><span class="point-check">' + icon('check') + '</span><span>Hết giờ hệ thống tự nộp, sau đó bạn có thể xem lại và mở gợi ý đáp án.</span></li>' +
          '</ul>' +
          '<div class="start-mini-stats">' +
            '<span>' + icon('layers') + '38 câu hỏi</span>' +
            '<span>' + icon('target') + '8 module</span>' +
            '<span>' + icon('clock') + '7 phút mỗi lượt</span>' +
          '</div>' +
        '</div>' +

        '<aside class="setup-card" aria-label="Thiết lập lượt thi">' +
          '<div class="setup-head">' +
            '<div><div class="eyebrow">Thiết lập lượt thi</div><h2>Tạo đề ngẫu nhiên</h2></div>' +
            '<span class="setup-badge">' + icon('shuffle') + 'Mỗi lần một đề</span>' +
          '</div>' +
          '<div class="setup-clock" aria-hidden="true">' +
            '<div class="clock-ring"><span>07:00</span></div>' +
            '<span class="clock-label">Thời gian làm bài</span>' +
          '</div>' +
          '<div class="setup-field-label"><span>Số câu trong đề</span><small>Khuyến nghị 3 câu</small></div>' +
          '<div class="size-options" role="group" aria-label="Chọn số câu trong đề">' +
            SIZES.map(function (size) {
              return '<button class="size-option" type="button" data-action="select-size" data-size="' + size + '" aria-pressed="' + (size === store.size ? 'true' : 'false') + '">' +
                '<strong>' + size + '</strong><span>câu</span></button>';
            }).join('') +
          '</div>' +
          '<button class="btn btn-primary setup-start" type="button" data-action="start-exam">' + icon('sparkles') + 'Tạo đề & bắt đầu</button>' +
          '<p class="setup-foot">Đồng hồ 7 phút bắt đầu ngay sau khi bấm. Bài làm không được gửi lên máy chủ.</p>' +
          (last
            ? '<div class="setup-last">' +
                '<div><small>Lần gần nhất</small><strong>' + escapeHtml(lastSummary) + '</strong></div>' +
                '<button class="link-btn" type="button" data-action="view-last">Xem lại</button>' +
              '</div>'
            : '<div class="setup-last"><div><small>Lưu ý</small><strong>Bài làm chỉ lưu trên trình duyệt này</strong></div></div>') +
        '</aside>' +
      '</section>' +

      '<div class="exam-feature-row">' +
        '<div class="exam-feature"><span class="exam-feature-icon">' + icon('shuffle') + '</span><div><strong>Đề khác mỗi lượt</strong><span>Câu hỏi được rút và xáo lại từ toàn bộ ngân hàng.</span></div></div>' +
        '<div class="exam-feature"><span class="exam-feature-icon">' + icon('clock') + '</span><div><strong>Đếm ngược 7 phút</strong><span>Đồng hồ tính theo giờ thực, không reset khi tải lại trang.</span></div></div>' +
        '<div class="exam-feature"><span class="exam-feature-icon">' + icon('save') + '</span><div><strong>Tự lưu bài làm</strong><span>Đóng tab hay tải lại vẫn tiếp tục đúng đề đang làm.</span></div></div>' +
      '</div>';

    focusRoot();
  }

  /* ============================================================
     Phòng thi
     ============================================================ */
  function renderExam() {
    const session = store.active;
    if (!session || !validSession(session)) {
      renderStart();
      return;
    }
    closeModal(false);
    ui.view = 'exam';
    const answered = countAnswered(session);
    const total = session.qids.length;

    const cards = session.qids.map(function (id, index) {
      const question = questionById(id);
      const module = moduleForQuestion(id);
      const prompt = question ? question.prompt : 'Nội dung câu hỏi đang cập nhật.';
      const value = answerText(session, id);
      return '<article class="question-card' + (value.trim() ? ' is-answered' : '') + '" data-question-card="' + id + '">' +
        '<div class="q-card-head">' +
          '<span class="q-number">' + id + '</span>' +
          '<div class="q-meta">' +
            '<span class="q-bank-label">Câu ' + id + ' trong ngân hàng</span>' +
            '<span class="q-module" style="' + moduleStyle(module) + '"><span class="dot"></span>' +
              (module ? 'Module ' + pad2(module.id) + ' · ' + escapeHtml(module.navTitle || module.title) : 'Quản lý dự án phần mềm') +
            '</span>' +
          '</div>' +
          '<span class="q-position">' + (index + 1) + ' / ' + total + '</span>' +
        '</div>' +
        '<h2 class="q-prompt">' + escapeHtml(prompt) + '</h2>' +
        '<label class="sr-only" for="answer-' + id + '">Trả lời câu ' + id + '</label>' +
        '<textarea class="answer-field" id="answer-' + id + '" data-answer="' + id + '" rows="5" placeholder="Viết dàn ý hoặc câu trả lời của bạn…">' + escapeHtml(value) + '</textarea>' +
        '<div class="q-foot"><span>Tự động lưu</span><span class="char-count" data-char-count="' + id + '">' + value.length + ' ký tự</span></div>' +
      '</article>';
    }).join('');

    els.root.innerHTML =
      '<div class="exam-view">' +
        '<div class="exam-toolbar" id="exam-toolbar">' +
          '<div class="exam-toolbar-top">' +
            '<div class="exam-toolbar-info">' +
              '<div class="exam-live-label"><span class="live-dot"></span>Đang làm đề</div>' +
              '<div class="exam-toolbar-sub"><span><strong data-answered-count>' + answered + '/' + total + '</strong> câu đã trả lời</span>' +
                '<span class="save-status" id="save-status" aria-live="polite">' + icon('check') + 'Đã lưu</span></div>' +
            '</div>' +
            '<div class="exam-timer-row">' +
              '<div class="exam-timer" id="exam-timer" role="timer" aria-label="Thời gian còn lại">' + icon('clock') + '<span id="exam-timer-text">07:00</span></div>' +
              '<button class="btn btn-primary exam-submit-btn" type="button" data-action="open-submit">Nộp bài</button>' +
            '</div>' +
          '</div>' +
          '<div class="exam-timebar" aria-hidden="true"><span id="exam-time-progress"></span></div>' +
        '</div>' +

        '<div class="exam-heading">' +
          '<div><div class="eyebrow">Đề ngẫu nhiên</div><h1>' + total + ' câu · 7 phút</h1>' +
            '<p>Trả lời bằng dàn ý ngắn gọn. Hết giờ, hệ thống tự động nộp bài.</p></div>' +
          '<span class="exam-set-code">MÃ ĐỀ ' + escapeHtml(session.id) + '</span>' +
        '</div>' +

        '<div class="question-list">' + cards + '</div>' +

        '<div class="exam-bottom-actions">' +
          '<button class="link-btn abort-btn" type="button" data-action="abort-exam">Hủy đề này</button>' +
          '<div class="right">' +
            '<button class="btn btn-ghost btn-sm" type="button" data-action="open-submit">' + icon('check-circle') + 'Nộp bài</button>' +
          '</div>' +
        '</div>' +
      '</div>';

    updateAnsweredUI();
    startTimer();
    window.scrollTo(0, 0);
    focusRoot();
  }

  function setSaveStatus(mode) {
    const el = document.getElementById('save-status');
    if (!el) return;
    if (mode === 'saving') {
      el.classList.add('is-saving');
      el.innerHTML = icon('clock') + 'Đang lưu…';
    } else {
      el.classList.remove('is-saving');
      el.innerHTML = icon('check') + 'Đã lưu';
    }
  }

  function updateAnswerUI(id, value) {
    const card = document.querySelector('[data-question-card="' + id + '"]');
    if (card) card.classList.toggle('is-answered', value.trim().length > 0);
    const count = document.querySelector('[data-char-count="' + id + '"]');
    if (count) count.textContent = value.length + ' ký tự';
    updateAnsweredUI();
  }

  function updateAnsweredUI() {
    if (!store.active) return;
    const answered = countAnswered(store.active);
    const total = store.active.qids.length;
    document.querySelectorAll('[data-answered-count]').forEach(function (el) {
      el.textContent = answered + '/' + total;
    });
  }

  function ensureTimerStarted() {
    if (ui.timerId || !store.active) return;
    ui.timerId = window.setInterval(tick, 250);
    tick();
  }

  function startTimer() {
    stopTimer();
    ensureTimerStarted();
  }

  function stopTimer() {
    if (ui.timerId) {
      window.clearInterval(ui.timerId);
      ui.timerId = null;
    }
  }

  function tick() {
    const session = store.active;
    if (!session) {
      stopTimer();
      return;
    }
    const remaining = Math.max(0, session.endAt - Date.now());
    if (remaining <= 0) {
      updateTimerDisplay(0);
      finishExam('timeout');
      return;
    }
    updateTimerDisplay(remaining);
    updateTimeWarning(remaining);
    updateDocumentTitle(remaining);
  }

  function updateTimerDisplay(remaining) {
    const text = document.getElementById('exam-timer-text');
    const bar = document.getElementById('exam-time-progress');
    const toolbar = document.getElementById('exam-toolbar');
    const timer = document.getElementById('exam-timer');
    if (text) text.textContent = formatClock(remaining / 1000);
    const percent = Math.max(0, Math.min(100, (remaining / DURATION) * 100));
    if (bar) bar.style.width = percent + '%';
    if (toolbar) {
      toolbar.classList.toggle('is-warning', remaining > 60000 && remaining <= 120000);
      toolbar.classList.toggle('is-critical', remaining <= 60000);
    }
    if (timer) {
      timer.setAttribute('aria-label', 'Thời gian còn lại ' + formatClock(remaining / 1000));
    }
  }

  function updateTimeWarning(remaining) {
    const seconds = remaining / 1000;
    if (seconds <= 30 && !ui.warned['30']) {
      ui.warned['30'] = true;
      ui.warned['60'] = true;
      ui.warned['120'] = true;
      showToast('Còn 30 giây. Hệ thống sẽ tự nộp khi hết giờ.');
    } else if (seconds <= 60 && !ui.warned['60']) {
      ui.warned['60'] = true;
      ui.warned['120'] = true;
      showToast('Còn 1 phút.');
    } else if (seconds <= 120 && !ui.warned['120']) {
      ui.warned['120'] = true;
      showToast('Còn 2 phút.');
    }
  }

  function updateDocumentTitle(remaining) {
    const second = Math.ceil(remaining / 1000);
    if (ui.lastTickSecond === second) return;
    ui.lastTickSecond = second;
    document.title = formatClock(second) + ' · Thi thử PM Study';
  }

  /* ============================================================
     Nộp / hủy bài
     ============================================================ */
  function openSubmitModal() {
    const session = store.active;
    if (!session) return;
    const answered = countAnswered(session);
    const total = session.qids.length;
    const missing = total - answered;
    const remaining = Math.max(0, session.endAt - Date.now());

    openModal(
      '<div class="eyebrow">Nộp bài</div>' +
      '<h2 id="modal-title">Nộp bài ngay?</h2>' +
      '<p>Đồng hồ vẫn tiếp tục chạy trong lúc bạn xem hộp thoại này. Sau khi nộp, bạn sẽ thấy lại toàn bộ câu hỏi và bài làm.</p>' +
      '<div class="modal-stats">' +
        '<div class="modal-stat"><strong>' + answered + '/' + total + '</strong><span>Câu đã trả lời</span></div>' +
        '<div class="modal-stat"><strong>' + formatClock(remaining / 1000) + '</strong><span>Thời gian còn lại</span></div>' +
      '</div>' +
      (missing
        ? '<p class="modal-warning">Còn ' + missing + ' câu chưa trả lời. Bạn vẫn có thể nộp bài.</p>'
        : '') +
      '<div class="modal-actions">' +
        '<button class="btn btn-ghost" type="button" data-action="close-modal">Tiếp tục làm</button>' +
        '<button class="btn btn-primary" type="button" data-action="confirm-submit">' + icon('check-circle') + 'Nộp bài</button>' +
      '</div>',
      '[data-action="close-modal"]'
    );
  }

  function openAbortModal() {
    const session = store.active;
    if (!session) return;
    const answered = countAnswered(session);
    openModal(
      '<div class="eyebrow">Hủy đề</div>' +
      '<h2 id="modal-title">Hủy đề này?</h2>' +
      '<p>Toàn bộ câu trả lời của lượt thi hiện tại sẽ bị xóa. Bạn có thể tạo một đề ngẫu nhiên khác sau đó.</p>' +
      '<div class="modal-stats">' +
        '<div class="modal-stat"><strong>' + answered + '/' + session.qids.length + '</strong><span>Câu đã trả lời</span></div>' +
        '<div class="modal-stat"><strong>' + escapeHtml(session.id) + '</strong><span>Mã đề</span></div>' +
      '</div>' +
      '<div class="modal-actions">' +
        '<button class="btn btn-ghost" type="button" data-action="close-modal">Ở lại làm tiếp</button>' +
        '<button class="btn btn-primary" type="button" data-action="confirm-abort">Hủy đề</button>' +
      '</div>',
      '[data-action="close-modal"]'
    );
  }

  function confirmAbort() {
    stopTimer();
    window.clearTimeout(ui.saveTimer);
    store.active = null;
    saveStore();
    closeModal(false);
    renderStart();
    showToast('Đã hủy đề. Bạn có thể tạo một đề mới.');
  }

  function finishExam(reason) {
    const session = store.active;
    if (!session) return;
    stopTimer();
    window.clearTimeout(ui.saveTimer);
    const now = Date.now();
    const expired = reason === 'timeout' || now >= session.endAt;
    const timeUsed = expired
      ? session.duration
      : Math.max(0, Math.min(session.duration, now - session.startedAt));

    const result = {
      id: session.id,
      startedAt: session.startedAt,
      submittedAt: now,
      duration: session.duration,
      timeUsedMs: timeUsed,
      reason: expired ? 'timeout' : 'manual',
      qids: session.qids.slice(),
      answers: Object.assign({}, session.answers)
    };

    store.last = result;
    store.active = null;
    saveStore();
    closeModal(false);
    renderResult(result);
    if (expired) {
      showToast('Hết giờ — bài làm đã được nộp tự động.');
    }
  }

  /* ============================================================
     Kết quả
     ============================================================ */
  function renderResult(result, isReview) {
    stopTimer();
    closeModal(false);
    ui.view = 'result';
    document.title = result.reason === 'timeout' ? 'Hết giờ — PM Study' : 'Kết quả thi thử — PM Study';

    const answered = countAnswered(result);
    const total = result.qids.length;
    const refCount = result.qids.filter(function (id) { return Boolean(referenceFor(id)); }).length;
    const expired = result.reason === 'timeout';

    const cards = result.qids.map(function (id, index) {
      const question = questionById(id);
      const module = moduleForQuestion(id);
      const prompt = question ? question.prompt : 'Nội dung câu hỏi đang cập nhật.';
      const value = answerText(result, id);
      const ref = referenceFor(id);
      const trimmed = value.trim();

      const refBlock = ref
        ? '<details class="ref-answer">' +
            '<summary>Gợi ý trả lời · ' + (ref.points.length ? ref.points.length + ' ý chính' : 'xem đáp án') + '</summary>' +
            '<div class="ref-body">' +
              (ref.summary ? '<p class="ref-summary">' + escapeHtml(ref.summary) + '</p>' : '') +
              (ref.points.length
                ? '<ul class="ref-points">' + ref.points.map(function (point) {
                    return '<li>' + escapeHtml(point) + '</li>';
                  }).join('') + '</ul>'
                : '') +
              (ref.hasFullAnswer
                ? '<a class="ref-more" href="index.html#/question/' + id + '" target="_blank" rel="noopener">Mở đáp án đầy đủ' + icon('arrow-up-right') + '</a>'
                : '') +
            '</div>' +
          '</details>'
        : '<div class="ref-missing">Câu này chưa có gợi ý đáp án trong thư viện. Bạn có thể đối chiếu với ghi chú môn học.</div>';

      return '<article class="result-card">' +
        '<div class="q-card-head">' +
          '<span class="q-number">' + id + '</span>' +
          '<div class="q-meta">' +
            '<span class="q-bank-label">Câu ' + id + ' trong ngân hàng</span>' +
            '<span class="q-module" style="' + moduleStyle(module) + '"><span class="dot"></span>' +
              (module ? 'Module ' + pad2(module.id) + ' · ' + escapeHtml(module.navTitle || module.title) : 'Quản lý dự án phần mềm') +
            '</span>' +
          '</div>' +
          '<span class="q-position">' + (index + 1) + ' / ' + total + '</span>' +
        '</div>' +
        '<h2 class="q-prompt">' + escapeHtml(prompt) + '</h2>' +
        '<div class="answer-block">' +
          '<span class="answer-block-label">Bài làm của bạn</span>' +
          (trimmed
            ? '<p>' + escapeHtml(value) + '</p>'
            : '<p class="empty-answer">Bạn chưa trả lời câu này.</p>') +
        '</div>' +
        refBlock +
      '</article>';
    }).join('');

    const intro = expired
      ? 'Đồng hồ đã về 0:00 và hệ thống tự động nộp bài. Bạn đã trả lời ' + answered + '/' + total + ' câu trong 7 phút.'
      : 'Bạn đã nộp bài sau ' + formatDuration(result.timeUsedMs) + ' và trả lời ' + answered + '/' + total + ' câu. Hãy xem lại các ý chính trước khi làm lượt mới.';

    els.root.innerHTML =
      '<div class="result-view">' +
        '<section class="result-hero">' +
          '<div class="result-icon' + (expired ? ' is-timeout' : '') + '">' + icon(expired ? 'clock' : 'check-circle') + '</div>' +
          '<div class="result-hero-content">' +
            '<div class="eyebrow">' + (expired ? 'Hết giờ' : 'Đã nộp bài') + (isReview ? ' · Xem lại' : '') + '</div>' +
            '<h1>' + (expired ? 'Hết 7 phút.' : 'Hoàn thành lượt thi.') + '</h1>' +
            '<p>' + escapeHtml(intro) + '</p>' +
            '<div class="result-stats">' +
              '<div class="result-stat"><strong>' + answered + '/' + total + '</strong><span>Câu đã trả lời</span></div>' +
              '<div class="result-stat"><strong>' + formatDuration(result.timeUsedMs) + '</strong><span>Thời gian đã dùng</span></div>' +
              '<div class="result-stat"><strong>' + refCount + '/' + total + '</strong><span>Câu có gợi ý</span></div>' +
            '</div>' +
            '<div class="result-actions">' +
              '<button class="btn btn-primary" type="button" data-action="new-exam">' + icon('shuffle') + 'Tạo đề khác</button>' +
              '<button class="btn btn-ghost" type="button" data-action="go-start">' + icon('arrow-left') + 'Về màn hình bắt đầu</button>' +
            '</div>' +
          '</div>' +
        '</section>' +
        '<div class="result-toolbar"><h2>Xem lại bài làm</h2><span>' + escapeHtml(result.id) + ' · ' + formatDate(result.submittedAt) + '</span></div>' +
        '<div class="result-list">' + cards + '</div>' +
      '</div>';

    window.scrollTo(0, 0);
    focusRoot();
  }

  /* ============================================================
     Sự kiện
     ============================================================ */
  document.addEventListener('click', function (event) {
    const target = event.target.closest('[data-action]');
    if (!target) return;
    const action = target.getAttribute('data-action');

    switch (action) {
      case 'toggle-theme':
        applyTheme(document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark', true);
        break;
      case 'select-size': {
        const size = Number(target.getAttribute('data-size'));
        if (SIZES.indexOf(size) === -1) return;
        store.size = size;
        saveStore();
        document.querySelectorAll('.size-option').forEach(function (button) {
          button.setAttribute('aria-pressed', Number(button.getAttribute('data-size')) === size ? 'true' : 'false');
        });
        break;
      }
      case 'start-exam':
        startExam(store.size);
        break;
      case 'view-last':
        if (store.last) renderResult(store.last, true);
        break;
      case 'new-exam':
        startExam(store.size);
        break;
      case 'go-start':
        renderStart();
        break;
      case 'open-submit':
        openSubmitModal();
        break;
      case 'confirm-submit':
        if (store.active) {
          closeModal(false);
          finishExam('manual');
        }
        break;
      case 'abort-exam':
        openAbortModal();
        break;
      case 'confirm-abort':
        confirmAbort();
        break;
      case 'close-modal':
        closeModal();
        break;
    }
  });

  document.addEventListener('input', function (event) {
    const field = event.target.closest('[data-answer]');
    if (!field || !store.active) return;
    const id = Number(field.getAttribute('data-answer'));
    store.active.answers[id] = field.value;
    updateAnswerUI(id, field.value);
    setSaveStatus('saving');
    window.clearTimeout(ui.saveTimer);
    ui.saveTimer = window.setTimeout(function () {
      if (!store.active) return;
      store.active.lastSavedAt = Date.now();
      saveStore();
      setSaveStatus('saved');
    }, 320);
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && els.modalOverlay && !els.modalOverlay.hidden) {
      event.preventDefault();
      closeModal();
      return;
    }

    if (event.key === 'Tab' && els.modalOverlay && !els.modalOverlay.hidden) {
      const focusables = Array.prototype.slice.call(
        els.modalCard.querySelectorAll('button, a[href], input, textarea, select, [tabindex]:not([tabindex="-1"])')
      ).filter(function (el) { return !el.disabled && el.offsetParent !== null; });
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    if ((event.metaKey || event.ctrlKey) && event.key === 'Enter' && store.active && els.modalOverlay.hidden) {
      event.preventDefault();
      openSubmitModal();
    }
  });

  document.addEventListener('visibilitychange', function () {
    if (!document.hidden && store.active) {
      tick();
    }
  });

  window.addEventListener('beforeunload', function (event) {
    if (!store.active) return;
    event.preventDefault();
    event.returnValue = '';
    return '';
  });

  /* ============================================================
     Khởi động
     ============================================================ */
  applyTheme(document.documentElement.dataset.theme || 'light', false);

  if (!BANK.length) {
    els.root.innerHTML = '<div class="exam-noscript"><h1>Chưa có ngân hàng câu hỏi</h1><p>Kiểm tra tệp <code>assets/exam-data.js</code>.</p></div>';
  } else if (store.active) {
    if (Date.now() >= store.active.endAt) {
      finishExam('timeout');
    } else {
      renderExam();
    }
  } else {
    renderStart();
  }
})();
