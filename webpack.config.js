/*eslint-env node*/

import ExtractTextPlugin from 'extract-text-webpack-plugin';

module.exports = {
	entry: [
		'webpack-dev-server/client?http://localhost:8080',
		'./src/js/index.js',
		'./src/scss/main.scss'
	],
	output: {
		path: __dirname + '/dist/',
		publicPath: 'http://localhost:8080/',
		filename: 'js/app.js'
	},
	module: {
		rules: [
			{
				test: /\.js?$/,
				use: ['jsx-loader', 'babel-loader'],
				exclude: /node_modules/
			},
			{
				test: /\.(sass|scss)$/,
				exclude: /node_modules/,
				use: ExtractTextPlugin.extract(['css-loader', 'sass-loader'])
			},
			{
				test: /\.(ttf|eot|woff|woff2)$/,
				exclude: /node_modules/,
				loader: 'file-loader',
				options: {
					name: '/fonts/[name].[ext]'
				}  
			}
		]
	},
	devServer: {
		historyApiFallback: true,
		contentBase: './dist'
	},
	plugins: [
		new ExtractTextPlugin({
			filename: 'css/styles.css',
			allChunks: true
		})
	]
};