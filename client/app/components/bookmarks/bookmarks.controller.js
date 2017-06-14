class BookmarksController {
    constructor(BookmarksModel, CategoriesModel) {
        'ngInject'
        this.BookmarksModel = BookmarksModel;
        this.CategoriesModel = CategoriesModel;
    }

    $onInit() {
        this.BookmarksModel.getBookmarks()
            .then( results => this.bookmarks = results );

        this.getCurrentCategory 
            = this.CategoriesModel.getCurrentCategory.bind(this.CategoriesModel);

        this.deleteBookmark = this.BookmarksModel.deleteBookmark;
        this.reset();
    }

    initNewBookmark() {
        return {
            id: null,
            title: '',
            url: '',
            category: this.CategoriesModel.getCurrentCategory().name
        };
    }

    createBookmark() {
        this.currentBookmark = this.initNewBookmark();
    }

    editBookmark(bookmark) {
        this.currentBookmark = bookmark;
    }

    saveBookmark(bookmark) {
        if (bookmark.id) {
            this.BookmarksModel.updateBookmark(bookmark);
        } else {
            this.BookmarksModel.createBookmark(bookmark);
        }
    }

    onSave(bookmark) {
        this.saveBookmark(bookmark);
        this.reset();
    }

    reset() {
        this.currentBookmark = null;
    }

}

export default BookmarksController;