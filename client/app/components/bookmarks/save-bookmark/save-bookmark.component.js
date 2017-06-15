import template from './save-bookmark.html';
import SaveBookmarkController from './save-bookmark.controller';
import './save-bookmark.styl';

// this is a non-declared controller
const SaveBookmarkComponent = {
    bindings: {
        bookmark: '<',
        save: '&',
        cancel: '&'
    },
    template,
    controller: SaveBookmarkController,
    controllerAs: 'saveBookmarkCtrl'
}

export default SaveBookmarkComponent;