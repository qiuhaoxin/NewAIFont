import React from 'react';
import {getNavData} from './common/nav';
// import {Router,Route,Switch} from 'react-router-dom';
import {getPlainNode} from './utils';
import {Router,Route,Switch} from 'dva/router';
import cloneDeep from 'lodash/cloneDeep';


function getLayout(navData,path){
    if(!navData.some(item=>item.layout===path)||!(navData.filter(item=>item.layout==path)[0].children))return null

    const route=navData.filter(item=>item.layout==path)[0];
    return {
    	component:route.component,
    	layout:route.layout,
    	name:route.name,
    	path:route.path,
    }
}

function getRouteData(navData,path){
    if(!navData.some(item=>item.layout===path) || !(navData.filter(item=>item.layout===path)[0].children))return null;

    const route=cloneDeep(navData.filter(item=>item.layout===path)[0]);

    const nodeList=getPlainNode(route.children);
    return nodeList;
}


function RouterConfig({history,app}){
	const navData=getNavData(app);
  const navDataTemp=navData;
	const BasicLayout=getLayout(navData,'basicLayout').component;
	const passProps={
		app,
		navData,
		getRouteData:(path)=>{
			return getRouteData(navDataTemp,path);
		}
	}
	return (
       <Router history={history}>
           <Switch>
               <Route path="/" render={props=><BasicLayout {...props} {...passProps} />}/>
           </Switch>
       </Router>
	)

}

export default RouterConfig;