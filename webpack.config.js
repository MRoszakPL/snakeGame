const path = require('path');

module.exports = {
    entry: "./js/main.js",
    output: {
        path: path.resolve(__dirname,'./js'),
        filename: "out.js",

    },
    mode: "development", watch: true,
    devtool:'#eval-source-map',
    module: {
        rules: [{
            test: /\.jsx$/,
            exclude: /node_modules/,
            use: {
                loader: "babel-loader",
                options: {
                    presets: ["es2015", "stage-2"]
                }
            }
        }]
    },
    devServer:{
        inline: true,
        contentBase:"./",
        port: 3001
    }
};

