import React,{Component} from 'react';
import {Button} from 'antd';

class SystemList extends Component{
	constructor(props){
		super(props);
	}
	componentDidMount(){

	}
	hanldeBtnClick=(e,path)=>{
        this.props.history.push(path);
	}
	render(){
       return (
           <div>
               SystemList
               <Button type='primary' onClick={(e)=>this.hanldeBtnClick(e,'/System/newSystem')}>newSystem</Button>
               <Button type='primary' onClick={(e)=>this.hanldeBtnClick(e,'/System/systemDetial')}>systemDetial</Button>
           </div>
       	)
	}
}
export default SystemList;