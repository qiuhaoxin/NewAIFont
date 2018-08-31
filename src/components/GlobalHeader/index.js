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
    const {location:{pathname}}=this.props;
    console.log("pathname is "+pathname);
    const matchReg=/\/([a-zA-Z]+)\//;
    const result=pathname.match(matchReg);
    if(result && result.length>1){
      this.setState({
        curSelected:result[1],
      })
    }
	}
	getTabData=()=>{
        const {getRouteData,navData}=this.props;
        let tempData=[];
        const pageData=navData[0];
        pageData.children.forEach(item=>{
             tempData.push(item);
        })
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
      this.setState({
        curSelected:item.path,
      })
  }
	renderNavWrapper=()=>{
		const {curSelected}=this.state;
    const childList=this.TabData.map((item,index)=>{
          const firstChild=item.children[0];
          const itemPath=`/${item.path}/${firstChild.path}`;
          return (
            <li 
               key={item.path?item.path:index}
               >
               <Link     
                  className={`${curSelected==item.path.replace(/\//,'') ? Styles.selected : Styles.normal}`}            
                  to={itemPath}
                  replace={itemPath === this.props.location.pathname}
                  onClick={(e)=>this.handelTab(e,item)}
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