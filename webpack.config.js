
const path = require("path")
const htmlWebpackPlugin = require("html-webpack-plugin")

const ruleForJS = {
	test: /\.js$/,
	loader: "babel-loader",
	options: {
		presets: [
			[
				"@babel/preset-react",
				{
					runtime: "automatic"
				}
			]
		]
	}
}

const ruleForMedia = {
	test: /\.(png|svg|jpg?e|webp)$/,
	use: 'file-loader?name=./images/[name].[ext]'
}

const ruleForStyle = {
	test: /\.css$/,
	use: ["style-loader", "css-loader"]
}

const rules = [ruleForStyle, ruleForJS, ruleForMedia]

module.exports = {
	entry: "./src/index.js",
	output: {
		path: path.resolve(__dirname, "build")
	},
	module: {rules},
	plugins: [new htmlWebpackPlugin({template:"./src/index.html"})],
	devServer: {
		open: true,
		port: 3000,
		compress: true
	}
}