import React,{Component} from 'react';
import Styles from './index.less';
import {Link} from 'dva/router';
import PropTypes from 'prop-types';
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
  handelTab=(e,item)=>{
      const {onTabClick}=this.props;
      onTabClick && onTabClick(item);
  }
	renderNavWrapper=()=>{
		const {curSelected}=this.state;
       const childList=this.TabData.map((item,index)=>{
          const firstChild=item.children[0];
          const itemPath=`/${item.path}/${firstChild.path}`;

          return (
            <li 
               className={`${curSelected==item.path.replace(/\//,'') ? Styles.selected : Styles.normal}`}
               key={item.path?item.path:index}
               onClick={(e)=>this.handelTab(e,item)}
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
GlobalHeader.defaultProps={
  onTabClick:null,
}
GlobalHeader.propTypes={
  onTabClick:PropTypes.func,
}


export default GlobalHeader;