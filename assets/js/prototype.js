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

  // 旅途时间线：轨道进度随滚动填充
  const timeline = document.querySelector('.timeline');
  const railFill = document.querySelector('.timeline-rail-fill');
  if (timeline && railFill && !prefersReducedMotion) {
    const updateRail = () => {
      const rect = timeline.getBoundingClientRect();
      // 以粘性年份的停留高度（20vh）作为进度锚点
      const anchor = window.innerHeight * 0.2;
      const progress = Math.min(Math.max((anchor - rect.top) / rect.height, 0), 1);
      railFill.style.height = `${progress * 100}%`;
    };
    window.addEventListener('scroll', updateRail, { passive: true });
    window.addEventListener('resize', updateRail);
    updateRail();
  }

  // 页面切换动画：紫色长条分块横扫
  // 打开：全紫 → 最下方长块先从右向左退去，逐块向上 → 最上方完成后整体渐隐
  // 关闭：全背景色 → 最上方长块先从左向右填满，逐块向下 → 最下方完成后跳转
  const transitionEl = document.querySelector('.page-transition');
  if (transitionEl) {
    const STRIP_MS = 400;   // 单条长块横扫时长（与 CSS 一致）
    const STAGGER_MS = 120; // 相邻长块启动间隔
    const FADE_MS = 300;    // 尾声整体渐隐时长（与 CSS 一致）
    const BUFFER_MS = 50;   // 跳转前的缓冲
    const panels = transitionEl.querySelectorAll('.pt-panel');
    const count = panels.length;
    const totalMs = (count - 1) * STAGGER_MS + STRIP_MS;

    panels.forEach((panel, i) => {
      panel.style.setProperty('--d-open', `${(count - 1 - i) * STAGGER_MS}ms`);
      panel.style.setProperty('--d-close', `${i * STAGGER_MS}ms`);
    });

    if (prefersReducedMotion) {
      transitionEl.style.display = 'none';
    } else {
      // 打开页面动画
      transitionEl.style.setProperty('--d-fade', `${totalMs}ms`);
      requestAnimationFrame(() => {
        transitionEl.classList.add('is-open');
        transitionEl.classList.add('is-done');
      });
      setTimeout(() => {
        transitionEl.style.display = 'none';
      }, totalMs + FADE_MS + BUFFER_MS);

      // 关闭页面动画：拦截内部 .html 跳转
      document.querySelectorAll('a[href]').forEach((link) => {
        const href = link.getAttribute('href');
        if (!href || !/^[^#]*\.html/.test(href)) return;
        link.addEventListener('click', (e) => {
          const target = href.split('#')[0];
          const current = location.pathname.split('/').pop() || 'index.html';
          if (target === current) return; // 指向当前页时不播动画
          e.preventDefault();
          // 遮罩恢复可见（全背景色），渐隐延迟清零以便立即回显
          transitionEl.style.setProperty('--d-fade', '0ms');
          transitionEl.style.display = 'flex';
          void transitionEl.offsetWidth; // 强制重排，确保过渡生效
          transitionEl.classList.remove('is-open', 'is-done');
          transitionEl.classList.add('is-closing');
          setTimeout(() => {
            window.location.href = href;
          }, totalMs + BUFFER_MS);
        });
      });
    }

    // bfcache 恢复（浏览器前进/后退）时直接隐藏遮罩，避免停在覆盖状态
    window.addEventListener('pageshow', (e) => {
      if (e.persisted) {
        transitionEl.classList.remove('is-open', 'is-done', 'is-closing');
        transitionEl.style.display = 'none';
      }
    });
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
