(function () {
  'use strict';

  /* ============================================================
     Dữ liệu & hằng số
     ============================================================ */
  const DATA = window.PM_DATA || {};
  const qMap = DATA.questions && typeof DATA.questions === 'object' ? DATA.questions : {};
  const MODULES = (Array.isArray(DATA.modules) ? DATA.modules : []).map(function (m) {
    return Object.assign({}, m, { questionIds: Array.isArray(m.questionIds) ? m.questionIds.slice() : [] });
  });
  const ALL_QUESTION_IDS = MODULES.reduce(function (acc, m) { return acc.concat(m.questionIds); }, []);
  const TOTAL_QUESTIONS = ALL_QUESTION_IDS.length;
  const STORAGE_KEY = 'pmstudy.data.v1';
  const THEME_KEY = 'pmstudy.theme';
  const IS_MAC = /Mac|iPhone|iPad|iPod/.test(navigator.platform || '') || /Mac/.test(navigator.userAgent || '');

  /* ============================================================
     Bộ icon SVG (không phụ thuộc thư viện ngoài)
     ============================================================ */
  const ICONS = {
    home: '<path d="M3 11.5 12 3l9 8.5"/><path d="M5 10v10h14V10"/><path d="M9.5 20v-6h5v6"/>',
    compass: '<circle cx="12" cy="12" r="9"/><path d="m15.5 8.5-2.1 4.9-4.9 2.1 2.1-4.9 4.9-2.1Z"/>',
    'file-signature': '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/><path d="M14 2v6h6"/><path d="M7.5 17c1.5-2.5 3-2.5 4 0s2.5 2 4-1"/>',
    workflow: '<rect x="3" y="3" width="6" height="6" rx="1.5"/><rect x="15" y="15" width="6" height="6" rx="1.5"/><path d="M9 6h4.5A2.5 2.5 0 0 1 16 8.5V15"/><path d="m13 12 3 3 3-3"/>',
    calculator: '<rect x="5" y="2.5" width="14" height="19" rx="2.5"/><path d="M8.5 6.5h7"/><path d="M8.5 11h.01M12 11h.01M15.5 11h.01M8.5 14.5h.01M12 14.5h.01M15.5 14.5h.01M8.5 18h.01M12 18h.01M15.5 18h.01"/>',
    'shield-check': '<path d="M12 2.5 20 6v6c0 5-3.4 8.3-8 9.5-4.6-1.2-8-4.5-8-9.5V6Z"/><path d="m8.5 12 2.3 2.3 4.7-4.7"/>',
    'alert-triangle': '<path d="M10.3 3.7 2.4 17.2A2 2 0 0 0 4.1 20h15.8a2 2 0 0 0 1.7-2.8L13.7 3.7a2 2 0 0 0-3.4 0Z"/><path d="M12 9v4"/><path d="M12 17h.01"/>',
    layers: '<path d="m12 3 9 5-9 5-9-5 9-5Z"/><path d="m3 12 9 5 9-5"/><path d="m3 16 9 5 9-5"/>',
    flag: '<path d="M5 21V4"/><path d="M5 5c4-2 7 2 11 0v9c-4 2-7-2-11 0"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
    moon: '<path d="M20 15.5A8.5 8.5 0 0 1 8.5 4 8.5 8.5 0 1 0 20 15.5Z"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
    x: '<path d="m6 6 12 12M18 6 6 18"/>',
    menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
    'arrow-left': '<path d="M19 12H5"/><path d="m11 6-6 6 6 6"/>',
    'arrow-right': '<path d="M5 12h14"/><path d="m13 6 6 6-6 6"/>',
    'arrow-up-right': '<path d="M7 17 17 7"/><path d="M9 7h8v8"/>',
    'chevron-right': '<path d="m9 6 6 6-6 6"/>',
    'chevron-left': '<path d="m15 6-6 6 6 6"/>',
    check: '<path d="m5 12.5 4.2 4.2L19 7"/>',
    'check-circle': '<circle cx="12" cy="12" r="9"/><path d="m8 12.5 2.8 2.8L16.5 9"/>',
    'book-open': '<path d="M3 5.5A2.5 2.5 0 0 1 5.5 3H11v18H5.5A2.5 2.5 0 0 1 3 18.5Z"/><path d="M21 5.5A2.5 2.5 0 0 0 18.5 3H13v18h5.5a2.5 2.5 0 0 0 2.5-2.5Z"/>',
    sparkles: '<path d="m12 3 1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5Z"/><path d="m18.5 15 .8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8Z"/><path d="m5 15 .6 1.7 1.7.6-1.7.6L5 19.6l-.6-1.7-1.7-.6 1.7-.6Z"/>',
    'rotate-ccw': '<path d="M3 12a9 9 0 1 0 3-6.7"/><path d="M3 4v5h5"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5"/><path d="M12 8h.01"/>',
    'circle-dashed': '<path d="M10.5 3.2a9 9 0 0 1 3 0M17.5 4.8a9 9 0 0 1 2.2 2.2M20.8 10.5a9 9 0 0 1 0 3M19.2 17.5a9 9 0 0 1-2.2 2.2M13.5 20.8a9 9 0 0 1-3 0M6.5 19.2a9 9 0 0 1-2.2-2.2M3.2 13.5a9 9 0 0 1 0-3M4.8 6.5a9 9 0 0 1 2.2-2.2"/>',
    circle: '<circle cx="12" cy="12" r="9"/>',
    eye: '<path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z"/><circle cx="12" cy="12" r="2.5"/>',
    'eye-off': '<path d="m3 3 18 18"/><path d="M10.6 6.2A10.8 10.8 0 0 1 12 6c6.5 0 10 6 10 6a18 18 0 0 1-3.2 3.8"/><path d="M6.3 6.4C3.5 8.2 2 12 2 12s3.5 6 10 6a10 10 0 0 0 4.2-.9"/><path d="M9.9 9.9a3 3 0 0 0 4.2 4.2"/>',
    printer: '<path d="M6 9V3h12v6"/><rect x="3" y="9" width="18" height="8" rx="2"/><path d="M6 14h12v7H6Z"/>',
    keyboard: '<rect x="2.5" y="6" width="19" height="12" rx="2.5"/><path d="M6 10h.01M9.5 10h.01M13 10h.01M16.5 10h.01M6 13h.01M9.5 13h.01M13 13h.01M16.5 13h.01M7.5 16h9"/>',
    shuffle: '<path d="M3 7h3.5c5 0 5 10 10 10H21"/><path d="m18 14 3 3-3 3"/><path d="M3 17h3.5c1.8 0 3-1.3 4-3"/><path d="M14 9c1-1.2 2-2 3.5-2H21"/><path d="m18 4 3 3-3 3"/>',
    target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.3"/>',
    lightbulb: '<path d="M9 18h6"/><path d="M10 21h4"/><path d="M8.5 14.5A6 6 0 1 1 16 14.5c-.9.7-1.5 1.5-1.5 2.5h-5c0-1-.6-1.8-1.5-2.5Z"/>',
    note: '<path d="M4 4h16v12l-4 4H4Z"/><path d="M16 20v-4h4"/><path d="M8 9h8M8 13h5"/>',
    'arrow-down': '<path d="M12 5v14"/><path d="m6 13 6 6 6-6"/>'
  };

  function icon(name, className) {
    const body = ICONS[name] || ICONS.circle;
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"' +
      (className ? ' class="' + className + '"' : '') + '>' + body + '</svg>';
  }

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

  function escapeRegExp(value) {
    return String(value).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  function normalizeText(value) {
    return String(value == null ? '' : value)
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd')
      .replace(/Đ/g, 'D')
      .toLowerCase();
  }

  function stripMarkdown(source) {
    return String(source || '')
      .replace(/```[\s\S]*?```/g, ' ')
      .replace(/`([^`]*)`/g, '$1')
      .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
      .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
      .replace(/[#>*_|~]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function hexAlpha(hex, alpha) {
    let h = String(hex || '#888888').replace('#', '');
    if (h.length === 3) h = h.split('').map(function (c) { return c + c; }).join('');
    const num = parseInt(h, 16);
    if (Number.isNaN(num)) return 'rgba(136, 136, 136, ' + alpha + ')';
    return 'rgba(' + ((num >> 16) & 255) + ', ' + ((num >> 8) & 255) + ', ' + (num & 255) + ', ' + alpha + ')';
  }

  function moduleStyle(m) {
    return '--m:' + (m.color || '#6366f1') + ';--m-soft:' + hexAlpha(m.color || '#6366f1', 0.13);
  }

  function pad2(number) {
    return String(number).padStart(2, '0');
  }

  function truncate(value, length) {
    const text = String(value || '');
    return text.length > length ? text.slice(0, length - 1).trimEnd() + '…' : text;
  }

  function isTypingTarget(target) {
    if (!target) return false;
    const tag = target.tagName ? target.tagName.toLowerCase() : '';
    return tag === 'input' || tag === 'textarea' || tag === 'select' || target.isContentEditable;
  }

  function highlightText(text, query) {
    const safe = escapeHtml(text);
    const q = String(query || '').trim();
    if (!q) return safe;
    try {
      return safe.replace(new RegExp('(' + escapeRegExp(q) + ')', 'gi'), '<mark>$1</mark>');
    } catch (e) {
      return safe;
    }
  }

  /* ============================================================
     Trạng thái & lưu trữ cục bộ
     ============================================================ */
  const state = loadState();
  const ui = {
    route: { type: 'home' },
    review: null,
    search: { activeIndex: 0 },
    lastFocus: null,
    modalFocus: null,
    toastTimer: null
  };

  function loadState() {
    const base = { studied: {}, notes: {}, last: {} };
    try {
      const raw = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
      if (raw && typeof raw === 'object') {
        base.studied = raw.studied && typeof raw.studied === 'object' ? raw.studied : {};
        base.notes = raw.notes && typeof raw.notes === 'object' ? raw.notes : {};
        base.last = raw.last && typeof raw.last === 'object' ? raw.last : {};
      }
    } catch (e) {
      console.warn('PM Study: không đọc được dữ liệu đã lưu.', e);
    }
    return base;
  }

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.warn('PM Study: không lưu được dữ liệu.', e);
    }
  }

  const els = {
    sidebar: document.getElementById('sidebar'),
    sidebarNav: document.getElementById('sidebar-nav'),
    sidebarFooter: document.getElementById('sidebar-footer'),
    sidebarScrim: document.getElementById('sidebar-scrim'),
    topbarContext: document.getElementById('topbar-context'),
    topbarProgress: document.getElementById('topbar-progress'),
    themeBtn: document.getElementById('theme-btn'),
    viewRoot: document.getElementById('view-root'),
    searchOverlay: document.getElementById('search-overlay'),
    searchInput: document.getElementById('search-input'),
    searchResults: document.getElementById('search-results'),
    modalOverlay: document.getElementById('modal-overlay'),
    modalCard: document.getElementById('modal-card'),
    toast: document.getElementById('toast'),
    menuBtn: document.querySelector('.menu-btn')
  };

  /* ============================================================
     Truy vấn dữ liệu môn học
     ============================================================ */
  function isAvailable(id) {
    const q = qMap[id];
    return Boolean(q && typeof q.content === 'string' && q.content.trim());
  }

  function getQuestion(id) {
    return qMap[id] || { title: '', summary: '', tags: [], keyPoints: [], content: '' };
  }

  function questionTitle(id) {
    const q = qMap[id];
    return q && q.title ? q.title : 'Nội dung đang cập nhật';
  }

  function moduleById(id) {
    return MODULES.find(function (m) { return m.id === id; }) || null;
  }

  function moduleForQuestion(id) {
    return MODULES.find(function (m) { return m.questionIds.indexOf(id) !== -1; }) || null;
  }

  function availableInModule(m) {
    return m.questionIds.filter(isAvailable).length;
  }

  function moduleStats(m) {
    const available = m.questionIds.filter(isAvailable);
    const studied = available.filter(function (id) { return Boolean(state.studied[id]); }).length;
    const total = m.questionIds.length;
    return {
      total: total,
      available: available.length,
      studied: studied,
      missing: total - available.length,
      percent: available.length ? Math.round((studied / available.length) * 100) : 0
    };
  }

  function overallStats() {
    const studied = AVAILABLE_IDS.filter(function (id) { return Boolean(state.studied[id]); }).length;
    return {
      total: TOTAL_QUESTIONS,
      available: AVAILABLE_IDS.length,
      studied: studied,
      missing: TOTAL_QUESTIONS - AVAILABLE_IDS.length,
      percent: AVAILABLE_IDS.length ? Math.round((studied / AVAILABLE_IDS.length) * 100) : 0
    };
  }

  function statusInfo(id) {
    if (!isAvailable(id)) return { key: 'empty', label: 'Chưa có nội dung', icon: 'circle-dashed' };
    if (state.studied[id]) return { key: 'studied', label: 'Đã học', icon: 'check-circle' };
    if (qMap[id] && qMap[id].status === 'partial') return { key: 'partial', label: 'Một phần', icon: 'clock' };
    return { key: 'ready', label: 'Chưa học', icon: 'circle' };
  }

  function statusClass(info) {
    if (info.key === 'studied') return 'is-studied';
    if (info.key === 'partial') return 'is-partial';
    if (info.key === 'empty') return 'is-empty';
    return '';
  }

  function statusChip(id) {
    const info = statusInfo(id);
    return '<span class="status-chip ' + statusClass(info) + '" data-status-for="' + id + '">' +
      icon(info.icon) + '<span>' + info.label + '</span></span>';
  }

  /* ============================================================
     Markdown tối giản → HTML an toàn
     ============================================================ */
  function inlineMarkdown(raw) {
    let s = escapeHtml(raw);
    s = s.replace(/`([^`]+)`/g, '<code>$1</code>');
    s = s.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    s = s.replace(/(^|[^*])\*([^*\n]+)\*(?!\*)/g, '$1<em>$2</em>');
    s = s.replace(/\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
    return s;
  }

  function splitTableRow(line) {
    return line.trim()
      .replace(/^\|/, '')
      .replace(/\|$/, '')
      .split('|')
      .map(function (cell) { return cell.trim(); });
  }

  function isTableStart(lines, index) {
    if (!/^\s*\|/.test(lines[index] || '')) return false;
    const separator = lines[index + 1];
    if (!separator || separator.indexOf('|') === -1) return false;
    return splitTableRow(separator).every(function (cell) {
      return /^:?-{2,}:?$/.test(cell.replace(/\s/g, ''));
    });
  }

  function startsBlock(lines, index) {
    const line = lines[index] || '';
    return /^#{1,4}\s+/.test(line) ||
      /^---+$/.test(line.trim()) ||
      /^>\s?/.test(line) ||
      /^\s*[-*+]\s+/.test(line) ||
      /^\s*\d+\.\s+/.test(line) ||
      isTableStart(lines, index);
  }

  function renderMarkdown(source) {
    const lines = String(source || '').replace(/\r/g, '').split('\n');
    let html = '';
    let i = 0;

    while (i < lines.length) {
      const line = lines[i];

      if (!line.trim()) { i++; continue; }

      const heading = line.match(/^(#{1,4})\s+(.+)$/);
      if (heading) {
        const level = heading[1].length <= 2 ? 2 : Math.min(heading[1].length, 4);
        html += '<h' + level + '>' + inlineMarkdown(heading[2].trim()) + '</h' + level + '>';
        i++;
        continue;
      }

      if (/^---+$/.test(line.trim())) {
        html += '<hr>';
        i++;
        continue;
      }

      if (/^>\s?/.test(line)) {
        const quote = [];
        while (i < lines.length && /^>\s?/.test(lines[i])) {
          quote.push(lines[i].replace(/^>\s?/, ''));
          i++;
        }
        html += '<blockquote><p>' + inlineMarkdown(quote.join(' ')) + '</p></blockquote>';
        continue;
      }

      if (isTableStart(lines, i)) {
        const header = splitTableRow(lines[i]);
        const alignments = splitTableRow(lines[i + 1]).map(function (cell) {
          const c = cell.replace(/\s/g, '');
          const left = c.charAt(0) === ':';
          const right = c.charAt(c.length - 1) === ':';
          return left && right ? 'center' : right ? 'right' : left ? 'left' : '';
        });
        i += 2;
        const rows = [];
        while (i < lines.length && /^\s*\|/.test(lines[i])) {
          rows.push(splitTableRow(lines[i]));
          i++;
        }
        html += '<div class="table-wrap"><table><thead><tr>';
        header.forEach(function (cell, index) {
          const align = alignments[index] ? ' style="text-align:' + alignments[index] + '"' : '';
          html += '<th' + align + '>' + inlineMarkdown(cell) + '</th>';
        });
        html += '</tr></thead><tbody>';
        rows.forEach(function (row) {
          html += '<tr>';
          header.forEach(function (_, index) {
            const align = alignments[index] ? ' style="text-align:' + alignments[index] + '"' : '';
            html += '<td' + align + '>' + inlineMarkdown(row[index] || '') + '</td>';
          });
          html += '</tr>';
        });
        html += '</tbody></table></div>';
        continue;
      }

      if (/^\s*[-*+]\s+/.test(line)) {
        const items = [];
        while (i < lines.length && /^\s*[-*+]\s+/.test(lines[i])) {
          items.push(lines[i].replace(/^\s*[-*+]\s+/, ''));
          i++;
        }
        html += '<ul>' + items.map(function (item) { return '<li>' + inlineMarkdown(item) + '</li>'; }).join('') + '</ul>';
        continue;
      }

      if (/^\s*\d+\.\s+/.test(line)) {
        const items = [];
        while (i < lines.length && /^\s*\d+\.\s+/.test(lines[i])) {
          items.push(lines[i].replace(/^\s*\d+\.\s+/, ''));
          i++;
        }
        html += '<ol>' + items.map(function (item) { return '<li>' + inlineMarkdown(item) + '</li>'; }).join('') + '</ol>';
        continue;
      }

      const paragraph = [line];
      i++;
      while (i < lines.length && lines[i].trim() && !startsBlock(lines, i)) {
        paragraph.push(lines[i]);
        i++;
      }
      html += '<p>' + inlineMarkdown(paragraph.join(' ')) + '</p>';
    }

    return html;
  }

  /* ============================================================
     Chỉ mục tìm kiếm
     ============================================================ */
  const AVAILABLE_IDS = ALL_QUESTION_IDS.filter(isAvailable);
  const SEARCH_INDEX = AVAILABLE_IDS.map(function (id) {
    const q = getQuestion(id);
    const m = moduleForQuestion(id);
    return {
      id: id,
      module: m,
      title: q.title || '',
      summary: q.summary || '',
      titleNorm: normalizeText(q.title || ''),
      summaryNorm: normalizeText(q.summary || ''),
      keyNorm: normalizeText((q.keyPoints || []).join(' ')),
      contentNorm: normalizeText(stripMarkdown(q.content || ''))
    };
  });

  /* ============================================================
     Giao diện dùng chung
     ============================================================ */
  function syncBodyLock() {
    const anyOpen = els.sidebar.classList.contains('open') ||
      !els.searchOverlay.hidden ||
      !els.modalOverlay.hidden;
    document.body.classList.toggle('is-locked', anyOpen);
  }

  function showToast(message) {
    if (!els.toast) return;
    window.clearTimeout(ui.toastTimer);
    els.toast.textContent = message;
    els.toast.classList.add('show');
    ui.toastTimer = window.setTimeout(function () {
      els.toast.classList.remove('show');
    }, 2500);
  }

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

  function setDocumentTitle() {
    const route = ui.route;
    if (route.type === 'module') {
      const m = moduleById(route.id);
      document.title = m ? 'Module ' + pad2(m.id) + ' — PM Study' : 'PM Study';
    } else if (route.type === 'question') {
      document.title = 'Câu ' + route.id + ' — PM Study';
    } else if (route.type === 'review') {
      document.title = 'Ôn tập nhanh — PM Study';
    } else {
      document.title = 'PM Study — Ôn thi Quản lý dự án phần mềm';
    }
  }

  function renderSidebar() {
    if (!els.sidebarNav) return;
    const route = ui.route;
    const activeModuleId = route.type === 'module' ? route.id :
      route.type === 'question' && moduleForQuestion(route.id) ? moduleForQuestion(route.id).id : null;
    const overall = overallStats();

    const moduleLinks = MODULES.map(function (m) {
      const stats = moduleStats(m);
      const active = activeModuleId === m.id ? ' active' : '';
      return '<a class="nav-item module' + active + '" href="#/module/' + m.id + '" style="' + moduleStyle(m) + '" aria-label="Module ' + m.id + ': ' + escapeHtml(m.title) + '">' +
        '<span class="nav-num">' + pad2(m.id) + '</span>' +
        '<span class="nav-module-text"><strong>' + escapeHtml(m.navTitle || m.title) + '</strong>' +
        '<span>' + (stats.available ? stats.available + ' câu có nội dung' : 'Đang cập nhật') + '</span></span>' +
        '<span class="nav-count">' + (stats.available ? stats.studied + '/' + stats.available : '—') + '</span>' +
        '</a>';
    }).join('');

    els.sidebarNav.innerHTML =
      '<div class="nav-group">' +
        '<div class="nav-label">Không gian học</div>' +
        '<a class="nav-item' + (route.type === 'home' ? ' active' : '') + '" href="#/">' +
          '<span class="nav-icon">' + icon('home') + '</span><span>Tổng quan</span></a>' +
        '<a class="nav-item' + (route.type === 'review' ? ' active' : '') + '" href="#/review">' +
          '<span class="nav-icon">' + icon('sparkles') + '</span><span>Ôn tập nhanh</span>' +
          '<span class="nav-count">' + overall.available + '</span></a>' +
        '<a class="nav-item" href="index2.html">' +
          '<span class="nav-icon">' + icon('clock') + '</span><span>Thi thử 7 phút</span>' +
          '<span class="nav-count">7′</span></a>' +
      '</div>' +
      '<div class="nav-group">' +
        '<div class="nav-label">Lộ trình 8 module</div>' +
        moduleLinks +
      '</div>';

    els.sidebarFooter.innerHTML =
      '<div class="study-progress">' +
        '<div class="study-progress-top"><span>Tiến độ</span><strong>' + overall.studied + '/' + overall.available + ' câu</strong></div>' +
        '<div class="progress-track" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="' + overall.percent + '">' +
          '<span style="width:' + overall.percent + '%"></span></div>' +
        '<div class="study-progress-foot"><small>' + overall.available + '/' + overall.total + ' câu có nội dung</small>' +
          '<button class="link-btn" type="button" data-action="reset-progress">Đặt lại</button></div>' +
      '</div>' +
      '<div class="sidebar-help"><button class="link-btn" type="button" data-action="open-howto">Hướng dẫn bổ sung câu hỏi</button></div>';
  }

  function renderTopbar() {
    if (!els.topbarContext || !els.topbarProgress) return;
    const route = ui.route;
    const overall = overallStats();
    let context = '';

    if (route.type === 'module') {
      const m = moduleById(route.id);
      if (m) {
        context = '<span class="context-dot" style="--m:' + m.color + '"></span>' +
          '<span class="context-text">Module ' + pad2(m.id) + ' · <strong>' + escapeHtml(m.navTitle || m.title) + '</strong></span>';
      }
    } else if (route.type === 'question') {
      const m = moduleForQuestion(route.id);
      if (m) {
        context = '<span class="context-dot" style="--m:' + m.color + '"></span>' +
          '<span class="context-text">Module ' + pad2(m.id) + ' · <strong>Câu ' + route.id + '</strong></span>';
      }
    } else if (route.type === 'review') {
      context = '<span class="context-dot"></span><span class="context-text">Ôn tập · <strong>Flashcard</strong></span>';
    } else {
      context = '<span class="context-dot"></span><span class="context-text">Thư viện · <strong>Quản lý dự án phần mềm</strong></span>';
    }

    els.topbarContext.innerHTML = context;
    els.topbarProgress.innerHTML = icon('check-circle') + '<span>' + overall.studied + '/' + overall.available + ' câu</span>';
    els.topbarProgress.setAttribute('aria-label', 'Đã học ' + overall.studied + ' trên ' + overall.available + ' câu có nội dung');
    setThemeIcon();
  }

  /* ============================================================
     Trang tổng quan
     ============================================================ */
  function renderHome() {
    const overall = overallStats();
    const lastId = state.last && isAvailable(state.last.questionId) ? state.last.questionId : null;
    const firstUnstudied = AVAILABLE_IDS.find(function (id) { return !state.studied[id]; });

    let primaryHref = '#/module/1';
    let primaryLabel = 'Xem lộ trình';
    let primaryIcon = 'arrow-right';
    if (lastId) {
      primaryHref = '#/question/' + lastId;
      primaryLabel = 'Tiếp tục: Câu ' + lastId;
      primaryIcon = 'book-open';
    } else if (firstUnstudied) {
      primaryHref = '#/question/' + firstUnstudied;
      primaryLabel = 'Bắt đầu: Câu ' + firstUnstudied;
      primaryIcon = 'book-open';
    } else if (overall.available) {
      primaryHref = '#/review';
      primaryLabel = 'Ôn tập lại';
      primaryIcon = 'sparkles';
    }

    const moduleCards = MODULES.map(function (m) {
      const stats = moduleStats(m);
      const pending = stats.available === 0;
      return '<a class="module-card' + (pending ? ' is-pending' : '') + '" href="#/module/' + m.id + '" style="' + moduleStyle(m) + '" aria-label="Module ' + m.id + ': ' + escapeHtml(m.title) + '">' +
        '<div class="module-card-top">' +
          '<span class="module-icon">' + icon(m.icon || 'circle') + '</span>' +
          '<span class="module-index">Module ' + pad2(m.id) + '</span>' +
        '</div>' +
        '<h3>' + escapeHtml(m.title) + '</h3>' +
        '<p>' + escapeHtml(m.description) + '</p>' +
        '<div class="module-card-meta">' +
          '<span>' + (pending ? 'Đang cập nhật nội dung' : stats.studied + '/' + stats.available + ' câu đã học') + '</span>' +
          '<strong>' + (pending ? '—' : stats.percent + '%') + '</strong>' +
        '</div>' +
        '<div class="progress-track" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="' + stats.percent + '">' +
          '<span style="width:' + stats.percent + '%"></span></div>' +
        '<div class="module-card-qs">Câu ' + m.questionIds.join(' · ') + '</div>' +
        '</a>';
    }).join('');

    const contentNote = overall.missing
      ? '<strong>' + overall.missing + ' câu đang chờ bổ sung.</strong> Bạn vẫn có thể học, đánh dấu và ghi chú các câu đã có nội dung.'
      : '<strong>Tất cả ' + overall.total + ' câu đã có nội dung.</strong> Bạn có thể ôn tập toàn bộ đề cương.';

    return '<div class="view-root">' +
      '<section class="hero">' +
        '<div class="hero-copy">' +
          '<div class="eyebrow">Ôn thi theo liên kết chủ đề</div>' +
          '<h1>Quản lý dự án phần mềm,<br><span class="serif">học theo cách não ghi nhớ.</span></h1>' +
          '<p><strong>' + overall.total + ' câu hỏi</strong> được nhóm thành <strong>8 module liên kết</strong> thay vì học rời rạc từng câu. Đọc – tự kiểm tra – ghi chú, tất cả trong một nơi.</p>' +
          '<div class="hero-actions">' +
            '<a class="btn btn-primary" href="' + primaryHref + '">' + icon(primaryIcon) + primaryLabel + '</a>' +
            '<a class="btn btn-ghost" href="#/review">' + icon('sparkles') + 'Ôn tập nhanh</a>' +
            '<a class="btn btn-soft" href="index2.html">' + icon('clock') + 'Thi thử 7 phút</a>' +
          '</div>' +
          '<div class="hero-meta">' +
            '<span>' + icon('layers') + '8 module liên kết</span>' +
            '<span>' + icon('book-open') + overall.available + ' câu đã có nội dung</span>' +
            '<span>' + icon('shield-check') + 'Tiến độ lưu trên thiết bị</span>' +
          '</div>' +
        '</div>' +
        '<aside class="progress-card" aria-label="Tiến độ học của bạn">' +
          '<div class="progress-card-head"><strong>Tiến độ của bạn</strong><span class="chip">' + overall.available + '/' + overall.total + ' có nội dung</span></div>' +
          '<div class="dial-row">' +
            '<div class="dial" style="--p:' + overall.percent + '">' +
              '<div class="dial-inner"><strong>' + overall.percent + '%</strong><span>hoàn thành</span></div>' +
            '</div>' +
            '<div class="dial-stats">' +
              '<div class="stat-line"><span>Đã học</span><strong>' + overall.studied + '/' + overall.available + ' câu</strong></div>' +
              '<div class="stat-line"><span>Còn lại</span><strong>' + (overall.available - overall.studied) + ' câu</strong></div>' +
              '<div class="stat-line"><span>Chưa có nội dung</span><strong class="accent">' + overall.missing + ' câu</strong></div>' +
            '</div>' +
          '</div>' +
          '<div class="content-note">' + icon('info') + '<span>' + contentNote + '</span></div>' +
        '</aside>' +
      '</section>' +

      '<section class="section">' +
        '<div class="section-head">' +
          '<div><span class="section-kicker">Lộ trình học</span><h2>Tám module, một mạch kiến thức</h2></div>' +
          '<p>Các câu hỏi cùng chủ đề được đặt cạnh nhau để bạn liên kết khái niệm, thay vì ghi nhớ máy móc.</p>' +
        '</div>' +
        '<div class="module-grid">' + moduleCards + '</div>' +
        '<div class="method-grid">' +
          '<div class="method"><span class="method-icon">' + icon('layers') + '</span><div><strong>Học theo cụm</strong><p>Gom câu hỏi theo 8 mạch kiến thức để não liên kết thay vì học rời rạc.</p></div></div>' +
          '<div class="method"><span class="method-icon">' + icon('target') + '</span><div><strong>Tự kiểm tra chủ động</strong><p>Lật flashcard, tự trả lời trước khi xem ý chính để ghi nhớ sâu hơn.</p></div></div>' +
          '<div class="method"><span class="method-icon">' + icon('check-circle') + '</span><div><strong>Theo dõi tiến độ</strong><p>Đánh dấu câu đã học và ghi chú; dữ liệu lưu cục bộ, không cần tài khoản.</p></div></div>' +
        '</div>' +
        '<footer class="home-footer">' +
          '<span>Nội dung biên soạn từ ghi chú cá nhân · cập nhật ' + overall.available + '/' + overall.total + ' câu</span>' +
          '<button class="link-btn" type="button" data-action="open-howto">Cách bổ sung câu hỏi</button>' +
        '</footer>' +
      '</section>' +
    '</div>';
  }

  /* ============================================================
     Trang module
     ============================================================ */
  function renderModule(id) {
    const m = moduleById(id);
    if (!m) return renderHome();
    const stats = moduleStats(m);
    const firstAvailable = m.questionIds.find(isAvailable);

    const rows = m.questionIds.map(function (qid) {
      const q = getQuestion(qid);
      const available = isAvailable(qid);
      const info = statusInfo(qid);
      const tags = available && Array.isArray(q.tags)
        ? '<span class="q-tags">' + q.tags.slice(0, 2).map(function (tag) { return '<span class="tag">' + escapeHtml(tag) + '</span>'; }).join('') + '</span>'
        : '<span class="q-tags"></span>';
      return '<a class="q-row' + (available ? '' : ' is-empty') + '" href="#/question/' + qid + '" aria-label="Câu ' + qid + ': ' + escapeHtml(available ? q.title : 'Nội dung đang cập nhật') + '">' +
        '<span class="q-num">' + pad2(qid) + '</span>' +
        '<span class="q-main">' +
          '<span class="q-title">' + (available ? escapeHtml(q.title) : 'Nội dung đang được bổ sung') + '</span>' +
          '<span class="q-sub">' + (available ? escapeHtml(q.summary || '') : 'Câu hỏi đã có trong lộ trình, nội dung sẽ cập nhật sau.') + '</span>' +
        '</span>' +
        tags +
        statusChip(qid) +
        '<span class="q-chevron">' + icon('chevron-right') + '</span>' +
      '</a>';
    }).join('');

    const pendingBanner = stats.available === 0
      ? '<div class="pending-banner">' + icon('info') + '<div><strong>Module đang chờ nội dung</strong>Bạn có thể bổ sung các câu hỏi của module này trong tệp <code>assets/data.js</code> rồi tải lại trang.</div></div>'
      : '';

    const heroAction = firstAvailable
      ? '<a class="btn btn-primary" href="#/question/' + firstAvailable + '">' + icon('book-open') + (stats.studied ? 'Học tiếp module' : 'Bắt đầu module') + '</a>'
      : '';

    return '<div class="view-root">' +
      '<a class="back-link" href="#/">' + icon('arrow-left') + 'Tổng quan</a>' +
      '<section class="module-hero" data-index="' + pad2(m.id) + '" style="' + moduleStyle(m) + '">' +
        '<div class="module-hero-top">' +
          '<span class="module-icon">' + icon(m.icon || 'circle') + '</span>' +
          '<span class="module-badge">Module ' + pad2(m.id) + '</span>' +
        '</div>' +
        '<h1>' + escapeHtml(m.title) + '</h1>' +
        '<p>' + escapeHtml(m.description) + '</p>' +
        '<div class="module-hero-bottom">' +
          '<div class="module-stats">' +
            '<div class="module-stat"><strong>' + stats.total + '</strong><span>Câu hỏi</span></div>' +
            '<div class="module-stat"><strong>' + stats.available + '</strong><span>Có nội dung</span></div>' +
            '<div class="module-stat"><strong>' + stats.studied + '</strong><span>Đã học</span></div>' +
          '</div>' +
          '<div class="module-hero-progress">' +
            '<div class="module-hero-progress-label"><span>Tiến độ module</span><strong>' + stats.percent + '%</strong></div>' +
            '<div class="progress-track" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="' + stats.percent + '"><span style="width:' + stats.percent + '%"></span></div>' +
          '</div>' +
          (heroAction ? '<div class="module-hero-action">' + heroAction + '</div>' : '') +
        '</div>' +
      '</section>' +
      '<div class="question-list-head">' +
        '<div><h2>Danh sách câu hỏi</h2><p>Chọn một câu để đọc nội dung, ghi chú và đánh dấu tiến độ.</p></div>' +
        '<span class="chip">' + stats.available + '/' + stats.total + ' câu có nội dung</span>' +
      '</div>' +
      '<div class="q-list">' + rows + '</div>' +
      pendingBanner +
    '</div>';
  }

  /* ============================================================
     Trang câu hỏi
     ============================================================ */
  function buildQuestionAside(m, currentId) {
    const stats = moduleStats(m);
    const items = m.questionIds.map(function (qid) {
      const available = isAvailable(qid);
      const active = qid === currentId ? ' active' : '';
      const empty = available ? '' : ' is-empty';
      const title = available ? qMap[qid].title : 'Nội dung đang cập nhật';
      return '<a class="aside-q' + active + empty + '" href="#/question/' + qid + '">' +
        '<span class="aside-q-num">' + pad2(qid) + '</span>' +
        '<span class="aside-q-title">' + escapeHtml(title) + '</span>' +
      '</a>';
    }).join('');

    return '<aside class="q-aside">' +
      '<div class="aside-card">' +
        '<div class="aside-head"><span>Trong module</span><strong>' + stats.studied + '/' + stats.available + '</strong></div>' +
        '<div class="aside-list">' + items + '</div>' +
      '</div>' +
      '<div class="aside-card aside-tip">' +
        '<div class="aside-tip-head">' + icon('lightbulb') + 'Mẹo học</div>' +
        '<p>Nhìn tiêu đề và tự trả lời trong 30 giây, sau đó mới mở nội dung. Dùng <kbd>M</kbd> để đánh dấu đã học.</p>' +
      '</div>' +
    '</aside>';
  }

  function buildPager(m, id) {
    const index = m.questionIds.indexOf(id);
    const prevId = index > 0 ? m.questionIds[index - 1] : null;
    const nextId = index !== -1 && index < m.questionIds.length - 1 ? m.questionIds[index + 1] : null;

    function pagerLink(qid, direction) {
      const next = direction === 'next';
      const title = truncate(questionTitle(qid), 58);
      return '<a class="pager-link' + (next ? ' next' : '') + '" href="#/question/' + qid + '">' +
        '<span>' + (next ? 'Câu sau' + icon('arrow-right') : icon('arrow-left') + 'Câu trước') + '</span>' +
        '<strong>Câu ' + qid + '. ' + escapeHtml(title) + '</strong>' +
      '</a>';
    }

    return '<div class="q-pager">' +
      (prevId ? pagerLink(prevId, 'prev') : '<span></span>') +
      (nextId ? pagerLink(nextId, 'next') : '<span></span>') +
    '</div>';
  }

  function noteCard(id) {
    const note = state.notes[id] || '';
    return '<div class="note-card">' +
      '<div class="note-head">' +
        '<div><strong>Ghi chú cá nhân</strong><p>Viết lại bằng lời của bạn để nhớ lâu hơn. Chỉ lưu trên thiết bị này.</p></div>' +
        '<span class="note-status" id="note-status-' + id + '" aria-live="polite"></span>' +
      '</div>' +
      '<textarea data-note-input="' + id + '" rows="4" placeholder="Ví dụ: 3 điểm khác nhau giữa hợp đồng phí cộng thêm và giá cố định…" aria-label="Ghi chú cho câu ' + id + '">' + escapeHtml(note) + '</textarea>' +
      '<div class="note-foot"><small>Tự động lưu khi bạn gõ</small><button class="link-btn" type="button" data-action="clear-note" data-qid="' + id + '">Xoá ghi chú</button></div>' +
    '</div>';
  }

  function renderQuestion(id) {
    const m = moduleForQuestion(id);
    if (!m) return renderHome();
    const q = getQuestion(id);
    const available = isAvailable(id);
    const studied = Boolean(state.studied[id]);

    let article = '';

    if (available) {
      const tags = Array.isArray(q.tags) && q.tags.length
        ? q.tags.map(function (tag) { return '<span class="tag">' + escapeHtml(tag) + '</span>'; }).join('')
        : '';
      const partialNotice = q.status === 'partial'
        ? '<div class="notice notice--warn">' + icon('alert-triangle') +
            '<div><strong>Nội dung đang được bổ sung.</strong> Câu hỏi này hiện có một phần ghi chú. Phần còn lại sẽ được cập nhật để đủ ý ôn thi.</div></div>'
        : '';

      article = '<article class="question-article" style="' + moduleStyle(m) + '">' +
        '<div class="question-kicker"><span class="dot"></span>Câu ' + pad2(id) +
          ' · <a href="#/module/' + m.id + '">' + escapeHtml(m.navTitle || m.title) + '</a></div>' +
        '<h1>' + escapeHtml(q.title) + '</h1>' +
        '<div class="question-meta">' +
          '<span class="chip">' + icon('book-open') + 'Module ' + pad2(m.id) + '</span>' +
          tags + statusChip(id) +
        '</div>' +
        '<div class="question-actions">' +
          '<button class="btn btn-sm ' + (studied ? 'is-studied' : 'btn-primary') + '" type="button" data-action="toggle-studied" data-qid="' + id + '">' +
            icon(studied ? 'check-circle' : 'check') + '<span>' + (studied ? 'Đã đánh dấu học' : 'Đánh dấu đã học') + '</span>' +
          '</button>' +
          '<button class="btn btn-sm btn-ghost" type="button" data-action="self-test">' + icon('eye-off') + '<span>Tự kiểm tra</span></button>' +
          '<button class="btn btn-sm btn-ghost" type="button" data-action="print-question">' + icon('printer') + '<span>In</span></button>' +
        '</div>' +
        partialNotice +
        '<div class="recall-panel" id="recall-panel" hidden>' +
          '<div class="recall-icon">' + icon('eye-off') + '</div>' +
          '<h2>Tự trả lời trước khi mở nội dung</h2>' +
          '<p>Hãy nói hoặc viết ra những ý bạn nhớ về câu hỏi này. Khi đã sẵn sàng, mở nội dung để đối chiếu.</p>' +
          '<button class="btn btn-primary" type="button" data-action="reveal-content">' + icon('eye') + 'Hiện nội dung</button>' +
        '</div>' +
        '<div class="prose" id="question-prose">' + renderMarkdown(q.content) + '</div>' +
        noteCard(id) +
        '<div class="question-toolbar-hint">' +
          '<span><kbd>←</kbd><kbd>→</kbd> chuyển câu</span>' +
          '<span><kbd>M</kbd> đánh dấu đã học</span>' +
          '<span>' + icon('keyboard') + 'Phím tắt</span>' +
        '</div>' +
        buildPager(m, id) +
      '</article>';
    } else {
      article = '<article class="question-article" style="' + moduleStyle(m) + '">' +
        '<div class="empty-question">' +
          '<div class="empty-icon">' + icon('circle-dashed') + '</div>' +
          '<div class="question-kicker"><span class="dot"></span>Câu ' + pad2(id) + ' · Module ' + pad2(m.id) + '</div>' +
          '<h1>Nội dung đang được bổ sung</h1>' +
          '<p>Câu hỏi này đã được đưa vào lộ trình của module “' + escapeHtml(m.navTitle || m.title) + '”. Nội dung chi tiết sẽ được cập nhật sau.</p>' +
          '<div class="empty-actions">' +
            '<a class="btn btn-primary" href="#/module/' + m.id + '">' + icon('arrow-left') + 'Về module</a>' +
            '<button class="btn btn-ghost" type="button" data-action="open-howto">' + icon('info') + 'Cách bổ sung</button>' +
          '</div>' +
          '<div class="empty-hint"><strong>Bạn tự bổ sung được:</strong> mở tệp <code>assets/data.js</code>, thêm câu ' + id + ' theo mẫu có sẵn rồi tải lại trang. Không cần cơ sở dữ liệu hay tài khoản.</div>' +
        '</div>' +
        buildPager(m, id) +
      '</article>';
    }

    return '<div class="view-root">' +
      '<a class="back-link" href="#/module/' + m.id + '">' + icon('arrow-left') + 'Module ' + pad2(m.id) + ' · ' + escapeHtml(m.navTitle || m.title) + '</a>' +
      '<div class="question-layout" style="' + moduleStyle(m) + '">' +
        article +
        buildQuestionAside(m, id) +
      '</div>' +
    '</div>';
  }

  /* ============================================================
     Ôn tập nhanh (flashcard)
     ============================================================ */
  function shuffled(list) {
    const copy = list.slice();
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = copy[i];
      copy[i] = copy[j];
      copy[j] = temp;
    }
    return copy;
  }

  function reviewPool(filter) {
    if (filter === 'all') return AVAILABLE_IDS.slice();
    const m = moduleById(Number(filter));
    return m ? m.questionIds.filter(isAvailable) : [];
  }

  function initReview(filter) {
    const chosen = filter === 'all' ? 'all' : Number(filter);
    const pool = reviewPool(chosen);
    ui.review = {
      filter: chosen,
      order: pool,
      index: 0,
      revealed: false,
      remembered: 0,
      missed: [],
      finished: pool.length === 0,
      retry: false
    };
  }

  function renderReviewPage() {
    const r = ui.review;
    if (!r) { initReview('all'); return renderReviewPage(); }

    const modulesWithContent = MODULES.filter(function (m) { return availableInModule(m) > 0; });
    const filterButtons = ['<button class="filter-chip' + (r.filter === 'all' && !r.retry ? ' active' : '') + '" type="button" data-action="review-filter" data-filter="all">Tất cả (' + AVAILABLE_IDS.length + ')</button>']
      .concat(modulesWithContent.map(function (m) {
        const count = availableInModule(m);
        const active = r.filter === m.id && !r.retry ? ' active' : '';
        return '<button class="filter-chip' + active + '" type="button" data-action="review-filter" data-filter="' + m.id + '">' + escapeHtml(m.navTitle || m.title) + ' (' + count + ')</button>';
      })).join('');

    const total = r.order.length;
    const currentNumber = total ? Math.min(r.index + 1, total) : 0;
    const progress = total ? Math.round((r.index / total) * 100) : 0;

    let body = '';

    if (!total) {
      body = '<div class="review-empty">' +
        '<div class="empty-icon">' + icon('sparkles') + '</div>' +
        '<h2>Chưa có thẻ để ôn</h2>' +
        '<p>Module này chưa có câu hỏi với nội dung. Hãy chọn module khác hoặc bổ sung nội dung trong tệp <code>assets/data.js</code>.</p>' +
        '<a class="btn btn-primary" href="#/">' + icon('arrow-left') + 'Về tổng quan</a>' +
      '</div>';
    } else if (r.finished) {
      body = '<div class="review-done">' +
        '<div class="review-done-icon">' + icon('check-circle') + '</div>' +
        '<h2>Hoàn thành lượt ôn!</h2>' +
        '<p>Bạn vừa đi qua ' + total + ' thẻ. Hãy xem lại những câu còn chưa chắc trước khi kết thúc phiên học.</p>' +
        '<div class="review-done-stats">' +
          '<div class="review-done-stat"><strong>' + r.remembered + '</strong><span>Đã nhớ</span></div>' +
          '<div class="review-done-stat"><strong>' + r.missed.length + '</strong><span>Cần ôn lại</span></div>' +
          '<div class="review-done-stat"><strong>' + total + '</strong><span>Tổng số thẻ</span></div>' +
        '</div>' +
        '<div class="review-done-actions">' +
          (r.missed.length ? '<button class="btn btn-primary" type="button" data-action="review-retry-missed">' + icon('rotate-ccw') + 'Ôn lại ' + r.missed.length + ' câu chưa nhớ</button>' : '') +
          '<button class="btn btn-ghost" type="button" data-action="review-restart">' + icon('shuffle') + 'Làm lại tất cả</button>' +
          '<a class="btn btn-ghost" href="#/">' + icon('home') + 'Tổng quan</a>' +
        '</div>' +
      '</div>';
    } else {
      const qid = r.order[r.index];
      const q = getQuestion(qid);
      const m = moduleForQuestion(qid);
      const keys = Array.isArray(q.keyPoints) && q.keyPoints.length
        ? q.keyPoints
        : [q.summary || 'Xem nội dung đầy đủ của câu hỏi để ôn lại.'];
      const answer = r.revealed
        ? '<div class="flashcard-answer">' +
            '<h3>Ý chính cần nhớ</h3>' +
            '<ul class="keypoint-list">' + keys.map(function (point) {
              return '<li><span class="keypoint-check">' + icon('check') + '</span><span>' + escapeHtml(point) + '</span></li>';
            }).join('') + '</ul>' +
          '</div>'
        : '';
      const actions = r.revealed
        ? '<div class="flashcard-actions">' +
            '<div class="group">' +
              '<button class="btn btn-sm btn-ghost" type="button" data-action="review-miss">' + icon('rotate-ccw') + 'Cần ôn lại</button>' +
              '<a class="btn btn-sm btn-ghost" href="#/question/' + qid + '">' + icon('book-open') + 'Nội dung đầy đủ</a>' +
            '</div>' +
            '<button class="btn btn-primary" type="button" data-action="review-known">' + icon('check') + 'Đã nhớ</button>' +
          '</div>'
        : '<div class="reveal-wrap"><button class="btn btn-primary" type="button" data-action="review-reveal">' + icon('eye') + 'Hiện đáp án</button></div>';

      body = '<div class="flashcard" style="' + moduleStyle(m || { color: '#6366f1' }) + '">' +
        '<div class="flashcard-top">' +
          '<span class="flashcard-module"><span class="dot"></span>Module ' + pad2(m ? m.id : 0) + ' · Câu ' + qid + '</span>' +
          '<span class="chip">' + (r.retry ? icon('rotate-ccw') + 'Ôn lại' : icon('book-open') + 'Flashcard') + '</span>' +
        '</div>' +
        '<h2>' + escapeHtml(q.title || 'Nội dung đang cập nhật') + '</h2>' +
        '<p class="flashcard-summary">' + escapeHtml(q.summary || '') + '</p>' +
        answer + actions +
      '</div>';
    }

    return '<div class="review-page">' +
      '<div class="review-head">' +
        '<div class="eyebrow">Chủ động ghi nhớ</div>' +
        '<h1>Ôn tập nhanh</h1>' +
        '<p>Nhìn câu hỏi, tự trả lời trong đầu rồi lật thẻ để đối chiếu. Đánh dấu “Đã nhớ” để cập nhật tiến độ học.</p>' +
      '</div>' +
      '<div class="review-filters" role="group" aria-label="Lọc câu hỏi theo module">' + filterButtons + '</div>' +
      (total ? '<div class="review-statusbar">' +
        '<span>Thẻ <strong>' + currentNumber + '</strong> / ' + total + ' · Đã nhớ <strong>' + r.remembered + '</strong>' + (r.retry ? ' · Phiên ôn lại' : '') + '</span>' +
        '<div class="review-statusbar-actions"><button class="link-btn" type="button" data-action="review-shuffle">Đảo thứ tự</button></div>' +
      '</div>' +
      '<div class="review-progress"><div class="progress-track" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="' + progress + '"><span style="width:' + progress + '%"></span></div></div>' : '') +
      body +
      (total && !r.finished ? '<p class="review-hint">Nhấn <kbd>Space</kbd> để lật thẻ · Dùng “Cần ôn lại” để gom các câu chưa chắc vào cuối phiên.</p>' : '') +
    '</div>';
  }

  /* ============================================================
     Điều hướng & render
     ============================================================ */
  function parseRoute() {
    const raw = decodeURIComponent((location.hash || '').replace(/^#/, '')) || '/';
    const parts = raw.split('/').filter(Boolean);
    if (parts[0] === 'module' && parts[1]) {
      return { type: 'module', id: Number(parts[1]) };
    }
    if (parts[0] === 'question' && parts[1]) {
      return { type: 'question', id: Number(parts[1]) };
    }
    if (parts[0] === 'review') return { type: 'review' };
    return { type: 'home' };
  }

  function renderView() {
    if (!els.viewRoot) return;
    const route = ui.route;
    let html = '';

    if (route.type === 'module') {
      html = renderModule(route.id);
    } else if (route.type === 'question') {
      html = renderQuestion(route.id);
    } else if (route.type === 'review') {
      html = renderReviewPage();
    } else {
      html = renderHome();
    }

    els.viewRoot.innerHTML = html;
    setDocumentTitle();
  }

  function renderRoute(options) {
    const opts = options || {};
    const previous = ui.route;
    let next = parseRoute();

    if (next.type === 'module' && !moduleById(next.id)) next = { type: 'home' };
    if (next.type === 'question' && !moduleForQuestion(next.id)) next = { type: 'home' };

    if (next.type === 'review' && previous.type !== 'review') {
      initReview('all');
    }

    ui.route = next;

    if (next.type === 'question' && isAvailable(next.id)) {
      if (!state.last || state.last.questionId !== next.id) {
        state.last = { questionId: next.id, at: Date.now() };
        saveState();
      }
    }

    if (!els.searchOverlay.hidden) closeSearch({ restoreFocus: false });
    closeSidebar({ restoreFocus: false });

    renderSidebar();
    renderTopbar();
    renderView();

    if (!opts.preserveScroll) {
      window.scrollTo(0, 0);
    }
  }

  function openSidebar() {
    if (window.innerWidth > 980) return;
    els.sidebar.classList.add('open');
    els.sidebarScrim.hidden = false;
    if (els.menuBtn) els.menuBtn.setAttribute('aria-expanded', 'true');
    syncBodyLock();
  }

  function closeSidebar(options) {
    const opts = options || {};
    const wasOpen = els.sidebar.classList.contains('open');
    els.sidebar.classList.remove('open');
    if (els.sidebarScrim) els.sidebarScrim.hidden = true;
    if (els.menuBtn) els.menuBtn.setAttribute('aria-expanded', 'false');
    if (wasOpen) syncBodyLock();
    if (wasOpen && opts.restoreFocus && els.menuBtn) els.menuBtn.focus();
  }

  /* ============================================================
     Tìm kiếm
     ============================================================ */
  function searchQuestions(rawQuery) {
    const raw = String(rawQuery || '').trim();
    const terms = normalizeText(raw).split(/\s+/).filter(Boolean);
    if (!terms.length) return [];
    const phrase = normalizeText(raw);

    return SEARCH_INDEX.map(function (item) {
      let score = 0;
      let matchedAll = true;
      terms.forEach(function (term) {
        let termScore = 0;
        if (item.titleNorm.indexOf(term) !== -1) termScore = Math.max(termScore, 8);
        if (item.summaryNorm.indexOf(term) !== -1) termScore = Math.max(termScore, 5);
        if (item.keyNorm.indexOf(term) !== -1) termScore = Math.max(termScore, 3);
        if (item.contentNorm.indexOf(term) !== -1) termScore = Math.max(termScore, 1);
        if (!termScore) matchedAll = false;
        score += termScore;
      });
      if (!matchedAll) return null;
      if (item.titleNorm.indexOf(phrase) !== -1) score += 6;
      return { item: item, score: score };
    }).filter(Boolean)
      .sort(function (a, b) { return b.score - a.score || a.item.id - b.item.id; })
      .map(function (entry) { return entry.item; });
  }

  function searchSuggestions() {
    const suggestions = ['baseline', 'ước lượng', 'hợp đồng', 'chất lượng', 'mô hình', 'kiểm thử', 'yêu cầu'];
    return '<div class="search-suggestions">' + suggestions.map(function (word) {
      return '<button class="search-suggestion" type="button" data-search-suggestion="' + escapeHtml(word) + '">' + escapeHtml(word) + '</button>';
    }).join('') + '</div>';
  }

  function renderSearchResults() {
    const raw = els.searchInput.value.trim();
    ui.search.activeIndex = 0;

    if (!raw) {
      els.searchResults.innerHTML = '<div class="search-empty">' +
        '<strong>Tìm nhanh trong ' + AVAILABLE_IDS.length + ' câu hỏi</strong>' +
        'Gõ một từ khoá hoặc chọn gợi ý bên dưới.' +
        searchSuggestions() +
      '</div>';
      return;
    }

    const results = searchQuestions(raw);
    if (!results.length) {
      els.searchResults.innerHTML = '<div class="search-empty">' +
        '<strong>Không tìm thấy kết quả phù hợp</strong>' +
        'Thử một từ khoá ngắn hơn, hoặc chọn một chủ đề gợi ý.' +
        searchSuggestions() +
      '</div>';
      return;
    }

    const terms = normalizeText(raw).split(/\s+/).filter(Boolean);
    let html = '<div class="search-count">' + results.length + ' kết quả phù hợp</div>';
    results.forEach(function (item) {
      const metadataMatch = terms.some(function (term) {
        return item.titleNorm.indexOf(term) !== -1 || item.summaryNorm.indexOf(term) !== -1 || item.keyNorm.indexOf(term) !== -1;
      });
      html += '<a class="search-result" href="#/question/' + item.id + '" data-search-qid="' + item.id + '">' +
        '<span class="search-result-num">' + pad2(item.id) + '</span>' +
        '<span class="search-result-main">' +
          '<span class="search-result-title">' + highlightText(item.title, raw) + '</span>' +
          '<span class="search-result-meta">Module ' + pad2(item.module ? item.module.id : 0) + ' · ' +
            escapeHtml(item.module ? (item.module.navTitle || item.module.title) : '') +
            (metadataMatch ? '' : ' · khớp trong nội dung') +
          '</span>' +
        '</span>' +
      '</a>';
    });

    els.searchResults.innerHTML = html;
    updateSearchActive();
  }

  function updateSearchActive() {
    const items = Array.prototype.slice.call(els.searchResults.querySelectorAll('.search-result'));
    if (!items.length) return;
    const index = Math.max(0, Math.min(ui.search.activeIndex, items.length - 1));
    ui.search.activeIndex = index;
    items.forEach(function (item, i) { item.classList.toggle('active', i === index); });
    items[index].scrollIntoView({ block: 'nearest' });
  }

  function openSearch(initialQuery) {
    if (!els.searchOverlay) return;
    if (els.sidebar.classList.contains('open')) closeSidebar({ restoreFocus: false });
    ui.lastFocus = document.activeElement;
    els.searchOverlay.hidden = false;
    els.searchInput.value = initialQuery || '';
    renderSearchResults();
    syncBodyLock();
    window.requestAnimationFrame(function () {
      els.searchInput.focus();
      if (initialQuery) els.searchInput.select();
    });
  }

  function closeSearch(options) {
    const opts = options || {};
    if (!els.searchOverlay || els.searchOverlay.hidden) return;
    els.searchOverlay.hidden = true;
    els.searchInput.value = '';
    els.searchResults.innerHTML = '';
    syncBodyLock();
    if (opts.restoreFocus !== false && ui.lastFocus && document.contains(ui.lastFocus)) {
      ui.lastFocus.focus();
    }
  }

  function openSearchResult(id) {
    closeSearch({ restoreFocus: false });
    location.hash = '#/question/' + id;
  }

  /* ============================================================
     Modal
     ============================================================ */
  function openModal(html) {
    if (!els.modalOverlay) return;
    if (!els.searchOverlay.hidden) closeSearch({ restoreFocus: false });
    ui.modalFocus = document.activeElement;
    els.modalOverlay.hidden = false;
    els.modalCard.innerHTML = html;
    syncBodyLock();
    const closeButton = els.modalCard.querySelector('.modal-close, button, a[href]');
    if (closeButton) closeButton.focus();
  }

  function closeModal(options) {
    const opts = options || {};
    if (!els.modalOverlay || els.modalOverlay.hidden) return;
    els.modalOverlay.hidden = true;
    els.modalCard.innerHTML = '';
    syncBodyLock();
    if (opts.restoreFocus !== false && ui.modalFocus && document.contains(ui.modalFocus)) {
      ui.modalFocus.focus();
    }
  }

  function openHowTo() {
    if (els.sidebar.classList.contains('open')) closeSidebar({ restoreFocus: false });
    const template = [
      '17: {',
      '  title: "Tiêu đề câu hỏi",',
      '  summary: "Một câu tóm tắt ngắn.",',
      '  tags: ["Chủ đề 1", "Chủ đề 2"],',
      '  keyPoints: ["Ý chính 1", "Ý chính 2"],',
      '  content: `',
      '## Khái niệm',
      'Nội dung câu trả lời...',
      '',
      '- Ý thứ nhất',
      '- Ý thứ hai',
      '`',
      '},'
    ].join('\n');

    openModal(
      '<button class="icon-btn small modal-close" type="button" data-action="close-modal" aria-label="Đóng">' + icon('x') + '</button>' +
      '<h2 id="modal-title">Bổ sung câu hỏi</h2>' +
      '<p>Trang web đọc toàn bộ nội dung từ một tệp JavaScript duy nhất. Bạn có thể bổ sung các câu còn thiếu mà không cần cơ sở dữ liệu hay công cụ build.</p>' +
      '<h3>1. Mở tệp nội dung</h3>' +
      '<p>Mở <code>assets/data.js</code> trong thư mục dự án. Tìm object <code>questions</code>.</p>' +
      '<h3>2. Thêm câu hỏi theo mẫu</h3>' +
      '<pre>' + escapeHtml(template) + '</pre>' +
      '<p>Đổi số <code>17</code> thành số câu cần bổ sung. Với câu đang viết dở, thêm <code>status: "partial"</code> để hiển thị nhãn “Một phần”.</p>' +
      '<h3>3. Định dạng được hỗ trợ</h3>' +
      '<ul>' +
        '<li><code>## Tiêu đề</code>, <code>### Tiêu đề nhỏ</code></li>' +
        '<li><code>- ý</code> hoặc <code>1. ý</code> cho danh sách</li>' +
        '<li><code>**in đậm**</code>, <code>&gt; ghi chú</code>, bảng dạng <code>| a | b |</code></li>' +
      '</ul>' +
      '<p>Sau khi lưu tệp, tải lại trang. Tiến độ học và ghi chú vẫn được giữ trong trình duyệt.</p>' +
      '<div class="modal-actions"><button class="btn btn-primary" type="button" data-action="close-modal">Đã hiểu</button></div>'
    );
  }

  function openResetModal() {
    const overall = overallStats();
    openModal(
      '<button class="icon-btn small modal-close" type="button" data-action="close-modal" aria-label="Đóng">' + icon('x') + '</button>' +
      '<h2 id="modal-title">Đặt lại tiến độ học?</h2>' +
      '<p>Thao tác này bỏ đánh dấu toàn bộ ' + overall.studied + ' câu đã học. Ghi chú cá nhân của bạn vẫn được giữ nguyên.</p>' +
      '<div class="modal-note">Không thể hoàn tác. Bạn có thể đánh dấu lại từng câu bất cứ lúc nào.</div>' +
      '<div class="modal-actions">' +
        '<button class="btn btn-ghost" type="button" data-action="close-modal">Huỷ</button>' +
        '<button class="btn btn-primary" type="button" data-action="confirm-reset">' + icon('rotate-ccw') + 'Đặt lại tiến độ</button>' +
      '</div>'
    );
  }

  function confirmReset() {
    state.studied = {};
    saveState();
    ui.review = null;
    closeModal({ restoreFocus: false });
    const scrollY = window.scrollY;
    renderSidebar();
    renderTopbar();
    renderView();
    window.scrollTo(0, scrollY);
    showToast('Đã đặt lại tiến độ học. Ghi chú của bạn vẫn được giữ.');
  }

  /* ============================================================
     Hành động học tập
     ============================================================ */
  function refreshQuestionStatus(id) {
    const info = statusInfo(id);
    document.querySelectorAll('[data-status-for="' + id + '"]').forEach(function (el) {
      el.className = 'status-chip ' + statusClass(info);
      el.innerHTML = icon(info.icon) + '<span>' + info.label + '</span>';
    });

    const button = document.querySelector('[data-action="toggle-studied"][data-qid="' + id + '"]');
    if (button) {
      const studied = Boolean(state.studied[id]);
      button.className = 'btn btn-sm ' + (studied ? 'is-studied' : 'btn-primary');
      button.innerHTML = icon(studied ? 'check-circle' : 'check') + '<span>' + (studied ? 'Đã đánh dấu học' : 'Đánh dấu đã học') + '</span>';
    }

    const asideCount = document.querySelector('.q-aside .aside-head strong');
    if (asideCount) {
      const m = moduleForQuestion(id);
      if (m) {
        const stats = moduleStats(m);
        asideCount.textContent = stats.studied + '/' + stats.available;
      }
    }
  }

  function toggleStudied(id) {
    if (!isAvailable(id)) return;
    const wasStudied = Boolean(state.studied[id]);
    if (wasStudied) {
      delete state.studied[id];
    } else {
      state.studied[id] = Date.now();
    }
    saveState();
    renderSidebar();
    renderTopbar();
    refreshQuestionStatus(id);

    const overall = overallStats();
    if (!wasStudied && overall.available > 0 && overall.studied === overall.available) {
      showToast('Tuyệt! Bạn đã đánh dấu học toàn bộ câu có nội dung.');
    } else if (wasStudied) {
      showToast('Đã bỏ đánh dấu Câu ' + id + '.');
    } else {
      showToast('Đã đánh dấu Câu ' + id + ' là đã học.');
    }
  }

  function toggleSelfTest() {
    const article = document.querySelector('.question-article');
    if (!article) return;
    const testing = article.classList.toggle('is-testing');
    const panel = document.getElementById('recall-panel');
    if (panel) panel.hidden = !testing;
    const button = document.querySelector('[data-action="self-test"]');
    if (button) {
      button.innerHTML = icon(testing ? 'eye' : 'eye-off') + '<span>' + (testing ? 'Hiện nội dung' : 'Tự kiểm tra') + '</span>';
    }
    if (testing) {
      const top = article.getBoundingClientRect().top + window.scrollY - 88;
      window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
    }
  }

  function printQuestion() {
    const article = document.querySelector('.question-article');
    if (article && article.classList.contains('is-testing')) {
      article.classList.remove('is-testing');
      const panel = document.getElementById('recall-panel');
      if (panel) panel.hidden = true;
    }
    window.print();
  }

  function clearNote(id) {
    if (state.notes[id] !== undefined) {
      delete state.notes[id];
      saveState();
    }
    const textarea = document.querySelector('[data-note-input="' + id + '"]');
    if (textarea) {
      textarea.value = '';
      textarea.focus();
    }
    const status = document.getElementById('note-status-' + id);
    if (status) status.textContent = 'Đã xoá';
    showToast('Đã xoá ghi chú của Câu ' + id + '.');
  }

  function advanceReview(known) {
    const r = ui.review;
    if (!r || r.finished || !r.order.length) return;
    const id = r.order[r.index];
    if (known) {
      if (!state.studied[id]) state.studied[id] = Date.now();
      saveState();
      r.remembered++;
    } else {
      r.missed.push(id);
    }
    r.index++;
    r.revealed = false;
    if (r.index >= r.order.length) {
      r.finished = true;
      showToast('Hoàn thành lượt ôn: ' + r.remembered + ' câu đã nhớ, ' + r.missed.length + ' câu cần ôn lại.');
    }
    renderSidebar();
    renderTopbar();
    renderView();
  }

  /* ============================================================
     Sự kiện
     ============================================================ */
  function handleAction(action, element) {
    switch (action) {
      case 'open-sidebar':
        openSidebar();
        break;
      case 'close-sidebar':
        closeSidebar({ restoreFocus: true });
        break;
      case 'toggle-theme':
        applyTheme(document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark', true);
        break;
      case 'open-search':
        openSearch('');
        break;
      case 'close-search':
        closeSearch();
        break;
      case 'open-howto':
        openHowTo();
        break;
      case 'reset-progress':
        openResetModal();
        break;
      case 'confirm-reset':
        confirmReset();
        break;
      case 'close-modal':
        closeModal();
        break;
      case 'toggle-studied':
        toggleStudied(Number(element.dataset.qid));
        break;
      case 'self-test':
      case 'reveal-content':
        toggleSelfTest();
        break;
      case 'print-question':
        printQuestion();
        break;
      case 'clear-note':
        clearNote(Number(element.dataset.qid));
        break;
      case 'review-filter':
        initReview(element.dataset.filter === 'all' ? 'all' : Number(element.dataset.filter));
        renderView();
        break;
      case 'review-reveal':
        if (ui.review && !ui.review.finished) {
          ui.review.revealed = true;
          renderView();
        }
        break;
      case 'review-known':
        advanceReview(true);
        break;
      case 'review-miss':
        advanceReview(false);
        break;
      case 'review-restart':
        if (ui.review) initReview(ui.review.filter);
        renderView();
        break;
      case 'review-shuffle':
        if (ui.review && !ui.review.finished) {
          const head = ui.review.order.slice(0, ui.review.index);
          const tail = shuffled(ui.review.order.slice(ui.review.index));
          ui.review.order = head.concat(tail);
          ui.review.revealed = false;
          renderView();
          showToast('Đã đảo thứ tự các thẻ còn lại.');
        }
        break;
      case 'review-retry-missed':
        if (ui.review && ui.review.missed.length) {
          ui.review = {
            filter: ui.review.filter,
            order: shuffled(ui.review.missed),
            index: 0,
            revealed: false,
            remembered: 0,
            missed: [],
            finished: false,
            retry: true
          };
          renderView();
        }
        break;
      default:
        break;
    }
  }

  function trapFocus(event, container) {
    if (!container) return;
    const focusables = Array.prototype.slice.call(container.querySelectorAll('a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'))
      .filter(function (el) { return el.offsetParent !== null; });
    if (!focusables.length) {
      event.preventDefault();
      return;
    }
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (!container.contains(document.activeElement)) {
      event.preventDefault();
      first.focus();
      return;
    }
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  /* ============================================================
     Gắn sự kiện & khởi động
     ============================================================ */
  function setupEvents() {
    document.addEventListener('click', function (event) {
      const sidebarLink = event.target.closest('#sidebar a[href]');
      if (sidebarLink && els.sidebar.classList.contains('open')) {
        closeSidebar({ restoreFocus: false });
      }

      const suggestion = event.target.closest('[data-search-suggestion]');
      if (suggestion) {
        els.searchInput.value = suggestion.getAttribute('data-search-suggestion') || '';
        renderSearchResults();
        els.searchInput.focus();
        return;
      }

      const searchResult = event.target.closest('[data-search-qid]');
      if (searchResult) {
        event.preventDefault();
        openSearchResult(Number(searchResult.getAttribute('data-search-qid')));
        return;
      }

      const actionElement = event.target.closest('[data-action]');
      if (!actionElement) return;
      handleAction(actionElement.getAttribute('data-action'), actionElement);
    });

    els.searchInput.addEventListener('input', renderSearchResults);

    els.searchInput.addEventListener('keydown', function (event) {
      const items = Array.prototype.slice.call(els.searchResults.querySelectorAll('.search-result'));
      if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
        if (!items.length) return;
        event.preventDefault();
        const direction = event.key === 'ArrowDown' ? 1 : -1;
        ui.search.activeIndex = (ui.search.activeIndex + direction + items.length) % items.length;
        updateSearchActive();
      } else if (event.key === 'Enter') {
        if (!items.length) return;
        event.preventDefault();
        const active = items[Math.max(0, Math.min(ui.search.activeIndex, items.length - 1))];
        if (active) openSearchResult(Number(active.getAttribute('data-search-qid')));
      }
    });

    els.searchResults.addEventListener('mouseover', function (event) {
      const item = event.target.closest('.search-result');
      if (!item) return;
      const items = Array.prototype.slice.call(els.searchResults.querySelectorAll('.search-result'));
      const index = items.indexOf(item);
      if (index !== -1 && index !== ui.search.activeIndex) {
        ui.search.activeIndex = index;
        updateSearchActive();
      }
    });

    document.addEventListener('input', function (event) {
      const textarea = event.target.closest('[data-note-input]');
      if (!textarea) return;
      const id = Number(textarea.getAttribute('data-note-input'));
      const value = textarea.value;
      if (value.trim()) {
        state.notes[id] = value;
      } else {
        delete state.notes[id];
      }
      saveState();
      const status = document.getElementById('note-status-' + id);
      if (status) status.textContent = 'Đã lưu';
    });

    document.addEventListener('keydown', function (event) {
      const commandK = (event.metaKey || event.ctrlKey) && String(event.key).toLowerCase() === 'k';
      if (commandK) {
        if (!els.modalOverlay.hidden) return;
        event.preventDefault();
        if (els.searchOverlay.hidden) {
          openSearch('');
        } else {
          closeSearch();
        }
        return;
      }

      if (!els.modalOverlay.hidden) {
        if (event.key === 'Escape') {
          event.preventDefault();
          closeModal();
          return;
        }
        if (event.key === 'Tab') trapFocus(event, els.modalCard);
        return;
      }

      if (!els.searchOverlay.hidden) {
        if (event.key === 'Escape') {
          event.preventDefault();
          closeSearch();
          return;
        }
        if (event.key === 'Tab') trapFocus(event, document.querySelector('.search-panel'));
        return;
      }

      if (els.sidebar.classList.contains('open') && event.key === 'Escape') {
        event.preventDefault();
        closeSidebar({ restoreFocus: true });
        return;
      }

      if (isTypingTarget(event.target)) return;
      if (event.metaKey || event.ctrlKey || event.altKey) return;

      if (ui.route.type === 'question') {
        const m = moduleForQuestion(ui.route.id);
        if (!m) return;
        const index = m.questionIds.indexOf(ui.route.id);
        if (event.key === 'ArrowLeft' && index > 0) {
          event.preventDefault();
          location.hash = '#/question/' + m.questionIds[index - 1];
          return;
        }
        if (event.key === 'ArrowRight' && index !== -1 && index < m.questionIds.length - 1) {
          event.preventDefault();
          location.hash = '#/question/' + m.questionIds[index + 1];
          return;
        }
        if ((event.key === 'm' || event.key === 'M') && isAvailable(ui.route.id)) {
          event.preventDefault();
          toggleStudied(ui.route.id);
        }
        return;
      }

      if (ui.route.type === 'review' && (event.code === 'Space' || event.key === ' ') &&
          ui.review && !ui.review.finished && !ui.review.revealed &&
          !event.target.closest('button, a, input, textarea')) {
        event.preventDefault();
        ui.review.revealed = true;
        renderView();
      }
    });

    window.addEventListener('hashchange', function () {
      renderRoute();
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth > 980 && els.sidebar.classList.contains('open')) {
        closeSidebar({ restoreFocus: false });
      }
    });

    if (window.matchMedia) {
      const media = window.matchMedia('(prefers-color-scheme: dark)');
      const onChange = function (event) {
        let saved = null;
        try { saved = localStorage.getItem(THEME_KEY); } catch (e) { /* bỏ qua */ }
        if (!saved) applyTheme(event.matches ? 'dark' : 'light', false);
      };
      if (media.addEventListener) media.addEventListener('change', onChange);
    }
  }

  function init() {
    document.querySelectorAll('[data-icon]').forEach(function (element) {
      element.innerHTML = icon(element.getAttribute('data-icon'));
      element.removeAttribute('data-icon');
    });

    document.querySelectorAll('[data-shortcut]').forEach(function (element) {
      element.textContent = IS_MAC ? '⌘K' : 'Ctrl K';
    });

    applyTheme(document.documentElement.dataset.theme || 'light', false);

    if (!MODULES.length || !TOTAL_QUESTIONS) {
      els.viewRoot.innerHTML = '<div class="review-empty" style="max-width:620px;margin:50px auto;">' +
        '<div class="empty-icon">' + icon('alert-triangle') + '</div>' +
        '<h2>Không tải được nội dung môn học</h2>' +
        '<p>Kiểm tra tệp <code>assets/data.js</code> và tải lại trang.</p>' +
      '</div>';
      return;
    }

    setupEvents();
    renderRoute();
  }

  init();
})();
