import React,{Component} from 'react';
import Styles from './login.less';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import loginImg from '../images/login15.png';

class Login extends Component{
	constructor(props){
		super(props);
	}
	render(){
		return (
          <div className={Styles.wrapper}>
               <div className={Styles.imgWrapper}>
                  <img src={loginImg}/>
               </div>
               <div>
                   hei
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

