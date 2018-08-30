

export default {
	namespace:'intentionList',
	state:{
       data:{
       	  list:[],
       	  pagination:{},
       },
       loading:false,
	},
	effects:{
       *fetch({callback,payload},{put,call}){
            yield put({
            	type:'changeLoading',
            	payload:true,
            })
       }
	},
	reducers:{
       changeLoading(state,payload){
       	 return {
       	 	...state,
       	 	loading:false,
       	 }
       }
	}
}