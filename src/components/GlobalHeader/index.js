import React,{Component} from 'react';
import Styles from './index.less';
class GlobalHeader extends Component{
	constructor(props){
		super(props);
	}
	componentDidMount(){

	}
	render(){
        return (
            <div className={Styles.wrapper}>
                <div>
                    GlobalHeader
                </div>
            </div>
        )
	}
}

export default GlobalHeader;