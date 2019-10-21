
/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-10-21 16:24:14
 * @LastEditTime: 2019-10-21 20:23:48
 * @LastEditors: Please set LastEditors
 */
/*
redux最核心的管理对象store 
 */
import {createStore} from 'redux'

import reducer from './reducer'

// 创建store对象 
export default createStore(reducer)