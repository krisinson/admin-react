/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-10-21 19:40:24
 * @LastEditTime: 2019-10-21 20:32:41
 * @LastEditors: Please set LastEditors
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { increment, decrement } from "./redux/action-creators"

export default class App extends Component {

    static propTypes = {
        store: PropTypes.object.isRequired
    }
    // 创建ref容器
    numberRef = React.createRef()

    increment = () => {
        const number = this.numberRef.current.value * 1
        // 通知store更新 采用dispatch
        this.props.store.dispatch(increment(number))
    }

    decrement = () => {
        const number = this.numberRef.current.value * 1
        this.props.store.dispatch(decrement(number))
    }

    incrementIfOdd = () => {
        const number = this.numberRef.current.value * 1
        const count = this.props.store.getState()
        if (count % 2 === 1) {
            this.props.store.dispatch(increment(number))
        }
    }

    incrementAsync = () => {
        const number = this.numberRef.current.value * 1
        setTimeout(() => {
            this.props.store.dispatch(increment(number))
        }, 1000);
    }


    render() {
        const count = this.props.store.getState() //得到store的状态数据
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
