//require our dependencies
var path = require('path');
var webpack = require('webpack');

module.exports = {
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

    plugins: [
        // new webpack.HotModuleReplacementPlugin()
    ],

    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                // loaders: ['react-hot', 'babel']
                loaders: ['babel']
            },
            {
                test: /\.css$/,
                loader: "style!css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]"
            },
            {
                test: /\.scss$/, loaders: [
                'style-loader',
                'css-loader?modules&importLoaders=2&sourceMap&localIdentName=[name]__[local]___[hash:base64:5]',
                'postcss-loader',
                'sass-loader?outputStyle=expanded&sourceMap']
            }
        ]
    },

    resolve: {
        //tells webpack where to look for modules
        modulesDirectories: ['node_modules'],
        //extensions that should be used to resolve modules
        extensions: ['', '.js', '.jsx']
    },

    // devServer: {
    //     hot: true,
    //     contentBase: './',
    // },

    devtool: 'source-map'
};
