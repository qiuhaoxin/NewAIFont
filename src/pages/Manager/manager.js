import React,{Component} from 'react';
import Styles from './manager.less';

class Manager extends Component{
	constructor(props){
		super(props);
	}
    comonentDidMount(){

    }
    renderLeftNav=()=>{

    	return (
          <ul>

          </ul>
    	)
    }
	render(){
		return (
          <div className={Styles.wrapper}>
              manger
          </div>
		)
	}
}
export default Manager;