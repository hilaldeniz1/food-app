export class Search {
    constructor(query) {
        this.query = query;
        this.result = [];
    }
    async getResults(){
        // istek atma
       const res = await fetch(`https://forkify-api.herokuapp.com/api/search?q=${this.query}`
        );


        //gelen veriyi isleme
        const data = await res.json();
        
        // gelen veriyi sınıf yardımıyla olusturdugumuz objenın ıcıne aktar
        this.result = data.recipes;
    }
}