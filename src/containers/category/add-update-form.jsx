import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Input } from 'antd'

/*
添加分类的Form组件 
 */
const { Item } = Form

@Form.create()

class AddUpdateForm extends Component {

    static propTypes = { //给AddUpdateForm添加
        setForm: PropTypes.func.isRequired,
        categoryName:PropTypes.string //添加分类时不需要
    }
    constructor(props) {
        super(props)
        //将form对象交给category
        this.props.setForm(this.props.form)
    }
    render() {
        const { getFieldDecorator } = this.props.form
        return (
            <Form>
                <Item>
                    {
                        getFieldDecorator('categoryName', {
                            initialValue: this.props.categoryName || '', //手动修改再重新指定无效
                            rules: [
                                { required: true, message: "分类名称必须输入" }
                            ]
                        })(
                            <Input placeholder="请输入分类名称" />
                        )
                    }
                </Item>
            </Form>
        )
    }
}
export default AddUpdateForm