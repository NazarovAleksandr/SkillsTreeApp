const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(common, {
    mode: 'production',
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'BASENAME': JSON.stringify('SkillsTreeApp')
            }
        }),
        new HtmlWebpackPlugin({
            title: 'Game proof-of-concept',
            filename: '../dist/index.html',
            template: './src/index.html'
        })
    ],
    output: {
        publicPath: '/SkillsTreeApp/',
    }
});