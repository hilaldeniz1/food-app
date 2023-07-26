import { elements } from './js/helpers.js';
import { Search } from './js/api.js';
import { clearLoader, renderLoader, renderResults } from './js/ui.js';

// ! olay izleyicileri 
elements.form.addEventListener('submit',handleSubmit);

// ! fonksıyonlar
async function handleSubmit(e){
    e.preventDefault();
    // aratılan kelıme
    const query = elements.searchInput.value;
    // arama terimi bos degılse calsıır
    if(query){
        // search sınıfının bir ornegını olustur
        const search = new Search(query);

        // istek atmaya baslamadan once loaderı ekrana bas 
        renderLoader(elements.resultList);

        // istek atma kısmı
        try{
         await search.getResults();

        //istege cevap gelince  loaderı ekrandan kaldır
        clearLoader();

        //  gelen cevabı ekrana bas
        renderResults(search.result);
        }catch(err){

         alert("Aradığınız kriterlere uygun tarif bulunamadı");
         clearLoader();
        }
    }
}