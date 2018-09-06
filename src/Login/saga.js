import {takeEvery} from 'redux-saga';
import {loginForAccount} from '../services/userApi';

export function *LoginFun(payload){
	try{
       const response=yield call(loginForAccount,payload);
       yield put({type:'LOGIN_SUCCESS',info:response})
	}catch(e){
       yield put({type:'LOGIN_ERROR',info:e});
	}
}

export default function *watchLogin(){
   takeEvery('LOGIN',LoginFun);
}