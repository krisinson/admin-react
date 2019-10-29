import React, { Component } from 'react'
import {
    Card,
    Select,
    Input,
    Button,
    Icon,
    Table,
    message
} from "antd"

import { reqProducts, reqSearchProducts, reqUpdateProductStatus } from '../../api'
import { PAGE_SIZE } from '../../config'
import memory from '../../utils/memory'
const { Option } = Select
/* Admin管理商品列表的子路由 */

export default class Product extends Component {
    state = {
        products: [], //当前商品数组
        total: 0, //商品总数量 
        searchType: "productName", //productDesc
        searchName: '', //搜索关键字,

    }
    columns = [
        {
            title: "商品名称",
            dataIndex: 'name'
        },
        {
            title: "商品描述",
            dataIndex: 'desc'
        },
        {
            title: "价格",
            dataIndex: 'price',
            render: (price) => '¥' + price
        },
        {
            width: 100,
            title: "状态",
            // dataIndex: 'status',
            render: ({ _id, status }) => { //status:1在售 2已下架
                let btnText = '下架'
                let text = '在售'
                if (status === 2) {
                    btnText = '上架'
                    text = '已下架'
                }
                return (
                    <span>
                        <Button
                            type="primary"
                            onClick={() => this.updateStatus(_id, status === 1 ? 2 : 1)}
                        >
                            {btnText}
                        </Button>
                        <span>{text}</span>
                    </span>
                )
            }
        },
        {
            width: 100,
            title: "操作",
            render: (product) => (
                <span>
                    <Button
                        type="link"
                        onClick={() => {
                            memory.product = product //将product保存在内存容器中
                            this.props.history.push(`/product/detail/${product._id}`)
                        }}
                    >
                        详情
                     </Button>
                    <Button type="link" onClick={() => {
                        memory.product = product
                        this.props.history.push('/product/addupdate')
                    }}
                    >修改</Button>
                </span>
            )
        },
    ]
    //更新商品状态
    updateStatus = async (id, status) => {
        const result = await reqUpdateProductStatus(id, status)
        if (result.status === 0) {
            message.success("更新状态成功")
            let { products } = this.state
            products = products.map(item => {
                if (item._id === id) {
                    return { ...item, status }
                } else {
                    return item
                }
            })
            this.setState({
                products
            })
        } else {
            message.error(result.msg)
        }
    }
    // 异步获取指定页码商品列表显示
    getProducts = async (pageNum) => {
        let result
        if (this.isSearch) { //发搜索分类请求
            const { searchType, searchName } = this.state
            if (!searchName) return
            result = await reqSearchProducts({ pageNum, pageSize: PAGE_SIZE, searchType, searchName })
        } else { //发一般分页请求
            result = await reqProducts(pageNum, PAGE_SIZE)
        }
        if (result.status === 0) {
            const { list, total } = result.data
            this.setState({
                products: list,
                total
            })
        }
    }
    // /* 异步搜索获取指定页码的商品列表显示 */
    // searchProducts = async (pageNum, pageSize) => {
    //     if (result.status === 0) {
    //         const { list, total } = result.data
    //         this.setState({
    //             // products:list,
    //             total
    //         })
    //     }

    // }

    componentDidMount() {
        this.getProducts(1)
    }
    render() {
        const { products, total, searchType, searchName } = this.state
        const title = (
            <span>
                <Select
                    value={searchType}
                    onChange={(value) => this.setState({ searchType: value })}
                >
                    <Option value="productName">按名称搜索</Option>
                    <Option value="productDesc">按描述搜索</Option>
                </Select>
                <Input
                    style={{ width: 200, margin: "0 10px" }}
                    placeholder="关键字"
                    value={searchName}
                    onChange={(event) => { this.setState({ searchName: event.target.value }) }}
                />
                <Button
                    type="primary"
                    onClick={() => {
                        this.isSearch = true //保存一个标识搜索的词
                        this.getProducts(1)
                    }}
                >
                    搜索
                    </Button>
            </span>
        )
        const extra = (
            <Button type="primary"
                onClick={() => {
                    memory.product = {}
                    this.props.history.push('/product/addUpdate')
                }}>
                <Icon type="plus" ></Icon>

                添加商品
            </Button>
        )
        return (
            <Card title={title} extra={extra}>
                <Table
                    dataSource={products}
                    columns={this.columns}
                    bordered
                    rowKey="_id"
                    pagination={{
                        pageSize: PAGE_SIZE,
                        total,
                        // onChange :(page) => { this.reqProducts(page) }
                        onChange: this.getProducts
                    }}
                />
            </Card>
        )
    }
}
