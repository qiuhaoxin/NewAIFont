export const isArray=Array.isArray.bind(Array);
export const isFunction=fn=>typeof fn==='function';
export const noop=()=>{};
export isPlainObject from 'is-plain-object';


export const isEmpty=(str)=>{
	const emptyReg=/^\s*$/;
	return emptyReg.test(str);
}


export const isString=(str)=>typeof str==='string';


export const isHTMLElement=node=>typeof node=='object' && node!=null && node.nodeName && node.nodeType;