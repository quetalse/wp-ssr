const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const baseConfig = require('../base/webpack.config.base');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {StatsWriterPlugin} = require('webpack-stats-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: './src/client/client.js',
    output: {
        filename: 'client-bundle.[chunkhash].js',
        path: path.resolve(process.cwd(), 'build/app'),
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.js?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-react',
                            ['@babel/env', {targets: {browsers: ['last 7 versions']}}]
                        ]
                    }
                }
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader', 'sass-loader']
            }
        ]
    },
    optimization: {
        minimizer: [
            new UglifyJSPlugin({
                cache: true,
                parallel: true,
                uglifyOptions: {
                    compress: false,
                    ecma: 6,
                    mangle: true
                },
                sourceMap: false
            })
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            inject: false,
            template: 'src/templates/base.prod.html',
            filename: 'template.html'
        }),
        new CompressionPlugin(),
        new CleanWebpackPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),
        new StatsWriterPlugin({
           stats: {
               all: false,
               assets: true
           }
        }),
        new CopyWebpackPlugin([
            { from: 'src/_images', to: 'images' },
            // { from: 'src/_static', to: './' },
        ]),
        new MiniCssExtractPlugin({
            filename: 'client-styles.[chunkhash].css'
        })
    ],
    devtool: 'inline-source-map' // для отладки в браузере
}