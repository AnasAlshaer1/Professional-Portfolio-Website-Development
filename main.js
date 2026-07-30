import { content } from './content.js';

// `?noanim` renders the final state instantly — handy for screenshots and debugging.
const prefersReducedMotion =
  window.matchMedia('(prefers-reduced-motion: reduce)').matches || new URLSearchParams(location.search).has('noanim');
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

/* ============================================================
   Theme (dark default, remembered per visitor)
   ============================================================ */
const themeToggle = $('#themeToggle');
const storedTheme = localStorage.getItem('theme');
const systemLight = window.matchMedia('(prefers-color-scheme: light)').matches;

applyTheme(storedTheme || (systemLight ? 'light' : 'dark'));

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute('content', theme === 'light' ? '#f6f8fc' : '#05070d');
}

themeToggle?.addEventListener('click', () => {
  const next = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
  applyTheme(next);
  localStorage.setItem('theme', next);
});

/* ============================================================
   Header: condensed state + reading progress
   ============================================================ */
const header = $('#header');
const progressBar = $('#progressBar');
const toTop = $('#toTop');

function onScroll() {
  const y = window.scrollY;
  header.classList.toggle('scrolled', y > 40);
  toTop.classList.toggle('show', y > 600);

  const max = document.documentElement.scrollHeight - window.innerHeight;
  progressBar.style.width = `${max > 0 ? (y / max) * 100 : 0}%`;

  updateTimelineFill();
}

let ticking = false;
window.addEventListener(
  'scroll',
  () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      onScroll();
      ticking = false;
    });
  },
  { passive: true }
);

toTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' }));

/* ============================================================
   Mobile navigation
   ============================================================ */
const mobileToggle = $('#mobileToggle');
const nav = $('#nav');
const navLinks = $$('.nav-link');

$$('.nav-list li').forEach((li, i) => li.style.setProperty('--i', i));

function closeNav() {
  nav.classList.remove('active');
  mobileToggle.classList.remove('active');
  mobileToggle.setAttribute('aria-expanded', 'false');
  document.body.classList.remove('nav-open');
}

mobileToggle?.addEventListener('click', () => {
  const open = nav.classList.toggle('active');
  mobileToggle.classList.toggle('active', open);
  mobileToggle.setAttribute('aria-expanded', String(open));
  document.body.classList.toggle('nav-open', open);
});

navLinks.forEach((link) => link.addEventListener('click', closeNav));
document.addEventListener('keydown', (e) => e.key === 'Escape' && closeNav());

/* ============================================================
   Scroll-spy
   ============================================================ */
const sections = $$('main section[id]');
const spy = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const id = entry.target.id;
      navLinks.forEach((l) => l.classList.toggle('is-active', l.getAttribute('href') === `#${id}`));
    });
  },
  { rootMargin: '-45% 0px -50% 0px' }
);
sections.forEach((s) => spy.observe(s));

/* ============================================================
   Reveal on scroll
   ============================================================ */
const revealEls = $$('.reveal');
revealEls.forEach((el) => el.style.setProperty('--d', el.dataset.delay || 0));

if (prefersReducedMotion) {
  document.documentElement.classList.add('no-anim');
  revealEls.forEach((el) => el.classList.add('visible'));
} else {
  const revealObserver = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
  );
  revealEls.forEach((el) => revealObserver.observe(el));
}

/* ============================================================
   Animated counters
   ============================================================ */
const counters = $$('[data-count]');
const counterObserver = new IntersectionObserver(
  (entries, obs) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      animateCount(entry.target);
      obs.unobserve(entry.target);
    });
  },
  { threshold: 0.6 }
);
counters.forEach((c) => counterObserver.observe(c));

