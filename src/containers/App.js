/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-10-21 19:40:24
 * @LastEditTime: 2019-10-21 21:16:54
 * @LastEditors: Please set LastEditors
 */
// import React from 'react'
import { connect } from 'react-redux'
import Counter from '../components/counter'
import { increment, decrement } from '../redux/action-creators'
/*
容器组件
 通过connect高阶函数产生
 容器组件负责与UI组件通信
 */



// const mapStateToProps = state => ({ count: state })

// const mapDispatchToProps = (dispatch) => ({
//     increment: number => dispatch(increment(number)),
//     decrement: number => dispatch(decrement(number))
// })


export default connect(
    state => ({ count: state }), //指定向UI组件传递一般属性 count
    { increment, decrement }//指定向UI组件传递函数属性 increment decrement
)(Counter)