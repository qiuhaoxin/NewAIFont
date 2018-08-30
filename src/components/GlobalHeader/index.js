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
        const pageData=navData[0];
        pageData.children.forEach(item=>{
             tempData.push(item);
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
  // handleTabClick=(e,item)=>{
  //     const parentPath=item['path'];
  //     const firstChild=item.children && item.children[0];
  //     let {path}=item;
  //     path=path.replace(/\//,'');
  //     this.setState({
  //      	curSelected:path,
  //     })
  //     const urlPath=`${parentPath}${firstChild.path}`;
  //     this.props.history.push(`${firstChild.path}`);
  // }
	renderNavWrapper=()=>{
		const {curSelected}=this.state;
       const childList=this.TabData.map((item,index)=>{
          const firstChild=item.children[0];
          const itemPath=`/${item.path}/${firstChild.path}`;
          //console.log("itemPath is "+JSON.stringify(item));
          console.log("url path is "+itemPath);

          return (
            <li 
               className={`${curSelected==item.path.replace(/\//,'') ? Styles.selected : Styles.normal}`}
               key={item.path?item.path:index}
               >
               <Link                 
                  to={itemPath}
                  replace={itemPath === this.props.location.pathname}
                  >
                  {item.name}
                </Link>
            </li>
          )
       })
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