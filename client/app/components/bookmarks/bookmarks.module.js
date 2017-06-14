import angular from 'angular';
import BookmarksComponent from './bookmarks.component';

const BookmarksModule = angular.module('bookmarks', [])
    .component('bookmarks', BookmarksComponent);

export default BookmarksModule;
