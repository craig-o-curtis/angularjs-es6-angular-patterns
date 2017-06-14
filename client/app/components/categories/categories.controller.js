class CategoriesController {
    // inject models/services in constructor
    constructor(CategoriesModel) {
        'ngInject'; // needed in strict mode to resolve dependencies

        // Set service to local method
        this.CategoriesModel = CategoriesModel;
        console.log('constructor');
    }

    // onInit for loading API data / promised dta
    $onInit() {
        console.log('$onInit fired');
        this.CategoriesModel.getCategories()
            .then( result => this.categories = result );
    }

    $onChanges() {
        console.log('$onChanges fired');
    }

    $doCheck() {
        console.log('doCheck called');
    }

    $preLink() {
        console.log('prelink called');
    }

    $postLink() {
        console.log('postLink called');
    }

    $afterViewInit() {
        console.log('afterview init');
    }


    $onDestroy() {
        console.log('destroy');
    }


    // listen for event from child component via '&'
    onCategorySelected(category) {
        console.log(`You clicked ${category.name}`);
    }
}

export default CategoriesController;