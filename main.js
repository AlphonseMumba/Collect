const form = document.getElementById("collectForm");
const previewBtn = document.getElementById("previewBtn");
const preview = document.getElementById("preview");
const previewContent = document.getElementById("previewContent");
const editBtn = document.getElementById("editBtn");
const pdfBtn = document.getElementById("pdfBtn");

previewBtn.addEventListener("click", () => {
  const data = new FormData(form);
  previewContent.innerHTML = "";

  data.forEach((value, key) => {
    if (value) {
      const p = document.createElement("p");
      p.innerHTML = `<strong>${key}</strong> : ${value}`;
      previewContent.appendChild(p);
      localStorage.setItem(key, value);
    }
  });

  preview.classList.remove("hidden");
  preview.scrollIntoView({ behavior: "smooth" });
});

editBtn.addEventListener("click", () => {
  preview.classList.add("hidden");
});

pdfBtn.addEventListener("click", () => {
  window.print();
});

// Restore saved data
window.addEventListener("load", () => {
  [...form.elements].forEach(el => {
    if (el.name && localStorage.getItem(el.name)) {
      el.value = localStorage.getItem(el.name);
    }
  });
});
