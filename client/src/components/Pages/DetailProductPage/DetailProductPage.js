import React, { useEffect, useState } from 'react'
import axios from 'axios';
import ProductImage from './Sections/ProductImage';
import ProductInfo from './Sections/ProductInfo';
import { Row, Col } from 'antd';
import Comments from '../Comment/Comments';

function DetailProductPage(props) {

    const productId = props.match.params.productId

    const [Product, setProduct] = useState({})

    const [CommentLists, setCommentLists] = useState([])
    const  variable = { productId : productId }

    useEffect(() => {
        axios.get(`/api/product/products_by_id?id=${productId}&type=single`)
            .then(response => {

                // console.log('response.data', response.data)
                // console.log('want', response.data[0])
                setProduct(response.data[0])
                // console.log('setProduct', setProduct)
            })
            .catch(err => alert(err))

            axios.post('/api/comment/getComments', variable)
            .then(response => {
                if (response.data.success) {
                    console.log('getComments',response.data.comments)
                    setCommentLists(response.data.comments)
                } else {
                    alert('코멘트 정보를 가져오는 것을 실패 하였습니다.');
                }
            });

    }, [])

    const updateComment = (newComment) => {
        setCommentLists(CommentLists.concat(newComment))
    }



return (
    <div style={{ width: '100%', padding: '3rem 4rem' }}>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <h1>{Product.title}</h1>
        </div>

        <br />

        <Row gutter={[16, 16]} >
            <Col lg={9} sm={20}>
                {/* ProductImage */}
                <ProductImage detail={Product} />
            </Col>
            <Col lg={12} sm={24}>
                {/* ProductInfo */}
                <ProductInfo detail={Product} />
            </Col>
        </Row>
        <Comments CommentLists={CommentLists} postId={Product._id} refreshFunction={updateComment} />





    </div>
)
}

export default DetailProductPage
