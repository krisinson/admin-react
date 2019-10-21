/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-10-19 13:54:38
 * @LastEditTime: 2019-10-21 20:59:05
 * @LastEditors: Please set LastEditors
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import App from './containers/App'
import store from './redux/store'

ReactDOM.render((
    // provider向所有容器组件提供store对象
    <Provider store={store}>
        <App/>
    </Provider>
), document.getElementById('root'))

