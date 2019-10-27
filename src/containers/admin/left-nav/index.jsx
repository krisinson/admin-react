import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Menu, Icon } from 'antd'
import { connect } from 'react-redux'
import { setHeaderTitle } from '../../../redux/action-creators/header-title'
import './index.less'
import logo from '../../../assets/images/logo.png'
import menuList from '../../../config/menu-list'

const { SubMenu, Item } = Menu
@connect(
    state => ({ headerTitle: state.headerTitle }),
    { setHeaderTitle }
)
@withRouter
class Leftnav extends Component {

    /* 使用map方法和递归动态生成标签列表导航 */
    // getMenuNodes = (menuList) => {
    //     return menuList.map(item => {
    //         /*
    //         title: '商品',
    //         key: '/products',
    //         icon: 'appstore',
    //         children: [ // 子菜单列表 
    //          */
    //         // 返回标签对象
    //         if(!item.children){
    //             // 返回<Item></Item>标签
    //             return <Item key={item.key}>
    //                     <Link to={item.key}>
    //                         <Icon type={item.icon} />
    //                         <span>{item.title}</span>
    //                     </Link>
    //                 </Item>
    //         }else{
    //             // 返回<SubMenu></SubMenu>标签
    //             return <SubMenu
    //                     key={item.key}
    //                     title={
    //                         <span>
    //                             <Icon type={item.icon} />
    //                             <span>{item.title}</span>
    //                         </span>
    //                     }
    //                 >
    //                     {/* 递归调用 */}
    //                     {this.getMenuNodes(item.children)} 
    //                 </SubMenu>
    //         }
    //     })
    // }

    /* 使用reduce方法和递归动态生成标签列表导航 */
    getMenuNodes_reduce = (menuList) => {
        return menuList.reduce((pre, item) => {
            const path = this.props.location.pathname
            if (!item.children) {
                if (item.key === path && this.props.headerTitle !== item.title) {
                    this.props.setHeaderTitle(item.title)
                }
                // 如果当前请求的就是item对应的路径 就将当前title保存在state中
                pre.push((
                    <Item key={item.key}>
                        <Link to={item.key} onClick={
                            () => {
                                if (item.key === path && this.props.headerTitle !== item.title) {
                                    this.props.setHeaderTitle(item.title)
                                }
                            }
                        }>
                            <Icon type={item.icon} />
                            <span>{item.title}</span>
                        </Link>
                    </Item>
                ))
            } else {
                // 判断item的children有没有一个child的key与path一致
                // const result = item.children.find(item => item.key === path)
                // const result = item.children.every(item => item.key === path) 不阔以
                const result = item.children.some(item => item.key === path)
                if (result) {
                    this.openKey = item.key
                }
                pre.push(
                    <SubMenu
                        key={item.key}
                        title={
                            <span>
                                <Icon type={item.icon} />
                                <span>{item.title}</span>
                            </span>
                        }
                    >
                        {/* 递归调用 */}
                        {this.getMenuNodes_reduce(item.children)}
                    </SubMenu>
                )
            }
            return pre
        }, [])
    }
    render() {
        {/* 使用map方法 */ }
        {/* {this.getMenuNodes(menuList)} */ }
        {/* 使用reduce方法 */ }
        const menuNodes = this.getMenuNodes_reduce(menuList)

        const selectedKey = this.props.location.pathname
        const openKey = this.openKey
        return (
            <div className="left-nav">
                <div className="left-nav-header">
                    <img src={logo} alt="logo" />
                    <h1>硅谷后台</h1>
                </div>
                <Menu
                    mode="inline"
                    theme="dark"
                    selectedKeys={[selectedKey]}
                    defaultOpenKeys={[openKey]}
                >
                    {menuNodes}
                </Menu>
            </div>
        )
    }
}



export default Leftnav