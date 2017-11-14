let HtmlWebpackPlugin = require('html-webpack-plugin');
let webpack = require('webpack');

module.exports = (envOptions) => {
    const config = {
        entry: {
            index: 'src/index.jsx'
        },
        resolve: {
            extensions: [`.tsx`, `.ts`, `.js`, 'jsx'],
            modules: [
                "node_modules",
                "./"
            ]
        },
        module: {
            rules: [{
                test: /\.jsx$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015', 'react']
                    }
                }
            }]
        },
        plugins: [new HtmlWebpackPlugin()]
    };

    return config
}
