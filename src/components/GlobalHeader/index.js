import React,{Component} from 'react';
import Styles from './index.less';
import {Link} from 'dva/router';
class GlobalHeader extends Component{
	constructor(props){
		super(props);
		this.TabData=this.getTabData();
		this.state={
		     curSelected:this.TabData[0].path.replace(/\//,''),
	    }
	}
	componentDidMount(){
       
	}
	getTabData=()=>{
        const {getRouteData,navData}=this.props;
        let tempData=[];
        navData[0].children.forEach(item=>{
             let tempObj={};
             tempObj['name']=item.name;
             tempObj['path']=item.path
             tempData.push(tempObj);
        })
        console.log("tempData is "+JSON.stringify(tempData));
        return tempData;
	}
	renderLeftWrapper=()=>{
       return (
          <div className={Styles.leftWrapper}>
                 AI Platform
          </div>
       )
	}
    handleTabClick=(e,item)=>{
       console.log("item is "+JSON.stringify(item));
       let {path}=item;
       path=path.replace(/\//,'');
       this.setState({
       	  curSelected:path,
       })

       this.props.history.push("/System/systemList");
    }
	renderNavWrapper=()=>{
		const {curSelected}=this.state;
	    console.log("curSelected is "+curSelected);
       const childList=this.TabData.map((item,index)=>
        <li 
           className={`${curSelected==item.path.replace(/\//,'') ? Styles.selected : Styles.normal}`}
           key={item.path?item.path:index}
           onClick={(e)=>this.handleTabClick(e,item)}
           >
           {item.name}
        </li>)
       return (
          <ul className={Styles.navWrapper}>
              {childList}
          </ul>
       )
	}
	renderRightWrapper=()=>{

	}
	render(){
        return (
            <div className={Styles.wrapper}>
                 {this.renderLeftWrapper()}
                 {this.renderNavWrapper()}
            </div>
        )
	}
}

export default GlobalHeader;