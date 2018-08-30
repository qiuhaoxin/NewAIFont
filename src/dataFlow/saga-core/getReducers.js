import handleActions from './handleActions';

export default function getReducer(reducers,state){
	if(Array.isArray(reducers)){
		return reducers[1](handleActions(reducers[0],state));
	}else{
		return handleActions(reducers || {},state);
	}
}