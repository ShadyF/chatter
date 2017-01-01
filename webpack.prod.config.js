//require our dependencies
var path = require('path');
var webpack = require('webpack');
var CleanPlugin = require('clean-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var projectRootPath = __dirname;

module.exports = {
    devtool: 'cheap-module-source-map',

    //the base directory (absolute path) for resolving the entry option
    context: __dirname,

    entry: [
        // 'webpack-dev-server/client?http://localhost:8080', // WebpackDevServer host and port
        // 'webpack/hot/only-dev-server',
        './src/app'],

    output: {
        path: path.resolve('./build/'),
        filename: "bundle.js"
    },


    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loaders: ['babel']
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract('style', 'css?modules&importLoaders=2&sourceMap1!postcss!sass?outputStyle=expanded&sourceMap=true&sourceMapContents=true')
            }
        ]
    },

    progress: true,

    resolve: {
        //tells webpack where to look for modules
        modulesDirectories: ['node_modules'],
        //extensions that should be used to resolve modules
        extensions: ['', '.js', '.jsx']
    },

    plugins: [
        //A webpack plugin to remove/clean your build folder(s) before building
        new CleanPlugin(['build'], {root: projectRootPath}),
        new ExtractTextPlugin('styles.css', {allChunks: true}),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production'),
            },
            __DEVTOOLS__: false
        }),

        // optimizations
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ]
    // devServer: {
    //     hot: true,
    //     contentBase: './',
    // },

};
