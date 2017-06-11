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