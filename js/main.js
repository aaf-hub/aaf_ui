// ── Mobile nav toggle ──
const burger = document.getElementById('burger');
const mainNav = document.getElementById('main-nav');
if (burger && mainNav) {
  burger.addEventListener('click', () => {
    const open = mainNav.classList.toggle('open');
    burger.setAttribute('aria-expanded', open);
  });
  mainNav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    mainNav.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
  }));
}

// ── Active nav link ──
const currentPage = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.main-nav a').forEach(a => {
  const href = a.getAttribute('href').split('/').pop();
  if (href === currentPage) a.classList.add('active');
});

// ── Team bio modal ──
const teamData = {
  farhan: {
    name: "Farhan",
    role: "Co-Founder & Director",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
    bio: [
      "Farhan co-founded AFANA Animal Futures with a focus on building research-driven programmes that connect animal welfare with community wellbeing.",
      "He leads on strategy, partnerships, and the day-to-day direction of AFANA's work across Kaduna State and Nigeria.",
      "⚠️ Replace this placeholder text with Farhan's real biography — background, qualifications, what drew him to animal welfare, and his vision for AFANA."
    ]
  },
  kaosarah: {
    name: "Kaosarah",
    role: "Co-Founder & Director",
    img: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=600&q=80",
    bio: [
      "Kaosarah co-founded AFANA Animal Futures, bringing expertise in community engagement and on-the-ground relationships with farmers and local partners.",
      "She leads on research design and AFANA's partnerships with farming communities across Kaduna State.",
      "⚠️ Replace this placeholder text with Kaosarah's real biography — background, qualifications, what drew her to animal welfare, and her vision for AFANA."
    ]
  },
  "research-intern": {
    name: "Research Intern",
    role: "Research Intern",
    img: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=600&q=80",
    bio: [
      "Supports AFANA's research work, including on-farm welfare assessments, literature reviews, and data analysis across our active projects.",
      "⚠️ Replace this placeholder with the Research Intern's real name, photo, and biography once confirmed."
    ]
  },
  "project-manager": {
    name: "Project Manager",
    role: "Project Manager",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
    bio: [
      "Oversees the day-to-day running of AFANA's projects, coordinating timelines, partners, and resources across our research and advocacy work.",
      "⚠️ Replace this placeholder with the Project Manager's real name, photo, and biography once confirmed."
    ]
  }
};

const backdrop = document.getElementById('modal-backdrop');
const modalImg = document.getElementById('modal-img');
const modalName = document.getElementById('modal-name');
const modalRole = document.getElementById('modal-role');
const modalBio = document.getElementById('modal-bio');
const modalClose = document.getElementById('modal-close');
let lastFocus = null;

if (backdrop) {
  document.querySelectorAll('.team-card').forEach(card => {
    card.addEventListener('click', () => {
      const data = teamData[card.dataset.modal];
      if (!data) return;
      modalImg.src = data.img;
      modalImg.alt = 'Portrait of ' + data.name;
      modalName.textContent = data.name;
      modalRole.textContent = data.role;
      modalBio.innerHTML = data.bio.map(p => `<p>${p}</p>`).join('');
      lastFocus = card;
      backdrop.classList.add('open');
      modalClose.focus();
      document.body.style.overflow = 'hidden';
    });
  });

  function closeModal() {
    backdrop.classList.remove('open');
    document.body.style.overflow = '';
    if (lastFocus) lastFocus.focus();
  }
  modalClose.addEventListener('click', closeModal);
  backdrop.addEventListener('click', e => { if (e.target === backdrop) closeModal(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && backdrop.classList.contains('open')) closeModal(); });
}

// ── Form submission via Formspree ──
// IMPORTANT: Replace YOUR_FORMSPREE_ID below with your actual Formspree endpoint.
// Sign up free at https://formspree.io → create a form → copy the 8-character code.
// Example: if your endpoint is https://formspree.io/f/abcd1234 → set FORMSPREE_ID = 'abcd1234'
const FORMSPREE_ID = 'YOUR_FORMSPREE_ID';

async function handleForm(formEl, successEl) {
  if (!formEl) return;
  formEl.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = formEl.querySelector('button[type="submit"]');
    const original = btn.textContent;
    btn.textContent = 'Sending…';
    btn.disabled = true;

    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        body: new FormData(formEl),
        headers: { Accept: 'application/json' }
      });
      if (res.ok) {
        formEl.reset();
        if (successEl) { successEl.classList.add('show'); }
        btn.textContent = '✓ Sent!';
      } else {
        btn.textContent = 'Error — try emailing us';
        btn.disabled = false;
      }
    } catch {
      btn.textContent = 'Error — try emailing us';
      btn.disabled = false;
    }
  });
}

handleForm(document.getElementById('contact-form'), document.getElementById('contact-success'));
