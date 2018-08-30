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