import 'babel-polyfill';
import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import  {Provider} from 'react-redux';
import {createStore,applyMiddleware,combinReducers,compose} from 'redux';
import Router from './route.js';
import {loginReducer} from './reducer.js';
import {watchSaga} from './saga.js';
import createSagaMiddleware from 'redux-saga';
import './index.less';

const initState={};
// const enhancer = compose(
//   applyMiddleware(createSagaMiddleware(saga)),
//   window.devToolsExtension ? window.devToolsExtension() : f => f
// );
const store=createStore(loginReducer,applyMiddleware(createSagaMiddleware(watchSaga)));
//sagaMiddleware.run(Saga);

ReactDOM.render(
    <Provider store={store}>
        <Router></Router>
    </Provider>
,document.getElementById('root'))

