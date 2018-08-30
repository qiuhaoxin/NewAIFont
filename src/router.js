import React from 'react';
import {getNavData} from './common/nav';
import {Router,Route,Switch} from 'react-router-dom';
import {getPlainNode} from './utils';


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

    const route=navData.filter(item=>item.layout===path)[0];

    const nodeList=getPlainNode(route.children);
    console.log("nodeList is "+JSON.stringify(nodeList));
    return nodeList;
}


function RouterConfig({history,app}){
	const navData=getNavData(app);
	const BasicLayout=getLayout(navData,'basicLayout').component;
	const passProps={
		app,
		navData,
		getRouteData:(path)=>{
			return getRouteData(navData,path);
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