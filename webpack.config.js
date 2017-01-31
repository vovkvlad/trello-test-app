const path = require('path');

module.exports = {
    context: __dirname + "/src",

    entry: {
        javascript: "./js/index.js",
        html: "./index.html"
    },

    output: {
        filename: "app.js",
        path: __dirname + "/dist",
        publicPath: '/'
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
            },
            {
                test: /\.css$/,
                loader: 'style!css'
            },
            // {
            //     test: /\.(svg|jpg|png|gif|ttf|eot|woff|woff2)$/,
            //     loader: 'file?name=[path][name].[ext]'
            // }
            {
                test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url?limit=10000&mimetype=application/font-woff"
            }, {
                test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url?limit=10000&mimetype=application/font-woff2"
            }, {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url?limit=10000&mimetype=application/octet-stream"
            }, {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                loader: "file"
            }, {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url?limit=10000&mimetype=image/svg+xml"
            }
        ]
    }
};