import {NAMESPACE_SEP} from './constant';

export default function prefixType(type,model){
	const prefixedType=`${model.namespace}${NAMESPACE_SEP}${type}`;
	const typeWidthoutAffix=prefixedType.replace(/\/@@[^/]+?$/,'');
	if((model.reducers && model.reducers[typeWidthoutAffix])
		||(model.effects && model.effects[typeWidthoutAffix])){
        return prefixedType;
	}
	return type;
}