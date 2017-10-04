let nodeExternals = require('webpack-node-externals');


module.exports = {
    entry: "./src/app.js",
    output: {
        filename: "bundle.js"
    },
    module: {
        loaders: [
            {
                test: [/\.js$/, /\.es6$/],
                // exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'es2015', /*'stage-0'*/],
                    plugins: ["transform-async-to-generator"]
                    // plugins: ['transform-decorators-legacy']
                }
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.es6']
    },
    watch: true,
    target: 'node', // in order to ignore built-in modules like path, fs, etc.
    externals: [nodeExternals()], // in order to ignore all modules in node_modules folder
};
