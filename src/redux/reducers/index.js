/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-10-21 16:28:31
 * @LastEditTime: 2019-10-21 18:45:39
 * @LastEditors: Please set LastEditors
 */
/*
reducer函数:根据原有的state和指定的action,产生并返回一个新的state 
 */

 import {combineReducers} from 'redux'
 import count from './count'
 import products from './products'

 /*
 向外暴露整合多个reducer产生总reducer的函数 
  */

  export default combineReducers({
      count,
      products
  })