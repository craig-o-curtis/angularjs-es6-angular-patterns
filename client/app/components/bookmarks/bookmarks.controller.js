class BookmarksController {
    // declare locals
 
    constructor(BookmarksModel, CategoriesModel) {
        'ngInject'
        // ABOVE THE FOLD
        // this.currentBookmark;
        // this.bookmarks;
        // this.deleteBookmark; // defined in $onInit
        // ABOVE THE FOLD
        this.BookmarksModel = BookmarksModel;
        this.CategoriesModel = CategoriesModel;
    }

    $onInit() {
        this.BookmarksModel.getBookmarks()
            .then( results => this.bookmarks = results );

        this.getCurrentCategory 
            = this.CategoriesModel.getCurrentCategory.bind(this.CategoriesModel);
        
        /** sets local ctrl method to an outside service method */
            /** no need to specify params here */
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

    // another way to redefine a method declared in $onInit
    // deleteBookmark() {
    //     return this.deleteBookmark();
    // }

    createBookmark() {
        this.currentBookmark = this.initNewBookmark();
    }

    editBookmark(bookmark) {
        console.log('edit clicked')
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
        // needs to communicate to child save-bookmark cmp that this current bookmark is now null
    }

}

export default BookmarksController;