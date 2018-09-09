const initalState={
	userName:'haoxin_qiu',
	passWord:'qhx123',
	errMessage:'',
}

export function loginReducer(state=initalState,action){
	switch(action.type){
		case 'LOGIN':
		  console.log("sdfjsld login"+JSON.stringify(action));
          return {
          	...state,
          	...action.payload,
          }
		break;
		case 'LOGIN_SUCCESS':
           return {
           	  ...state,
           	  userName:action.payload.fFullName,
           	  passWord:'',
           }
		break;
		case 'LOGIN_ERROR':
           return {
           	 ...state,
           	 errMessage:action.errMessage,
           }
		break;
		default:
            return state;
		break;
	}
}