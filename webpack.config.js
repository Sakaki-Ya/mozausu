module.exports = {
    mode: "production",
    entry: "./script/index.js",
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                            path: path.resolve(__dirname, 'dist'),
                            filename: 'bundle.js',
                            presets: [
                                "@babel/preset-env"
                            ]
                        }
                    }
                ]
            }
        ]
    }
};