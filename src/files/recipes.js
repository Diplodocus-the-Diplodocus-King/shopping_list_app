// get recipes from the database
class Recipes {
    constructor(){
        // connect to database
        this.recipes = db.collection('recipes');
        this.data = new Array();
        this.shoppingList = [[], [], []];
    } 
    // collect recipes from database  
    getRecipes(callback){
        this.recipes.onSnapshot(snapshot => {
            // const data = new Array();
            snapshot.docChanges().forEach(change => {
                if(change.type === 'added'){
                    this.data.push(change.doc.data());
                }
            });
            callback(this.data);
        });
    }
    getRecipe(selectedRecipe, id, callback){
        // Collect single recipe from data and pass to add or remove method
        this.data.forEach(recipe => {
            if(recipe.title === selectedRecipe){
                this.sortList(recipe, id, callback);
            }      
        });
    }
    sortList(recipe, id, callback){
        // Take the added recipe and add it to the shopping list
        const numOfLists = [0, 1, 2];
        
        // cycle through lists
        numOfLists.forEach(index => {
            if(index === 0){
                recipe.vegIngredients.forEach(item => {
                    if(id === 1){
                        this.quantifier(item, index);
                    } else if(id === -1){
                        this.dequantifier(item, index);
                    }  
                });
            } else if(index === 1){
                recipe.shopIngredients.forEach(item => {
                    if(id === 1){
                        this.quantifier(item, index);
                    } else if(id === -1){
                        this.dequantifier(item, index);
                    }  
                });
            } else if(index === 2){
                recipe.spiceIngredients.forEach(item => {
                    if(id === 1){
                        this.quantifier(item, index);
                    } else if(id === -1){
                        this.dequantifier(item, index);
                    }  
                });
            }
        });
        console.log(this.shoppingList);
        //fire callback function to display list
        callback(this.shoppingList);
    }
    quantifier(item, index){

        let itemName = item.slice(0, item.indexOf('('));

        // check if list already contains the item name
        const filteredList = this.shoppingList[index].filter(listItem => {
            return listItem.includes(itemName);
        });
        // if it does return the index (-1 if not) and find the item in the shopping list
        const listArrayIdx = this.shoppingList[index].indexOf(filteredList[0]);
        const listItem = this.shoppingList[index][listArrayIdx];

        // check if the item already exists in the list if it doesn't add straight away
        if(filteredList.length === 0){
            this.shoppingList[index].push(item);
        } else {
            // this mess is to deal with if quantities are stated in grams and ml in the list.
            if(item.slice(item.indexOf('(')+1,item.indexOf(')')).includes(' ')){
                const currentNum = Number(listItem.slice(listItem.indexOf('(')+1,listItem.lastIndexOf(' ')));
                const newNum = Number(item.slice(item.indexOf('(')+1,item.lastIndexOf(' ')));
                const unit = item.slice(item.lastIndexOf(' ')+1,item.indexOf(')'));
                const total = currentNum + newNum;
                // console.log(item, currentNum, newNum, unit, total);
                this.shoppingList[index][listArrayIdx] = `${itemName}(${total} ${unit})`;
            } else if(item.slice(item.indexOf('(')+1,item.indexOf(')')).includes('g')){
                const currentNum = Number(listItem.slice(listItem.indexOf('(')+1,listItem.lastIndexOf('g')));
                const newNum = Number(item.slice(item.indexOf('(')+1,item.lastIndexOf('g')));
                const total = currentNum + newNum;
                this.shoppingList[index][listArrayIdx] = `${itemName}(${total}g)`;
            } else if (item.slice(item.indexOf('(')+1,item.indexOf(')')).includes('ml')){
                const currentNum = Number(listItem.slice(listItem.indexOf('(')+1,listItem.lastIndexOf('m')));
                const newNum = Number(item.slice(item.indexOf('(')+1,item.lastIndexOf('m')));
                const total = currentNum + newNum;
                this.shoppingList[index][listArrayIdx] = `${itemName}(${total}ml)`;
            }  else {
                const currentNum = Number(listItem.slice(listItem.indexOf('(')+1,listItem.indexOf(')')));
                const newNum = Number(item.slice(item.indexOf('(')+1,item.indexOf(')')));   
                const total = currentNum + newNum;
                this.shoppingList[index][listArrayIdx] = `${itemName}(${total})`;               
            } 
        }
    }
    dequantifier(item, index){

        let itemName = item.slice(0, item.indexOf('('));
        
        // we know list already contains item but using this to find index
        const filteredList = this.shoppingList[index].filter(listItem => {
            return listItem.includes(itemName);
        });
        // if it does return the index (-1 if not)
        const listArrayIdx = this.shoppingList[index].indexOf(filteredList[0]);
        const listItem = this.shoppingList[index][listArrayIdx];

        // remove quantity of that item from list
        // this mess is to deal with if quantities are stated in grams and ml in the list.
        // check if the item is actually in the list and not been deleted individually
        if(listItem){
            if(item.slice(item.indexOf('(')+1,item.indexOf(')')).includes(' ')){
                const currentNum = Number(listItem.slice(listItem.indexOf('(')+1,listItem.lastIndexOf(' ')));
                const removeNum = Number(item.slice(item.indexOf('(')+1,item.lastIndexOf(' ')));
                const unit = item.slice(item.lastIndexOf(' ')+1,item.indexOf(')'));
                const total = currentNum - removeNum;
                // if item total then equals 0 remove from list
                if(total === 0){
                    this.shoppingList[index].splice(listArrayIdx, 1);
                } else {
                    this.shoppingList[index][listArrayIdx] = `${itemName}(${total} ${unit})`;
                }
            } else if(item.slice(item.indexOf('(')+1,item.indexOf(')')).includes('g')){
                const currentNum = Number(listItem.slice(listItem.indexOf('(')+1,listItem.lastIndexOf('g')));
                const removeNum = Number(item.slice(item.indexOf('(')+1,item.lastIndexOf('g')));
                const total = currentNum - removeNum;
                // if item total then equals 0 remove from list
                if(total === 0){
                    this.shoppingList[index].splice(listArrayIdx, 1);
                } else {
                    this.shoppingList[index][listArrayIdx] = `${itemName}(${total}g)`;
                }
            } else if (item.slice(item.indexOf('(')+1,item.indexOf(')')).includes('ml')){
                const currentNum = Number(listItem.slice(listItem.indexOf('(')+1,listItem.lastIndexOf('m')));
                const removeNum = Number(item.slice(item.indexOf('(')+1,item.lastIndexOf('m')));
                const total = currentNum - removeNum;
                // if item total then equals 0 remove from list
                if(total === 0){
                    this.shoppingList[index].splice(listArrayIdx, 1);
                } else {
                    this.shoppingList[index][listArrayIdx] = `${itemName}(${total}ml)`;
                }
            }  else {
                const currentNum = Number(listItem.slice(listItem.indexOf('(')+1,listItem.indexOf(')')));
                const removeNum = Number(item.slice(item.indexOf('(')+1,item.indexOf(')')));   
                const total = currentNum - removeNum;
                // if item total then equals 0 remove from list
                if(total === 0){
                    this.shoppingList[index].splice(listArrayIdx, 1);
                } else {
                    this.shoppingList[index][listArrayIdx] = `${itemName}(${total})`;     
                }          
            }
        }  
    }
    removeItem(listItemName, list){

        if(list === 'veg'){

            const index = 0;
            const filteredList = this.shoppingList[index].filter(listItem => {
                return listItem.includes(listItemName);
            });
            const listArrayIdx = this.shoppingList[index].indexOf(filteredList[0]);

            // remove from list
            this.shoppingList[index].splice(listArrayIdx, 1);
        } else if(list === 'shop'){

            const index = 1;
            const filteredList = this.shoppingList[index].filter(listItem => {
                return listItem.includes(listItemName);
            });
            const listArrayIdx = this.shoppingList[index].indexOf(filteredList[0]);

            // remove from list
            this.shoppingList[index].splice(listArrayIdx, 1);
        } else if(list === 'spice'){

            const index = 2;
            const filteredList = this.shoppingList[index].filter(listItem => {
                return listItem.includes(listItemName);
            });
            const listArrayIdx = this.shoppingList[index].indexOf(filteredList[0]);

            // remove from list
            this.shoppingList[index].splice(listArrayIdx, 1);
        }
    }
}

export {Recipes as default};

