import {createStore,applyMiddleware,compose} from 'redux';
import flatten from 'flatten';
import invariant from 'invariant';
import window from 'global/window';
import {isArray,returnSelf} from '../../utils';

export default function({
	reducers,
	initialState,
	plugin,
	sagaMiddleware,
	promiseMiddleware,
	createOpts:{
		setupMiddlewares
	},
}){
	//sagaMiddleware
	const extraEnhancers=plugin.get('extraEnhancers');
	//console.log("extraEnhancers is "+JSON.stringify(extraEnhancers));
	// invariant(
 //       isArray(extraEnhancers),
 //       `[app.start] extraEnhancers should be array,but got ${typeof extraEnhancers}`,
	// );
	const extraMiddlewares =plugin.get('onAction');
	//console.log("just for test"+sagaMiddleware);
	const middlewares=setupMiddlewares([
       sagaMiddleware,
       promiseMiddleware,
       ...flatten(extraMiddlewares),
	]);
    //console.log("middlewares is "+JSON.stringify(middlewares));
	let devtools=()=>noop=>noop;
	if(process.env.NODE_ENV!=='production' && window.__REDUX_DEVTOOLS_EXTENSION__){
	 	devtools=window.__REDUX_DEVTOOLS_EXTENSION__;
    }
	const enhancers=[
        applyMiddleware(...middlewares),
        ...extraEnhancers,
       devtools(window.__REDUX_DEVTOOLS_EXTENSION__OPTIONS),
	];
	//console.log("initialState is "+JSON.stringify(initialState));
	return createStore(reducers,initialState,compose(...enhancers));
}