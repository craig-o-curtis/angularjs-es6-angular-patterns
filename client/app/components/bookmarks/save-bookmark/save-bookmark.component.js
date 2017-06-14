import template from './save-bookmark.html';
import './save-bookmark.styl';

// this is a non-declared controller
const SaveBookmarkComponent = {
    bindings: {
        bookmark: '<',
        save: '&',
        cancel: '&'
    },
    template,
    controllerAs: 'saveBookmarkCtrl'
}

export default SaveBookmarkComponent;