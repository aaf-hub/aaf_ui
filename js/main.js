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
    name: "Farhan Rhidor Akorede",
    role: "Co-Founder & Research Lead",
    img: "team_images/Farhan.jpg",
    bio: [
      "Farhan Rhidor Akorede is a veterinary surgeon, research scientist, and Co-Founder & Research Lead at AFANA Animal Futures, where he leads the organisation's research on animal welfare, One Health, and sustainable livestock systems across Nigeria. He holds a DVM from the University of Ilorin and an MVSc in Veterinary Pharmacology at Usmanu Danfodiyo University, Sokoto.",
      "Farhan has led grant-funded, multiregional studies on farmers' behavioural drivers for welfare in cattle production (funded by Welttierschutzstiftung) and on stakeholder awareness of welfare during livestock transport and in markets (funded by the Humane Slaughter Association), alongside earlier work on hen welfare and cage-free sourcing with the One Health and Development Initiative. His research has been published in journals including the Animal Welfare Journal, Medicine in Microecology, and PLoS One, and he serves as a peer reviewer for Discover Public Health and BMC Agriculture.",
      "Before co-founding AFANA, Farhan worked as a private veterinary surgeon conducting clinical services for farms and pet owners, and welfare inspections at abattoirs and markets. He was a research associate with Tailored Food (Canada), contributing to food systems research across African countries in partnership with UNICEF. He combines clinical veterinary experience with quantitative research and policy translation to drive practical, evidence-based animal welfare outcomes across Nigeria and the wider region.",
      "In his spare time, he enjoys reading, writing, gaming, playing and watching football, and reading manga or watching anime."
    ]
  },
  kaosarah: {
    name: "Kaosarah Omowumi Lawal",
    role: "Co-Founder & Programs Lead",
    img: "team_images/Kaosarah.png",
    bio: [
      "Kaosarah is a veterinarian, data and AI professional, and Co-Founder & Programs Lead at AFANA Animal Futures, where she leads advocacy, programme implementation, partnerships, and operations focused on farmed animal welfare, sustainable food systems, and One Health initiatives across Africa.",
      "With a background in veterinary medicine, public health, data analytics, and artificial intelligence, she works at the intersection of animal welfare, technology, and social impact. Her work focuses on translating evidence into action through advocacy, stakeholder engagement, programme management, and the development of innovative solutions that improve outcomes for animals, people, and the environment.",
      "At AFANA Animal Futures, she contributes to programme design, organisational growth, and partnerships that strengthen impact. Beyond the nonprofit sector, she builds data-driven and AI-powered solutions that help organisations automate workflows, improve efficiency, and make better decisions through technology.",
      "Her professional interests include farmed animal welfare, One Health, public health, artificial intelligence, data science, and tech-enabled social impact. She is passionate about building scalable, practical solutions that create measurable and lasting change for animals and communities.",
      "In her spare time, she enjoys building tech solutions, reading, listening to podcasts, and watching documentaries."
    ]
  },
  mutiat: {
    name: "Adetona Mutiat",
    role: "Project Manager",
    img: "team_images/Mutiat.jpg",
    bio: [
      "Adetona Mutiat is a Doctor of Veterinary Medicine and holds an MSc in Veterinary Public Health and Preventive Medicine. She is passionate about advancing animal welfare and promoting safe animal health practices through research and evidence-based interventions.",
      "Her interests include infectious diseases, antimicrobial resistance (AMR), zoonoses prevention and control, and food safety, with a strong focus on One Health approaches that improve outcomes for both animals and humans.",
      "Prior to joining AFANA, she was a team member of the IDRC-funded BAC4Ruma Project, which explored bacteriocin-rich extracts for ruminants and aquaculture as sustainable alternatives to antibiotic use in animal production. She also serves as the Welfare and Logistics Director of AfricaPHSN, supporting awareness and interventions on key human and animal health issues.",
      "In her spare time, she enjoys reading, exploring, and watching movies."
    ]
  },
  fatimah: {
    name: "Fatimah Muhammad Bello",
    role: "Research Assistant",
    img: "team_images/Fatimah.jpg",
    bio: [
      "Fatimah Muhammad Bello is a veterinary doctor passionate about animal health and welfare. She is dedicated to providing quality veterinary care, preventing and controlling animal diseases, and promoting sustainable livestock development. She is committed to professionalism, integrity, and continuous learning, and strives to make a positive impact in her community through effective veterinary services and public awareness on animal health.",
      "In her free time, she enjoys cooking, which allows her to express creativity and develop new skills while maintaining a balanced lifestyle."
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
