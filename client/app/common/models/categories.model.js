class CategoriesModel {
    constructor($q, $rootScope) {
        'ngInject'; // fix errors
        this.$q = $q; // assign to local variable
        this.$rootScope = $rootScope; // to track state

        // mechanism to store current category
        this.currentCategory = null;

        this.categories = [
            {"id": 0, "name": "Development"},
            {"id": 1, "name": "Design"},
            {"id": 2, "name": "Exercise"},
            {"id": 3, "name": "Humor"}
        ];
    }

    getCategories() {
        return this.$q.when(this.categories);
    }

    getCurrentCategory() {
        // need to use .bind() from calling controller
        return this.currentCategory;
    }
    setCurrentCategory(newCat) {
        let changed = (this.currentCategory === newCat);
        this.currentCategory = newCat;
        this.$rootScope.$broadcast('onCurrentCategoryUpdated'); // broadcast event
        return changed;
    }

}

export default CategoriesModel;