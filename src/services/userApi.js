
import request from './request';

const urlParams={
	development:'localhost:8888',
	production:'ai.kingdee.com:9992',
}
let postUrl="";
console.log("FETCH_URL is "+FETCH_URL);
if(FETCH_URL && FETCH_URL=='development'){
     postUrl=urlParams[FETCH_URL]+"/rest/ui";
}


//获取默认用户
export function getCurrentUser(params){
    return request(postUrl+"/login/getcurrentuser",{
    	method:'POST',
    	body:params,
    });
};
//用户登录
export function loginForAccount(params){
    return request(postUrl+"/login/Login",{
    	method:"POST",
    	body:params,
    })
}

//注册用户
export function fakeRegister(params){
	return request(postUrl+"/login/register",{
		method:'POST',
		body:params,
	})
}
//获取用户列表
export function getUserList(params){
	return request(postUrl+"/login/getuserlist",{
		method:'POST',
		body:params,
	})
}
//删除用户  管理员权限
export function delUser(params){
	return request(postUrl+"/login/delUser",{
		method:'POST',
		body:params,
	})
}

//添加或更新用户
export function addorupdateuser(params){
	return request(postUrl+"/login/addorupdateuser",{
		method:'POST',
		body:params,
	})
}
//退出登录
export function loginOut(params){
	return request(postUrl+"/login/LoginOut",{
		method:"POST",
		body:params
	});
}

