import React,{Component} from 'react';
import PropTypes from 'prop-types';
import DocumentTitle from 'react-document-title';
import {Router,Route,Switch,Redirect} from 'dva/router';
import {connect} from 'react-redux';
import {ContainerQuery} from 'react-container-query';
import GlobalHeader from '../components/GlobalHeader';
import SlideMenu from '../components/SlideMenu';
import Styles from './basicLayout.less';

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
        dispatch({
          type:'global/fetch',
          payload:{

          },
          callback:function(){
            console.log("callback is");
          }
        })
	}
  state={
    showSlideMenu:false,
  }
	getPageTitle=()=>{
		const {location,getRouteData}=this.props;
		const {pathname}=location;

		return "AI platform";
	}
  handleTabClick=(item)=>{
     if(item.name=='管理'){
        this.setState({
          showSlideMenu:true,
        })
     }else{
        this.setState({
          showSlideMenu:false,
        })
     }
  }
	render(){
	   const {currentUser,getRouteData,navData,location,dispatch}=this.props;
     const {showSlideMenu}=this.state;
	   const Layout=(
          <div className={Styles.wrapper}>
               <GlobalHeader navData={navData} dispatch={dispatch} location={location} onTabClick={this.handleTabClick}>
               </GlobalHeader>
               <div className={Styles.content}>
                    <SlideMenu visible={showSlideMenu} className={Styles.slideMenu} history={this.props.history}>

                    </SlideMenu>
                    <div>
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

