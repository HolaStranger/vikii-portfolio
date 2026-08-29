/* ==========================================================================
   VIKII PORTFOLIO - MAIN INTERACTIVE SCRIPTS
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* --------------------------------------------------------------------------
     1. THEME TOGGLE (Dark / Light Mode)
     -------------------------------------------------------------------------- */
  (function initTheme() {
    const toggle = document.getElementById('t-toggle');
    if (!toggle) return;

    const storedTheme = localStorage.getItem('theme') || 'dark';

    if (storedTheme === 'light') {
      document.documentElement.setAttribute('data-theme', 'light');
      toggle.innerHTML = '&#x1F319;'; // Moon icon
    }

    toggle.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      if (currentTheme === 'light') {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('theme', 'dark');
        toggle.innerHTML = '&#x2600;'; // Sun icon
      } else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
        toggle.innerHTML = '&#x1F319;'; // Moon icon
      }
    });
  })();

  /* --------------------------------------------------------------------------
     2. STARFIELD ANIMATION CANVAS
     -------------------------------------------------------------------------- */
  (function initStarfield() {
    const c = document.getElementById('sf');
    if (!c) return;
    const ctx = c.getContext('2d');
    let W, H, stars = [];

    function resize() {
      W = c.width = window.innerWidth;
      H = c.height = window.innerHeight;
    }
    window.addEventListener('resize', resize);
    resize();

    for (let i = 0; i < 120; i++) {
      const isLight = document.documentElement.getAttribute('data-theme') === 'light';
      stars.push({
        x: Math.random() * W,
        y: Math.random() * H,
        r: Math.random() * .8 + .2,
        vx: (Math.random() - .5) * .1,
        vy: (Math.random() - .5) * .1,
        a: isLight ? Math.random() * .15 + .05 : Math.random() * .4 + .1,
        h: Math.random() > .7 ? 170 : 220
      });
    }

    (function frame() {
      ctx.clearRect(0, 0, W, H);
      stars.forEach(s => {
        s.x += s.vx; s.y += s.vy;
        if (s.x < 0) s.x = W; if (s.x > W) s.x = 0;
        if (s.y < 0) s.y = H; if (s.y > H) s.y = 0;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = 'hsla(' + s.h + ',80%,70%,' + s.a + ')';
        ctx.fill();
      });
      requestAnimationFrame(frame);
    })();
  })();

  /* --------------------------------------------------------------------------
     3. SCROLL REVEAL ANIMATIONS
     -------------------------------------------------------------------------- */
  (function initScrollReveal() {
    const els = document.querySelectorAll('.rev');
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('vis');
      });
    }, { threshold: 0.1 });

    els.forEach(el => obs.observe(el));
  })();

  /* --------------------------------------------------------------------------
     4. SKILLS TABS SWITCHER
     -------------------------------------------------------------------------- */
  (function initSkillsTabs() {
    document.querySelectorAll('.sktab').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.sktab').forEach(b => b.classList.remove('on'));
        document.querySelectorAll('.skpan').forEach(p => p.classList.remove('on'));
        btn.classList.add('on');
        const p = document.getElementById('p-' + btn.dataset.tab);
        if (p) p.classList.add('on');
      });
    });
  })();

  /* --------------------------------------------------------------------------
     5. PROJECT CATEGORY FILTER
     -------------------------------------------------------------------------- */
  (function initProjectFilter() {
    document.querySelectorAll('.fb').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.fb').forEach(b => b.classList.remove('on'));
        btn.classList.add('on');
        const f = btn.dataset.f;
        document.querySelectorAll('.pc').forEach(card => {
          card.style.display = (f === 'all' || card.dataset.c.includes(f)) ? 'flex' : 'none';
        });
      });
    });
  })();

  /* --------------------------------------------------------------------------
     6. COPY EMAIL BUTTON
     -------------------------------------------------------------------------- */
  (function initCopyEmail() {
    const cpbtn = document.getElementById('cpbtn');
    if (!cpbtn) return;

    cpbtn.addEventListener('click', function () {
      const self = this;
      navigator.clipboard.writeText('vikneswari4527773@gmail.com').then(() => {
        self.textContent = 'Copied!';
        self.style.color = 'var(--teal)';
        self.style.borderColor = 'var(--teal)';
        setTimeout(() => {
          self.textContent = 'Copy';
          self.style.color = '';
          self.style.borderColor = '';
        }, 2000);
      }).catch(() => {
        self.textContent = 'Done';
        setTimeout(() => { self.textContent = 'Copy'; }, 2000);
      });
    });
  })();

  /* --------------------------------------------------------------------------
     7. 3D CARD TILT EFFECT
     -------------------------------------------------------------------------- */
  (function init3DTilt() {
    document.querySelectorAll('.pc, .expcard').forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const r = card.getBoundingClientRect();
        const rx2 = ((e.clientY - r.top - r.height / 2) / r.height) * 8;
        const ry2 = -((e.clientX - r.left - r.width / 2) / r.width) * 8;
        card.style.transform = 'translateY(-4px) rotateX(' + rx2 + 'deg) rotateY(' + ry2 + 'deg)';
        card.style.transformStyle = 'preserve-3d';
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  })();

  /* --------------------------------------------------------------------------
     8. ACTIVE NAVIGATION LINK & BACK TO TOP BUTTON
     -------------------------------------------------------------------------- */
  (function initNavAndBTT() {
    const secs = document.querySelectorAll('section[id]');
    const links = document.querySelectorAll('.nlinks a');
    const btt = document.getElementById('btt');

    window.addEventListener('scroll', () => {
      let cur = '';
      secs.forEach(s => {
        if (window.scrollY >= s.offsetTop - 200) cur = s.id;
      });
      links.forEach(a => {
        a.getAttribute('href') === '#' + cur ? a.classList.add('active') : a.classList.remove('active');
      });
      if (btt) {
        if (window.scrollY > 500) btt.classList.add('vis');
        else btt.classList.remove('vis');
      }
    });

    if (btt) {
      btt.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  })();

  /* --------------------------------------------------------------------------
     9. CONTACT FORM SUBMISSION (Formspree Integration)
     -------------------------------------------------------------------------- */
  (function initContactForm() {
    const form = document.getElementById('contact-form');
    const btn = document.getElementById('sbtn');
    if (!form || !btn) return;

    form.addEventListener('submit', async function (e) {
      e.preventDefault();

      const originalText = btn.textContent;
      btn.disabled = true;
      btn.textContent = 'Sending...';
      btn.style.opacity = '0.7';

      const formData = new FormData(form);

      try {
        const response = await fetch('https://formspree.io/f/xgodywwq', {
          method: 'POST',
          body: formData,
          headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
          btn.textContent = 'Message Sent! ✓';
          btn.style.background = 'var(--amber)';
          btn.style.color = 'var(--ink)';
          btn.style.opacity = '1';
          form.reset();
        } else {
          throw new Error();
        }
      } catch (err) {
        btn.textContent = 'Error! Try again.';
        btn.style.background = '#ff5f56';
        btn.style.color = 'white';
      } finally {
        setTimeout(() => {
          btn.disabled = false;
          btn.textContent = originalText;
          btn.style.background = '';
          btn.style.color = '';
          btn.style.opacity = '';
        }, 4000);
      }
    });
  })();

  /* --------------------------------------------------------------------------
     10. TERMINAL TYPING ANIMATION
     -------------------------------------------------------------------------- */
  (function initTerminalTyping() {
    const tbody = document.querySelector('.tbody');
    if (!tbody) return;

    const lines = Array.from(tbody.querySelectorAll('.tl'));
    const originalLines = lines.map(l => l.innerHTML);
    tbody.innerHTML = '';

    async function typeLine(html, container) {
      const line = document.createElement('div');
      line.className = 'tl';
      container.appendChild(line);

      const temp = document.createElement('div');
      temp.innerHTML = html;

      const nodes = Array.from(temp.childNodes);
      for (const node of nodes) {
        if (node.nodeType === Node.TEXT_NODE) {
          const text = node.textContent;
          const span = document.createElement('span');
          line.appendChild(span);
          for (let char of text) {
            span.textContent += char;
            await new Promise(r => setTimeout(r, Math.random() * 15 + 5));
          }
        } else {
          const newNode = node.cloneNode(false);
          newNode.textContent = '';
          line.appendChild(newNode);
          const text = node.textContent;
          for (let char of text) {
            newNode.textContent += char;
            await new Promise(r => setTimeout(r, Math.random() * 15 + 5));
          }
        }
      }
    }

    async function startTyping() {
      for (let i = 0; i < originalLines.length; i++) {
        if (originalLines[i].includes('blk')) {
          const lastLine = document.createElement('div');
          lastLine.className = 'tl';
          lastLine.innerHTML = originalLines[i];
          tbody.appendChild(lastLine);
          continue;
        }
        await typeLine(originalLines[i], tbody);
        if (i < originalLines.length - 1 && !originalLines[i + 1].includes('blk')) {
          await new Promise(r => setTimeout(r, 150));
        }
      }
    }

    setTimeout(startTyping, 1200);
  })();

});
