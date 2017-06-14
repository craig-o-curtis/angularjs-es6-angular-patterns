class BookmarksController {
    constructor(BookmarksModel) {
        'ngInject'
        this.BookmarksModel = BookmarksModel;
    }

    $onInit() {
        this.BookmarksModel.getBookmarks()
            .then( results => {
                this.bookmarks = results
                console.log('results')
                console.log(this.bookmarks);
            } )
    }

}

export default BookmarksController;