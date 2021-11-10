const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const srcFolder = path.join(__dirname, "src");

module.exports = (env) => {
    console.log("DASDASDAS", JSON.stringify(env));
    const MODE = env.HELLO || "";
    console.log(MODE);
    return {
        entry: path.join(__dirname, "src", "index.tsx"),
        output: {
            path: path.resolve(__dirname, "build"),
            filename: 'index.bundle.js',
        },
        mode: process.env.NODE_ENV || "development",
        resolve: {
            extensions: [".tsx", ".ts", ".js"],
            modules: [srcFolder, "node_modules"],
        },
        devServer: {
            static: {
                directory: srcFolder
            }
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: path.join(__dirname, "src", "index.html")
            }),
        ],
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    use: ["babel-loader"]
                },
                {
                    test: /\.(ts|tsx)$/,
                    exclude: /node_modules/,
                    use: ["ts-loader"]
                },
                {
                    test: /\.(jpg|jpeg|png|gif|mp3|svg)$/,
                    use: ["file-loader"]
                },
                {
                    test: /\.App\.tsx$/,
                    loader: "file-replace-loader",
                    options: {
                        condition: MODE === "hi",
                        replacement: path.resolve("./Hello.tsx"),
                        async: true
                    }
                }
            ]
        }
    };
}