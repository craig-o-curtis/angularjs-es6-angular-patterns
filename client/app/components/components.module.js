import angular from 'angular';
import CategoriesModule from './categories/categories.module';
import BookmarksModule from './bookmarks/bookmarks.module';

const ComponentsModule = angular.module('components', [
    CategoriesModule.name, /** ng1 vs. ngx **/
    BookmarksModule.name
]);

export default ComponentsModule;

