/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-10-21 16:24:14
 * @LastEditTime: 2019-10-21 18:57:09
 * @LastEditors: Please set LastEditors
 */
/*
redux最核心的管理对象store 
 */

import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import reducer from './reducers'

const isDev = process.env.NODE_ENV === 'development'

export default createStore(
    reducer,
    isDev ? composeWithDevTools(applyMiddleware(thunk)) : applyMiddleware(thunk)
)