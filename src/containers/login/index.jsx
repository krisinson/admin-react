import React, { Component } from 'react'
import { Form, Icon, Input, Button } from 'antd'
// import qs from 'qs'
import { connect } from 'react-redux'
// import {Redirect} from 'react-router-dom'

import { loginAsync } from '../../redux/action-creators/user'
import logo from '../../assets/images/logo.png'
import './index.less'
import withCheckLogin from "../with-check-login"
//  connect(
//     state => ({hasLogin:state.user.hasLogin}), //用于显示一般属性
//     { loginAsync } //用于更新状态的函数属性
// )(Form.create()(Login))

@connect(
    state => ({}), //用于显示一般属性
    { loginAsync } //用于更新状态的函数属性
)
@Form.create() //Login=Form.create()(Login) 先执行
@withCheckLogin

class Login extends Component {

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, username,password) => {
            if (!err) {
                console.log('发送ajax请求 ', username)
                this.props.loginAsync(username,password)
                // 方式一
                // ajax.post('/login',values)
                // .then(({user,token})=>{
                //     console.log('登录成功',user,token)
                // })
                // .catch(error=>{
                //     console.log(error)
                // })

                //方式二 
                // ajax.post('/login', values)
                //     .then((result) => {
                //         const { status, data: { user, token } = {}, msg } = result
                //         if (status === 0) {
                //             console.log('登录成功', user, token)
                //         } else {
                //             console.log('登录失败', msg)
                //         }
                //     })

            } else {

            }
        });

    }
    validatorPwd = (rule, value, callback) => {
        // 1).必须输入
        // 2).必须大于等于4位
        // 3).必须小于等于12位
        // 4).必须是英文、数字或下划线组成
        value = value.trim()
        if (!value) {
            callback("密码不能为空")
        } else if (value.length < 4) {
            callback("密码必须大于等于4位")
        } else if (value.length > 12) {
            callback("密码必须小于等于12位")
        } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
            callback("密码必须是英文、数字或下划线组成")
        } else {
            callback()
        }
    }
    render() {

        const { getFieldDecorator } = this.props.form
        // const {hasLogin}=this.props
        // if(hasLogin){ //如果已经登录自定跳转到admin界面
        //     //编程路由
        //     //this.props.history.replace('/admin') //用于事件回调
        //     return <Redirect to='/admin'/> //render中使用
        // }
        return (
            <div className="login">
                <header className="login-header">
                    <img src={logo} alt="logo" />
                    <h1>后台管理系统</h1>
                </header>
                <div className="login-content">
                    <h1>用户登录</h1>
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <Form.Item>
                            {
                                getFieldDecorator('username', {
                                    initialValue: '',
                                    // 1).必须输入
                                    // 2). 必须大于等于4位
                                    // 3). 必须小于等于12位
                                    // 4). 必须是英文、数字或下划线组成
                                    rules: [
                                        { required: true, whitespace: true, message: "用户名不能为空" },
                                        { min: 4, message: "用户名必须大于等于4位" },
                                        { max: 12, message: "用户名必须小于等于12位" },
                                        { pattern: /^[a-zA-Z0-9_]+$/, message: "用户名必须小于等于12位" }
                                    ]
                                })
                                // eslint-disable-next-line  
                                (
                                    <Input
                                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                            placeholder="用户名"
                                        />
                                    )
                            }
                        </Form.Item>
                        <Form.Item>
                            {
                                getFieldDecorator('password', {
                                    initialValue: '',
                                    rules: [
                                        { validator: this.validatorPwd }
                                    ]
                                })
                                //eslint-disable-next-line
                                (
                                        <Input
                                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                            type="password"
                                            placeholder="密码"
                                        />
                                    )
                            }
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">登录</Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        )
    }
}


// export default connect(
//     state => ({hasLogin:state.user.hasLogin}), //用于显示一般属性
//     { loginAsync } //用于更新状态的函数属性
// )(Form.create()(Login))

export default Login

// const LoginWrap =Form.create()(Login)