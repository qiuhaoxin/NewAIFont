require('isomorphic-fetch');
import request from './request';



export function getCurrentUser(params){
	return request(,{
		method:'POST',
		body:params
	})
}