import React,{Component} from 'react';
import {Button} from 'antd';

class IntentionList extends Component{
	constructor(props){
		super(props);
	}
	componentDidMount(){

	}
    handleBtnClick=(e,key)=>{
        this.props.history.push(key);
    }
	render(){
		return (
           <div>
               intentionList
               <Button type='primary' onClick={(e)=>this.handleBtnClick(e,'/Intention/newIntention')}>newIntention</Button>
               <Button type='primary' onClick={(e)=>this.handleBtnClick(e,'/Intention/intentionDetial')}>intentionDetial</Button>
           </div>
	    )
	}
}

export default IntentionList;