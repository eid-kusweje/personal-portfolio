const menuBtn = document.getElementById('menu-btn');
const navMenu = document.getElementById('nav-menu');
const themeBtn = document.getElementById('theme-toggle');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function setTheme(isDark) {
  document.body.classList.toggle('dark', isDark);
  if (!themeBtn) return;
  themeBtn.textContent = isDark ? '☀' : '☾';
  themeBtn.setAttribute('aria-label', isDark ? 'Switch to light theme' : 'Switch to dark theme');
}

setTheme(localStorage.getItem('theme') === 'dark');

if (themeBtn) {
  themeBtn.addEventListener('click', () => {
    const isDark = !document.body.classList.contains('dark');
    setTheme(isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });
}

if (menuBtn && navMenu) {
  menuBtn.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', String(isOpen));
    menuBtn.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
    menuBtn.textContent = isOpen ? '×' : '☰';
  });

  navMenu.querySelectorAll('a').forEach(link => {
    if (link.getAttribute('href') === document.body.dataset.page) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    }

    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      menuBtn.setAttribute('aria-expanded', 'false');
      menuBtn.setAttribute('aria-label', 'Open navigation');
      menuBtn.textContent = '☰';
    });
  });
}

const roles = ['Computer Science Student', 'Aspiring Web Developer', 'Problem Solver'];
const typingEl = document.getElementById('typing');

if (typingEl && reducedMotion) {
  typingEl.textContent = roles[0];
} else if (typingEl) {
  let roleIndex = 0;
  let charIndex = 0;
  let deleting = false;

  function typeRole() {
    const role = roles[roleIndex];
    typingEl.textContent = role.substring(0, charIndex);

    if (!deleting && charIndex < role.length) {
      charIndex += 1;
      window.setTimeout(typeRole, 75);
    } else if (deleting && charIndex > 0) {
      charIndex -= 1;
      window.setTimeout(typeRole, 38);
    } else {
      deleting = !deleting;
      if (!deleting) roleIndex = (roleIndex + 1) % roles.length;
      window.setTimeout(typeRole, deleting ? 1300 : 280);
    }
  }

  typeRole();
}

const revealElements = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && !reducedMotion) {
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.14 });

  revealElements.forEach(element => revealObserver.observe(element));
} else {
  revealElements.forEach(element => element.classList.add('show'));
}

const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', event => {
    event.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    const subject = encodeURIComponent(`Portfolio message from ${name}`);
    const body = encodeURIComponent(`${message}\n\nFrom: ${name} (${email})`);
    window.location.href = `mailto:youremail@gmail.com?subject=${subject}&body=${body}`;
  });
}

document.querySelectorAll('.year').forEach(element => {
  element.textContent = new Date().getFullYear();
});
