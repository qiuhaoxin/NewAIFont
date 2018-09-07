import React,{Component} from 'react';
import Styles from './login.less';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import loginImg from '../images/login15.png';
import {Button} from 'antd';

class Login extends Component{
	constructor(props){
		super(props);
	}
	handelBtnClick=()=>{
		console.log("dispatch is "+this.props.dispatch);
       this.props.dispatch({type:'LOGIN',payload:{userName:'qiuhaoxin',password:'123'}});
	}
	render(){
		return (
          <div className={Styles.wrapper}>
               <div className={Styles.imgWrapper}>
               </div>
               <div className={Styles.inputWrapper}>
                   <div className={Styles.row}>
                      <label>账号</label>
                      <input placeholder={`请输入手机号`}/>
                   </div>
                   <div className={Styles.row}>
                      <label>密码</label>
                      <input placeholder={`请输入密码`}/>
                   </div>
                   <Button type='primary' onClick={this.handelBtnClick}>登录</Button>
               </div>
          </div>
		)
	}
}
Login.defaultProps={
	userName:'',
	password:''
}
Login.propTypes={
	userName:PropTypes.string,
	password:PropTypes.string,
}

export default connect(state=>{
  return ({
  	userName:state.userName,
	password:state.password,
  })
})(Login);

