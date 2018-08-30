

export default {
	namespace:'manager',
	state:{
		data:{

		},
		loading:false,
	},
	effects:{
       *fetchUser({callback,payload},{put,call}){

       }
	},
	reducers:{
        save(state,payload){
        	return {
        		...state,
        		payload,
        	}
        }
	},
}