// get recipes from the database
class Recipes {
    constructor(){
        // connect to database
        this.recipes = db.collection('recipes');
    } 
    // collect recipes from database  
    getRecipes(callback){
        this.recipes.onSnapshot(snapshot => {
            const data = new Array();
            snapshot.docChanges().forEach(change => {
                if(change.type === 'added'){
                    data.push(change.doc.data());
                }
            });
            callback(data);
        });
    }
}

export {Recipes as default};

