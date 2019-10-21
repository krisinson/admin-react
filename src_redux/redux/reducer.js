/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-10-21 19:29:24
 * @LastEditTime: 2019-10-21 20:33:33
 * @LastEditors: Please set LastEditors
 */
/*
根据原有的state和指定的action产生并返回新的一个state 
 */


import { INCREMENT, DECREMENT } from './action-types'
// 用于管理count数据的reducer函数
export default function count(state=1, action) {
    switch (action.type) {
        case INCREMENT:
            return state + action.data
        case DECREMENT:
            return state - action.data
        default:
            return state //返回原有值
    }
}