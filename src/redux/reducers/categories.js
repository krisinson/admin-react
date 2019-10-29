/*
管理所有分类列表数据的reducer 
 */

import {
    RECEIVE_CATEGORIES,
    ADD_CATEGORY,
    UPDATE_CATEGORY
} from '../action-types'

const initCategories = []
export default function categories(state = initCategories, action) {
    switch (action.type) {
        case RECEIVE_CATEGORIES:
            return action.data
        case ADD_CATEGORY:
            return [action.data, ...state]
        case UPDATE_CATEGORY:
            return state.map(item => {
                if (item._id === action.data._id) {
                    return action.data
                } else {
                    return item
                }
            })
        default:
            return state
    }
}