import template from './categories.html';
import controller from './categories.controller';
import './categories.styl';

// use ES6 shorthand syntax for object initializers
const CategoriesComponent = {
    template,
    controller,
    controllerAs: 'categoriesListCtrl'
}

export default CategoriesComponent;