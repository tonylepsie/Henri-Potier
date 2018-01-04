/*eslint-env node*/

var ExtractTextPlugin = require('extract-text-webpack-plugin');
var UglifyJsPlugin = require('uglifyes-webpack-plugin');

module.exports = {
	entry: [
		'./src/js/index.js',
		'./src/scss/main.scss'
	],
	output: {
		path: __dirname + '/dist/',
		publicPath: '/dist/',
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
				use: ExtractTextPlugin.extract(['css-loader?url=false', 'sass-loader'])
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
		contentBase: './dist'
	},
	plugins: [
		new ExtractTextPlugin({
			filename: '/css/styles.css',
			allChunks: true
		}),
		new UglifyJsPlugin({
			comments: false
		})
	]
};