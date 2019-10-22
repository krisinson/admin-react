import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from "react-router-dom";
import { removeUserToken } from "../../redux/action-creators/user";


class Admin extends Component {

    logout = () => {
        this.props.removeUserToken()
    }
    render() {
        // 如果当前没有登录 自动跳转到登录界面
        if (!this.props.hasLogin) {
            return <Redirect to='login'/>
        }

        return (
            <div>
                <h1 style={{fontSize:'50px'}}>Welcome,{this.props.user.username}</h1>
                <button onClick={this.logout}>logout</button>
            </div>
        )
    }
}

export default connect(
    state => ({ user: state.user.user, hasLogin: state.user.hasLogin }),
    {removeUserToken}
)(Admin)