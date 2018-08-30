

export default {
	namespace:'user',
	state:{
		currentUser:{
			name:'邱浩新',
            avator:'',
		},
		loading:false,
	},
	effects:{
       *fetchUser({callback,payload},{put,call}){

       }
	},
	reducers:{
       sysncUser(state,payload){
       	  return {
       	  	...state,
       	  	currentUser:payload,
       	  }
       }
	}
}