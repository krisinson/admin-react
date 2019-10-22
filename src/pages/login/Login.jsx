import React, { Component } from 'react'
import { Form, Icon, Input, Button, Result } from 'antd';
// import qs from 'qs'
import logo from './images/logo.png'
import './login.less'
import ajax from '../../api/ajax'


class Login extends Component {

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('发送ajax请求 ', values)
                // 方式一
                // ajax.post('/login',values)
                // .then(({user,token})=>{
                //     console.log('登录成功',user,token)
                // })
                // .catch(error=>{
                //     console.log(error)
                // })

                //方式二 
                ajax.post('/login', values)
                    .then((result) => {
                        const { status, data: { user, token } = {}, msg } = result
                        if (status === 0) {
                            console.log('登录成功', user, token)
                        } else {
                            console.log('登录失败', msg)
                        }
                    })
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

const WrapperForm = Form.create()(Login)

export default WrapperForm
