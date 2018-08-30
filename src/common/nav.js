//import dynamic from '../dataFlow/dynamic';
import dynamic from 'dva/dynamic';

const dynamicWrapper=(app,models,component)=>dynamic({
    app,
    models:()=>models.map(m=>import(`../models/${m}.js`)),
    component,
})
export const getNavData=app=>[
    {
        component:dynamicWrapper(app,['user'],()=>import('../layouts/basicLayout')),
        layout:'basicLayout',
        name:'AI Platform',
        path:'/',
        children:[
                {
                   name:'首页',
                   path:'MainPage',
                   children:[
                      {
                        name:'首页列表',
                        path:'mainpage',
                        component:dynamicWrapper(app,['mainpage'],()=>import('../pages/MainPage/mainpage.js')),
                      }
                   ]
                },{
                    name:'业务系统',
                    path:'System',
                    children:[
                      {
                        name:'系统列表',
                        path:'systemList',
                        component:dynamicWrapper(app,['systemlist'],()=>import('../pages/System/systemList.js')),
                      }
                    ]
                },{
                    name:'意图',
                    path:'Intention',
                    children:[
                      {
                        name:'意图列表',
                        path:'intentionList',
                        component:dynamicWrapper(app,['intentionlist'],()=>import('../pages/Intention/intentionList.js')),
                      }
                    ]
                },{
                    name:'管理',
                    path:'Manager',
                    children:[
                       {
                          name:'管理',
                          path:'manager',
                          component:dynamicWrapper(app,['manager'],()=>import('../pages/Manager/manager.js')),
                       }
                    ]
                }
        ]
    }
]