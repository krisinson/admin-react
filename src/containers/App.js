/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-10-21 16:22:08
 * @LastEditTime: 2019-10-21 16:55:09
 * @LastEditors: Please set LastEditors
 */
import React from 'react'
import {connect} from 'react-dom'
import Counter from '../components/counterr'
import {increment,decrement,incrementAsync} from '../redux/action-creators/count'

export default connect(
    state=>({count:state.count}),
    {increment,decrement,incrementAsync}
)(Counter)