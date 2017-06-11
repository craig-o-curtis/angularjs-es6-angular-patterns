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












