/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-10-21 16:28:24
 * @LastEditTime: 2019-10-21 16:28:24
 * @LastEditors: your name
 */
import {
    INCREMENT,
    DECREMENT
} from '../action-types'

/*
用于管理count数据的reducer函数  
*/
const initCount = 1
export default function count(state = initCount, action) {
    switch (action.type) {
        case INCREMENT:
            return state + action.data
        case DECREMENT:
            return state - action.data
        default:
            return state
    }
}