import {combineReducers} from 'redux';
import createSagaMiddelware from 'redux-saga/lib/internal/middleware';
import invariant from 'invariant';
import checkModel from './checkModel';
import prefixNamespace from './prefixNamespace';
import Plugin,{filterHooks} from './Plugin';
import createPromiseMiddleware from './createPromiseMiddleware';
import getSaga from './getSaga';
import getReducer from './getReducers';
import createStore from './createStore';
import {run as runSubscription,unlisten as unlistenSubscription} from './subscription';


const dataFlowModel={
	namespace:'@@dataFlow',
	state:0,
	reducers:{
		UPDATE(state){return state + 1},
	},
}


export function create(hooksAndOpts={},createOpts={}){
	const {
        initialReducers,
        setupApp,
	}=createOpts;
    const plugin=new Plugin();
    plugin.use(filterHooks(hooksAndOpts));
	const app={
        _models:[
           prefixNamespace({...dataFlowModel})
        ],
        _store:null,
        _plugin:plugin,
        model,
        start,
	}

	return app;

	function model(m){
		m=m.default ||m;
		console.log("m is "+JSON.stringify(m))
		if(process.env.NODE_ENV!=='production'){
             checkModel(m,app._models);
		}

		app._models.push(prefixNamespace(m));
	}

	function injectModel(createReducer,onError,unlisteners,m){
		model(m);
		const store=app._store;
		if(m.reducers){
			store.asyncReducers[m.namespace]=getReducer(m.reducers,m.state);
			store.replaceReducer(createReducer(store.asyncReducers));
		}
		if(m.effects){
			store.runSaga(app._getSaga(m.effects,m,onError,plugin.get('onEffect')));
		}
		if(m.subscriptions){
			unlisteners[m.namespace]=runSubscription(m.subscriptions,m,app,onError);
		}
	}
	function unModel(createReducer,reducers,unlisteners,namespace){
		const store=app._store;
		delete store.asyncReducers[namespace];
		delete reducers[namespace];

		store.replaceReducer(createReducer());
		store.dispatch({type:'@@dataFlow/UPDATE'});
		store.dispatch({
			type:`${namespace}/@@CANCEL_EFFECTS`
		});
		unlistenSubscription(unlisteners,namespace);
		app._models=app._models.filter(model=>model.namespace!==namespace);
	}


	function start(){
		const onError=err=>{
			if(typeof err =='string') err=new Error(err);
			err.preventDefault=()=>{
				err._dontReject=true;
			}
			plugin.apply('onError',(err)=>{
				throw new Error(err.stack||err);
			})(err,app._store.dispatch);
		};

		const sagaMiddleware=createSagaMiddelware();
		
		const {middleware:promiseMiddleware,resolve,reject}=createPromiseMiddleware(app);
		app._getSaga=getSaga.bind(null,resolve,reject);

		const sagas=[];
		const reducers={...initialReducers};
		for(const m of app._models){
			reducers[m.namespace]=getReducer(m.reducers,m.state);
			if(m.effects) sagas.push(app._getSaga(m.effects,m,onError,plugin.get('onEffect')));
		}

		const reducerEnhancer=plugin.get('onReducer');
		const extraReducers=plugin.get('extraReducers');
		invariant(
           Object.keys(extraReducers).every(key=>!(key in reducers)),
           `[app.start] extitraReducers is confict with other reducers`,
		);
		const getMyReducer=createReducer();
		const store=app._store=createStore({
			reducers:createReducer(),
			initialState:hooksAndOpts.initialState||{},
			plugin,
			createOpts,
			sagaMiddleware,
            promiseMiddleware,
		})
		store.runSaga=sagaMiddleware.run;
		store.asyncReducers={};

		const listeners=plugin.get('onStateChange');
		for(const listener of listeners){
			store.subscribe(()=>{
				listener(store.getState());
			});
		}
		sagas.forEach(sagaMiddleware.run);

		setupApp(app);

		const unlisteners={};
		for(const model of this._models){
			if(model.subscriptions){
				unlisteners[model.namespace]=runSubscription(model.subscriptions,model,app,onError);
			}
		}

		app.model=injectModel.bind(app,createReducer,onError,unlisteners);
		app.unmodel=unModel.bind(app,createReducer,reducers,unlisteners)

		function createReducer(){
			return reducerEnhancer(combineReducers({
				...reducers,
				...extraReducers,
				...(app._store ? app._store.asyncReducers : {}),
			}));
		}

		 
	}
}