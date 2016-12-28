//require our dependencies
var path = require('path');
var webpack = require('webpack');

module.exports = {
    //the base directory (absolute path) for resolving the entry option
    context: __dirname,

    entry: ['./src/app'],

    output: {
        path: path.resolve('./build/'),
        filename: "bundle.js"
    },

    plugins: [],

    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'es2015']
                }
            },
            {test: /\.css$/, loader: "style!css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]"},
            {test: /\.scss$/, loader: 'style!css?modules&importLoaders=2&sourceMap&localIdentName=[name]__[local]___[hash:base64:5]!sass?outputStyle=expanded&sourceMap'}
        ]
    },

    resolve: {
        //tells webpack where to look for modules
        modulesDirectories: ['node_modules'],
        //extensions that should be used to resolve modules
        extensions: ['', '.js', '.jsx']
    },

    devtool: 'source-map'
};
