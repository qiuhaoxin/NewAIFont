import dynamic from '../dataFlow/dynamic';

const dynamicWrapper=(app,models,component)=>dynamic({
    app,
    models:()=>models.map(m=>import(`../models/${m}.js`)),
    component,
})
export const getNavData=app=>[
    {
        component:dynamicWrapper(app,['global'],()=>import('../layouts/basicLayout')),
        layout:'basicLayout',
        name:'AI Platform',
        path:'/',
        children:[
                {
                   name:'首页',
                   path:'MainPage',
                   children:[
                      {
                        name:'首页卡片',
                        path:'mainpage',
                        component:dynamicWrapper(app,['mainpage'],()=>import('../pages/MainPage/mainpage.js')),
                      }
                   ]
                },
                {
                    name:'业务系统',
                    path:'System',
                    children:[
                      {
                        name:'系统列表',
                        path:'systemList',
                        component:dynamicWrapper(app,['systemlist'],()=>import('../pages/System/systemList.js')),
                      }
                    ]
                },
                {
                    name:'意图',
                    path:'Intention',
                    children:[
                      {
                        name:'意图列表',
                        path:'intentionList',
                        component:dynamicWrapper(app,['intentionlist'],()=>import('../pages/Intention/intentionList.js')),
                      }
                    ]
                },
        ]
    }
]