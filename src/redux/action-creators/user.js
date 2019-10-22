/*
操作user登录用户信息的action creator 
 */

import { reqLogin } from '../../api'
import { message } from 'antd'
import { SAVE_USER_TOKEN, REMOVE_USER_TOKEN } from '../action-types'

/*
保存user和token的同步action creator
*/
const saveUserToken = (user, token) => ({ type: SAVE_USER_TOKEN, data: { user, token } })

export const removeUserToken = () => {
    //清除local中的user和token
    localStorage.removeItem('user_key')
    localStorage.removeItem('token_key')
    return { type: REMOVE_USER_TOKEN }
}
/*
用于登录请求的异步action creator 
 */

export function loginAsync({ username, password }) {
    //   返回一个异步action函数
    return async dispatch => {
        // 1.执行异步请求
        const result = await reqLogin({ username, password })
        // 2.根据结果分发同步action
        if (result.status === 0) { //登录成功
            const { user, token } = result.data
            // 将user和token保存到local中
            localStorage.setItem('user_key', JSON.stringify(user)) //转换成json保存
            localStorage.setItem('token_key', token)
            // 分发保存user和token信息的同步action
            dispatch(saveUserToken(user, token))
        } else { //登录失败
            message.error(result.msg)
        }
    }
}