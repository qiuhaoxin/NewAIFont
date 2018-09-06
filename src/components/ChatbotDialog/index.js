/*
*  AI平台验证对话框
*/
import React,{Component} from 'react';
import PropTypes from 'prop-types';
import Styles from './index.less';

const prefixCls="chatbot-";
class ChatbotDialog extends Component{
	constructor(props){
		super(props);
	}
	componentDidMount(){

	}
	render(){
       <div className={`${prefixCls}wrapper`}>
           <div className={}>

           </div>
       </div>
	}
}
ChatbotDialog.defaultProps={

}
ChatbotDialog.propTypes={

}

export default ChatbotDialog;


{
   业务系统基本属性,
   应用列表，//应用图标
   
   业务系统分配的意图:[
        分配词槽的配置，
        分配意图基本信息，
        {
            意图基本属性,
            意图对应的词槽:[
                {
                    词槽的基本属性
                }
            ],
            意图附带的扩展意图:[
                {
                    扩展意图基本属性,
                    规则配置，
                    扩展意图对应的词槽:[
                        {
                            词槽的基本属性
                        }
                    ]
                }
            ]
        }
    ],
    标注样本集
}