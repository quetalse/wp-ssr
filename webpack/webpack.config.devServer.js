const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {StatsWriterPlugin} = require('webpack-stats-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const Dotenv = require('dotenv-webpack');


// const clientConfig = require('./client/webpack.config.dev.js');
const serverConfig = require('./server/webpack.config.dev.js');

const clientConfig = {
    mode: 'development',
    watch: true,
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
                test: /\.(scss|css)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ]
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
            minify: false,
            template: 'src/templates/base.prod.html',
            filename: 'template.html'
        }),
        new CompressionPlugin(),
        new CleanWebpackPlugin(),
        new webpack.DefinePlugin({
            __CLIENT__: true,
            __SERVER__: false,
            __APP_PORT__: 3000,
            __API_BASE_SWAGGER__: 'http://45.89.66.172',
            __API_BASE__: 'https://e5b15210-c67e-4041-9c51-700682901def.mock.pstmn.io',
            'process.env': {
                '__APP_PORT__': 3000,
                '__API_BASE__': JSON.stringify('https://e5b15210-c67e-4041-9c51-700682901def.mock.pstmn.io'), // '"production"'
                '__API_BASE_SWAGGER__': JSON.stringify('http://45.89.66.172')
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
            { from: 'src/_data', to: '../data' },
            // { from: 'src/_static', to: './' },
        ]),
        new MiniCssExtractPlugin({
            filename: 'client-styles.[chunkhash].css'
        }),
        new Dotenv()
    ],
    devtool: 'inline-source-map' // для отладки в браузере
}

module.exports = [clientConfig,
    serverConfig
];