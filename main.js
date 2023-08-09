import { v4 } from "https://jspm.dev/uuid";
import {
  elements,
  setLocalStorage,
  getFromLocal,
  controlBtn,
} from "./js/helpers.js";
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

      // tarif arayüzüne scroll u kaydır
      elements.recipeArea.scrollIntoView({ behavior: "smooth" });
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

// !sepet alanı
// local storage da sepet dizisi varsa onu al
// ama basket degeri undefined sa o zaman bos dızi [] tanımla
let basket = getFromLocal("basket") || [];

// sayfanın yuklenme olayını ızle
document.addEventListener("DOMContentLoaded", () => {
  renderBasketItems(basket);
  // sepette eleman varsa butonu goster
  controlBtn(basket);
});

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

    // sepeti local storage a kaydetme
    setLocalStorage("basket", basket);

    // ekrana sepet elemanlarını basma
    renderBasketItems(basket);

    // sepete ekle butonunu goster
    controlBtn(basket);
  }
  if (e.target.id === "like-btn") {
    recipe.controlLike();
  }
};

// sepetten eleman kaldırma
const deleteItem = (e) => {
  // console.log(basket);
  if (e.target.id === "delete-item") {
    // kapsayıcıya erisme
    const parent = e.target.parentElement;

    // secilen urunu diziden kaldırabılmek ıcın id ye erısme
    basket = basket.filter((i) => i.id !== parent.dataset.id);

    // console.log(basket);

    // local storage ı guncelleme
    setLocalStorage("basket", basket);

    // elemanı html den kaldırma
    parent.remove();

    // temizle butonunu konrol eder
    controlBtn(basket);
  }
};

// sepette tümünü temizle
const handleClear = () => {
  // kullanıcıdan onay alma
  const res = confirm("Bütün sepet silinecek! Emin misiniz?");
  // kullanıcı onaylarsa calısır
  if (res) {
    // local i temizle
    setLocalStorage("basket", null);
    // sepet dizisini sıfırlama
    basket = [];

    // butonu ortadan kaldırma
    controlBtn(basket);

    // arayüzü temizleme
    elements.basketList.innerHTML = "";
  }
};

// sepete ekle butonuna tıklanmayı ızle
elements.recipeArea.addEventListener("click", handleClick);

// sepet üzerinde tıklanma olaylarını izler
elements.basketList.addEventListener("click", deleteItem);

// temizle butonuna tıklanmayı izler
elements.clearBtn.addEventListener("click", handleClear);
