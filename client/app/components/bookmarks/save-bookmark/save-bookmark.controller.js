class SaveBookmarkController {
    
    $onChanges() {
        // when click edit icon, create new property
        this.editedBookmark = Object.assign({}, this.bookmark);
        // returns an object, which is a clone of editedBookmark in save-bookmark.html
    }

}

export default SaveBookmarkController;