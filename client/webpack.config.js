const ExtractTextPlugin = require("extract-text-webpack-plugin");
const extractSass = new ExtractTextPlugin({
	filename: "[name]-[hash].css"
});

module.exports = {
	entry: './main.js',
	output: {
		filename: './bundle.js'
	},
	watch: true,
	module: {
		loaders: [{
			test: /\.js$/,
			exclude: /node_modules/,
			loader: 'babel-loader',
			query: {
				presets: ['es2015']
			}
		}],
		rules: [{
			test: /\.s?css$/,
			use: extractSass.extract({
				use: [{
					loader: "css-loader",
					options: {
						sourceMap: true,
						minimize: true
					}
				}, {
					loader: "resolve-url-loader"
				}, {
					loader: "sass-loader",
					options: {
						sourceMap: true
					}
				}],
				fallback: "style-loader"
			})
		}, {
			test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
			use: "url-loader?limit=10000&mimetype=application/font-woff"
		}, {
			test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/,
			use: "file-loader"
		}, {
			test: /\.html$/,
			loader: "raw-loader"
		}, {
			test: /\.vue$/,
			loader: "vue-loader",
			options: {
				loaders: {
					js: "babel-loader"
				}
			}
		}]
	},
	plugins: [
		new ExtractTextPlugin("styles.css"),
	]
};