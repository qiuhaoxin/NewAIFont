const initalState={
	userName:'',
	password:'',
}

export function loginReducer(state=initalState,action){
	switch(action.type){
		case 'LOGIN':
          return {
          	...state,
          	...action.payload,
          }
		break;
		default:
            return state;
		break;
	}
}