import angular from 'angular';
import SaveBookmarkComponent from './save-bookmark.component';

const SaveBookmarkModule = angular.module('saveBookmark', [])
    .component('saveBookmark', SaveBookmarkComponent);

export default SaveBookmarkModule;
