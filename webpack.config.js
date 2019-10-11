const { resolve } = require('path');
const CompressionPlugin = require('compression-webpack-plugin');

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
    optimization: {
        namedModules: true,
        splitChunks: {
            name: 'vendor',
            minChunks: 2
        },
        noEmitOnErrors: true, 
        concatenateModules: true 
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

if (process.env.NODE_ENV === 'production') {
    module.exports.plugins.push(
        new CompressionPlugin({
            asset: '[path].gz[query]',
            algorithm: 'gzip',
            test: /\.js$|\.css$|\.html$|\.eot?.+$|\.ttf?.+$|\.woff?.+$|\.svg?.+$/,
            threshold: 10240,
            minRatio: 0.8,
        }),
    );
};