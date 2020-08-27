import Recipes from './files/recipes';
import RecipeUI from './files/ui';
import Snackbar from './files/snackbar';
import './files/styles/styles.css';

// main DOM code
const search = document.querySelector('.search-recipes input');
const searchForm = document.querySelector('.search-recipes');
const cardContainer = document.querySelector('.card-container');
const vegList = document.querySelector('.veg');
const shopList = document.querySelector('.shop');
const spiceList = document.querySelector('.spice');
const listContainer = document.querySelector('.list');
const chosenRecipeList = document.querySelector('.recipe-list');

// create recipes object
const recipeList = new Recipes();
// create UI object
const recipeUI = new RecipeUI(cardContainer, vegList, shopList, spiceList);
// create snackbar
const snackbar = new Snackbar();
snackbar.init();
// callback to display recipes
recipeList.getRecipes(data => recipeUI.render(data));

// filter recipes function
const filterList = (term) => {

    const recipeTitle = document.querySelectorAll('.recipe-title');

    Array.from(recipeTitle)
        .filter(recipe => !recipe.textContent.toLowerCase().includes(term))
        .forEach(recipe => recipe.parentElement.parentElement.classList.add('filtered'));

    Array.from(recipeTitle)
        .filter(recipe => recipe.textContent.toLowerCase().includes(term))
        .forEach(recipe => recipe.parentElement.parentElement.classList.remove('filtered'));

    };


// search capability
search.addEventListener('keyup', () => {
    let term = search.value.trim().toLowerCase();
    filterList(term);
});

searchForm.addEventListener('submit', e => {
    e.preventDefault();
});

// event listener on card container for added recipes
cardContainer.addEventListener('click', e => {
    if(e.target.classList.contains('add')){

        const addedRecipe = e.target.nextElementSibling.nextElementSibling.children[0].innerText.toLowerCase();
        const id = 1;

        recipeList.getRecipe(addedRecipe, id, shoppingList => recipeUI.addList(shoppingList, addedRecipe, chosenRecipeList));
        snackbar.show();
        searchForm.reset();
        
        let term = search.value.trim().toLowerCase();
        filterList(term);
    }
});

// event listener for delete list item
listContainer.addEventListener('click', e => {

    if(e.target.classList.contains('delete')){

        const listItemName = e.target.parentElement.innerText;
        const listItem = e.target.parentElement;
        const list = e.target.parentElement.parentElement.getAttribute('id')
        
        recipeList.removeItem(listItemName, list);
        recipeUI.removeItem(listItem);
    }
});

// event listener for delete recipe list item and subsequent items from list
chosenRecipeList.addEventListener('click', e => {
    if(e.target.classList.contains('fa-times')){

        const removedRecipeItem = e.target.parentElement;
        const removedRecipe = e.target.previousElementSibling.innerText.toLowerCase();
        const id = -1;

        recipeList.getRecipe(removedRecipe, id, shoppingList => recipeUI.removeList(shoppingList, removedRecipeItem, chosenRecipeList));
    }
});

