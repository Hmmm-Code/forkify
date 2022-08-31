import * as model from './model';
import recipeView from './views/recipeView';
import searchView from './views/searchView';
import resultView from './views/resultView';
import paginationView from './views/paginationView';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

if (module.hot) {
  module.hot.accept();
}

const controlRecipe = async () => {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;
    recipeView.renderSpinner();

    // 1) Loading recipe
    await model.loadRecipe(id);

    // 2) Rendering recipe
    recipeView.render(model.state.recipe);
  } catch (error) {
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    resultView.renderSpinner();

    // 1) Get Search Query
    const query = searchView.getQuery();
    if (!query) return;
    // 2) Load Search Results
    await model.loadSearchResults(query);

    // 3) Render Results

    resultView.render(model.getSearchResultsPage());

    // 4) Render initail pagination button
    paginationView.render(model.state.search);
  } catch (error) {}
};

const controlPagination = function (gotoPage) {
  // 3) Render new Results

  resultView.render(model.getSearchResultsPage(gotoPage));

  // 4) Render new pagination button
  paginationView.render(model.state.search);
};

const init = function () {
  recipeView.addHandlerRender(controlRecipe);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
};
init();
