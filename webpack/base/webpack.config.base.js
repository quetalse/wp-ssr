const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

module.exports={
    target: 'web',
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
            // {
            //     test: /\.scss$/,
            //     use: ['style-loader', 'css-loader', 'sass-loader']
            // }
        ]
    },
    // externals: [nodeExternals(), 'react-helmet'],
    plugins: [
        new HtmlWebpackPlugin({
            inject: false,
            template: 'src/base.dev.html',
            filename: 'template/index.html',
        }),
    ]
}