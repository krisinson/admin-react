/*
操作所有分类列表数据的action creator
 */

import {
    RECEIVE_CATEGORIES,
    ADD_CATEGORY,
    UPDATE_CATEGORY
} from '../action-types'

import {
    reqCategories,
    reqAddCategory,
    reqUpdateCategory
} from '../../api/index'

//  同步action creator
const receiveCategories = (categories) => ({ type: RECEIVE_CATEGORIES, data: categories })
const addCategory = (category) => ({ type: ADD_CATEGORY, data: category })
const updateCategories = (category) => ({ type: UPDATE_CATEGORY, data: category })


/*
获取所有分类列表的异步action creator 
 */

export const getCategorisAsync = () => {
    return async (dispatch,getState )=> { //在action creator中得到现有的state
        // 如果有数据 直接结束
        if (getState().categories.length > 0) return
        //  发异步ajax请求
        const result = await reqCategories()
        // 请求完成后分发同步action
        if (result.status === 0) {
            const categories = result.data
            dispatch(receiveCategories(categories))
        }
        return result.msg  //此返回值是外部组件调用promise成功的value
    }
}

/*
添加分类列表的异步action creator 
 */

export const addCategoryAsync = (categoryName) => {
    return async dispatch => {
        //  发异步ajax请求
        const result = await reqAddCategory(categoryName)
        // 请求完成后分发同步action
        if (result.status === 0) {
            const category = result.data
            dispatch(addCategory(category))
        }
        return result.msg  //此返回值是外部组件调用promise成功的value

    }
}

/*
更新分类列表的异步action creator 
 */

export const updateCategoriesAsync = ({ categoryId, categoryName }) => {
    return async dispatch => {
        //  发异步ajax请求
        const result = await reqUpdateCategory({ categoryId, categoryName })
        // 请求完成后分发同步action
        if (result.status === 0) {
            const category = { _id: categoryId, name: categoryName }
            dispatch(updateCategories(category))
        }
        return result.msg  //此返回值是外部组件调用promise成功的value

    }
}