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
const SHEETS_URL = 'https://script.google.com/macros/s/AKfycbwOsuusg7veDslBtZbpgGq1jTiAgLfkiVGsXvOi0C_gpOtLc8bAqjLJkVIXtokOu5pK/exec';

const form        = document.getElementById('waitlist-form');
const firstInput  = document.getElementById('first-name');
const lastInput   = document.getElementById('last-name');
const phoneInput  = document.getElementById('phone');
const emailInput  = document.getElementById('email');
const successMsg  = document.getElementById('form-success');
const errorMsg    = document.getElementById('form-error');
const submitBtn   = form ? form.querySelector('[type="submit"]') : null;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Exactly 10 digits once formatting is stripped
const PHONE_RE = /^\(\d{3}\) \d{3}-\d{4}$/;

/* ── Phone auto-formatter ───────────────────────────────────── */
if (phoneInput) {
  phoneInput.addEventListener('input', () => {
    // Strip everything except digits
    const digits = phoneInput.value.replace(/\D/g, '').slice(0, 10);
    let formatted = '';
    if (digits.length === 0) {
      formatted = '';
    } else if (digits.length <= 3) {
      formatted = `(${digits}`;
    } else if (digits.length <= 6) {
      formatted = `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
    } else {
      formatted = `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
    }
    phoneInput.value = formatted;
  });

  // Allow backspace to feel natural by not re-formatting on deletion
  phoneInput.addEventListener('keydown', e => {
    if (e.key === 'Backspace' && phoneInput.value.endsWith(') ')) {
      e.preventDefault();
      phoneInput.value = phoneInput.value.slice(0, -2);
    }
  });
}

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
    e.preventDefault();
    clearErrors();

    const first = firstInput.value.trim();
    const last  = lastInput.value.trim();
    const phone = phoneInput.value.trim();
    const email = emailInput.value.trim();

    if (!first) { setInvalid(firstInput, 'First name is required.'); return; }
    if (!last)  { setInvalid(lastInput,  'Last name is required.');  return; }
    if (!phone) { setInvalid(phoneInput, 'Phone number is required.'); return; }
    if (!PHONE_RE.test(phone)) { setInvalid(phoneInput, 'Please enter a 10-digit US number: (555) 555-5555'); return; }
    if (email && !EMAIL_RE.test(email)) { setInvalid(emailInput, 'Please enter a valid email address.'); return; }

    // Disable button while submitting
    if (submitBtn) {
      submitBtn.disabled    = true;
      submitBtn.textContent = 'Sending...';
    }

    const params = new URLSearchParams();
    params.append('first_name', first);
    params.append('last_name', last);
    params.append('phone', phone);
    params.append('email', email);

    fetch(SHEETS_URL, {
      method: 'POST',
      mode: 'no-cors',
      body: params,
    })
      .then(() => showSuccess())
      .catch(() => {
        errorMsg.textContent = 'Something went wrong. Please try again.';
        errorMsg.hidden = false;
        if (submitBtn) {
          submitBtn.disabled    = false;
          submitBtn.textContent = "I'm in";
        }
      });
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
