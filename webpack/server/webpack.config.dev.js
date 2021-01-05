const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const baseConfig = require('../base/webpack.config.base');
const webpackNodeExternals = require('webpack-node-externals');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const {StatsWriterPlugin} = require('webpack-stats-plugin');
const WaitPlugin = require('../waitPlugin')


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
            'process.env':
                {
                    PUBLIC_URL: '""',
                    REACT_APP_HOST: '"localhost"',
                    REACT_APP_PORT: '"8080"'
                }
        }),
        new WaitPlugin(path.resolve(process.cwd(), 'build/app/stats.json'))

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