import React from 'react';
import invariant from 'invariant';
import createHashHistory from 'history/createHashHistory';
import {
	routerMiddleware,
	routerReducer 
} from 'react-router-redux';
import document from 'global/document';
import * as core from './saga-core';
import {isFunction,isEmpty,isString,isHTMLElement} from '../utils';
import {Provider} from 'react-redux';

export default function(opts={}){
    //console.log("opts is "+JSON.stringify(opts));
    const history=opts.history||createHashHistory();
    console.log("history is "+history)
    const createOpts={
    	initialReducer:{
    		routing:routerReducer,
    	},
    	setupMiddlewares(middlewares){
    		return [
              routerMiddleware(history),
               ...middlewares,
    		]
    	},
    	setupApp(app){
        console.log("app setUpaeA");
    		app._history=patchHistroy(history);
    	},
    };

    const app=core.create(opts,createOpts);
    const oldStart=app.start;
    app.start=start;
    app.router=router;
    return app;

    function start(container){
       invariant(!isEmpty(container),`dataFlow.start:container should not be empty!`);

       if(isString(container)){
          container=document.querySelector(container);
          invariant(container,`dataFlow.start:container dom not found`);
       }
       //校验container是否HtmlElement
       invariant(isHTMLElement(container),`dataFlow.start:container should be a htmlElement`);
       //在启动前注册路由
       invariant(app._router,`dataFlow.start:router should register before start method!`);

       if(!app._store){
           oldStart.call(app);
       }
       const store=app._store;
       app._getProvider=getProvider.bind(null,store,app);

       if(container){
           render(container,store,app,app._router);
           app._plugin.apply('onHmr')(render.bind(null,container,store,app));
       }


    }
    function router(router){
        invariant(isFunction(router),`dataFlow.router:router should be a function`);
        app._router=router;
    }
    

    function getProvider(store,app,router){
        //将store从根节点传入
       return extraProps=><Provider store={store}>
          {
            //执行传入的路由
            router({app,history:app._history,...extraProps})
          }
       </Provider>
    }

    function render(container,store,app,router){
        const ReactDom=require('react-dom');
        ReactDom.render(React.createElement(getProvider(store,app,router)),container);
    }
    
}


function patchHistroy(history){
	const oldListen=history.listen;
	history.listen=callback=>{
		callback(history.location);
		return oldListen.call(history,callback);
	}
	return history;
}