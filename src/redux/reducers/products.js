/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-10-21 16:28:40
 * @LastEditTime: 2019-10-21 18:34:29
 * @LastEditors: Please set LastEditors
 */
/*
 用于管理products数据的reducer函数
 */
import { ADDPRODUCT, UPDATEPRODUCT } from '../action-types'

const initProducts = []
export default function products(state = initProducts, action) {
    switch (action.type) {
        case ADDPRODUCT:
            const product = action.data
            return [product, ...state]
        case UPDATEPRODUCT:
            return state
        default:
            return state
    }
}