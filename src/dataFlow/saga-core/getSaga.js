import invariant from 'invariant';
import * as sagaEffects from 'redux-saga/effects';
import warning from 'warning';
import {
	takeEveryHelper as takeEvery,
	takeLatestHelper as takeLatest,
    throttleHelper as ttrottle,
}from 'redux-saga/lib/internal/sagaHelpers';
import {NAMESPACE_SEP} from './constant';
import prefixType from './prefixType';


export default function getSaga(resolve,reject,effects,model,onError,onEffect){
   return function *(){
   	   for (const key in effects){
   	   	   if(Object.prototype.hasOwnProperty.call(effects,key)){
              const watcher=getWatcher(resolve,reject,key,effects[key],model,onError,onEffect);
              const task=yield sagaEffects.fork(watcher);
              yield sagaEffects.fork(function *(){
              	  yield sagaEffects.take(`${model.namespace}/@@CANCEL_EFFECTS`);
              	  yield sagaEffects.cancel(task);
              })
   	   	   }
   	   }
   }
}

function getWatcher(resolve,reject,key,_effect,model,onError,onEffect){
	let effect=_effect;
	let type="takeEvery";
	let ms;

	if(Array.isArray(_effect)){
		effect=_effect[0];
		const opts=_effect[1];
		if(opts && opts.type){
			type=opts.type;
			if(type=='throttle'){
				invariant(opts.ms,`app.start:opts.ms should be defined if type is throttle`);
			}
			ms=opts.ms;
		}
		invariant(['watcher','takeEvery','takeLatest','throttle'].indexof(type)>-1,
			`app.start:effect type should be takeEvery,takeLatest,watcher or throttle`)
	}
    function *sagaWithCatch(...args){
    	try{
            yield sagaEffects.put({type:`${key}${NAMESPACE_SEP}@@start`});
            const ret=yield effect(...args.concat(createEffects(model)));
            yield sagaEffects.put({type:`${key}${NAMESPACE_SEP}@@end`});
            resolve(key,ret);
    	}catch(e){
    		onError(e);
    		if(!e._dontReject){
    			reject(key,e);
    		}
    	}
    }


	const sagaWithOnEffect=applyOnEffect(onEffect,sagaWithCatch,model,key);

	switch(type){
		case 'watcher':

		break;
		case 'takeLatest':
            return function *(){
            	yield takeLatest(key,sagaWithOnEffect);
            }
		break;
		case 'throttle':
		    return function *(){
		    	yield throttle(ms,key,sagaWithOnEffect);
		    }
		break;
		default:
             return function *(){
             	yield takeEvery(key,sagaWithOnEffect);
             }
		break;
	}
}

function createEffects(model){
	function assertAction(type,name){
		invariant(type,`dispatch:action should be a plain object with type`);
		warning(
            type.indexOf(`${model.namespace}${NAMESPACE_SEP}`)!==0,
            ``
		)
	}
	function put(action){
       const {type}=action;
       assertAction(type,'sagaEffects.put');
       return sagaEffects.put({...action,type:prefixType(type,model)});
	}
	function take(type){
        if(typeof type ==='string'){
            assertAction(type,'sagaEffects.take');
            return sagaEffects.take(prefixType(type,model));
        }else{
        	return sagaEffects.take(type);
        }
	}
	return {...sagaEffects,put,take};
}

function applyOnEffect(fns,effect,model,key){
	for(const fn of fns){
		effect=fn(effect,sagaEffects,model,key);
	}
	return effect;
}