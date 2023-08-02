import { elements } from "./helpers.js";

export class Recipe {
  constructor() {
    // tarif hakkında bütün bilgiler
    this.info = {};
    // tarifin malzemeleri
    this.ingredients = [];
  }

  //   tarif bilgilerini alama
  async getRecipe(id) {
    // verileri alma
    const res = await fetch(
      `https://forkify-api.herokuapp.com/api/get?rId=${id}`
    );
    // verileri işleme
    const data = await res.json();
    // classın icine aktarma
    this.info = data.recipe;
    this.ingredients = data.recipe.ingredients;
  }
  // her bir tarif icin tarifi temsil eden html olusturur
  createIngredient() {
    const html = this.ingredients
      .map(
        (ingredient) => `
    <li>
    <i class="bi bi-check-circle"></i>
    <p>${ingredient}</p>
    </li>
    `
      )
      .join("");
    return html;
  }

  //   bu bilgileri ekrana basma
  renderRecipe(recipe) {
    console.log(recipe);
    const markup = `
    <figure>
    <img
      src=${recipe.image_url}
    />
    <h1>${recipe.title}</h1>

    <p class="like-area">
      <i class="bi bi-heart"></i>
    </p>
  </figure>

  <div class="ingredients">
    <ul>
    ${this.createIngredient()}
    </ul>
    <button id="add-to-basket">
      <i class="bi bi-cart2"></i>
      <span>Alışveriş Sepetine Ekle</span>
    </button>
  </div>

  <div class="directions">
    <h2>Nasıl Pişirilir?</h2>

    <p>
      Bu tarif dikkatlice <span>${recipe.publisher}</span> tarafından
      hazırlanmış ve test edilmiştir.Diğer detaylara onları websitesi
      üzerinden erişebilirsiniz.
    </p>
    <a href="${recipe.source_url}" target="_blank">Yönerge</a>
  </div>
    `;
    elements.recipeArea.innerHTML = markup;
  }
}
