const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
		entry: "./src/index.tsx",
		output: {
				path: path.join(__dirname, "/dist"),
				filename: "bundle.js"
		},
		devServer: {
				hot: true,
				open: true
		},
		module: {
				rules: [
						{
								test: /\.js|ts|tsx|jsx$/,
								exclude: /node_modules/,
								use: {
										loader: "babel-loader"
								},
						},
						{
								test: /\.css$/,
								use: ["style-loader", "css-loader"]
						},
						{
								test: /\.(png|jpe?g|gif|ico)$/i,
								use: [
										{
												loader: 'file-loader',
										},
								],
						},
				]
		},
		plugins: [
				new HtmlWebpackPlugin({
						template: "./www/index.html",
						favicon: './www/favicon.ico'
				})
		]
};
