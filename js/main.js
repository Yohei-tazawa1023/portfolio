/* =========================================================
   Yohei | Portfolio — main.js
   ・ヘッダー（スクロールで影、スマホのメニュー開閉、表示中のセクションの強調）
   ・スクロールで現れる演出
   ・制作実績の詳細モーダル（<dialog>）と、画像の切り替え
   JS が動かなくても、文章・実績・リンクは読める（モーダルの中身は noscript の CSS でページ内に表示）。
   ========================================================= */
(() => {
  'use strict';

  // このスクリプトが動いたので、index.html の「読み込めなかったときの保険」を解除する
  if (window.__revealGuard) clearTimeout(window.__revealGuard);

  const root = document.documentElement;
  const header = document.getElementById('site-header');
  const nav = document.getElementById('site-nav');
  const navToggle = document.querySelector('.nav-toggle');

  /* ---------- ヘッダー: スクロールで下線と影をつける ---------- */
  if (header) {
    let ticking = false;
    const update = () => {
      header.classList.toggle('is-scrolled', window.scrollY > 8);
      ticking = false;
    };
    window.addEventListener('scroll', () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    }, { passive: true });
    update();
  }

  /* ---------- スマホ: メニューの開閉 ---------- */
  if (nav && navToggle) {
    const setOpen = (open) => {
      nav.classList.toggle('is-open', open);
      navToggle.setAttribute('aria-expanded', String(open));
    };

    navToggle.addEventListener('click', () => setOpen(navToggle.getAttribute('aria-expanded') !== 'true'));
    nav.addEventListener('click', (e) => { if (e.target.closest('a')) setOpen(false); });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navToggle.getAttribute('aria-expanded') === 'true') {
        setOpen(false);
        navToggle.focus();
      }
    });
    // 画面を広げたら、開いた状態をリセットする
    window.matchMedia('(min-width: 761px)').addEventListener('change', (e) => { if (e.matches) setOpen(false); });
  }

  /* ---------- 表示中のセクションをナビで強調 ---------- */
  const sectionLinks = nav ? [...nav.querySelectorAll('a[href^="#"]')] : [];
  if (sectionLinks.length && 'IntersectionObserver' in window) {
    const byId = new Map();
    sectionLinks.forEach((a) => {
      const section = document.getElementById(a.getAttribute('href').slice(1));
      if (section && !a.classList.contains('site-nav__cta')) byId.set(section, a);
    });

    const spy = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const link = byId.get(entry.target);
        if (!link) return;
        if (entry.isIntersecting) {
          sectionLinks.forEach((a) => a.removeAttribute('aria-current'));
          link.setAttribute('aria-current', 'true');
        } else if (link.getAttribute('aria-current') === 'true') {
          link.removeAttribute('aria-current');
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });

    byId.forEach((_, section) => spy.observe(section));
  }

  /* ---------- スクロールで現れる演出 ---------- */
  const revealTargets = document.querySelectorAll('.reveal');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (revealTargets.length) {
    if (reduceMotion || !('IntersectionObserver' in window)) {
      revealTargets.forEach((el) => el.classList.add('is-visible'));
    } else {
      const io = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

      revealTargets.forEach((el) => io.observe(el));
    }
  }

  /* ---------- 画像ギャラリー（モーダルの中）---------- */
  const setupGallery = (gallery) => {
    if (gallery.dataset.ready) return;
    gallery.dataset.ready = 'true';

    const figures = [...gallery.querySelectorAll('figure')];
    if (!figures.length) return;

    gallery.classList.add('is-js');
    let current = 0;

    const nav = document.createElement('div');
    nav.className = 'gallery__nav';
    const prev = document.createElement('button');
    prev.type = 'button';
    prev.className = 'gallery__btn';
    prev.setAttribute('aria-label', '前の画像');
    prev.textContent = '‹';
    const count = document.createElement('p');
    count.className = 'gallery__count';
    count.setAttribute('aria-live', 'polite');
    const next = document.createElement('button');
    next.type = 'button';
    next.className = 'gallery__btn';
    next.setAttribute('aria-label', '次の画像');
    next.textContent = '›';
    nav.append(prev, count, next);

    const thumbs = document.createElement('div');
    thumbs.className = 'gallery__thumbs';
    const thumbButtons = figures.map((figure, i) => {
      const img = figure.querySelector('img');
      const caption = figure.querySelector('figcaption');
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'gallery__thumb';
      button.setAttribute('aria-label', `${i + 1}枚目: ${caption ? caption.textContent : ''}`);
      const thumb = document.createElement('img');
      thumb.src = img.dataset.thumb || img.src;
      thumb.alt = '';
      thumb.loading = 'lazy';
      button.append(thumb);
      button.addEventListener('click', () => show(i));
      thumbs.append(button);
      return button;
    });

    function show(index) {
      current = Math.max(0, Math.min(figures.length - 1, index));
      figures.forEach((figure, i) => figure.classList.toggle('is-current', i === current));
      thumbButtons.forEach((button, i) => {
        if (i === current) button.setAttribute('aria-current', 'true');
        else button.removeAttribute('aria-current');
      });
      count.textContent = `${current + 1} / ${figures.length}`;
      // disabled にすると、押していたボタンからフォーカスが外れてしまうので、aria-disabled にする（端では何も起きない）
      prev.setAttribute('aria-disabled', String(current === 0));
      next.setAttribute('aria-disabled', String(current === figures.length - 1));
    }

    prev.addEventListener('click', () => show(current - 1));
    next.addEventListener('click', () => show(current + 1));
    gallery.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') { show(current - 1); e.preventDefault(); }
      if (e.key === 'ArrowRight') { show(current + 1); e.preventDefault(); }
    });

    // 画像が 1 枚だけのときは、ボタンやサムネイルは出さない
    if (figures.length > 1) gallery.append(nav, thumbs);
    show(0);
  };

  /* ---------- 制作実績の詳細モーダル ---------- */
  const openers = document.querySelectorAll('[data-modal-target]');
  const supportsDialog = typeof HTMLDialogElement === 'function' && typeof HTMLDialogElement.prototype.showModal === 'function';
  let lastOpener = null;

  // 閉じたあとの後始末（スクロール固定の解除、押したボタンへのフォーカス復帰）
  const afterClose = () => {
    root.classList.remove('modal-open');
    if (lastOpener) lastOpener.focus({ preventScroll: true });
  };

  const closeModal = (dialog) => {
    if (supportsDialog) {
      dialog.close();   // 'close' イベントで afterClose が呼ばれる
    } else {
      dialog.removeAttribute('open');
      afterClose();     // <dialog> 未対応のブラウザでは 'close' イベントが来ないので、ここで呼ぶ
    }
  };

  const openModal = (dialog, opener) => {
    lastOpener = opener;
    dialog.querySelectorAll('[data-gallery]').forEach(setupGallery);

    if (supportsDialog) {
      dialog.showModal();
    } else {
      dialog.setAttribute('open', '');   // <dialog> 未対応の古いブラウザ向けの簡易表示
      const closeButton = dialog.querySelector('[data-modal-close]');
      if (closeButton) closeButton.focus({ preventScroll: true });
    }
    root.classList.add('modal-open');

    const body = dialog.querySelector('.modal__inner');
    if (body) body.scrollTop = 0;
  };

  openers.forEach((button) => {
    const dialog = document.getElementById(button.dataset.modalTarget);
    if (!dialog) return;

    button.addEventListener('click', () => openModal(dialog, button));

    // 閉じたら、スクロールの固定を解除し、押したボタンにフォーカスを戻す（Esc で閉じたときもここに来る）
    dialog.addEventListener('close', afterClose);

    dialog.querySelectorAll('[data-modal-close]').forEach((closeButton) => {
      closeButton.addEventListener('click', () => closeModal(dialog));
    });

    // 背景（モーダルの外側）のクリックで閉じる。モーダル内で押して、外で離したときは閉じない
    let pressedOnBackdrop = false;
    dialog.addEventListener('pointerdown', (e) => { pressedOnBackdrop = e.target === dialog; });
    dialog.addEventListener('click', (e) => {
      if (e.target === dialog && pressedOnBackdrop) closeModal(dialog);
    });

  });

  // <dialog> 未対応のブラウザでは、Esc キーでも閉じられるようにする（フォーカスがモーダルの外にあっても効くように、document で受ける）
  if (!supportsDialog) {
    document.addEventListener('keydown', (e) => {
      if (e.key !== 'Escape') return;
      const opened = document.querySelector('dialog.modal[open]');
      if (opened) closeModal(opened);
    });
  }
})();
