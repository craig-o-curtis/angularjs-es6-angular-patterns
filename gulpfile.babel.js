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

