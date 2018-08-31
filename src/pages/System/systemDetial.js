import React,{Component} from 'react';
import {Button} from 'antd';

class SystemDetial extends Component{
	constructor(props){
		super(props);
	}
	componentDidMount(){

	}
	handleBtnClick=()=>{
       this.props.history.push('/Intention/newIntention');
	}
	render(){
       return (
           <div>
               SystemDetial
               <Button type='primary' onClick={this.handleBtnClick}>newIntention</Button>
           </div>
       	)
	}
}
export default SystemDetial;