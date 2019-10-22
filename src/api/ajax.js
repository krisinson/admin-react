
/*
使用axios 进行ajax请求的二次封装  
封装一个能发ajax请求的函数/对象
*/

import axios from 'axios'
import qs from 'qs'
import { message } from 'antd'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
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
        message.error('请求出错:' + error.message)
        // 中断promise链 外部不需要再处理请求出错的情况
        return new Promise(() => { })
    }
)


// 向外暴露instance
export default instance
