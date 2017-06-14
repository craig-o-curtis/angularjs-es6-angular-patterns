import template from './bookmarks.html';
import BookmarksController from './bookmarks.controller';
import './bookmarks.styl';

const BookmarksComponent = {
    template,
    controller: BookmarksController,
    controllerAs: 'bokmarksListCtrl'
}

export default BookmarksComponent;