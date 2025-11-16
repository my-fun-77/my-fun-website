// 簡易 Lightbox：點縮圖 → 顯示大圖；點背景或關閉鍵 → 關閉

(function () {
  function openLightbox(src, alt) {
    const overlay = document.createElement('div');
    overlay.className = 'lightbox-overlay';
    overlay.innerHTML = `
      <div class="lightbox-inner">
        <button class="lightbox-close" aria-label="關閉">×</button>
        <img src="${src}" alt="${alt || ''}">
      </div>
    `;

    overlay.addEventListener('click', function (e) {
      if (e.target === overlay || e.target.classList.contains('lightbox-close')) {
        document.body.removeChild(overlay);
      }
    });

    document.addEventListener('keydown', function escHandler(e) {
      if (e.key === 'Escape') {
        if (document.body.contains(overlay)) {
          document.body.removeChild(overlay);
        }
        document.removeEventListener('keydown', escHandler);
      }
    });

    document.body.appendChild(overlay);
  }

  document.addEventListener('click', function (e) {
    const link = e.target.closest('[data-lightbox-src]');
    if (!link) return;
    e.preventDefault();
    const src = link.getAttribute('data-lightbox-src');
    const alt = link.getAttribute('data-lightbox-alt') || '';
    openLightbox(src, alt);
  });
})();

