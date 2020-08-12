/*
 * webpack.config.js
 * Copyright (C) 2019 sylveryte <sylveryte@archblue>
 *
 * Distributed under terms of the MIT license.
 */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin }  = require('clean-webpack-plugin');

module.exports = {
	entry:{
		app: './src/app.js',
	},
	mode: "development",
	plugins:[
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			title:"Javascripting",
		}),
	],
	devtool:'inline-source-map',
	devServer:{
		contentBase: './dist',
	},
	output: {
		filename: 'bundle.js',
		path:path.resolve(__dirname,'dist'),
	},
}
