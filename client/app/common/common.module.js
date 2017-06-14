import angular from 'angular';
import CategoriesModel from './models/categories.model';
import BookmarksModel from './models/bookmarks.model';

const CommonModule = angular.module('common', [])
    .service('CategoriesModel', CategoriesModel)
    .service('BookmarksModel', BookmarksModel);

export default CommonModule;