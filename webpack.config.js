const path = require("path");

module.exports = {
    entry: "./src/index.js", // Adjust the entry point based on your project structure
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist"), // Adjust the output directory as needed
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                },
            },
        ],
    },
    resolve: {
        extensions: [".js", ".jsx"],
    },
};
