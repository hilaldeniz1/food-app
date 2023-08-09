import { elements } from "./helpers.js";

// api den gelen sonucları ekrana basar
export const renderResults = (recipes) => {
  elements.resultList.innerHTML = "";
  // her bir obje icin ekrana kart basma
  recipes.slice(0, 10).forEach((recipe) => {
    // kart icicn html i hazırlama
    const markup = `
        <a href="#${recipe.recipe_id}" class="result-link">
                    <img src="${recipe.image_url}">
                    <div class="data">
                        <h4>${recipe.title}</h4>
                        <p>${recipe.publisher}</p>
                    </div>
                </a>
        `;
    // olusturdugumuz html i ılgılı yere gonderme
    elements.resultList.insertAdjacentHTML("beforeend", markup);
  });
};

// ekrana yüklenme gifi basma
export const renderLoader = (parent) => {
  // loader ı html ini hazırlama
  const loader = `
    <div class="loader">
    <img src="images/food-load.gif" />
    </div>
    `;
  // loader ı bıze gelen html elemanın ıcıne gonderme
  parent.insertAdjacentHTML("afterbegin", loader);
};

// ekrandaki loader i kaldıracak fonksıyon
export const clearLoader = () => {
  // loader i dokumanda bul
  const loader = document.querySelector(".loader");

  //   egerki bulunduysa loader ı html den kaldır
  if (loader) loader.remove();
};
// ekrana sepete eklenene ürünleri basar
export const renderBasketItems = (items) => {
  const markup = items
    .map(
      (item) => `
    <li data-id=${item.id}>
    <i id="delete-item" class="bi bi-x"></i>
    <span>${item.title}</span>
    </li>
    `
    )
    .join("");
  elements.basketList.innerHTML = markup;
};
