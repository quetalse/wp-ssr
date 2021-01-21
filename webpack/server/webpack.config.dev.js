const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const baseConfig = require('../base/webpack.config.base');
const webpackNodeExternals = require('webpack-node-externals');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const {StatsWriterPlugin} = require('webpack-stats-plugin');
const WaitPlugin = require('../waitPlugin')
const Dotenv = require('dotenv-webpack');


module.exports = {
    mode: 'development',
    target: 'node',
    watch: true,
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
                test: /\.(scss|css)$/,
                use: 'null-loader'
            },
            // {
            //     test: /\.(gif)$/,
            //     use: 'file-loader',
            // },
            // {
            //     test: /\.(jpe?g|png|ttf|eot|otf|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
            //     use: 'base64-inline-loader?limit=1000&name=[name].[ext]',
            // },
            // {
            //     test: /\.html$/,
            //     use: 'html-loader',
            // },
            // {
            //     test: /\.(mp4|webm|gif)$/,
            //     use: {
            //         loader: 'url-loader',
            //         options: {
            //             limit: true,
            //         },
            //     },
            // },
        ]
    },
    plugins: [

        new CopyWebpackPlugin([
            // { from: 'app/_images', to: '_images' },
            // { from: 'app/_static/**', to: '.' },
        ]),
        new webpack.ProvidePlugin({
            // window: path.resolve(path.join(__dirname, './../window.mock')),
            // document: 'global/document',
        }),
        new webpack.DefinePlugin({
            __CLIENT__: true,
            __SERVER__: false,
            __API_BASE__: 'https://57fd82ab-c6f6-45c3-892d-7556735a0b05.mock.pstmn.io',
            __API_BASE_SWAGGER__: JSON.stringify('http://45.89.66.172'),
            'process.env': {
                '__APP_PORT__': 3000,
                '__API_BASE__': JSON.stringify('https://57fd82ab-c6f6-45c3-892d-7556735a0b05.mock.pstmn.io'), // '"production"'
                '__API_BASE_SWAGGER__': JSON.stringify('http://45.89.66.172')
            }
        }),
        new WaitPlugin(path.resolve(process.cwd(), 'build/app/stats.json')),
        new Dotenv()

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
            '.css',
            '.scss',
        ],
        mainFields: [
            'browser',
            'jsnext:main',
            'main',
        ],
    },
}