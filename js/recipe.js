import { elements, setLocalStorage, getFromLocal } from "./helpers.js";

export class Recipe {
  constructor() {
    // begenilen elemanların dizisi
    this.likes = getFromLocal("likes") || [];
    // tarif hakkında bütün bilgiler
    this.info = {};
    // tarifin malzemeleri
    this.ingredients = [];

    // localden alınan elemanları ekrana basar
    this.renderLikes();
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
      <i id="like-btn" class="bi ${
        this.isRecipeLiked() ? "bi-heart-fill" : "bi-heart"
      }"></i>
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

  // eleman daha once likelanmıs mı kontrol etsın
  isRecipeLiked() {
    const found = this.likes.find((i) => i.id === this.info.recipe_id);
    return found;
  }

  // like ' lama olaylarını kontrol eder
  controlLike() {
    // like 'lanan elemanın ihtiyacımız olan degerlerını alma
    const newObject = {
      id: this.info.recipe_id,
      img: this.info.image_url,
      title: this.info.title,
    };
    // eleman daha önce eklenmıs mi kontrol et
    if (this.isRecipeLiked()) {
      // eklenmısse > tarıfı lıkes dızısınden kaldır
      this.likes = this.likes.filter((i) => i.id !== newObject.id);
    } else {
      // yoksa > likes dizisine ekler
      this.likes.push(newObject);
    }
    // console.log(this.likes);

    // like ları locale ekle
    setLocalStorage("likes", this.likes);

    // arayüzü güncel tut
    this.renderRecipe(this.info);

    // html listesini günceller
    this.renderLikes();
  }
  // render likes
  renderLikes() {
    const html = this.likes.map(
      (item) => `
<a href="#${item.id}">
              <img
                src="${item.img}"
              />
              <p>${item.title}</p>
            </a>
`
    );
    elements.likeList.innerHTML = html;
  }
}
