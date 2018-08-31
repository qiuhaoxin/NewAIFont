import React,{Component} from 'react';
import Styles from './index.less';

class SlideMenu extends Component{
	constructor(props){
		super(props);
	}
	componentDidMount(){

	}
	render(){
		const {visible,className}=this.props;
		return (
          <div className={`${Styles.wrapper} ${visible ? Styles.showWrapper : Styles.hideWrapper} ${className}`}>
              SlideMenu
          </div>
		)
	}
}

export default SlideMenu;