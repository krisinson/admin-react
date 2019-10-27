import React, { Component } from 'react'
import {
    Card,
    Button,
    Icon,
    Table,
    Modal,
    message
} from 'antd'
import LinkButton from "../../components/link-button";
import { reqCategories, reqAddCategory, reqUpdateCategory } from '../../api/index'
import AddUpdateForm from './add-update-form'


export default class Category extends Component {

    state = {
        categories: [],
        loading: false, //是否显示loading
        isAddVisible: false, //是否显示添加的对话框
        isUpdateVisible: false, //是否显示更新的对话框
    }

    columns = [
        {
            width: 700,
            title: '分类名称',
            dataIndex: 'name',
        },
        {
            width: 300,
            title: '修改分类',
            //如果没有指定dataIndex,接受数据对象参数,否则接受对应值参数
            render: (category) => <LinkButton onClick={() => this.updateVisible(category)}>修改分类</LinkButton>,
        },

    ]
    //异步获取分类列表显示
    getCategories = async () => {
        // 显示loading
        this.setState({
            loading: true
        })
        const result = await reqCategories()
        //隐藏loading
        this.setState({
            loading: false
        })
        if (result.status === 0) {
            const categories = result.data
            this.setState({
                categories
            })
        } else {
            message.error(result.msg)
        }
    }
    // 添加分类
    addCategory = () => {
        //表单验证
        this.form.validateFields(async (error, values) => {
            if (!error) {
                // 得到输入数据
                const { categoryName } = values
                // 发送添加分类的请求
                const result = await reqAddCategory(categoryName)
                this.form.resetFields() //重置输入数据(回到初始值)
                if (result.status === 0) {
                    //添加成功则更新列表显示
                    const category = result.data
                    const categories = this.state.categories
                    this.setState({
                        categories: [category, ...categories],
                        isAddVisible: false,
                        loading: false,
                    })
                    message.success("添加分类成功")
                } else {
                    //添加失败则显示提示
                    message.error(result.msg)
                }
            }
        })
    }
    // 隐藏添加分类界面
    hideAddCategory = () => {
        this.form.resetFields() //重置输入数据(回到初始值)
        this.category = null //删除之前添加的属性
        this.setState({
            isAddVisible: false
        })
    }

    //显示更新界面
    updateVisible = (category) => {
        // 保存分类
        this.category = category
        // 显示界面
        this.setState({
            isUpdateVisible: true,
        })
    }
    // 更新分类
    updateCategory = () => {
        //表单验证
        this.form.validateFields(async (error, values) => {
            if (!error) {
                // 得到输入数据
                const { categoryName } = values
                const categoryId = this.category._id
                // 发送添加分类的请求
                const result = await reqUpdateCategory({ categoryId, categoryName })
                this.form.resetFields() //重置输入数据(回到初始值)
                if (result.status === 0) {
                    //添加成功则更新列表显示
                    const category = { _id: categoryId, name: categoryName }
                    const categories = this.state.categories
                    this.setState({
                        categories: categories.map((item) => {
                            if (item._id === category._id) {
                                return category //产生一个新数组 用category替换item
                            } else {
                                return item
                            }
                        }),
                        isAddVisible: false,
                    })
                    message.success("更新分类成功")
                } else {
                    //添加失败则显示提示
                    message.error(result.msg)
                }
            }
        })
    }

    // 隐藏更新分类界面
    hideUpdateCategory = () => {
        this.category = null //删除之前添加的属性
        // 重置输入
        this.form.resetFields()
        this.setState({
            isUpdateVisible: false
        })
    }

    componentDidMount() {
        this.getCategories()
    }
    render() {
        const { categories, loading, isAddVisible, isUpdateVisible } = this.state
        const category = this.category || {}
        // 右上角界面
        const extra = (
            <Button type="primary" onClick={() => this.setState({ isAddVisible: true })}>
                <Icon type="plus" ></Icon>
                添加
            </Button>
        )

        return (
            <Card extra={extra}>
                <Table
                    dataSource={categories}
                    columns={this.columns}
                    rowKey="_id"
                    bordered
                    pagination={{ pageSize: 5, showQuickJumper: true }}
                    loading={loading}
                />
                <Modal
                    title=" 添加分类"
                    visible={isAddVisible}
                    onOk={this.addCategory}
                    onCancel={this.hideAddCategory}
                >
                    <AddUpdateForm setForm={(form) => this.form = form} />
                </Modal>
                <Modal
                    title="修改"
                    visible={isUpdateVisible}
                    onOk={this.updateCategory}
                    onCancel={this.hideUpdateCategory}
                >
                    <AddUpdateForm setForm={(form) => this.form = form} categoryName={category.name} />
                </Modal>
            </Card>
        )
    }
}
