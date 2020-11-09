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
                <img src="./dist/assets/img/${recipe.imgName}" class="time card-img-top" width="250" height="250">
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

            this.vegList.innerHTML = '<h6>Groceries</h6>';
            this.shopList.innerHTML = '<h6>Supermarket</h6>';
            this.spiceList.innerHTML = '<h6>Spices</h6>';
        });
    }
    addList(shoppingList, addedRecipe, chosenRecipeList){

        // push recipe name to recipe chosen list
        chosenRecipeList.firstElementChild.innerHTML += `
        <li class="badge badge-pill badge-light shadow-sm p-2 m-1" id="${addedRecipe}"><p>${addedRecipe}</p><i class="fas fa-times"></i></li>
        `;

        this.showList(shoppingList, chosenRecipeList);
    }
    removeList(shoppingList, removedRecipeItem, chosenRecipeList){

        // remove the recipe from the shopping list
        removedRecipeItem.remove();

        this.showList(shoppingList, chosenRecipeList);
    }
    showList(shoppingList, chosenRecipeList){

        // clear existing list
        this.vegList.innerHTML = '<h6>Groceries</h6>';
        this.shopList.innerHTML = '<h6>Supermarket</h6>';
        this.spiceList.innerHTML = '<h6>Spices</h6>';
        // render list to browser
        shoppingList.forEach((list, index) => {
            list.forEach(item => {
                if(index === 0){
                    if(item){
                        const html = 
                        `<li class="list-group-item d-flex justify-content-between align-items-center">
                            <span>${item}</span>
                            <i class="fas fa-trash-alt delete"></i>
                        </li>
                        `;
                        this.vegList.innerHTML += html;
                    }
                } else if(index === 1){
                    if(item){
                        const html = 
                        `<li class="list-group-item d-flex justify-content-between align-items-center">
                            <span>${item}</span>
                            <i class="fas fa-trash-alt delete"></i>
                        </li>
                        `;
                        this.shopList.innerHTML += html;
                    }
                } else if(index === 2){
                    if(item){
                        const html = 
                        `<li class="list-group-item d-flex justify-content-between align-items-center">
                            <span>${item}</span>
                            <i class="fas fa-trash-alt delete"></i>
                        </li>
                        `;
                        this.spiceList.innerHTML += html;
                    }
                }
            });
        });
    }
    removeItem(element){
        // remove item element
        element.remove();
    }
}

export {RecipeUI as default};