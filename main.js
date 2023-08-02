import { v4 } from "https://jspm.dev/uuid";
import { elements } from "./js/helpers.js";
import { Search } from "./js/api.js";
import {
  clearLoader,
  renderLoader,
  renderResults,
  renderBasketItems,
} from "./js/ui.js";
import { Recipe } from "./js/recipe.js";

const recipe = new Recipe();

// ! olay izleyicileri
elements.form.addEventListener("submit", handleSubmit);

/*8.ve 9.satıdaki kod ıle aynı ıslem uzun yolu
window.addEventListener("hashchange", controlRecipe);
window.addEventListener("load", controlRecipe);
*/

// ! fonksıyonlar
async function handleSubmit(e) {
  e.preventDefault();
  // aratılan kelıme
  const query = elements.searchInput.value;
  // arama terimi bos degılse calsıır
  if (query) {
    // search sınıfının bir ornegını olustur
    const search = new Search(query);

    // istek atmaya baslamadan once loaderı ekrana bas
    renderLoader(elements.resultList);

    // istek atma kısmı
    try {
      await search.getResults();

      //istege cevap gelince  loaderı ekrandan kaldır
      clearLoader();

      //  gelen cevabı ekrana bas
      renderResults(search.result);
    } catch (err) {
      alert("Aradığınız kriterlere uygun tarif bulunamadı");
      clearLoader();
    }
  }
}

// tarif detaylarını alma
const controlRecipe = async () => {
  const id = location.hash.replace("#", "");
  if (id) {
    // ekrana loaderı bas
    renderLoader(elements.recipeArea);

    try {
      // tarif bilgilerini al
      await recipe.getRecipe(id);

      //   loaderı kaldır
      clearLoader();
      //   ekrana tarif arayüzünü bas
      recipe.renderRecipe(recipe.info);
    } catch (err) {
      alert("Verileri alırken hata olustu");
      clearLoader();
    }
  }
};
// iki farklı olayı izleme
["hashchange", "load"].forEach((event) => {
  window.addEventListener(event, controlRecipe);
});
const basket = [];
// tarif alanındaki tıklanmaLarda calısır
const handleClick = (e) => {
  if (e.target.id === "add-to-basket") {
    // tarifler dizisini dön
    recipe.ingredients.forEach((title) => {
      // herbir tarif icin obje olustur ve id ekle
      const newItem = {
        id: v4(),
        title,
      };
      // yeni olusan  tarifi sepete ekle
      basket.push(newItem);
    });
    // ekrana sepet elemanlarını basma
    renderBasketItems(basket);
  }
};

// sepete ekle butonuna tıklanmayı ızle
elements.recipeArea.addEventListener("click", handleClick);
