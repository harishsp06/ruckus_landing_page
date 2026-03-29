/* ─────────────────────────────────────────────────────────────
   RUCKUS — Landing Page Scripts
   ───────────────────────────────────────────────────────────── */

/* ── 1. Smooth Scroll ───────────────────────────────────────── */
document.querySelectorAll('.js-smooth-scroll').forEach(link => {
  link.addEventListener('click', e => {
    const href = link.getAttribute('href');
    if (!href || !href.startsWith('#')) return;
    const target = document.querySelector(href);
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

/* ── 3. Scroll-triggered animations (IntersectionObserver) ─── */
const animatedEls = document.querySelectorAll('[data-animate]');

animatedEls.forEach((el, index) => {
  el.style.animationDelay = `${index * 180}ms`;
});

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px',
  }
);

animatedEls.forEach(el => observer.observe(el));

/* ── 4. Waitlist Form ───────────────────────────────────────── */
const form        = document.getElementById('waitlist-form');
const firstInput  = document.getElementById('first-name');
const lastInput   = document.getElementById('last-name');
const phoneInput  = document.getElementById('phone');
const emailInput  = document.getElementById('email');
const successMsg  = document.getElementById('form-success');
const errorMsg    = document.getElementById('form-error');
const submitBtn   = form ? form.querySelector('[type="submit"]') : null;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Accepts digits, spaces, dashes, parens, +  — e.g. (312) 555-0100, +1 312 555 0100
const PHONE_RE = /^[\d\s\-().+]{7,20}$/;

function setInvalid(input, msg) {
  input.classList.add('is-invalid');
  errorMsg.textContent = msg;
  errorMsg.hidden = false;
  input.focus();
}

function clearErrors() {
  [firstInput, lastInput, phoneInput, emailInput].forEach(i => {
    if (i) i.classList.remove('is-invalid');
  });
  errorMsg.hidden = true;
  errorMsg.textContent = '';
  successMsg.hidden = true;
}

if (form) {
  form.addEventListener('submit', e => {
    clearErrors();

    const first = firstInput.value.trim();
    const last  = lastInput.value.trim();
    const phone = phoneInput.value.trim();
    const email = emailInput.value.trim();

    // Validate first — if invalid, block submission
    if (!first) {
      e.preventDefault();
      setInvalid(firstInput, 'First name is required.');
      return;
    }
    if (!last) {
      e.preventDefault();
      setInvalid(lastInput, 'Last name is required.');
      return;
    }
    if (!phone) {
      e.preventDefault();
      setInvalid(phoneInput, 'Phone number is required.');
      return;
    }
    if (!PHONE_RE.test(phone)) {
      e.preventDefault();
      setInvalid(phoneInput, 'Please enter a valid phone number.');
      return;
    }
    if (email && !EMAIL_RE.test(email)) {
      e.preventDefault();
      setInvalid(emailInput, 'Please enter a valid email address.');
      return;
    }

    // Validation passed — Formspree handles the submission
    // Show optimistic success UI before the page navigates
    showSuccess();
  });
}

function showSuccess() {
  successMsg.hidden = false;
  form.querySelectorAll('.form-input').forEach(i => i.value = '');
  if (submitBtn) {
    submitBtn.disabled    = true;
    submitBtn.textContent = "You're in!";
  }
}

function showNetworkError() {
  errorMsg.textContent = 'Something went wrong. Please try again.';
  errorMsg.hidden      = false;
}
