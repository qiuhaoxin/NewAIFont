import invariant from 'invariant';
import {isArray,isFunction,IsPlainObject} from '../../utils/index.js';

//校验 model 
export default function checkModel(model,existModels){
	const {
       namespace,
       state,
       reducers,
       effects,
       subscriptions
	}=model;
    // namespace must be defined in model
    console.log("namespace is "+namespace);
	invariant(
       namespace,
       `[app.model] namespace should be defined`,
	);

	invariant(
      typeof namespace==='string',
      `[app.model] namespace should be string ,but got ${typeof namespace}`,
	);
  console.log("existModels is "+JSON.stringify(existModels));
	invariant(
       !existModels.some(m=>m.namespace===namespace),
       `[app.model] namespace should be unique`,
	)

    if(reducers){
    	invariant(
            IsPlainObject(reducers) || isArray(reducers),
            `[app.model] reducers should be plain object or array but got ${typeof reducers}`,
    	)
    }

    if(effects){
    	invariant(
           IsPlainObject(effects),
           `[app.model] effects should be plain object,but got ${typeof effects}`,
    	)
    }

    if(subscriptions){
    	invariant(
            IsPlainObject(subscriptions),
            `[app.modle] subscriptions should be plain object,but got ${typeof subscriptions}`,
    	)
    }

}