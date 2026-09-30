// Læser query-parametrene fra URL'en (fx produktliste.html?category=Apparel)
const param = new URLSearchParams(window.location.search);

// Henter værdien af "category", så vi ved hvilken kategori brugeren har valgt
const selectedCategory = param.get("category");

// API-url'en med den valgte kategori indsat. limit=100 begrænser til max 100 produkter
const productURL = `https://kea-alt-del.dk/t7/api/products?category=${selectedCategory}&limit=100`;

// Finder det element i HTML'en, hvor produkterne skal vises
const listContainer = document.querySelector(".product_list_container");

// Henter data fra API'et
function getData(url) {
  fetch(url).then((response) => {
    // Konverterer svaret fra JSON til et JavaScript-objekt/array
    response.json().then((data) => {
      // Sender produkterne videre til funktionen, der viser dem
      showProduct(data);
    });
  });
}

// Viser alle produkterne på siden
function showProduct(products) {
  // Test i konsollen: tjek at data er kommet med
  console.log("First product", products[0]);
  console.log("Number of products", products.length);

  // Tømmer containeren, så produkter ikke bliver vist dobbelt
  listContainer.innerHTML = "";

  // Går igennem hvert produkt og laver et <article> til det
  products.forEach((product) => {
    listContainer.innerHTML += `<article class="product_info ${product.soldout ? "soldout" : ""}">
        <img src="https://kea-alt-del.dk/t7/images/webp/640/${product.id}.webp" alt="${product.productdisplayname}" />
        <h3>${product.productdisplayname}</h3>
        <p>${product.brandname} - ${product.subcategory}</p>
        <div>
         ${product.discount ? "<p>" + getDiscountPrice(product.price, product.discount) + "kr</p>" : ""}
          <p>${product.price} kr   ${product.discount ? " <em>- " + product.discount + "%" : ""}</p>
        </div>
        <p><a href="produkt.html?id=${product.id}">Read More</a></p>
        ${product.soldout ? "<p class='soldout_tag'>Sold Out</p>" : ""}
      </article>`;
  });
}

// Starter det hele ved at hente data fra API'et
getData(productURL);

// Udregner prisen efter rabat og runder af til nærmeste hele tal
// Fx 1195 kr med 45% rabat: 1195 * (100 - 45) / 100 = 657,25 → 657
function getDiscountPrice(orginalPrice, discount) {
  return Math.round((orginalPrice * (100 - discount)) / 100);
}

// Test i konsollen: tjekker at udregningen giver det rigtige resultat
console.log("1195 - 45%", getDiscountPrice(1195, 45));
