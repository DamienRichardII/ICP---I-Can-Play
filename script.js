// ICP-Site-V2-2026 — shared interactions (clean, no duplicates)

(() => {
  // =========================
  // Mobile menu toggle (unifié)
  // Compatible:
  // - nouveau: #burgerBtn + #mobilePanel
  // - ancien:  .burger + .mobile-drawer (+ .mobile-links)
  // =========================
  const burgerBtn =
    document.getElementById('burgerBtn') ||
    document.querySelector('.burger');

  const mobilePanel =
    document.getElementById('mobilePanel') ||
    document.querySelector('.mobile-drawer');

  function isOpen() {
    if (!mobilePanel) return false;
    if (mobilePanel.classList.contains('is-open')) return true;
    if (mobilePanel.getAttribute('aria-hidden') === 'false') return true;
    return mobilePanel.style.display === 'block';
  }

  function setOpen(open) {
    if (!burgerBtn || !mobilePanel) return;

    // Preferred: class toggle
    mobilePanel.classList.toggle('is-open', open);

    // Accessibility / legacy support
    mobilePanel.setAttribute('aria-hidden', open ? 'false' : 'true');
    burgerBtn.setAttribute('aria-expanded', String(open));

    // Fallback for layouts that rely on inline display style
    // (mainly the #mobilePanel model)
    if (mobilePanel.id === 'mobilePanel') {
      mobilePanel.style.display = open ? 'block' : 'none';
    }
  }

  burgerBtn?.addEventListener('click', () => setOpen(!isOpen()));

  // Close on link click (both systems)
  mobilePanel?.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => setOpen(false));
  });
  document.querySelectorAll('.mobile-links a').forEach(a => {
    a.addEventListener('click', () => setOpen(false));
  });

  // =========================
  // Footer year (supports #year and #footerYear)
  // =========================
  const y = String(new Date().getFullYear());
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = y;
  const footerYearEl = document.getElementById('footerYear');
  if (footerYearEl) footerYearEl.textContent = y;

  // =========================
  // Try autoplay video if any
  // =========================
  const heroVideo = document.getElementById('heroVideo');
  if (heroVideo && typeof heroVideo.play === 'function') {
    heroVideo.play().catch(() => {});
  }

  // =========================
  // Premium reveal on scroll
  // =========================
  const revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length) {
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-visible', 'is-in');
            io.unobserve(e.target);
          }
        });
      }, { threshold: 0.12 });

      revealEls.forEach(el => io.observe(el));
    } else {
      revealEls.forEach(el => el.classList.add('is-visible', 'is-in'));
    }
  }

  // =========================
  // Featured cards video previews (À LA UNE)
  // Force loop + retry after user gesture (iOS/Safari)
  // =========================
  const featureVideos = Array.from(document.querySelectorAll('.feature-video'));
  if (featureVideos.length) {
    featureVideos.forEach((v) => {
      try {
        v.muted = true;
        v.loop = true;
        v.playsInline = true;
        v.setAttribute('muted', '');
        v.setAttribute('loop', '');
        v.setAttribute('playsinline', '');
      } catch (_) {}

      v.addEventListener('ended', () => {
        try {
          v.currentTime = 0;
          v.play().catch(() => {});
        } catch (_) {}
      });

      v.play().catch(() => {});
    });

    const tryPlayAll = () => featureVideos.forEach(v => v.play().catch(() => {}));
    window.addEventListener('pointerdown', tryPlayAll, { once: true });
    window.addEventListener('keydown', tryPlayAll, { once: true });
  }
})();