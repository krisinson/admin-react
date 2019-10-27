/* 管理登录用户数据的reducer函数 */

import { SET_HEADER_TITLE } from '../action-types'

const initHeaderTitle = 'hello'
export default function headerTitle(state = initHeaderTitle, action) {
    switch (action.type) {
        case SET_HEADER_TITLE:
            return action.data
        default:
            return state
    }
}