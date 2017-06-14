import angular from 'angular';
import BookmarksComponent from './bookmarks.component';
import SaveBookmarkModule from './save-bookmark/save-bookmark.module';

const BookmarksModule = angular.module('bookmarks', [
    SaveBookmarkModule.name
])
    .component('bookmarks', BookmarksComponent);

export default BookmarksModule;
