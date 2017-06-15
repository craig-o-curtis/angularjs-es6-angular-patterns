## Angular patterns in AngularJS


// Notes

From original project:
https://github.com/simpulton/eggly-es6/tree/00-start


/************************** Webpack Setup **************************/

## Commit cc-01-compiling - Setting up Webpack 

Build System - Webpack
Language - ES6
Angular - 1.5.7

// git branch 01-compiling
Using Webpack

### setup webpack.config.js
$ touch webpack.config.js
```
module.exports = {
    devtool: 'sourcemap', 
    output: {
        filename: 'bundle.js'
    },
    // define how to load modules
    module: {
        loaders: [
            { test: /\.js$/, exclude: [/node_modules/], loader: 'ng-annotate!babel' }, // grab js, not node_modules, get ng-annotate and babel
            { test: /\.html$/, loader: 'raw' }, // takes raw content of HTML file and puts it in bundle
            { test: /\.css$/, loader: 'style!css' },  // take css and resolve it
            { test: /\.styl$/, loader: 'style!css!stylus' }, // add it in a style tag in the DOM
            { test: /\.(ttf|otf|eot|svg|woff(2)?)$/, loader: 'url' } // grab assets SVGS, fonts, etc. and generate a URL for it
        ]
    }
};
```

### In gulpfile.babel.js ---
1. import webpack-stream
2. create a webpack task
3. add webpack task
4. add webpack task to default and watch tasks
```
'use strict';

import gulp     from 'gulp';
import webpack  from 'webpack-stream'; // add webpack - -stream can communicate with webpack
import path     from 'path';
import sync     from 'run-sequence';
import browserSync    from 'browser-sync';

let reload = () => browserSync.reload();
let root = 'client';

// helper method for resolving paths
let resolveToApp = (glob) => {
  glob = glob || '';
  return path.join(root, 'app', glob); // app/{glob}
};

// map of all paths
let paths = {
  js: resolveToApp('**/*!(.spec.js).js'), // exclude spec files
  styl: resolveToApp('**/*.styl'), // stylesheets
  html: [
    resolveToApp('**/*.html'),
    path.join(root, 'index.html')
  ],
  entry: path.join(root, 'app/app.js'),
  output: root
};

gulp.task('reload', done => {
  reload();
  done()
});

gulp.task('webpack', () => {
  return gulp.src(paths.entry)
    .pipe(webpack(require('./webpack.config'))) // take all files from entry point, pass to webpack with webpack.config.js file
    .pipe(gulp.dest(paths.output)); // take bundje.js output and send to output
    // add this to default task and watch task
});

gulp.task('serve', () => {
  browserSync({
    port: process.env.PORT || 3000,
    open: false,
    server: { baseDir: root }
  });
});

gulp.task('watch', ['serve'], () => {
  let allPaths = [].concat([paths.js], paths.html, [paths.styl]);
  gulp.watch(allPaths, ['webpack', 'reload']);
});

// gulp.task('default', ['watch']); // original default
gulp.task('default', (done) => {
  sync('webpack', 'serve', 'watch', done)
});
```

5. Create new app.js file to verify this works
```
// client/app/app.js
console.log('testing');
```
6. include bundle.js in index.html
```
<script src="bundle.js"></script>
```
7. test in browser with npm start

/************************** Root Component **************************/

## Commit cc-02-root-component

No longer use ng-app, but boostrap to top-level component
$ touch client/app/app.html
$ touch client/app/app.styl
$ touch client/app/app.component.js

This syntax follows Angular's closely, importing packages up top and using Es6/TS-esque syntax.
** Notice inclusiion of bootstrap-css-only and normalize here
** Notice use of ng-strict-di in index.html for DI-safe syntax

/************************** Root Component **************************/

## Commit cc-03-subcomponents

Organize components by feature
$ mkdir client/app/components // note - can only make one new dir at a time
$ mkdir client/app/components/categories

// Make modure for that feature (make following files)
// touch client/app/components/categories/categories.module.js
Angular ES6 Component
1. module
2. component as class
3. template
4. styles

Simple Template Component Structure:
1. Import template and styles
2. Declare const as a component 
?? How do the styles get hooked in ??

