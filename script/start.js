const webpackDevServer=require('webpack-dev-server');
const webpack=require('webpack');
const config=require('../webpackConfig/webpack.dev.config.js');
const chalk=require('chalk');

const webpackDevServerConfig={
	contentBase:'../src/public',
	hot:true,
	port:4002,
}

const compiler=webpack(config);


process.env.NODE_ENV="development";
process.env.BABEL_ENV="development";

const DEFAULT_PORT=process.env.PORT || 4002;

const devServerOptions=Object.assign({},webpackDevServerConfig,{

});

webpackDevServer.addDevServerEntrypoints(config,devServerOptions);

const server=new webpackDevServer(compiler,devServerOptions);


server.listen(DEFAULT_PORT,'127.0.0.1',()=>{
	console.log(chalk.blue(`server is starting at port ${DEFAULT_PORT}`));
})