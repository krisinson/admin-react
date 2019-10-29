/* 向外暴露一个总reducer函数 */

import { combineReducers } from 'redux'

import user from './user'
import headerTitle from './header-title'
import  categories from './categories'

/*
管理的总state的结构

{
    users:{},
   headerTitle:'',
    categories:[]
}
 */
export default combineReducers({
    user,
    headerTitle,
    categories
})