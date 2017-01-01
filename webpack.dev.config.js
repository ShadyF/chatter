//require our dependencies
var path = require('path');
var webpack = require('webpack');

module.exports = {
    devtool: 'inline-source-map',

    //the base directory (absolute path) for resolving the entry option
    context: __dirname,

    entry: [
        'webpack-dev-server/client?http://localhost:8080', // WebpackDevServer host and port
        'webpack/hot/only-dev-server',
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
                // loaders: ['react-hot', 'babel']
                loaders: ['react-hot', 'babel']
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

    plugins: [
        new webpack.DefinePlugin({
            __DEVTOOLS__: true  // Enable react-devtools chrome extension
        }),
    ],
    // devServer: {
    //     hot: true,
    //     contentBase: './',
    // },

};
