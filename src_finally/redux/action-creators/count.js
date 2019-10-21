/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-10-21 16:28:53
 * @LastEditTime: 2019-10-21 19:00:54
 * @LastEditors: Please set LastEditors
 */
/*
action creator模块 
 */

import { INCREMENT, DECREMENT } from '../action-types'
// 同步增加
export const increment = (number) => ({ type: INCREMENT, data:number })
// 同步减少
export const decrement = (number) => ({ type: DECREMENT, data:number })

// 异步增加
export const incrementAsync =(number,delayTime)=>{
    // 返回一个回调函数(参数为dispatch函数)
    return dispatch=>{
        // 1.执行异步操作
        setTimeout(() => {
            // 2.有结果后,分发一个同步action对象
            dispatch(increment(number))
        }, delayTime);
    }
}

