
/*
使用axios 进行ajax请求的二次封装  
封装一个能发ajax请求的函数/对象
*/

import axios from 'axios'
import qs from 'qs'
import { message } from 'antd'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import store from '../redux/store'
import history from '../history'
import { removeUserToken } from '../redux/action-creators/user'
// 创建一个instance

const instance = axios.create({
    timeout: 10000 //超时时间为10秒
})

// 添加请求拦截器
instance.interceptors.request.use(config => { //url method data params
    console.log('request interceptor onResolved()')

    // 显示请求进度
    NProgress.start()
    // 将post/put请求的data对象数据转换为urlencoded格式的字符串数据
    const { data } = config
    if (data instanceof Object) { //只要data是对象就转换
        config.data = qs.stringify(data)
    }

    // 如果有token 添加到请求头中:Authorization
    const token = store.getState().user.token
    if (token) {
        // config当前请求的配置
        config.headers['Authorization'] = 'atguigu_' + token
    }
    return config //必须返回config
})


// 添加响应拦截器
instance.interceptors.response.use(
    response => {
        console.log('respone interceptor onResolved()')
        NProgress.done()
        const result = response.data

        // if (result.status === 0) { //操作成功
        //     return result.data || {} //外部成功回调得到对象类型的数据
        // } else { //操作失败
        //     return Promise.reject(result.msg || '操作失败,未知原因')
        // }

        return result
    },
    error => {
        console.log('response interceptor onRejected()')

        NProgress.done()
        // 统一处理请求异常
        // 显示请求错误的提示

        const { status, data: { msg } = {} } = error.response
        // 如果请求为401 token在后台中的状态是未携带或者已经过期
        if(status===401){
            // 如果当前没有登录界面(当前路由路径不是/login)
            if(history.location.pathname!=='/login'){
                // 显示提示
                message.error(msg)
                // 删除用户信息 自动跳转到登录界面
                store.dispatch(removeUserToken())
            }
        }else if(status===404){
            message.error('请求资源不存在')
        }else{
            message.error('请求出错了'+error.message)
        }

        // 中断promise链 外部不需要再处理请求出错的情况
        return new Promise(() => { })
    }
)


// 向外暴露instance
export default instance
