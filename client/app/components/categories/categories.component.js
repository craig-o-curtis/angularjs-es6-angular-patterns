import template from './categories.html';
// import controller from './categories.controller'; // shorthand, but less semantic
import CategoriesController from './categories.controller';
import './categories.styl';

const CategoriesComponent = {
    template,
    // controller, // shorthand, but less semantic
    controller: CategoriesController,
    controllerAs: 'categoriesListCtrl'
};

export default CategoriesComponent;
