
export default {
	namespace:'mainpage',
	state:{
       data:{
       	  list:[],
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
        		loading:payload,
        	}
        }
	},
}