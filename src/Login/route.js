import {HashRouter,Route,Redirect,Switch} from 'react-router-dom';
import React,{Component} from 'react';

import Login from './login.js';

class Router extends Component{
	constructor(props){
		super(props);
	}
	render(){
        return (
           <HashRouter>
               <Switch>
                   <Route path="/" component={Login}></Route>
               </Switch>
           </HashRouter>
        )
	}
}
export default Router;