import {getCurrentUser} from '../services/userApi';

export default {
	namespace:'global',
	state:{
       change:false,
	},
	effects:{
       *fetch({payload,callback},{put,call}){
       	   yield put({
       	   	  type:'changeTab',
       	   	  payload:true,
       	   })
           const resonse=yield call(getCurrentUser);
           console.log("response is "+JSON.stringify(response));
       }
	},
	reducers:{
       changeTab(state,payload){
           return {
           	   ...state,
               change:payload,
           }
       }
	},

};