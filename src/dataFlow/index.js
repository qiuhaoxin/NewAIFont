import React from 'react';
import invariant from 'invariant';
import createHashHistory from 'history';
import {
	routerMiddleware,
	routerReducer 
} from 'react-router-redux';
import document from 'globale/document';

export default function(opts={}){
    const history=opts.history||createHashHistory;
    const createOpts={

    	initialReducer:{
    		routing:routerReducer,
    	},
    	setupMiddlewares(middlewares){
    		return [
               ...middlewares,
               routerMiddleware(history),
    		]
    	},
    	setupApp(app){
    		app._history=patchHistroy(history);
    	},
    };
    

}


function patchHistroy(history){
	const oldListen=history.listen;
	history.listen=callback=>{
		callback(history.location);
		return oldListen.call(history,callback);
	}
	return history;
}