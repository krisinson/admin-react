/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-10-19 13:54:38
 * @LastEditTime: 2019-10-21 20:37:26
 * @LastEditors: Please set LastEditors
 */
import React from 'react';
import ReactDOM from 'react-dom';

import App from './App'
import store from './redux/store'

ReactDOM.render(<App store={store}/>, document.getElementById('root'))

// 给store绑定一个state数据改变的监听回调
store.subscribe(() => {
    ReactDOM.render(<App store={store}/>, document.getElementById('root'))
})