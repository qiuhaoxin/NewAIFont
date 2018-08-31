import React,{Component} from 'react';
import Styles from './index.less';

class SlideMenu extends Component{
	constructor(props){
		super(props);
	}
	componentDidMount(){

	}
	handleTabClick=(e,path)=>{
       this.props.history.push(path);
	}
	render(){
		const {visible,className}=this.props;
		return (
          <div className={`${Styles.wrapper} ${visible ? Styles.showWrapper : Styles.hideWrapper} ${className}`}>
              <ul>
                  <li onClick={(e)=>this.handleTabClick(e,'/Manager/user')}>
                      用户管理
                  </li>
                  <li onClick={(e)=>this.handleTabClick(e,'/Manager/productLine')}>
                      产品线维护
                  </li>
                  <li onClick={(e)=>this.handleTabClick(e,'/Manager/baseData')}>
                      基础资料维护
                  </li>
                  <li onClick={(e)=>this.handleTabClick(e,'/Manager/session')}>
                      会话管理
                  </li>
              </ul>

          </div>
		)
	}
}

export default SlideMenu;