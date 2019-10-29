import React, { Component } from 'react'
import { Card, Form, Button, Icon, Input, Select,message } from 'antd'
import { connect } from 'react-redux'

import { getCategorisAsync } from '../../redux/action-creators/categories'
import { reqAddUpdateProduct } from '../../api'
import memory from '../../utils/memory'
const { Item } = Form
const { Option } = Select

/*
Admin的添加更新商品子路由
 */

@connect(
    state => ({ categories: state.categories }),
    { getCategorisAsync }
)
@Form.create()

class AddUpdate extends Component {
    /*
    添加或更新商品 
     */
    addOrUpdateProduct = () => {
        // 表单验证
        this.props.form.validateFields(async (error, values) => {
            if (!error) {
                //   如果更新 需要id
                values._id = memory.product._id
                const result = await reqAddUpdateProduct(values)
                if(result.status===0){
                    message.success("操作成功")
                    this.props.history.replace('/product')
                }else{
                    message.error(result.msg)
                }
            } 
        })
    }
    componentDidMount() {
        this.props.getCategorisAsync()
    }

    render() {
        const product = memory.product
        const title = (
            <span>
                <Button type="link" onClick={() => this.props.history.goBack()}>
                    <Icon type="arrow-left"></Icon>
                </Button>
                <span>商品{product._id ? "修改" : "添加"}</span>
            </span>
        )
        const formLayout = {
            labelCol: { span: 2 },
            wrapperCol: { span: 8 }
        }
        const { categories, form: { getFieldDecorator } } = this.props

        return (
            <Card title={title}>
                <Form {...formLayout}>
                    <Item label="商品名称">

                        {
                            getFieldDecorator("name", {
                                initialValue: product.name || '',
                                rules: [
                                    { required: true, message: "商品名称必须输入" }
                                ]
                            })(
                                <Input placeholder="商品名称"></Input>
                            )
                        }
                    </Item>
                    <Item label="商品描述">
                        {
                            getFieldDecorator("desc", {
                                initialValue: product.desc || '',
                                rules: [
                                    { required: true, message: "商品描述必须输入" }
                                ]
                            })(
                                <Input placeholder="商品描述"></Input>
                            )
                        }
                    </Item>
                    <Item label="商品价格">
                        {
                            getFieldDecorator("price", {
                                initialValue: product.price || '',
                                rules: [
                                    { required: true, message: "商品价格必须输入" }
                                ]
                            })(
                                <Input placeholder="商品价格" type="number" addonAfter="元"></Input>
                            )
                        }
                    </Item>
                    <Item label="商品分类">
                        {
                            getFieldDecorator("categoryId", {
                                initialValue: product.categoryId || '',
                                rules: [
                                    { required: true, message: "商品分类必须输入" }
                                ]
                            })(
                                <Select>
                                    <Option value=''>未选择</Option>
                                    {
                                        categories.map(c => <Option value={c._id} key={c._id}>{c.name}</Option>)

                                    }
                                </Select>
                            )
                        }
                    </Item>
                    <Item label="商品图片">
                        上传图片组件
                    </Item>
                    <Item label="商品详情">
                        富文本编辑器
                    </Item>
                    <Item>
                        <Button type="primary" onClick={this.addOrUpdateProduct}>提交</Button>
                    </Item>
                </Form>
            </Card>
        )
    }
}
export default AddUpdate