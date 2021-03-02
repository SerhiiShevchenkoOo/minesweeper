const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetPlugin = require('optimize-css-assets-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;
(autoprefixer = require('autoprefixer')),
	(plugin = autoprefixer({ grid: true })),
	(optimization = () => {
		const config = {
			splitChunks: {
				chunks: 'all',
			},
		};
		if (isProd) {
			config.minimizer = [
				new OptimizeCssAssetPlugin(),
				new TerserWebpackPlugin(),
			];
		}
		return config;
	}),
	(cssLoader = extra => {
		const loaders = [
			{
				loader: MiniCssExtractPlugin.loader,
				options: {
					hmr: isDev,
					reloadAll: true,
				},
			},
			'css-loader',
			{
				loader: 'postcss-loader',
			},
		];
		if (extra) {
			loaders.push(extra);
		}
		return loaders;
	}),
	(babelOptions = preset => {
		opts = {
			presets: ['@babel/preset-env'],
			plugins: ['@babel/plugin-proposal-class-properties'],
		};
		if (preset) {
			opts.presets.push(preset);
		}
		return opts;
	});

module.exports = {
	context: path.resolve(__dirname, '#src'),
	mode: 'development',
	entry: {
		main: ['@babel/polyfill', './index.js'],
	},

	output: {
		filename: '[name].bundle.js',
		path: path.resolve(__dirname, 'dist'),
	},
	resolve: {
		extensions: ['.js', '.jsx', '.svg'],
		alias: {
			'@': path.resolve(__dirname, '#src'),
			'@assets': path.resolve(__dirname, '#src/assets'),
			'@component': path.resolve(__dirname, '#src/script/component/'),
			'@utils': path.resolve(__dirname, '#src/script/utils/'),
			'@style': path.resolve(__dirname, '#src/script/styles-tw/'),
		},
	},
	optimization: optimization(),
	devServer: {
		contentBase: path.join(__dirname, 'dist'),
		historyApiFallback: true,
		port: 3000,
		hot: isDev,
	},

	plugins: [
		new ESLintPlugin(),

		// new CopyWebpackPlugin({
		// 	patterns: [
		// 		{
		// 			from: './assets',
		// 			to: './assets',
		// 		},
		// 	],
		// }),
		new HTMLWebpackPlugin({
			filename: './index.html',
			template: './index.html',
			minify: {
				collapseWhitespace: isProd,
			},
		}),

		new MiniCssExtractPlugin({
			filename: './style/custom.css',
		}),
		new CleanWebpackPlugin(),
	],

	module: {
		rules: [
			{
				test: /\.html$/,
				include: path.resolve(__dirname, '#src/includes'),
				use: ['raw-loader'],
			},

			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: {
					loader: 'babel-loader',
					options: babelOptions(),
				},
			},
			{
				test: /\.less$/,
				use: cssLoader('less-loader'),
			},
			{
				test: /\.css$/,
				use: [
					{
						loader: 'style-loader',
					},
					{
						loader: 'css-loader',
						options: {
							importLoaders: 1,
						},
					},
					{
						loader: 'postcss-loader',
					},
				],
			},
			{
				test: /\.s[ac]ss$/,
				use: cssLoader('sass-loader'),
			},
			{
				test: /\.(png|jpg|svg|gif|webp)$/,
				use: {
					loader: 'file-loader',
					options: {
						name: '[path][name].[ext]',
						outputPath: './',
					},
				},
			},
			{
				test: /\.(ttf|woff|woff2|eot)$/,
				use: {
					loader: 'file-loader',
					options: {
						name: '[path][name].[ext]',
						outputPath: './',
					},
				},
			},
			{
				test: /\.xml$/,
				use: ['xml-loader'],
			},
			{
				test: /\.csv$/,
				use: ['cvs-loader'],
			},
			{
				test: /\.ts$/,
				exclude: /node_modules/,
				loader: {
					loader: 'babel-loader',
					options: babelOptions('@babel/preset-typescript'),
				},
			},
			{
				test: /\.jsx$/,
				exclude: /node_modules/,
				loader: {
					loader: 'babel-loader',
					options: babelOptions('@babel/preset-react'),
				},
			},
		],
	},
};
