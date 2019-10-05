module.exports = {
    mode: "production",
    entry: "./script/index.js",
    output: {
        filename: 'main.js',
        path: __dirname + './script'
    },
    module: {
        rules: [{
            test: /\.js$/,
            use: [{
                loader: "babel-loader",
                options: {
                    presets: ["@babel/preset-env"]
                }
            }]
        }]
    }
};