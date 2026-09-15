/* 交互：滚动显现 + 复制邮箱 */
(() => {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 滚动显现
  const revealElements = document.querySelectorAll('.reveal');
  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    revealElements.forEach((el) => el.classList.add('is-visible'));
  } else {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    revealElements.forEach((el) => observer.observe(el));
  }

  // 复制邮箱
  document.querySelectorAll('[data-copy]').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const text = btn.getAttribute('data-copy');
      const label = btn.querySelector('.btn-label');
      const original = label ? label.textContent : '';
      try {
        await navigator.clipboard.writeText(text);
        if (label) label.textContent = window.I18N ? window.I18N.t('copied') : '已复制 ✓';
      } catch {
        // 剪贴板 API 不可用时降级为选中提示
        window.prompt('请手动复制邮箱：', text);
      }
      if (label) {
        setTimeout(() => {
          // 恢复时重新套用当前语言，避免中途切换语言后文案错配
          if (window.I18N) {
            window.I18N.apply();
          } else {
            label.textContent = original;
          }
        }, 2000);
      }
    });
  });
})();
