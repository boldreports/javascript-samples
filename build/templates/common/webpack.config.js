const webpack = require('webpack')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
module.exports = {
    entry: {
        reports: __dirname + '/index.js',

    },
    mode: 'production',
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
                type: 'asset/resource'
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
            filename: `index.css`
        }),
    ],
    resolve: {
        alias: {
            'jquery': require.resolve('jquery')
        }
    }
};
