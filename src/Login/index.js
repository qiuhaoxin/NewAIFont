import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import  {Provider} from 'react-redux';
import {createStore,applyMiddleware,combinReducers} from 'redux';
import Router from './route.js';
import {loginReducer} from './reducer.js';
import Saga from './saga.js';
import createSagaMiddleware from 'redux-saga';
import './index.less';
const store=createStore(loginReducer,applyMiddleware(createSagaMiddleware({Saga})));
ReactDOM.render(
    <Provider store={store}>
        <Router></Router>
    </Provider>
,document.getElementById('root'))

