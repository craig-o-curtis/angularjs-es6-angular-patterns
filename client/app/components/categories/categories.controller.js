class CategoriesController {
    // inject models/services in constructor
    constructor(CategoriesModel) {
        'ngInject'; // needed in strict mode to resolve dependencies
        // Set service to local method
        this.CategoriesModel = CategoriesModel;
    }

    $onChanges() { }

    // onInit for loading API data / promised dta
    $onInit() {
        console.log('$onInit fired');
        this.CategoriesModel.getCategories()
            .then( result => this.categories = result );
    }

    $postLink() { }
    $doCheck() { }

    $onDestroy() {
        console.log('destroy');
    }


    // listen for event from child component via '&'
    onCategorySelected(category) {
        console.log(`You clicked ${category.name}`);
    }
}

export default CategoriesController;