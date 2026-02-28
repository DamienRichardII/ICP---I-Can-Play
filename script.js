// ICP-Site-V2-2026 — shared interactions

// Mobile menu toggle (works if elements exist on the page)
const burger = document.querySelector('.burger');
const drawer = document.querySelector('.mobile-drawer');

function setDrawer(open){
  if(!drawer || !burger) return;
  drawer.setAttribute('aria-hidden', open ? 'false' : 'true');
  burger.setAttribute('aria-expanded', open ? 'true' : 'false');
}

burger?.addEventListener('click', () => {
  const isOpen = drawer?.getAttribute('aria-hidden') === 'false';
  setDrawer(!isOpen);
});

document.querySelectorAll('.mobile-links a').forEach(a => {
  a.addEventListener('click', () => setDrawer(false));
});

// Footer year
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = String(new Date().getFullYear());

// Try autoplay video if any
const heroVideo = document.getElementById('heroVideo');
if (heroVideo && typeof heroVideo.play === 'function') {
  heroVideo.play().catch(() => {});
}

// Premium reveal on scroll
const revealEls = document.querySelectorAll('.reveal');
if (revealEls.length) {
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible','is-in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });

    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('is-visible','is-in'));
  }
}

// =========================
// Featured cards video previews (À LA UNE)
// Some browsers (or power saving modes) can ignore the native "loop".
// We enforce looping and retry playback after a user gesture.
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

    // Hard loop fallback
    v.addEventListener('ended', () => {
      try {
        v.currentTime = 0;
        v.play().catch(() => {});
      } catch (_) {}
    });

    // Try play immediately
    v.play().catch(() => {});
  });

  // Retry play on first user interaction (iOS/Safari)
  const tryPlayAll = () => featureVideos.forEach(v => v.play().catch(() => {}));
  window.addEventListener('pointerdown', tryPlayAll, { once: true });
  window.addEventListener('keydown', tryPlayAll, { once: true });
}