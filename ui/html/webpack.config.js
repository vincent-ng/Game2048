const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
	entry: ['babel-polyfill', './index.js'],
	// entry: ['./index.js'], // remove polyfill, no IE supported
	output: {
		path: `${__dirname}/dist`,
		filename: 'index.js',
	},
	module: {
		rules: [{
			test: /\.js$/,
			exclude: /node_modules/,
			use: {
				loader: 'babel-loader',
				options: {
					presets: ['es2015'],
				},
			},
		}],
	},
	plugins: [
		new webpack.optimize.UglifyJsPlugin(),
		new HtmlWebpackPlugin({
			template: 'index.html',
			inject: 'body',
		}),
	],
}
