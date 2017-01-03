//require our dependencies
var path = require('path');
var webpack = require('webpack');
var CleanPlugin = require('clean-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

//the base directory (absolute path) for resolving the entry option
var projectRootPath = __dirname;

module.exports = {
    devtool: 'cheap-module-source-map',

    context: projectRootPath,

    entry: ['./src/app'],

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
                test: /\.css$/,
                loader: "style!css?modules"
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract('style', 'css?modules&importLoaders=2&sourceMap1!postcss!sass?outputStyle=expanded&sourceMap=true&sourceMapContents=true')
            },
            {test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url?limit=10000&mimetype=application/font-woff"},
            {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream"},
            {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file"},
            {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=image/svg+xml"},
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

        // Extract css styles into a separate file
        new ExtractTextPlugin('styles.css', {allChunks: true}),

        // Make node_env switch to production, drastically decreases bundle size
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production'),
            },
            __DEVTOOLS__: false
        }),

        new HtmlWebpackPlugin({
            filename: '../index.html',
            template: 'template.html',
            inject: 'body'
        }),

        // optimizations
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            comments: false,
            minimize: true // not needed since we use the -p flag in npm run build
        })
    ]
};
