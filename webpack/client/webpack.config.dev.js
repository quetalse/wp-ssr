const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CircularDependencyPlugin = require('circular-dependency-plugin');
const baseConfig = require('../base/webpack.config.base');
const {StatsWriterPlugin} = require('webpack-stats-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    target: 'web',
    mode: 'development',
    entry: './src/client/client.js',
    output: {
        filename: 'client.js',
        // chunkFilename: '[name].js',
        path: path.resolve(process.cwd(), 'build'),
        publicPath: '/',
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
                    'style-loader','css-loader', 'sass-loader']
            },
            {
                test: /\.(eot|svg|otf|ttf|woff|woff2)$/,
                use: 'file-loader',
            },
            {
                test: /\.(mp4|webm|png|gif)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                    },
                },
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            inject: true,
            template: 'src/templates/base.dev.html',
            filename: 'index.html'
        }),
        new CircularDependencyPlugin({
            exclude: /a\.js|node_modules/,
            failOnError: false,
        }),
        new webpack.HotModuleReplacementPlugin(),
        new ProgressBarPlugin(),
        new CopyWebpackPlugin([
            { from: 'src/_images', to: 'images' },
            // { from: 'src/_static/state.js', to: './' },
        ]),
        new webpack.ProvidePlugin({
            // make fetch available
            // fetch: 'exports-loader?self.fetch!whatwg-fetch',
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV),
            },
        }),
        new webpack.NamedModulesPlugin()
    ],
    resolve: {
        modules: [
            path.resolve('./src'),
            path.resolve(process.cwd(), 'node_modules'),
        ],
        extensions: [
            '.js',
            '.jsx',
            '.react.js',
        ],
        // mainFields: [
            // 'browser',
            // 'main',
            // 'jsnext:main',
        // ],
    },
    devServer: {
        contentBase: './build',
        hot: true,
        port: 3000,
        open: true,
        historyApiFallback: true,
        writeToDisk: true
    },
    devtool: 'inline-source-map', // для отладки в браузере
    performance: {
        hints: false,
    },
    node: {
        child_process: 'empty',
        fs: 'empty',
        module: 'empty',
        net: 'empty',
        tls: 'empty',
    }
}