/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-10-19 13:54:38
 * @LastEditTime: 2019-10-19 13:54:38
 * @LastEditors: your name
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'

import store from './redux/store'
import App from './App'
ReactDOM.render((
    <Provider store={store}>
        <App />
    </Provider>
), document.getElementById('root'))
