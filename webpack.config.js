const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const Dotenv = require("dotenv-webpack");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
module.exports = {
	entry: "./src/index.js",
	output: {
		path: path.join(__dirname, "dist"),
		filename: "bundle.js",
		publicPath: "/",
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: "babel-loader",
			},
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				use: "babel-loader",
			},
			{
				test: /\.scss$/,
				use: ["style-loader", "css-loader", "sass-loader"],
			},
			{
				test: /\.css$/,
				use: ["style-loader", "css-loader"],
			},
			{
				test: /\.ttf|.svg|.woff|.gif|.eot|.jpg|.png$/,
				use: "file-loader",
			},
		],
	},
	resolve: {
		extensions: [".js", ".jsx"],
	},
	devServer: {
		historyApiFallback: true,
	},
	mode: "production",
	plugins: [
		new HtmlWebpackPlugin({
			template: "./public/index.html",
		}),
		new Dotenv({
			path: ".env",
		}),
	],
	optimization: {
		minimizer: [new UglifyJsPlugin()],
	},
};
