import { elements } from './helpers.js';

// api den gelen sonucları ekrana basar
export const renderResults = (recipes) => {
    console.log(recipes);
    // her bir obje icin ekrana kart basma 
    recipes.slice(0,10).forEach((recipe) =>{
        // kart icicn html i hazırlama
        const markup = `
        <a class="result-link">
                    <img src="${recipe.image_url}">
                    <div class="data">
                        <h4>${recipe.title}</h4>
                        <p>${recipe.publisher}</p>
                    </div>
                </a>
        `;
         // olusturdugumuz html i ılgılı yere gonderme
    elements.resultList.insertAdjacentHTML('beforeend', markup);
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
    parent.insertAdjacentHTML('afterbegin', loader);
};


// ekrandaki loader i kaldıracak fonksıyon
export const clearLoader = () => {
    // loader i dokumanda bul
  const loader = document.querySelector('.loader');

//   egerki bulunduysa loader ı html den kaldır
  if(loader) loader.remove();
};