function animateCount(el) {
  const target = Number(el.dataset.count);
  const suffix = el.dataset.suffix || '';
  if (prefersReducedMotion) {
    el.textContent = target + suffix;
    return;
  }
  const duration = 1400;
  const start = performance.now();
  const step = (now) => {
    const p = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.round(target * eased) + (p === 1 ? suffix : '');
    if (p < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

/* ============================================================
   Hero typewriter
   ============================================================ */
const phrases = [
  'scalable REST APIs.',
  'Spring Boot microservices.',
  'C# / .NET backends.',
  'well-modeled databases.',
  'systems that stay up.'
];
const typeEl = $('#typewriter');

if (typeEl) {
  if (prefersReducedMotion) {
    typeEl.textContent = phrases[0];
  } else {
    let phraseIndex = 0;
    let charIndex = 0;
    let deleting = false;

    const tick = () => {
      const current = phrases[phraseIndex];
      charIndex += deleting ? -1 : 1;
      typeEl.textContent = current.slice(0, charIndex);

      let delay = deleting ? 40 : 75;
      if (!deleting && charIndex === current.length) {
        delay = 1900;
        deleting = true;
      } else if (deleting && charIndex === 0) {
        deleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        delay = 320;
      }
      setTimeout(tick, delay);
    };
    setTimeout(tick, 700);
  }
}

/* ============================================================
   Hero canvas — connected-node network
   ============================================================ */
const canvas = $('#heroCanvas');

if (canvas && !prefersReducedMotion) {
  const ctx = canvas.getContext('2d');
  const hero = canvas.parentElement;
  let nodes = [];
  let width = 0;
  let height = 0;
  let dpr = 1;
  let rafId = null;
  let inView = true;

  const accent = () => getComputedStyle(document.documentElement).getPropertyValue('--accent').trim() || '#38bdf8';

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = hero.offsetWidth;
    height = hero.offsetHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const density = Math.min(Math.floor((width * height) / 18000), 90);
    nodes = Array.from({ length: density }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.28,
      vy: (Math.random() - 0.5) * 0.28,
      r: Math.random() * 1.6 + 0.6
    }));
  }

  const pointer = { x: -9999, y: -9999 };
  hero.addEventListener('pointermove', (e) => {
    const rect = hero.getBoundingClientRect();
    pointer.x = e.clientX - rect.left;
    pointer.y = e.clientY - rect.top;
  });
  hero.addEventListener('pointerleave', () => {
    pointer.x = pointer.y = -9999;
  });

  function draw() {
    ctx.clearRect(0, 0, width, height);
    const color = accent();

    nodes.forEach((n) => {
      n.x += n.vx;
      n.y += n.vy;
      if (n.x < 0 || n.x > width) n.vx *= -1;
      if (n.y < 0 || n.y > height) n.vy *= -1;

      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.globalAlpha = 0.5;
      ctx.fill();
    });

    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dist = Math.hypot(dx, dy);
        if (dist > 130) continue;
        ctx.beginPath();
        ctx.moveTo(nodes[i].x, nodes[i].y);
        ctx.lineTo(nodes[j].x, nodes[j].y);
        ctx.strokeStyle = color;
        ctx.globalAlpha = (1 - dist / 130) * 0.18;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // link nodes to the cursor for an interactive feel
      const pdx = nodes[i].x - pointer.x;
      const pdy = nodes[i].y - pointer.y;
      const pdist = Math.hypot(pdx, pdy);
      if (pdist < 170) {
        ctx.beginPath();
        ctx.moveTo(nodes[i].x, nodes[i].y);
        ctx.lineTo(pointer.x, pointer.y);
        ctx.strokeStyle = color;
        ctx.globalAlpha = (1 - pdist / 170) * 0.32;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }

    ctx.globalAlpha = 1;
    rafId = requestAnimationFrame(draw);
  }

  function start() {
    if (rafId === null) rafId = requestAnimationFrame(draw);
  }
  function stop() {
    if (rafId !== null) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
  }

  resize();
  start();

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(resize, 180);
  });

  // pause the loop when the hero is off-screen or the tab is hidden
  new IntersectionObserver(
    ([entry]) => {
      inView = entry.isIntersecting;
      inView && !document.hidden ? start() : stop();
    },
    { threshold: 0 }
  ).observe(hero);

  document.addEventListener('visibilitychange', () => {
    document.hidden || !inView ? stop() : start();
  });
}

/* ============================================================
   Magnetic buttons + card spotlight + tilt
   ============================================================ */
