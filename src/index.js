import React from 'react';
import ReactDOM from 'react-dom';
// import DataFlow from './dataFlow';
import dva from 'dva';
import router from './router';
import './index.less';

const app=new dva({})
app.model(require('./models/global').default);
app.router(router);
app.start('#root');