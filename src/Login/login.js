import React,{Component} from 'react';
import Styles from './login.less';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import loginImg from '../images/login15.png';
import {Button,message} from 'antd';
import {encrypt,isEmpty} from '../utils';

import QRCode from '../images/icon_scan.png';
class Login extends Component{
	constructor(props){
		super(props);
	}
  state={
    userName:'',
    passWord:'',
  }
	handelBtnClick=()=>{
       const {userName,passWord}=this.state;
       const {dispatch}=this.props;
       if(this.validate()){
          dispatch({type:'LOGIN',payload:{userName,passWord:encrypt(passWord)}})
       }
       //this.props.dispatch({type:'LOGIN',payload:{userName,passWord:encrypt(passWord)}});
	}
  handleInputChange=(e,key)=>{
     const val=e.target.value;
     this.setState({
       [key]:val,
     })
  }
  validate=()=>{
      const {userName,passWord}=this.state;
      if(isEmpty(userName)){
        console.log("sdfsd empty");
         message.error("用户名不能为空!");
         return false;
      }
      if(isEmpty(passWord)){
         message.error("密码不能为空!");
         return false;
      }
      return true;
  }

	render(){
		return (
          <div className={Styles.wrapper}>
               <div className={Styles.imgWrapper}>
               </div>
               <div className={Styles.inputWrapper}>
                   <div className={Styles.row}>
                      <label>账号</label>
                      <input placeholder={`请输入手机号`} onChange={(e)=>this.handleInputChange(e,'userName')}/>
                   </div>
                   <div className={Styles.row}>
                      <label>密码</label>
                      <input placeholder={`请输入密码`} onChange={(e)=>this.handleInputChange(e,'passWord')}/>
                   </div>
                   <div className={Styles.row}>
                      <Button type='primary' onClick={this.handelBtnClick}>登录</Button>
                   </div>

                   <div className={Styles.noneLineRow}>
                       <div className={Styles.leftRow}>
                          <span className={Styles.remember}>记住我</span>
                          <span className={Styles.findPsw}>找回密码</span>
                       </div>
                       <div className={Styles.rightRow}>
                          <span>Language</span>

                       </div>
                   </div>

                   <div className={Styles.scanRow}>
                       <div>
                           获取账号密码
                       </div>
                       <div>
                           <img src={QRCode}/>
                       </div>
                   </div>
               </div>
          </div>
		)
	}
}
Login.defaultProps={
	userName:'',
	passWord:''
}
Login.propTypes={
	userName:PropTypes.string,
	passWord:PropTypes.string,
}

export default connect(state=>{
  return ({
  	userName:state.userName,
	  passWord:state.passWord,
  })
})(Login);

