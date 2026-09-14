// ---------- Date simulate (mock) ----------
// Într-o etapă viitoare, aceste date vor veni de la un backend real.
let products = [
  { id: 1, title: "Tricou oversized, bumbac", category: "tricouri", size: "M", price: 35 },
  { id: 2, title: "Geacă denim vintage", category: "geci", size: "L", price: 90 },
  { id: 3, title: "Rochie de vară, imprimeu floral", category: "rochii", size: "S", price: 60 },
  { id: 4, title: "Pantaloni cargo", category: "pantaloni", size: "40", price: 55 },
  { id: 5, title: "Adidași albi, piele", category: "incaltaminte", size: "39", price: 120 },
  { id: 6, title: "Geacă din piele ecologică", category: "geci", size: "M", price: 150 },
  { id: 7, title: "Tricou grafic, ediție limitată", category: "tricouri", size: "L", price: 40 },
  { id: 8, title: "Rochie office, croială dreaptă", category: "rochii", size: "M", price: 75 },
];

const productGrid = document.getElementById("productGrid");
const emptyState = document.getElementById("emptyState");
const filterButtons = document.querySelectorAll(".filter-btn");

// ---------- Randare produse ----------
function renderProducts(list) {
  productGrid.innerHTML = "";

  if (list.length === 0) {
    emptyState.hidden = false;
    return;
  }
  emptyState.hidden = true;

  list.forEach((product) => {
    const card = document.createElement("article");
    card.className = "product-card";
    card.innerHTML = `
      <div class="product-thumb">${product.category}</div>
      <div class="product-info">
        <h3>${product.title}</h3>
        <p class="product-meta">Mărime ${product.size}</p>
        <span class="product-price">${product.price} lei</span>
      </div>
    `;
    productGrid.appendChild(card);
  });
}

// ---------- Filtrare pe categorie ----------
filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    const category = btn.dataset.cat;
    const filtered =
      category === "toate"
        ? products
        : products.filter((p) => p.category === category);

    renderProducts(filtered);
  });
});

// ---------- Formular adăugare anunț ----------
const form = document.getElementById("listingForm");
const formMessage = document.getElementById("formMessage");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const newProduct = {
    id: products.length + 1,
    title: document.getElementById("title").value.trim(),
    category: document.getElementById("category").value,
    size: document.getElementById("size").value.trim(),
    price: Number(document.getElementById("price").value),
  };

  if (!newProduct.title || !newProduct.size || !newProduct.price) {
    formMessage.textContent = "Te rugăm completează toate câmpurile obligatorii.";
    formMessage.style.color = "#B3261E";
    return;
  }

  products.unshift(newProduct);
  formMessage.textContent = "Anunțul a fost publicat! Îl vezi mai sus, în listă.";
  formMessage.style.color = "";
  form.reset();

  // Resetează filtrul pe "Toate" ca noul anunț să fie mereu vizibil
  filterButtons.forEach((b) => b.classList.remove("active"));
  document.querySelector('[data-cat="toate"]').classList.add("active");
  renderProducts(products);

  productGrid.scrollIntoView({ behavior: "smooth", block: "start" });
});

// ---------- Inițializare ----------
renderProducts(products);
