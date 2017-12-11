const webpack = require("webpack");
const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CleanWebpack = require("clean-webpack-plugin");
const UglifyWebpack = require("uglifyjs-webpack-plugin");

let pathsToClean = [
    "dist/css",
    "dist/images",
    "dist/js"
];
let cleanOptions = {
    root: __dirname,
    verbose: true,
    dry: false
}

module.exports = {
    entry: {
        app: [
            "./resources/js/main.js",
            "./resources/sass/main.scss"
        ]
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        publicPath: "dist/",
        filename: "js/[name].js"
    },
    devServer: {
        contentBase: __dirname,
        compress: true,
        port: 9000
    },

    module: {
        rules: [
            {
                test: /\.s[ac]ss$/,
                use: ExtractTextPlugin.extract({
                    use: ["css-loader","sass-loader"]
                })
            },
            {
                test: /\.(png|jpg|gif)$/,
                loader: "file-loader",
                options: {
                    name: "images/[name]-[hash].[ext]",
                    publicPath: "../"
                }
            },
            {
                test: /\.js$/,
                exclude: "/node_modules/",
                use: "babel-loader"
            }
        ]
    },

    plugins: [
        new ExtractTextPlugin("css/[name].css"),
        new CleanWebpack(pathsToClean, cleanOptions)
    ]
}

if (process.env.NODE_ENV == "production") {
    module.exports.plugins.push(new UglifyWebpack());
}