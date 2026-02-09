/* =========================
   CONFIGURATION
   ========================= */

// Champs obligatoires minimaux (validation souple)
const REQUIRED_FIELDS = [
  "project_name",
  "project_type",
  "goal"
];

// Clé de stockage
const STORAGE_KEY = "collect_form_data";

/* =========================
   ELEMENTS DOM
   ========================= */

const form = document.getElementById("collectForm");
const steps = document.querySelectorAll(".step");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");
const progressBar = document.getElementById("progressBar");
const previewContainer = document.getElementById("previewContent");

let currentStep = 0;

/* =========================
   NAVIGATION
   ========================= */

function showStep(index) {
  steps.forEach((step, i) => {
    step.classList.toggle("active", i === index);
  });

  updateProgress(index);
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function updateProgress(index) {
  const percent = (index / (steps.length - 1)) * 100;
  progressBar.style.width = percent + "%";
}

nextBtn.addEventListener("click", () => {
  if (!validateRequiredFields()) return;

  if (currentStep < steps.length - 1) {
    currentStep++;
    if (currentStep === steps.length - 1) {
      generatePreview();
    }
    showStep(currentStep);
  }
});

prevBtn.addEventListener("click", () => {
  if (currentStep > 0) {
    currentStep--;
    showStep(currentStep);
  }
});

/* =========================
   VALIDATION SOUPLE
   ========================= */

function validateRequiredFields() {
  let valid = true;

  REQUIRED_FIELDS.forEach(name => {
    const field = form.querySelector(`[name="${name}"]`);
    if (field && !field.value.trim()) {
      field.style.borderColor = "#ef4444";
      valid = false;
    } else if (field) {
      field.style.borderColor = "#d1d5db";
    }
  });

  if (!valid) {
    alert("Merci de remplir les champs essentiels avant de continuer.");
  }

  return valid;
}

/* =========================
   SAUVEGARDE AUTOMATIQUE
   ========================= */

function saveFormData() {
  const data = {};
  const formData = new FormData(form);

  formData.forEach((value, key) => {
    if (data[key]) {
      // gestion checkbox multiples
      if (!Array.isArray(data[key])) {
        data[key] = [data[key]];
      }
      data[key].push(value);
    } else {
      data[key] = value;
    }
  });

  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function restoreFormData() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) return;

  const data = JSON.parse(saved);

  Object.keys(data).forEach(key => {
    const field = form.querySelector(`[name="${key}"]`);
    if (!field) return;

    if (field.type === "checkbox") {
      const values = Array.isArray(data[key]) ? data[key] : [data[key]];
      values.forEach(val => {
        const checkbox = form.querySelector(`[name="${key}"][value="${val}"]`);
        if (checkbox) checkbox.checked = true;
      });
    } else {
      field.value = data[key];
    }
  });
}

// Sauvegarde en temps réel
form.addEventListener("input", saveFormData);

/* =========================
   PREVIEW FINAL
   ========================= */

function generatePreview() {
  previewContainer.innerHTML = "";

  const formData = new FormData(form);
  const sections = {};

  formData.forEach((value, key) => {
    if (!value) return;

    if (!sections[key]) {
      sections[key] = [];
    }
    sections[key].push(value);
  });

  Object.keys(sections).forEach(key => {
    const card = document.createElement("div");
    card.className = "preview-card";

    const title = document.createElement("h4");
    title.textContent = formatLabel(key);

    const content = document.createElement("p");
    content.textContent = sections[key].join(", ");

    card.appendChild(title);
    card.appendChild(content);
    previewContainer.appendChild(card);
  });
}

// Transforme project_name → Project name
function formatLabel(str) {
  return str
    .replace(/_/g, " ")
    .replace(/\b\w/g, l => l.toUpperCase());
}

/* =========================
   CONSENTEMENT & ENVOI
   ========================= */

form.addEventListener("submit", (e) => {
  const consent = form.querySelector('input[type="checkbox"][required]');
  if (consent && !consent.checked) {
    e.preventDefault();
    alert("Vous devez accepter l’utilisation des informations.");
  } else {
    localStorage.removeItem(STORAGE_KEY);
  }
});

/* =========================
   PDF (IMPRESSION SIMPLE)
   ========================= */

window.addEventListener("keydown", (e) => {
  if (e.ctrlKey && e.key === "p") {
    window.print();
  }
});

/* =========================
   INIT
   ========================= */

restoreFormData();
showStep(currentStep);
