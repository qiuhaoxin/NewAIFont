require('isomorphic-fetch');
import request from './request';

const urlPath="http://localhost:8888/ui/";

export function getCurrentUser(params){
	return request(,{
		method:'POST',
		body:params,
	})
}

export function Login(params){
	return request(,{
		method:'POST',
		body:params,
	})
}