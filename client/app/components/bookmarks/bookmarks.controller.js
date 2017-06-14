class BookmarksController {
    constructor(BookmarksModel) {
        'ngInject'
        this.BookmarksModel = BookmarksModel;
    }

    $onInit() {
        this.BookmarksModel.getBookmarks()
            .then( results => this.bookmarks = results )
    }

}

export default BookmarksController;