const merge = require('webpack-merge');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    mode: 'production',
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                BASENAME: JSON.stringify('SkillsTreeApp'),
            },
        }),
        new HtmlWebpackPlugin({
            title: 'Game proof-of-concept',
            filename: '../dist/index.html',
            template: './src/index.html',
        }),
    ],
    output: {
        publicPath: '/SkillsTreeApp/',
    },
});
