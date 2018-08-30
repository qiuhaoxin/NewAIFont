const webpack=require('webpack');

const path=require('path');

const HtmlWebpackPlugin=require('html-webpack-plugin');

const paths=require('./paths');


const openBrowserPlugin=require('open-browser-webpack-plugin');

module.exports={
	mode:'development',
	entry:{
		main:paths.appEntry,
	},
	output:{
        path:path.resolve(__dirname,'../dist'),
        filename:'bundle.js',
        publicPath:'/',
	},
	resolve:{
		extensions:['.js','.jsx','.json','.less','.css'],
	},
	devtool:'inline-source-map',
	module:{
		rules:[
           {
           	  test:/\.(jpe?g|png|svg|gif)$/,
           	  loader:'url-loader',
           },
           {
           	  test:/\.(js|jsx)$/,
           	  loader:require.resolve('babel-loader'),
           	  include:path.resolve(__dirname,'../src'),
           },
           {
           	  test:/\.less$/,
           	  include:path.resolve(__dirname,'../src'),
           	  use:[
                   require.resolve('style-loader'),
                   {
                   	  loader:require.resolve('css-loader'),
                   	  options:{
                   	  	importLoaders:1,
                   	  	minimize:true,
                   	  	sourceMap:false,
                   	  	modules:true,
                   	  	localIdentName:'[name]_[local]_[hash:base64:5]',
                   	  }
                   },
                   {
                   	  loader:require.resolve('less-loader'),
                   }
           	  ],
           },{
           	  test:/\.(eot|woff|svg|ttf|woff2|appcache)(\?|$)/,
           	  exclude:/^node_modules$/,
           	  loader:'file-loader?name=[name].[ext]',
           }
		]
	},
	plugins:[
       new webpack.DefinePlugin({
           FETCH_URL:JSON.stringify('development'),
       }),
       new HtmlWebpackPlugin({
       	  template:paths.appHtml,
       	  inject:true,

       }),
       new openBrowserPlugin({url:'http://localhost:4002'}),

       new webpack.NamedModulesPlugin(),
       new webpack.HotModuleReplacementPlugin(),
	]
}