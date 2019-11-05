const webpack = require('webpack')
const argv = require('yargs').argv;
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
module.exports = {
    entry: {
        polyfills: ['whatwg-fetch', '@babel/polyfill'],
        app: './src/common/index.js'
    },
    mode: argv._[0] === 'serve' ? 'development' : 'production',
    performance: {
        hints: false
    },
    output: {
        filename: '[name].js'
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader'
            }
        },
        {
            test: /\.css$/,
            use: [
                MiniCssExtractPlugin.loader,
                "css-loader"
            ]
        },
        {
            test: /\.(png|svg|jpg|gif|cur|ttf|eot|woff)$/,
            use: [{
                loader: 'file-loader'
            }]
        }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery'
        }),
        new MiniCssExtractPlugin({
            filename: `[name].css`
        }),
        new CopyWebpackPlugin([{
            from: 'demos'
        }])
    ]
};