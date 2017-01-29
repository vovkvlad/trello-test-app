const path = require('path');

module.exports = {
    context: __dirname + "/src",

    entry: {
        javascript: "./js/app.js",
        html: "./index.html"
    },

    output: {
        filename: "app.js",
        path: __dirname + "/dist"
    },

    debug: true,
    devtool: 'source-map',

    resolve: {
        extensions: ['', '.js', '.jsx', '.json'],
        root: path.resolve(__dirname, './src/js')
    },

    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loaders: ["react-hot", "babel-loader"]
            },
            {
                test: /\.html$/,
                loader: "file?name=[name].[ext]",
            },
            {
                test: /\.scss$/,
                loader: 'style!css?sourceMap!sass?sourceMap'
            }
        ]
    }
};