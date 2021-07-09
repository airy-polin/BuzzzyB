const Webpack = require('webpack'),
    CleanWebpackPlugin = require('clean-webpack-plugin'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    MiniCssExtractPlugin = require('mini-css-extract-plugin'),
    OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin'),
    AutoPrefixer = require('autoprefixer'),
    UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    entry: [
        './scripts/app.js'
    ],

    output: {
        filename: './scripts/app.js'
    },

    devServer: {
        port: 9999,
        hot: true,
        open: true
    },

    devtool: 'source-map',

    resolve: {
        extensions: ['.scss', '.js']
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                '@babel/preset-env'
                            ]
                        }
                    },
                    'eslint-loader'
                ]
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: [
                    'css-loader',
                    'sass-loader'
                ]
            }
        ]
    },

    optimization: {
        minimizer: [
            new OptimizeCSSAssetsPlugin(),
            new UglifyJsPlugin()
        ]
    },

    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: './index.html',
            filename: 'index.html',
            minify: {
                useShortDoctype: true,
                removeStyleLinkTypeAttributes: true,
                removeScriptTypeAttributes: true,
                collapseWhitespace: true,
                removeComments: true,
                removeRedundantAttributes: true
            }
        }),
        new MiniCssExtractPlugin({
            filename: 'styles/styles.css'
        }),
        new Webpack.HotModuleReplacementPlugin()
    ]
};