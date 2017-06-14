class BookmarksController {
    constructor(BookmarksModel, CategoriesModel) {
        'ngInject'
        this.BookmarksModel = BookmarksModel;
        this.CategoriesModel = CategoriesModel;
    }

    $onInit() {
        this.BookmarksModel.getBookmarks()
            .then( results => {
                this.bookmarks = results
            } )

        // no parent inheriting, need to call service
            // also used for filter in view
            // be careful not to overwrite 'this" -- use bind

            // this means -- call this method, but call it in the context of CategoriesModel
        this.getCurrentCategory 
            = this.CategoriesModel.getCurrentCategory.bind(this.CategoriesModel);
    }
}

export default BookmarksController;