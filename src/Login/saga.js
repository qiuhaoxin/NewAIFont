
import { take, put, call, fork, select, takeEvery, all,cancel } from 'redux-saga/effects'
import {loginForAccount} from '../services/userApi';

function* LoginFun(payload){
	try{
	   console.log("LoginFun");
       const response=yield call(loginForAccount,payload);
       yield put({type:'LOGIN_SUCCESS',info:response})
	}catch(e){
       yield put({type:'LOGIN_ERROR',info:e});
	}
}
export function* watchSaga(){
	console.log("watchSaga");
	let task;
	while(true){
		yield take('LOGIN');
		if(task)yield cancel(task);
		task=yield fork(LoginFun);
	}
}

// export default function* root(){
// 	console.log("sdfsfd");
// 	//yield all([fork(watchLogin)]);
// }