import angular from 'angular';
import CategoriesModule from './categories/categories.module';

const ComponentsModule = angular.module('components', [
    CategoriesModule.name /** ng1 vs. ngx **/
]);

export default ComponentsModule;