if (!prefersReducedMotion && window.matchMedia('(hover: hover)').matches) {
  $$('.magnetic').forEach((el) => {
    el.addEventListener('pointermove', (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      el.style.transform = `translate(${x * 0.18}px, ${y * 0.28}px)`;
    });
    el.addEventListener('pointerleave', () => {
      el.style.transform = '';
    });
  });

  $$('.skill-card, .project-card').forEach((card) => {
    card.addEventListener('pointermove', (e) => {
      const rect = card.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;
      card.style.setProperty('--mx', `${px * 100}%`);
      card.style.setProperty('--my', `${py * 100}%`);

      if (card.classList.contains('tilt')) {
        card.style.transform = `perspective(900px) rotateX(${(0.5 - py) * 6}deg) rotateY(${(px - 0.5) * 6}deg) translateY(-8px)`;
      }
    });
    card.addEventListener('pointerleave', () => {
      card.style.transform = '';
    });
  });

  // portrait parallax
  const portrait = $('#portrait');
  const heroSection = $('#home');
  if (portrait && heroSection) {
    heroSection.addEventListener('pointermove', (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 16;
      const y = (e.clientY / window.innerHeight - 0.5) * 16;
      portrait.style.transform = `translate(${x}px, ${y}px)`;
    });
    heroSection.addEventListener('pointerleave', () => {
      portrait.style.transform = '';
    });
  }
}

/* ============================================================
   Timeline progress fill
   ============================================================ */
const timeline = $('.timeline');
const timelineFill = $('#timelineFill');

function updateTimelineFill() {
  if (!timeline || !timelineFill) return;
  const rect = timeline.getBoundingClientRect();
  const start = window.innerHeight * 0.8;
  const progress = (start - rect.top) / (rect.height + start - window.innerHeight * 0.4);
  timelineFill.style.height = `${Math.max(0, Math.min(1, progress)) * 100}%`;
}

/* ============================================================
   Contact form — inline validation before submitting
   ============================================================ */
const form = $('#contactForm');

form?.addEventListener('submit', (e) => {
  let valid = true;

  $$('.field', form).forEach((field) => {
    const input = $('input, textarea', field);
    if (!input || !input.required) return;

    field.querySelector('.error-msg')?.remove();
    field.classList.remove('invalid');

    let error = '';
    if (!input.value.trim()) {
      error = 'This field is required.';
    } else if (input.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(input.value.trim())) {
      error = 'Please enter a valid email address.';
    } else if (input.name === 'message' && input.value.trim().length < 10) {
      error = 'Please write at least 10 characters.';
    }

    if (error) {
      valid = false;
      field.classList.add('invalid');
      const msg = document.createElement('span');
      msg.className = 'error-msg';
      msg.textContent = error;
      field.appendChild(msg);
    }
  });

  if (!valid) {
    e.preventDefault();
    $('.field.invalid input, .field.invalid textarea', form)?.focus();
    return;
  }

  const btn = $('button[type="submit"]', form);
  if (btn) {
    btn.disabled = true;
    btn.style.opacity = '0.75';
    btn.firstChild.textContent = 'Sending… ';
  }
});

$$('.field input, .field textarea').forEach((input) => {
  input.addEventListener('input', () => {
    const field = input.closest('.field');
    field.classList.remove('invalid');
    field.querySelector('.error-msg')?.remove();
  });
});

/* ============================================================
   Hide the CV button if the file has not been uploaded yet
   ============================================================ */
const cvButton = $('#cvButton');
if (cvButton) {
  fetch(cvButton.getAttribute('href'), { method: 'HEAD' })
    .then((res) => {
      const isPdf = (res.headers.get('content-type') || '').includes('pdf');
      if (!res.ok || !isPdf) cvButton.remove();
    })
    .catch(() => cvButton.remove());
}

/* ============================================================
   Footer year + structured data for search engines
   ============================================================ */
const yearEl = $('#year');
if (yearEl) yearEl.textContent = String(new Date().getFullYear());

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: content.profile.name,
  jobTitle: content.profile.title,
  email: `mailto:${content.profile.contact.email}`,
  telephone: content.profile.contact.phone,
  description: content.profile.bio,
  image: content.profile.image,
  url: window.location.origin,
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Riyadh',
    addressCountry: 'SA'
  },
  alumniOf: {
    '@type': 'CollegeOrUniversity',
    name: content.education.school
  },
  award: content.awards.map((a) => a.title),
  knowsAbout: content.skills.flatMap((group) => group.items),
  knowsLanguage: ['Arabic', 'English'],
  sameAs: [content.profile.contact.linkedin, content.profile.contact.github]
};

const script = document.createElement('script');
script.type = 'application/ld+json';
script.textContent = JSON.stringify(jsonLd);
document.head.appendChild(script);

onScroll();
