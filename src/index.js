import React from 'react';
import ReactDOM from 'react-dom';
// import DataFlow from './dataFlow';
import dva from 'dva';
import router from './router';
import './index.less';

// const dataFlow=new DataFlow({});
// dataFlow.model(require('./models/global'))
// dataFlow.router(router);
// dataFlow.start('#root');

const app=new dva({})
app.model(require('./models/global').default);
app.router(router);
app.start('#root');

// ReactDOM.render(
//    <div>
//      test
//    </div>
// ,document.getElementById('root'))