```
import template from './categories.html';
import './categories.styl';

const CategoriesComponent = {
    template
}

export default CategoriesComponent;
```

Module Setup for CategoriesComponent:
This may look strange with both module and component, but this is the module meant to just connect the component to this parent module.
1. Import angular
2. Import the component
3. Do typical angularjs setup, but put into a constant, and export
4. Note - default export ensures only one export for this file/module

```
// categories.module.js
import angular from 'angular';
import CategoriesComponent from './categories.component';

const CategoriesModule = angular.module('components.categories',[])
    .component('categories', CategoriesComponent);

export default CategoriesModule;
```

Create a module for all component modules
1. Create new components.module.js file
2. Notice the .name, unlike Angular 2+
```
import angular from 'angular';
import CategoriesModule from './categories/categories.module';

const ComponentsModule = angular.module('components', [
    CategoriesModule.name /** ng1 vs. ngx **/
]);

export default ComponentsModule;
```

/************************** Component Controllers **************************/

## Commit cc-04-component-controllers
Using ES6 classes to make controllers

1. Make new file for categories.controller.js
2. Class Structure
  - constructor
    - init default MOCK data --- not for API calls, like ngx
  - onInit ...
  - onDestroy ...
3. Export as default
```
class CategoriesController {
    constructor() {
        this.categories = [
            {"id": 0, "name": "Development"},
            {"id": 1, "name": "Design"},
            {"id": 2, "name": "Exercise"},
            {"id": 3, "name": "Humor"}
        ];
    }
}

export default CategoriesController;
```

4. Import from component, using shorthand object initializers
```
import template from './categories.html';
// import controller from './categories.controller'; // shorthand, but less semantic
import CategoriesController from './categories.controller';
import './categories.styl';

const categoriesComponent = {
  template,
  // controller, // shorthand, but less semantic
  controller: CategoriesController,
  controllerAs: 'categoriesListCtrl'
};

export default categoriesComponent;

```

5. Hook up the ng-repeater in the template
```
<div>
	<a>
		<img class="logo" src="assets/img/eggly-logo.png">
	</a>
	<ul class="nav nav-sidebar">
		<li class="category-item"
			ng-repeat="category in categoriesListCtrl.categories">{{category.name}}</li>
	</ul>
</div>
```


/************************** Services **************************/

## Commit cc-05-creating-services
** Everything is just a class- controllers, services (not components and modules though...)

1. Create common/models // going with this for now, even though this is a service
```
class CategoriesModel {
    constructor() {
        this.categories = [
            {"id": 0, "name": "Development"},
            {"id": 1, "name": "Design"},
            {"id": 2, "name": "Exercise"},
            {"id": 3, "name": "Humor"}
        ];
    }
}

export default CategoriesModel;
```

2. Create module for common
```
import angular from 'angular';
import CategoriesModel from './models/categories.model';

const CommonModule = angular.module('common', [])
    .service('CategoriesModel', CategoriesModel);

export default CommonModule;
```

3. Import in app.js
```
    ...
    import CommonModule from './common/common.module';
    ...
        CommonModule.name
    ...
```
 
4. Change categories controller to use this 'service' model
- Like ngx, inject services in the constructor.
- use 'ngInject'; to fix strict mode error to resolve dependencies
```
class CategoriesController {
    // inject models/services in constructor
    constructor(CategoriesModel) {
        'ngInject'; // needed in strict mode
        this.categories = CategoriesModel.categories; // mock data, not HTTP call
    }
}

export default CategoriesController;
```

/************************** Dependency Injection **************************/

## Commit cc-06-dependency-injection

Note on Functions
- add directly to class rather than using function keyword
```
    add(category) {
        this.category = category;
    }
    returnCategory() {
        return this.category; // this refers to the class
    }
```

Using the $q service
1. Inject in constructor
2. Use 'ngInject'
3. Assign to class via this.
4. Resolve with this.$q.when()

