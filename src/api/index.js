/* 
包含多个接口请求函数的模块
函数的返回值是promise
 */

import ajax from './ajax'
import jsonp from 'jsonp'
import { message } from 'antd'
// 登录
export const reqLogin = ({ username, password }) => ajax({
    url: '/login',
    method: 'POST',
    data: { username, password }
})

// 获取用户列表

export const reqUsers = () => ajax({
    url: '/manage/user/list',
    method: 'GET'
})

// 另外两种写法
// ajax('/manage/user/list')
// ajax.get('/manage/user/list')

/*
封装获取指定城市的天气信息
使用jsonp请求 
 */

export const reqWeather = (city) => {
    return new Promise((resolve, reject) => {
        const url = `http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`
        //callback函数由jsonp库内部定义__jp0函数调用 callback参数来告诉服务器返回的js代码__js0(data)
        jsonp(url, {}, (err, data) => {
            if (!err && data.status === 'success') {
                const { dayPictureUrl, weather } = data.results[0].weather_data[0]
                resolve({ dayPictureUrl, weather })
            } else {
                message.error('获取天气信息失败')
                return new Promise(() => { })
            }
        })
    })
}

/*
获取所有分类的列表
 */

export const reqCategories = () => ajax("/manage/category/list")

/*
添加分类 
 */

export const reqAddCategory = (categoryName) => ajax.post("/manage/category/add", { categoryName })

/*
 修改更新分类
 */

export const reqUpdateCategory = ({ categoryId, categoryName }) => ajax.post("/manage/category/update", { categoryId, categoryName })