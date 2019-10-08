const { resolve } = require('path');

module.exports = {
    context: resolve(__dirname, 'src'),
    entry: {
        app: ['@babel/polyfill', './index.jsx']
    },
    output: {
        filename: '[name].bundle.js',
        path: resolve(__dirname, 'public/dist')
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        rules: [
            {
                test: /\.(sa|sc|c)ss$/,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|public\/)/,
                loader: 'babel-loader',
            }
        ]
    }
};