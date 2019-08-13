const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.tsx',
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules)/,
                loader: 'babel-loader',
                options: { presets: ['@babel/env', 'es2015'] },
            },
            {
                test: /\.(tsx|ts)$/,
                exclude: /(node_modules)/,
                loader: 'ts-loader'
            },
            {
                test: /\.(scss)$/,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i, 
                loader: "file-loader?name=[path][name].[ext]"
            },
            {
                test: /\.html$/,
                use: [{
                    loader: 'html-loader',
                }]
            }
        ],
    },
    resolve: { extensions: ['*', '.js', '.jsx', '.tsx', '.ts'] },
    output: {
        path: path.resolve(__dirname, 'dist/'),
        publicPath: '',
        filename: 'bundle.js'
    },
    devServer: {
        contentBase: path.join(__dirname, ''),
        port: 3000,
        publicPath: 'http://localhost:3000/',
        historyApiFallback: true
    }
};
