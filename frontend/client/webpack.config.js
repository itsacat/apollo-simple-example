module.exports = {
    entry: "./app.js",
    output: {
        filename: "./../server/public/clientBundle.js"
    },
    module: {
        loaders: [
            {
                test: [/\.js$/, /\.es6$/],
                // exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'es2015', /*'stage-0'*/],
                    // plugins: ['transform-decorators-legacy']
                }
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.es6']
    },
    watch: true,
    devtool: 'source-map',
    target: 'web'
};
