import {isArray} from '../../utils';
import {NAMESPACE_SEP} from './constant';


function prefix(obj,namespace,type){
     return Object.keys(obj).reduce((memo,key)=>{
     	const newKey=`${namespace}${NAMESPACE_SEP}${key}`;
        memo[newKey]=obj[key];
        return memo;
     },{});
}

export default function prefixNamespace(model){
	const {
       namespace,
       reducers,
       effects,
	}=model;
	if(reducers){
		if(isArray(reducers)){
            model.reducers[0]=prefix(reducers[0],namespace,'reducer');
		}else{
			model.reducers=prefix(reducers,namespace,'reducer');
		}
	}
	if(effects){
		model.effects=prefix(effects,namespace,'effect')
	}
	return model;
}