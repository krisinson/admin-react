import React, { Component } from 'react'
import { Layout } from 'antd';
import { Route, Switch, Redirect } from "react-router-dom"
import LeftNav from './left-nav'
import AdminHeader from './header'
import withCheckLogin from "../with-check-login"
import Home from '../../components/home'
import Category from '../category'
import Product from '../product'
import ProductDetail from '../product/detail'
import ProductAddUpdate from '../product/add-update'
import Role from '../../containers/role'
import User from '../../containers/user'
import Line from '../../components/charts/line'
import Bar from '../../components/charts/bar'
import Pie from '../../components/charts/pie'

const { Footer, Sider, Content } = Layout;

@withCheckLogin

class Admin extends Component {

    render() {
        // 如果当前没有登录 自动跳转到登录界面
        // if (!this.props.hasLogin) {
        //     return <Redirect to='login' />
        // }

        return (
            <Layout style={{ height: "100%" }}>
                <Sider >
                    <LeftNav />
                </Sider>
                <Layout>
                    <AdminHeader />
                    <Content style={{ backgroundColor: "white", margin: "30px 15px 0 15px" }}>
                        <Switch>
                            <Route path="/home" component={Home} exact/>
                            <Route path="/category" component={Category} exact/>
                            <Route path="/product" component={Product} exact/>
                            <Route path="/product/detail/:id" component={ProductDetail} exact/>
                            <Route path="/product/addupdate" component={ProductAddUpdate} exact/>
                            <Route path="/role" component={Role} exact/>
                            <Route path="/user" component={User} exact/>
                            <Route path="/charts/line" component={Line} exact/>
                            <Route path="/charts/bar" component={Bar} exact/>
                            <Route path="/charts/pie" component={Pie} exact/>
                            <Redirect to="/category" />
                        </Switch>
                    </Content>
                    <Footer style={{ textAlign: 'center', color: '#aaaaaa' }}>推荐使用谷歌浏览器，可以获得更佳页面操作体验</Footer>
                </Layout>
            </Layout>
        )
    }
}

export default Admin