const translations = {
  fr: {
    s1_title: "Vision & Objectifs",
    s2_title: "Structure du projet",
    s3_title: "Expérience utilisateur",
    s6_title: "Priorités & Futur",
    project_name: "Nom du projet",
    project_description: "Description du projet",
    problem: "Problème à résoudre",
    priority_feature: "Fonctionnalité prioritaire",
    structure: "Structure générale",
    options: "Options ou particularités",
    combos: "Fonctionnalités groupées",
    access: "Accès client",
    payment: "Paiement",
    mvp: "Fonctionnalités MVP",
    future: "Évolutions futures",
    constraints: "Contraintes ou inquiétudes",
    preview: "Aperçu",
    preview_title: "Récapitulatif",
    edit: "Modifier",
    send: "Envoyer",
    consent: "J’accepte l’utilisation de mes informations."
  },
  en: {
    s1_title: "Vision & Goals",
    s2_title: "Project Structure",
    s3_title: "User Experience",
    s6_title: "Priorities & Future",
    project_name: "Project name",
    project_description: "Project description",
    problem: "Main problem",
    priority_feature: "Priority feature",
    structure: "General structure",
    options: "Options or specifics",
    combos: "Grouped features",
    access: "User access",
    payment: "Payment",
    mvp: "MVP features",
    future: "Future improvements",
    constraints: "Constraints or concerns",
    preview: "Preview",
    preview_title: "Summary",
    edit: "Edit",
    send: "Send",
    consent: "I agree to the use of my information."
  }
};

const switcher = document.getElementById("languageSwitcher");

function setLanguage(lang) {
  document.querySelectorAll("[data-i18n]").forEach(el => {
    el.textContent = translations[lang][el.dataset.i18n];
  });
}

switcher.addEventListener("change", e => setLanguage(e.target.value));
setLanguage("fr");
