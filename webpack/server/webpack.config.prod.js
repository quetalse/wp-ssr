const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const baseConfig = require('../base/webpack.config.base');
const webpackNodeExternals = require('webpack-node-externals');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WaitPlugin = require('../waitPlugin');

module.exports = {
    mode: 'production',
    target: 'node',
    entry: './src/server/server.js',
    externals: [webpackNodeExternals()],
    output: {
        filename: 'server.js',
        path: path.resolve(process.cwd(), 'build/server'),

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
    resolve: {
        alias: {
            build: path.resolve(__dirname, 'build/')
        }
    },
    plugins: [
        new webpack.DefinePlugin({
            __CLIENT__: true,
            __SERVER__: false,
            __API_BASE__: 'https://e5b15210-c67e-4041-9c51-700682901def.mock.pstmn.io',
            __API_BASE_SWAGGER__: JSON.stringify('http://45.89.66.172'),
            'process.env': {
                '__APP_PORT__': 3000,
                '__API_BASE__': JSON.stringify('https://e5b15210-c67e-4041-9c51-700682901def.mock.pstmn.io'),
                '__API_BASE_SWAGGER__': JSON.stringify('http://45.89.66.172')
            }
        }),
        new WaitPlugin(path.resolve(process.cwd(), 'build/app/stats.json'))
    ]
}