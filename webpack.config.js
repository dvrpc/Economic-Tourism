const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

/***** Handle HTML *****/
const htmlConfig = new HtmlWebpackPlugin({
    template: path.resolve(__dirname + '/index.html'),
    file: 'index.html',
    minify: {
        removeRedundantAttributes: true,
        useShortDoctype: true
    }
})

/***** Bundle + Static Assets creation *****/
module.exports = {
    entry: './js/index.js',
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: [
                        'minify',
                        '@babel/preset-env'
                    ]
                }
            }
        ]
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'build')
    },
    plugins: [
        new CopyWebpackPlugin(
            [
                // @TODO: replace this with extract-text-webpack-plugin config
                {
                    from: './css',
                    to: 'css',
                    toType: 'dir'
                },
                {
                    from: './js/geoms',
                    to: 'js',
                    toType: 'dir'
                }
            ]
        ),
        htmlConfig
    ]
}