
/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-10-21 19:30:25
 * @LastEditTime: 2019-10-21 20:24:51
 * @LastEditors: Please set LastEditors
 */
/*
用于n个创建action对象的工厂函数 
 */

import { INCREMENT, DECREMENT } from './action-types'

export const increment = (number) => ({ type: INCREMENT, data: number })
export const decrement = (number) => ({ type: DECREMENT, data: number })

