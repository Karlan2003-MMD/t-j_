// Aktiverer "strict mode": giver fejl ved fx uerklærede variabler
"use strict";

// URL til API'et, som returnerer en liste af kategorier
const productURl = "https://kea-alt-del.dk/t7/api/categories";

// Finder HTML-elementet med klassen "categories_grid".
// Det er her kategorierne skal indsættes på siden
const categoriesList = document.querySelector(".categories_grid");

// Kalder funktionen med det samme, så data hentes når siden loader
getData();

// Henter data fra API'et
function getData() {
  fetch(productURl) // sender en forespørgsel til URL'en
    .then(
      (result) =>
        result
          .json() // laver svaret om til et JS-objekt (JSON)

          .then((data) => showData(data)), // sender data videre til showData
    );
}

// Viser data på siden
function showData(data) {
  console.log(data); // udskriver data i konsollen (til test/debug)
  categoriesList.innerHTML = ""; // tømmer containeren, så intet vises to gange
  let myInnerHtml = ""; // tom tekststreng, som HTML bygges op i

  // Går igennem hvert element i data-arrayet
  data.forEach((tøj) => {
    // Tilføjer en boks for hver kategori (template literal med ${...})
    // Linket sender kategorien med i URL'en som en query string
    myInnerHtml += ` <div class="categories_box">
                <a href="produktliste.html?category=${tøj.category}">
                <h3>${tøj.category}</h3>
                </a>
            </div>`;
  });

  // Indsætter al den byggede HTML i containeren på én gang
  categoriesList.innerHTML = myInnerHtml;
}

/***** Opsummering *****/

// Hvad programmet gør: Henter en liste af tøjkategorier fra et API og viser dem som klikbare bokse på en side. Hver boks linker til produktliste.html med kategorien i URL'en.

// Flowet i trin:

// Siden loader, og getData() kører.
// fetch henter data fra API'et (asynkront, så siden ikke fryser).
// .json() omdanner svaret til et array af objekter.
// showData() løber arrayet igennem med forEach og bygger HTML for hver kategori.
// HTML'en indsættes i .categories_grid med innerHTML.

// Vigtige begreber:

// fetch og .then() bruges til at hente data asynkront med promises.
// .json() parser JSON-svaret til et JavaScript-objekt.
// forEach kører en funktion for hvert element i et array.
// Template literals (backticks og ${}) gør det nemt at sætte variabler ind i tekst/HTML.
// querySelector finder et element i HTML'en via en CSS-selector.
// innerHTML sætter eller ændrer HTML-indholdet i et element.
// Query string (?category=...) sender information videre til næste side, som kan læse den med URLSearchParams.

// Små forbedringer, hvis jeg vil:

// Du kan undgå den indlejrede .then ved at kæde dem: fetch(url).then(r => r.json()).then(showData).
// Tilføj .catch() for at håndtere fejl, hvis API'et ikke svarer.
// Variabelnavnet productURl har et lille stort L, og det er nok en tastefejl for productURL. Kategorierne er desuden ikke produkter, så categoriesURL ville måske være mere sigende.
