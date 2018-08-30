
export default {
	namespace:'systemList',
	state:{
		data:{
			list:[],
			pagination:{

			},
		},
		loading:false,
	},
	effects:{
       *fetch({payload,callback},{put,call}){
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
	}
}