



const fs=require('fs');
const path=require('path');
const appDirectory=fs.realpathSync(process.cwd());

const resolvePath=relativePath=>path.resolve(appDirectory,relativePath);

module.exports={
	appEntry:resolvePath('src/Login/index.js'),//	appEntry:resolvePath('src/index.js'),
	appDist:resolvePath('dist'),
	appHtml:resolvePath('src/Login/index.html'),//	appHtml:resolvePath('src/public/index.html'),
}