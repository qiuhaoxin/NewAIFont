import { take, put, call, fork, select, takeEvery, all,cancel } from 'redux-saga/effects'
import {loginForAccount} from '../services/userApi';

function* LoginFun(payload){
	console.log("LoginFun payload is "+JSON.stringify(payload));
	try{
       const response=yield call(loginForAccount,payload);
       console.log("response is "+JSON.stringify(response));
       yield put({type:'LOGIN_SUCCESS',payload:response})
	}catch(e){
       yield put({type:'LOGIN_ERROR',errMessage:e});
	}
}

export function* watchSaga(){
	let task;
	while(true){
		const payload=yield take('LOGIN');
		console.log("watchSaga is "+JSON.stringify(payload));
		if(task)yield cancel(task);
		task=yield fork(LoginFun,payload.payload);
	}
}