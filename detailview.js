// Læser query-parametrene fra URL'en (fx produkt.html?id=1525)
const param = new URLSearchParams(window.location.search);
// Henter værdien af "id", så vi ved hvilket produkt brugeren har klikket på
const selectedID = param.get("id");
// Test i konsollen: tjek at id'et er hentet korrekt
console.log("selectedID", selectedID);

// API-url'en til ét enkelt produkt, med id'et sat ind til sidst
const detailURL = `https://kea-alt-del.dk/t7/api/products/${selectedID}`;
// Test i konsollen: tjek at url'en ser rigtig ud
console.log("detailURL", detailURL);

// Henter data om produktet fra API'et
function loadData(url) {
  fetch(url).then((response) => {
    // Konverterer svaret fra JSON til et JavaScript-objekt
    response.json().then((data) => {
      // Sender produktdata videre til funktionen, der viser det på siden
      showDetails(data);
    });
  });
}

// Finder det element i HTML'en, hvor produktet skal vises
const productContainer = document.querySelector(".product_page");

// Tømmer containeren, så der ikke ligger noget gammelt indhold i den
productContainer.innerHTML = "";

// Viser detaljerne for det valgte produkt
function showDetails(detail) {
  // Test i konsollen: se hele produktobjektet
  console.log("detail", detail);

  // Bygger HTML'en til produktsiden og sætter den ind i containeren
  productContainer.innerHTML += `
  <img class="card-image" src="https://kea-alt-del.dk/t7/images/webp/640/${detail.id}.webp" alt="${detail.productdisplayname}">

<h1>${detail.productdisplayname}</h1>
            <p${detail.brandname}</p>
            <h2>${detail.variantname}</h2>
            <p>${detail.variantname}</p>
            <p>${detail.materialcaredesc}</p>
            <p>${detail.basecolour}</p>
            <p>${detail.subcategory}</p>
            <p${detail.price}</p>

            <label for="size">Choose your size</label>
            <select id="size">
                <option>XS</option>
                <option>S</option>
                <option>M</option>
                <option>L</option>
                <option>XL</option>

            </select>

            <button>Add to your basket</button>`;

  // Sætter billedets src igen (det er faktisk allerede sat i HTML'en ovenfor)
  document.querySelector(".card-image").src = `https://kea-alt-del.dk/t7/images/webp/640/${detail.id}.webp`;
}

// Starter det hele ved at hente produktdata fra API'et
loadData(detailURL);
