import {combineReducers} from 'redux';
import createSagaMiddelware from 'reudx-saga';
import invariant from 'invariant';
import checkModel from './checkModel';
import prefixNamespace from './prefixNamespace';
import Plugin,{filterHooks} from './Plugin';


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

        ],
        _store:null,
        _plugin:plugin,

        model,
        start,
	}

	return app;

	function model(m){
		if(process.env.NODE_ENV!=='production'){
             checkModel(m,app._models);
		}

		app._models.push(prefixNamespace(m));
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
		 
	}


}