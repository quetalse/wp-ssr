const path = require('path');
const { merge } = require('webpack-merge');
const baseConfig = require('../base/webpack.config.base');
const webpackNodeExternals = require('webpack-node-externals');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WaitPlugin = require('../waitPlugin')

module.exports = {
    mode: 'production',
    target: 'node',
    entry: './src/server/server.js',
    externals: [webpackNodeExternals()],
    output: {
        filename: 'server.js',
        path: path.resolve(process.cwd(), 'build'),

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
                use: 'null-loader'
            }
        ]
    },
    plugins: [
        new WaitPlugin(path.resolve(process.cwd(), 'build/stats.json'))
    ]
}