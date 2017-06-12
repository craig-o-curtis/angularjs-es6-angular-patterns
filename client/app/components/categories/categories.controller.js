class CategoriesController {
    // inject models/services in constructor
    constructor(CategoriesModel) {
        'ngInject'; // needed in strict mode to resolve dependencies
        this.categories = CategoriesModel.categories; // mock data, not HTTP call
    }
}

export default CategoriesController;