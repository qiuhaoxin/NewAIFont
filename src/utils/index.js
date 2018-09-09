
let MD5=require('md5.js');

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
    // console.log("getPlainNode!");
     nodeList.forEach((node)=>{
     	const item=node;
     	item.path=`${parentPath}/${item.path||''}`.replace(/\/+/g,'/');
     	item.exact=true;
     	if(item.children && !item.component){
     		arr.push(...getPlainNode(item.children,item.path));
     	}else{
               if(item.children && item.component){
                    item.exact=false;
               }
               arr.push(item);
     	}
     })
    // console.log("arr is "+JSON.stringify(arr));
     return arr;
 }

 export function encrypt(msg){
// body...
  var md5stream=new MD5();
  const afterMd5=md5stream.update(msg).digest('hex');
  return afterMd5;
 }  