import invariant from 'invariant';
import {isPlainObject} from '../../utils';

const hooks=[
    "onError",
    "onStateChange",
    "onAction",
    "onHmr",
    "onReducer",
    "onEffect",
    "extraReducers",
    "extraEnhancers",
];


export function filterHooks(obj){
	return Object.keys(obj).reduce((memo,key)=>{
		if(hooks.indexOf(key)>-1){
			memo[key]=obj[key];
		}
		return memo;
	},{});
}

export default class Plugin{
	constructor(){
		this.hooks=hooks.reduce((memo,key)=>{
			memo[key]=[];
			return memo;
		},{});
	}

	use(plugin){
       invariant(isPlainObject(plugin),"plugin.use:Plugin should be plain object");
       const hooks=this.hooks;
       for(const key in plugin){
       	  if(Object.prototype.hasOwnProperty.call(plugin,key)){
       	  	invariant(hooks[key],`plugin.use:unknow plugin property:${key}`);
       	  	if(key=='extraEnhancers'){
       	  		hooks[key]=plugin[key];
       	  	}else{
       	  		hooks[key].push(plugin[key]);
       	  	}
       	  }
       }
	}
	apply(key,defaultHandler){
		const hooks=this.hooks;
		const validApplyHooks=['onError','onHmr'];
		invariant(validApplyHooks.indexOf(key)>-1,`plugin.apply:hook ${key} cannot be apply`);
		const fns=hooks[key];

		return (...args)=>{
			if(fns.length){
				for(const fn of fns){
					fn(...args);
				}
			}else if(defaultHandler){
				defaultHandler(...args);
			}
		}
	}

	get(key){
		const hooks=this.hooks;
		invariant(key in hooks,`plugin.get:hook ${key} cannot be got`);
		if(key==='extraEnhancers'){
            return getExtraReducers(hooks[key]);
		}else if(key==='onReducer'){
            return getOnReducers(hooks[key]);
		}else{
			return hooks[key];
		}
	}
}

function getExtraReducers(hook){
    let ret={};
    for(const reudcerObj of hook){
    	ret={...ret,...reudcerObj};
    }
    return ret;
}
function getOnReducers(hook){
    return function(reducer){
       for(const reducerEnhancer of hook){
       	  reducer=reducerEnhancer(reducer);
       }
       return reducer;
    }
}