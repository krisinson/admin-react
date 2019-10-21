/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-10-21 19:40:24
 * @LastEditTime: 2019-10-21 21:16:04
 * @LastEditors: Please set LastEditors
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'

/* UI组件 不使用任何redux语法 */

export default class Counter extends Component {

    static propTypes = {
        count: PropTypes.number.isRequired,
        increment: PropTypes.func.isRequired,
        decrement: PropTypes.func.isRequired

    }
    // 创建ref容器
    numberRef = React.createRef()

    increment = () => {
        const number = this.numberRef.current.value * 1
        // 通知store更新 采用dispatch
        this.props.increment(number)
    }

    decrement = () => {
        const number = this.numberRef.current.value * 1
        this.props.decrement(number)
    }

    incrementIfOdd = () => {
        const number = this.numberRef.current.value * 1
        const count = this.props.count
        if (count % 2 === 1) {
            this.props.increment(number)
        }
    }

    incrementAsync = () => {
        const number = this.numberRef.current.value * 1
        setTimeout(() => {
        this.props.increment(number)
        }, 1000);
    }


    render() {
        const count = this.props.count //得到store的状态数据
        return (
            <div>
                <p>click {count} times</p>
                <div>
                    <select ref={this.numberRef}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                    </select>
                    <button onClick={this.increment}>+</button>
                    <button onClick={this.decrement}>-</button>
                    <button onClick={this.incrementIfOdd}>increment if odd</button>
                    <button onClick={this.incrementAsync}>increment if async</button>
                </div>
            </div>
        )
    }
}
