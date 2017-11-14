let HtmlWebpackPlugin = require('html-webpack-plugin');
let webpack = require('webpack');

module.exports = (envOptions) => {
    const config = {
        entry: {
            index: 'src/index.tsx'
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
                test: /\.tsx$/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015', 'react']
                    }
                },{
                    loader: 'awesome-typescript-loader'
                }]
            }]
        },
        plugins: [new HtmlWebpackPlugin()]
    };

    return config
}
