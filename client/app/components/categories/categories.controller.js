class CategoriesController {
    // inject models/services in constructor
    constructor(CategoriesModel) {
        'ngInject'; // needed in strict mode to resolve dependencies
        // this.categories = CategoriesModel.categories; // mock data, not HTTP call
        
        // with a promise
        CategoriesModel.getCategories()
            .then( result => this.categories = result );
    }

}

export default CategoriesController;