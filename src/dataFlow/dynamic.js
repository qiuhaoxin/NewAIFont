import React,{Component} from 'react';

const cached={};

function registerModel(app,model){
	model=model.default||model;
	if(!cached[model.namespace]){
		app.model(model);
		cached[model.namespace]=1
	}
}

let defaultLoadingComponent=()=>null;

function asyncComponent(config){
	const {resolve}=config;
	return class DynamicComponent extends Component{
		constructor(...args){
			super(...args);
			this.loadingComponent=config.loadingComponent||defaultLoadingComponent;
			this.state={
				AsyncComponent:null,
			};
			this.load();
		}
		load(){
            resolve().then((m)=>{
            	console.log("m is ");
            	const AsyncComponent=m.default||m;
            	if(this.mounted){
            		this.setState({AsyncComponent});
            	}else{
            		this.state.AsyncComponent=AsyncComponent;
            	}
            })
		}
		componentDidMount(){
            this.mounted=true;
		}
		componentWillUnmount(){
			this.mounted=false;
		}
		render(){
             const {AsyncComponent}=this.state;
             console.log("AsyncComponent is "+AsyncComponent)
             const {loadingComponent}=this;
             const LoadingComponent=loadingComponent;
             if(AsyncComponent) return <AsyncComponent {...this.props}/>;
             return <LoadingComponent {...this.props}/>
		}

	}
}

export default function dynamic(config){
	const {models:resolveModels,component:resolveComponent,app}=config;
	return asyncComponent({
		resolve:config.resolve || function (){
			const models= typeof resolveModels=='function' ? resolveModels() : [];
			const component=resolveComponent();
			return new Promise((resolve)=>{
				Promise.all([...models,component]).then(ret=>{
					if(!models || !models.length){
						return resolve(ret[0])
					}else{
						const len=models.length;
						console.log("len is "+ret.length)
						ret.slice(0,len).forEach(m=>{
							m=m.default||m;
							if(!Array.isArray(m)){
								m=[m];
							}
							m.map=(_=>registerModel(app,_));
						})
						console.log("ret is "+ret[len]);
						resolve(ret[len]);
					}

				})
			});
		},
		...config,
	})
}

dynamic.setDefaultLoadingComponent=(loadingComponent)=>{
	defaultLoadingComponent=loadingComponent;
}