```
// categories.model.js
class CategoriesModel {
    'ngInject'; // fix errors
    this.$q = $q; // assign to local variable
    constructor($q) {
        ...
    }
    
    getCategories() {
        return this.$q.when(this.categories);
    }
```
5. Consume the promise in the controller
``` 
class CategoriesController {
    constructor(CategoriesModel) {
        'ngInject';
        CategoriesModel.getCategories()
            .then( result => this.categories = result);
    ...
```

/************************** Dumb Components **************************/
## Commit cc-07-lifecycle-hooks // yes, part of this commit

// Dumb components
- have no logic
- only talk to view and 
- only relate user events back to parent component
* makes testing easier to pinpoint

Example of dumb component, no controller
- Data is pumped in 
- It displays the data
- That's it, no logic

1. Create the dumb component
```
// category-item.component.js
import template from './category-item.html';
import './category-item.styl';

const CategoryItemComponent = {
    bindings: {
      category: '<' // one-way data-binding
    },
    template,
    controllerAs: 'categoryItemCtrl' // no controller, but use controllerAs to attach to bindings in the view
};

export default CategoryItemComponent;
```

2. create the dumb module
```
import angular from 'angular';
import CategoriesComponent from './categories.component';
import CategoryItemModule from './category-item/category-item.module';

const CategoriesModule = angular.module('components.categories',[
    CategoryItemModule.name
]).component('categories', CategoriesComponent);

export default CategoriesModule;
```

3. import the dumb child into the smart parent
```
// categories.module.js
...
import CategoryItemModule from './category-item/category-item.module';

const CategoriesModule = angular.module('components.categories',[
    CategoryItemModule.name
])...
```

4. Update the smart parent's template to use the new child component
- Change: 
```
<li class="category-item"
			ng-repeat="category in categoriesListCtrl.categories">{{category.name}}</li>
```

- To:
```
		<li ng-repeat="category in categoriesListCtrl.categories">
			<category-item category="category"></category-item>
		</li>
```

// Talk to parent
1. Use & syntax, define method
```
// category-item.component.js
...
  bindings: {
    category: '<', // one-way data-binding
    selected: '&' // talk to parent
  },
...
```

2. Send object back up to parent
```
// category-item.html
...
    ng-click="categoryItemCtrl.selected({category:categoryItemCtrl.category})"
...
```

3. Capture selected event from parent
```
// categories.html
...
    <category-item
        category="category"
        selected="categoriesListCtrl.onCategorySelected(category)"></category-item>
...
```

6. Define on- event in parent controller
```
// categories.controller.js

```




/************************** Lifecycle Hooks **************************/
## Commit cc-07-lifecycle-hooks

constructor( ) {}
- 

$onChanges() { }
- fired first, even before $onInit
- fired after any controller changes

$onInit() { }
- for API data
- ** don't load API data in constructor

postLink() { }
$destroy() { }


$onInit Example: 
```
// categories.controller.js
    ...
    constructor(CategoriesModel) {
        'ngInject'; 
        this.CategoriesModel = CategoriesModel;
    }
    
    $onInit() {
        this.CategoriesModel.getCategories()
            .then( result => this.categories = result );
    }
    ...
```





/************************** Connected Presentational Components **************************/

## Commit cc-08-connected-presentational-components 

// Nothing in videos, skipped ahead to .bind() next commit

/************************** Binding to Models with .bind() **************************/

## Commit cc-09-binding-to-models

1. Issue -- 'this' losing its reference
2. Solution - .bind()
```
// broken this example
class BookmarksController {
    ...
    $onInit() {
        ...
        this.getCurrentCategory 
            // 'this' causes error, conflict of 'this' in CategoriesModel vs. BookmarsController
            = this.CategoriesModel.getCurrentCategory();
        ...
```

```
// fixed reference with .bind(original.model/controller)
class BookmarksController {
    ...
    $onInit() {
        ...
        /** this.OutsideService.Method.bind(this.OutsideService) **/
        this.getCurrentCategory 
            = this.CategoriesModel.getCurrentCategory.bind(this.CategoriesModel);
        ...
```


/************************** Isloating State Mutations **************************/

## Commit cc-10-isloating-state-mutations

// How to isolate mutable state within an component, like AngularX

