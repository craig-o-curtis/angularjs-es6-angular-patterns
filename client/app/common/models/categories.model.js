class CategoriesModel {
    constructor($q) {
        'ngInject'; // fix errors
        this.$q = $q; // assign to local variable

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
        console.log(this.currentCategory);
        return this.currentCategory;
    }
    setCurrentCategory(newCat) {
        let changed = (this.currentCategory === newCat);
        this.currentCategory = newCat;
        return changed;
    }

}

export default CategoriesModel;