const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

module.exports = {
	entry: {
		test: './src/test.jsx',
	},
	devtool: 'inline-source-map',
	mode: 'development',
	externals: {
		console: 'console'
	},
	plugins: [
		new webpack.ProvidePlugin({
			React: 'react',
			log: ['console','log'],
			error: ['console','error'],
			warn: ['console','warn'],
			info: ['console','info'],
			$conf: path.resolve('./config.yml'),
			pkg: path.resolve('./package.json'),
        }),
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			title: '留给岁月一点空间',
			template: 'src/html/dev.html',
		}),
		// Static file copy 
		new CopyWebpackPlugin([
			{from: 'src/asset/images/favicon.ico',to: 'favicon.ico'},
			{from: 'src/asset/fonts',to: 'fonts'},
			{from: 'src/asset/images',to: 'images'}
		]),
		new webpack.HotModuleReplacementPlugin(),
		// OccurrenceOrderPlugin is needed for webpack 1.x only
		new webpack.optimize.OccurrenceOrderPlugin(),
		// Use NoErrorsPlugin for webpack 1.x
		new webpack.NoEmitOnErrorsPlugin(),
	],
	output: {
		path: path.resolve(__dirname,'../dist'),
		// filename: "main.js",
		filename: 'js/[name].bundle.js',
		publicPath: '/'
	},
	node: {
		fs: 'empty'
	},
	devServer: {
		contentBase: './dist',
		compress: true,
		port: 80,
		hot: true,
		host: '0.0.0.0'
	},
	resolve: {
		extensions: ['.js', '.jsx'],
    },
	module: {
		rules: [
			{
				test: /\.(jsx|js)$/,
				exclude: /(node_modules)/,
				resolve: {
				  extensions: [".jsx",".js"]
				},
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env'],
						plugins: ['@babel/plugin-transform-react-jsx'],
					}
				}
			},
			{
				test: /\.css$/,
				use: ['style-loader','css-loader']
			},
			{
				test: /\.scss$/,
				use: ['style-loader','css-loader','sass-loader']
			},
			{
				test: /\.(jpg|png|gif|svg|cur)$/,
				use: ['url-loader']
			},
			{
				test: /\.(ttf|woff|woff2|eot|otf)$/,
				loader: 'file-loader',
				options: {
					name: '[name].[ext]',
					outputPath: 'fonts'
				}
			},
			{
				test: /\.(mkv|mp4|mp3|flac|avi)$/,
				use: ['file-loader']
			},
			{
				test: /\.csv$/,
				use: ['csv-loader']
			},
			{
				test: /\.xml$/,
				use: ['xml-loader']
			},
			{
				test: /\.(txt|lrc)$/,
				use: ['raw-loader']
			},
			{
				test: /\.(svgraw)$/,
				use: [
					{loader: 'babel-loader',},
					{
						loader: '@svgr/webpack',
						options: {
							babel: false,
							icon: true,
						},
					},
				]
			},
			{
				test: /\.yml$/,
				use: ['json-loader','yaml-loader']
			},
		],
	},
}

