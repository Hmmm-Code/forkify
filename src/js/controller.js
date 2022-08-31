import * as model from './model';
import recipeView from './views/recipeView';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

const recipeContainer = document.querySelector('.recipe');

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipe = async () => {
  try {
    const id = window.location.hash.slice(1);
    console.log(id);

    if (!id) return;
    recipeView.renderSpinner(recipeContainer);

    // 1) Loading recipe
    await model.loadRecipe(id);

    // 2) Rendering recipe
    recipeView.render(model.state.recipe);
  } catch (error) {
    alert(error);
  }
};

['hashchange', 'load'].forEach(event =>
  window.addEventListener(event, controlRecipe)
);
