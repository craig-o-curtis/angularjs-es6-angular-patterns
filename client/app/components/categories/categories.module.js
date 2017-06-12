import angular from 'angular';
import CategoriesComponent from './categories.component';
import CategoryItemModule from './category-item/category-item.module';

const CategoriesModule = angular.module('components.categories',[
    CategoryItemModule.name
]).component('categories', CategoriesComponent);

export default CategoriesModule;