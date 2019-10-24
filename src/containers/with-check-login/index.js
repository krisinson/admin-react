/*
封装一个用于检查用户登录的高阶组件函数 
 */

import React from 'react'
import { connect } from "react-redux"
import { Redirect } from "react-router-dom";


export default function withCheckLogin(WrappedComponent) {
    //  高阶组件返回一个新的组件

    @connect(state => ({ hasLogin: state.user.hasLogin }))
    class HocComponent extends React.Component {

        render() {
            const path = this.props.location.pathname
            const { hasLogin, ...rest } = this.props
            //  如果请求login 但已经登录 自动跳转到admin
            if (path === '/login' && hasLogin) return <Redirect to="/" />
            //  如果请求不是login 但未登录 自动跳转到login
            if (path !== '/login' && !hasLogin) return <Redirect to="/login" />
            return <WrappedComponent {...rest} />
        }
    }
    return HocComponent
}
