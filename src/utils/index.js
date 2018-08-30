
import isPlainObject from 'is-plain-object';
export const isArray=Array.isArray.bind(Array);
export const isFunction=fn=>typeof fn==='function';
export const noop=()=>{};
export const returnSelf= m => m;
export const IsPlainObject=isPlainObject;

export const isEmpty=(str)=>{
 	const emptyReg=/^\s*$/;
 	return emptyReg.test(str);
}


 export const isString=(str)=>typeof str==='string';


 export const isHTMLElement=node=>typeof node=='object' && node!=null && node.nodeName && node.nodeType;
 //export const isPlainObject=isPlainObjectStr;


 export function getPlainNode(nodeList,parentPath=''){
     const arr=[];
     nodeList.forEach((node)=>{
     	const item=node;
     	item.path=`${parentPath}/${item.path||''}`.replace(/\/+/g,'/');
     	item.exact=true;
     	if(item.children && !item.component){
     		arr.push(item)
     	}else{
     	}
     })
     return arr;
 }