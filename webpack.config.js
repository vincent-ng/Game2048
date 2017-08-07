const webpack = require('webpack')

module.exports = {
	entry: './lib/index.js',
	output: {
		path: `${__dirname}/dist`,
		filename: 'index.js',
		libraryTarget: 'umd',
		library: 'game2048',
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
	],
}
