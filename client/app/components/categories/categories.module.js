import angular from 'angular';
import CategoriesComponent from './categories.component';

const CategoriesModule = angular.module('components.categories',[])
    .component('categories', CategoriesComponent);

export default CategoriesModule;