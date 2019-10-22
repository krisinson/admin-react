/* 向外暴露一个总reducer函数 */

import { combineReducers } from 'redux'

import user from './user'
import xxx from './xxx'

/*
管理的总state的结构

{
    users:{},
    xxx:'hshsh'
}
 */
export default combineReducers({
    user,
    xxx
})