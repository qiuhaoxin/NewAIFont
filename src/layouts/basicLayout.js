import React,{Component} from 'react';
import PropTypes from 'prop-types';
import DocumentTitle from 'react-document-title';
import {Router,Route,Switch,Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {ContainerQuery} from 'react-container-query';
import GlobalHeader from '../components/GlobalHeader';

const styleObj={

}

const query={
	'screen-xs':{
       maxWidth:575,
	},
    'screen-sm':{
    	minWidth:576,
    	maxWidth:767,
    },
    'screen-md':{
    	minWidth:768,
    	maxWidth:991,
    },
    'screen-lg':{
    	minWidth:992,
    	maxWidth:1199,
    },
    'screen-xl':{
        minWidth:1200,
    }
}

class BasicLayout extends Component{

	constructor(props){
		super(props);
	}
	componentDidMount(){
        const {dispatch}=this.props;
        console.log("dispatch is "+dispatch);
        dispatch({
          type:'global/fetch',
          payload:{

          },
          callback:function(){
            console.log("callback is");
          }
        })
	}
	getPageTitle=()=>{
		const {location,getRouteData}=this.props;
		const {pathname}=location;

		return "AI platform";
	}

	render(){
	   const {currentUser,getRouteData}=this.props;
	   const Layout=(
          <div>
               <GlobalHeader {...this.props}>

               </GlobalHeader>
               <div className={'Content'}>
                    <Switch>
                       {
                           getRouteData('basicLayout').map(item=>{
                           	   return (
                                  <Route
                                     path={item.path}
                                     extact={item.extact}
                                     component={item.component}
                                     key={item.path}
                                  ></Route>
                           	   )
                           })
                       }
                       <Redirect from='/' to="/MainPage/mainpage"/>
                    </Switch>
               </div>
          </div>
	   )
       return (
		<DocumentTitle title={this.getPageTitle()}>
            <ContainerQuery query={query}>
                {
                	params=><div>{Layout}</div>
                }
            </ContainerQuery>
		</DocumentTitle>
       )
	}
}
export default connect(state=>{
	return ({
	currentUser:state.user.currentUser
})
})(BasicLayout);

