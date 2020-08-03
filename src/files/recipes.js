// get recipes from the database
class Recipes {
    constructor(){
        // connect to database
        this.recipes = db.collection('recipes');
    } 
    // collect recipes from database  
    getRecipes(callback){
        this.recipes.onSnapshot(snapshot => {
            snapshot.docChanges().forEach(change => {
                if(change.type === 'added'){
                   callback(change.doc.data());
                }
            });
        });
    }
}

export {Recipes as default};

