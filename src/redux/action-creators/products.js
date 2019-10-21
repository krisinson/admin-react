/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-10-21 16:29:00
 * @LastEditTime: 2019-10-21 16:29:00
 * @LastEditors: your name
 */
import {ADD_PRODUCT, UPDATE_PRODUCT} from '../action-types'

export const addProduct = (product) => ({type: ADD_PRODUCT, data: product})

export const update = (product) => ({type: UPDATE_PRODUCT, data: product})