### Using Lodash
1. Import the methods you want!
2. Use the methods, without the _!
```
import { uniqueId, findIndex, remove } from 'lodash';
...
    createBookmark(bookmark) {
        bookmark.id = uniqueId();
        this.bookmarks.push(bookmark);
    }

    updateBookmark(bookmark) {
        const index = findIndex(this.bookmarks, b => b.id === bookmark.id);
        this.bookmarks[index] = bookmark;
    }
    
...
```


#### Using outside service methods locally
1. Set a this.method in the $onInit to an outside service method
2. No need to handle params in the calling ctrl
```
    // bookmarks.controller.js
    $onInit() {
        ...
        /** sets local ctrl method to an outside service method */
            /** no need to specify params here */
        this.deleteBookmark = this.BookmarksModel.deleteBookmark;
        ...
    }
```

3. BUT REMEMBER to pass the param from the view :
``` 
// bookmarks.html
...
    <button type="button" class="close"
        ng-click="bookmarksListCtrl.deleteBookmark(bookmark)">
...
```

4. Handle the params from that pulled-in service
```
// bookmarks.model.js
    ...
    deleteBookmark(bookmark) {
        alert('deeleeteed ', bookmark);
        remove(this.bookmarks, b => b.id === bookmark.id);
    }
    ...
```

### Best Practice - Above the Fold
- Some of the methods and properties not explicitly declared get lost in teh code. 
- These methods get defined deep within the code, and are not easily readable.
    // bookmarks.controller.js
    * this.currentBookmark
    * this.bookmarks
    * this.deleteBookmark
- Therefore, using John Papa's idea of Above the Fold, a way to handle this is just declare (not assign) the methods and props implicitely defined inside teh constructor.
```
    // bookmarks.controller.js
    constructor(BookmarksModel, CategoriesModel) {
        'ngInject'
        // ABOVE THE FOLD
        this.currentBookmark;
        this.bookmarks;
        this.deleteBookmark;
        // ABOVE THE FOLD
        ...
    }
```
OR - for methods, you could redefine them as follows:
```
    // another way to redefine a method declared in $onInit
    deleteBookmark() {
        return this.deleteBookmark();
    }
```



Avoid 2-way binding --- Change and Save or Discard
1. Create save-bookmark.controller.js with $onChanges
```
    $onChanges() {
        // when click edit icon, create new property
        this.editedBookmark = Object.assign({}, this.bookmark);
        // returns an object, which is a clone of editedBookmark in save-bookmark.html
    }
```

This local editedBookmark new object can be used in updating form on separate object in save-bookmark.html
* compare saveBookmarkCtrl.bookmark vs. saveBookmarkCtrl.editedBookmark
```
<div class="save-bookmark">
    <h4 ng-if="!saveBookmarkCtrl.bookmark.id">Create a bookmark in 
        <span class="text-muted">{{saveBookmarkCtrl.bookmark.category}}</span>
    </h4>

    <h4 ng-if="saveBookmarkCtrl.bookmark.id">Editing {{saveBookmarkCtrl.bookmark.title}}</h4>

    <form role="form" class="edit-form" novalidate
        ng-submit="saveBookmarkCtrl.save({bookmark: saveBookmarkCtrl.editedBookmark })" >
        <!-- Title -->
        <div class="form-group">
            <label for="bookmarkTitle">Bookmark Title</label>
            <input type="text" id="bookmarkTitle" class="form-control"
                ng-model="saveBookmarkCtrl.editedBookmark.title" placeholder="Enter title">
        </div>
        <!-- URL -->
        <div class="form-group">
            <label for="bookmarkUrl">Bookmark URL</label>
            <input type="text" id="bookmarkUrl" class="form-control"
                ng-model="saveBookmarkCtrl.editedBookmark.url" placeholder="Enter URL">
        </div>

        <!-- Actions -->
        <button type="submit" class="btn btn-info btn-lg">Save</button>
        <button type="button" class="btn btn-default btn-lg pull-right"
            ng-click="saveBookmarkCtrl.cancel()">Cancel</button>
    </form>
</div>
```

/************************** Event Bus **************************/

## Commit cc-11-event-bus
** 















