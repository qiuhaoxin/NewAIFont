import invariant from 'invariant';
import {isArray,isFunction,isPlainObject} from '../../utils';


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
	invariant(
       namespace,
       `[app.model] namespace should be defined`,
	);

	invariant(
      typeof namespace==='string',
      `[app.model] namespace should be string ,but got ${typeof namespace}`,
	);

	invariant(
       existModels.some(m=>m.namespace===namespace),
       `[app.model] namespace should be unique`,
	)

    if(reducers){
    	invariant(
            isPlainObject(reducers) || isArray(reducers),
            `[app.model] reducers should be plain object or array but got ${typeof reducers}`,
    	)
    }

    if(effects){
    	invariant(
           isPlainObject(effects),
           `[app.model] effects should be plain object,but got ${typeof effects}`,
    	)
    }

    if(subscriptions){
    	invariant(
            isPlainObject(subscriptions),
            `[app.modle] subscriptions should be plain object,but got ${typeof subscriptions}`,
    	)
    }

}