const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack').container.ModuleFederationPlugin;
const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const FileManagerPlugin = require('filemanager-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const packageJson = require('./package.json');

const env = process.env.NODE_ENV || 'development';

const transformDependencies = (deps) => {
	const transformDependencies = {};

	Object.keys(deps).forEach((key) => {
		transformDependencies[key] = {
			eager: true,
			requiredVersion: deps[key],
		};
	});

	return transformDependencies;
};

module.exports = {
	entry: './src/index',
	mode: env,
	devServer: {
		static: {
			directory: path.join(__dirname, 'dist'),
		},
		port: 3002,
	},
	output: {
		publicPath: 'auto',
	},
	resolve: {
		extensions: ['.ts', '.tsx', '.js'],
		plugins: [new TsconfigPathsPlugin()],
	},
	module: {
		rules: [
			{
				test: /bootstrap\.tsx$/,
				loader: 'bundle-loader',
				options: {
					lazy: true,
				},
			},
			{
				test: /\.tsx?$/,
				loader: 'ts-loader',
				exclude: /node_modules/,
				options: {
					// disable type checker - we will use it in fork plugin
					transpileOnly: true,
				},
			},
			{
				test: /\.css$/i,
				use: [
					'style-loader',
					'css-loader',
					{
						loader: 'postcss-loader',
						options: {
							postcssOptions: {
								plugins: [
									[
										'postcss-preset-env',
										{
											// Options
										},
									],
								],
							},
						},
					},
				],
			},
			{
				test: /\.tsx?$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'dts-loader',
						options: {
							name: 'dashboardModule', // The name configured in ModuleFederationPlugin
							exposes: {
								'./dashboard': './src/screens/dashboard/dashboard',
							},
							typesOutputDir: '.webpack-federation-modules-types', // Optional, default is '.wp_federation'
						},
					},
				],
			},
		],
	},
	plugins: [
		new ModuleFederationPlugin({
			name: 'dashboardModule',
			filename: 'remoteEntry.js',
			remotes: {},
			exposes: {
				'./dashboard': './src/screens/dashboard/dashboard',
			},
			shared: {
				...transformDependencies(packageJson.dependencies),
			},
		}),
		new HtmlWebpackPlugin({
			template: './public/index.html',
			templateParameters: {
				PUBLIC_URL: '/public',
			},
		}),
		new Dotenv(),
		new CopyWebpackPlugin({
			patterns: [
				{
					from: 'public/**/*',
					globOptions: {
						ignore: ['**/index.html'],
					},
					noErrorOnMissing: true,
				},
			],
		}),
		new FileManagerPlugin({
			events: {
				onStart: {
					delete: [
						{
							source: '..webpack-federation-modules-types',
							options: {
								force: true,
							},
						},
					],
				},
				onEnd: {
					archive: [
						{
							source: '.webpack-federation-modules-types',
							destination: './dist/dashboardModule-dts.tgz',
							format: 'tar', // optional
							options: {
								// see https://www.archiverjs.com/docs/archiver
								gzip: true,
							},
						},
					],
				},
			},
		}),
		new ForkTsCheckerWebpackPlugin(),
	],
};
