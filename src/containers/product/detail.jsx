import React, { Component } from 'react'
import { Card, List, Icon } from 'antd'

import { reqProductById, reqCategory } from '../../api'
import LinkButton from '../../components/link-button'
import { BASE_IMAGE_URL } from '../../config'
import memory from '../../utils/memory'
import './detail.less'

const Item = List.Item
/*
Admin的商品详情子路由 
 */
export default class Detail extends Component {
    state = {
        product: {},
        categoryName: ''
    }

    getProduct = async () => {
        // 取出内存中的product
        // 如果有直接使用
        const product=memory.product
        if(product._id){
            this.setState({
                product
            })
            this.getCategory(product.categoryId)
            return
        }
        // 如果没有发请求获取
        // 得到params参数id值
        const id = this.props.match.params.id
        const result = await reqProductById(id)
        if (result.status === 0) {
            const product = result.data
            this.setState({
                product
            })
            this.getCategory(product.categoryId)
        }
    }
    getCategory = async (categoryId) => {
        const result = await reqCategory(categoryId)

        if (result.status === 0) {
            this.setState({
                categoryName: result.data.name
            })
        }
    }

    componentDidMount() {
        this.getProduct()
    }
    render() {
        const { product, categoryName } = this.state
        console.log(product)
        const title = (
            <span>
                <LinkButton onClick={() => this.props.history.goBack()}>
                    <Icon type="arrow-left"></Icon>
                </LinkButton>
                <span>商品详情</span>
            </span>
        )
        return (
            <Card title={title} className="product-detail">
                <List>
                    <Item>
                        <span className="product-detail-left">商品名称:</span>
                        <span>{product.name}</span>
                    </Item>
                    <Item>
                        <span className="product-detail-left">商品描述:</span>
                        <span>{product.desc}</span>
                    </Item>
                    <Item>
                        <span className="product-detail-left">商品价格:</span>
                        <span>{product.price}元</span>
                    </Item>
                    <Item>
                        <span className="product-detail-left">商品分类:</span>
                        <span>{categoryName}</span>
                    </Item>
                    <Item>
                        <span className="product-detail-left">商品图片:</span>
                        <span>
                            {
                                product.imgs && product.imgs.map(img => <img src={BASE_IMAGE_URL + img} className="product-detail-img" key={img}></img>)
                            }
                        </span>
                    </Item>
                    <Item>
                        <span className="product-detail-left">商品详情:</span>
                        <div dangerouslySetInnerHTML={{__html:product.detail}}></div>
                    </Item>
                </List>
            </Card>

        )
    }
}
