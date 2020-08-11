// pass recipes and display in card

class RecipeUI {
    constructor(cardContainer, vegList, shopList, spiceList){
        this.cardContainer = cardContainer;
        this.vegList = vegList;
        this.shopList = shopList;
        this.spiceList = spiceList;
        this.vegArray = new Array();
        this.shopArray = new Array();
        this.spiceArray = new Array();
    }
    render(data){

        data.forEach(recipe => {
            const html = 
            `<div class="card shadow-lg rounded my-1 mx-auto">
                <img src="assets/img/${recipe.imgName}" class="time card-img-top" width="250" height="250">
                <i class="far fa-plus-square fa-2x add"></i>
                <div class="icon bg-light mx-auto text-centre">
                    <img src="" alt="">
                </div>
                <div class="text-muted text-uppercase text-center details">
                    <h6 class="my-2 recipe-title">${recipe.title}</h6>
                    <div class="my-1">${recipe.type}</div>
                </div>
            </div>
            `;
    
            this.cardContainer.innerHTML += html;
        });
    }

    getList(data, addedRecipe, chosenRecipeList){

        // push recipe name to recipe chosen list
        chosenRecipeList.firstElementChild.innerHTML += `
            <li class="${addedRecipe} badge badge-pill badge-light shadow-sm p-2 m-1"><p>${addedRecipe}</p><i class="fas fa-times"></i></li>
            `;

        // get shopping list
        data.forEach(recipe => {
            if(recipe.title === addedRecipe){

                // veg list sorting
                if(this.vegArray.length == 0){
                    this.vegArray = recipe.vegIngredients;
                } else {
                    recipe.vegIngredients.forEach(item => {
    
                        let added = 0;
    
                        this.vegArray.forEach((listItem, index) => {
                            if (item.includes('(')){
                                if(listItem.includes(item.slice(0, item.indexOf('(')).trim())){
                                    const listItemName = listItem.slice(0, listItem.indexOf('('));
                                    if(listItem.slice(listItem.indexOf('(')+1,listItem.indexOf(')')).includes('g')){
                                        const currentNum = Number(listItem.slice(listItem.indexOf('(')+1,listItem.lastIndexOf('g')));
                                        const newNum = Number(item.slice(item.indexOf('(')+1,item.lastIndexOf('g')));
                                        const total = currentNum + newNum;
                                        this.vegArray[index] = `${listItemName}(${total}g)`;
                                        added ++;
                                    } else {
                                        const currentNum = Number(listItem.slice(listItem.indexOf('(')+1,listItem.indexOf(')')));
                                        const newNum = Number(item.slice(item.indexOf('(')+1,item.indexOf(')')));   
                                        const total = currentNum + newNum;
                                        this.vegArray[index] = `${listItemName}(${total})`;
                                        added ++;                
                                    }                                                                         
                                }
                            }
                        });
                        if (!this.vegArray.includes(item) && !item.includes('(')) {
                            this.vegArray.push(item);
                        } else if(item.includes('(') && added === 0){
                            this.vegArray.push(item);
                        }                
                    });
                }
                
                // display veg list
                this.vegList.innerHTML = '<h6>Groceries</h6>';
                this.vegArray.forEach(item => {
                    if(item){
                    const vegHTML = 
                    `<li class="list-group-item d-flex justify-content-between align-items-center">
                        <span>${item}</span>
                        <i class="fas fa-trash-alt delete"></i>
                    </li>
                    `;
    
                    this.vegList.innerHTML += vegHTML;
                    }
                });
    
                // shop list sorting
                if(this.shopArray.length == 0){
                    this.shopArray = recipe.shopIngredients;
                } else {
                    recipe.shopIngredients.forEach(item => {
    
                        let added = 0;
    
                        this.shopArray.forEach((listItem, index) => {
                            if (item.includes('(')){
                                if(listItem.includes(item.slice(0, item.indexOf('(')).trim())){
                                    const listItemName = listItem.slice(0, listItem.indexOf('('));
                                    if(listItem.slice(listItem.indexOf('(')+1,listItem.indexOf(')')).includes('g')){
                                        const currentNum = Number(listItem.slice(listItem.indexOf('(')+1,listItem.lastIndexOf('g')));
                                        const newNum = Number(item.slice(item.indexOf('(')+1,item.lastIndexOf('g')));
                                        const total = currentNum + newNum;
                                        this.shopArray[index] = `${listItemName}(${total}g)`;
                                        added ++;
                                    } else if (listItem.slice(listItem.indexOf('(')+1,listItem.indexOf(')')).includes('ml')){
                                        const currentNum = Number(listItem.slice(listItem.indexOf('(')+1,listItem.lastIndexOf('m')));
                                        const newNum = Number(item.slice(item.indexOf('(')+1,item.lastIndexOf('m')));
                                        const total = currentNum + newNum;
                                        this.shopArray[index] = `${listItemName}(${total}ml)`;
                                        added ++;
                                    } else {
                                        const currentNum = Number(listItem.slice(listItem.indexOf('(')+1,listItem.indexOf(')')));
                                        const newNum = Number(item.slice(item.indexOf('(')+1,item.indexOf(')')));   
                                        const total = currentNum + newNum;
                                        this.shopArray[index] = `${listItemName}(${total})`;
                                        added ++;                
                                    }                                                                         
                                }
                            }
                        });
                        if (!this.shopArray.includes(item) && !item.includes('(')) {
                            this.shopArray.push(item);
                        } else if(item.includes('(') && added === 0){
                            this.shopArray.push(item);
                        }                
                    });
                }
    
                // display shop list
                this.shopList.innerHTML = '<h6>Supermarket</h6>';
                this.shopArray.forEach(item => {
                    if(item){
                    const shopHTML = 
                    `<li class="list-group-item d-flex justify-content-between align-items-center">
                        <span>${item}</span>
                        <i class="fas fa-trash-alt delete"></i>
                    </li>
                    `;
    
                    this.shopList.innerHTML += shopHTML;
                    }
                });
    
                // spice list sorting
                if(this.spiceArray.length == 0){
                    this.spiceArray = recipe.spiceIngredients;
                } else {
                    recipe.spiceIngredients.forEach(item => {
    
                        let added = 0;
    
                        this.spiceArray.forEach((listItem, index) => {
                            if (item.includes('(')){
                                if(listItem.includes(item.slice(0, item.indexOf('(')).trim())){
                                    const listItemName = listItem.slice(0, listItem.indexOf('('));
                                    const currentNum = Number(listItem.slice(listItem.indexOf('(')+1,listItem.indexOf(')')));
                                    const newNum = Number(item.slice(item.indexOf('(')+1,item.indexOf(')')));   
                                    const total = currentNum + newNum;
                                    this.spiceArray[index] = `${listItemName}(${total})`;
                                    added ++;                
                                    }                                                                         
                                }
                        });
                        if (!this.spiceArray.includes(item) && !item.includes('(')) {
                            this.spiceArray.push(item);
                        } else if(item.includes('(') && added === 0){
                            this.spiceArray.push(item);
                        }                
                    });
                }
    
                // display spice list
                this.spiceList.innerHTML = '<h6>Spices</h6>';
                this.spiceArray.forEach(item => {
                    if(item){
                        
                    const spiceHTML = 
                    `<li class="list-group-item d-flex justify-content-between align-items-center">
                        <span>${item}</span>
                        <i class="fas fa-trash-alt delete"></i>
                    </li>
                    `;
    
                    this.spiceList.innerHTML += spiceHTML;
                    }
                });
            }
        });

    }
    removeItem(element, array){
        
        if(array === 'veg'){
            this.vegArray = this.vegArray.filter(item => item !== element.textContent.trim());
        } else if(array === 'shop'){
            this.shopArray = this.shopArray.filter(item => item !== element.textContent.trim());
        } else if(array === 'spice'){
            this.spiceArray = this.spiceArray.filter(item => item !== element.textContent.trim());
        }
        element.remove();
    }
    removeRecipeItem(item){
        item.remove();

        // TODO - remove all list items relevant to the recipe.
    }
}

export {RecipeUI as default};