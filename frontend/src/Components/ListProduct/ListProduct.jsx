import React, { useEffect, useState } from "react";
import './ListProduct.css';
import { Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import RelatedProducts from "../RelatedProducts/RelatedProducts";
import cross_icon from '../Assets/assets/cross_icon.png'
import Update from "../Update/Update";

const ListProduct = () => {
    const [allproducts, setAllProducts] = useState([]);

    const fetchInfo = async () => {
        await fetch('http://localhost:3010/allproduct')
        .then((res) => res.json())
        .then((data) => { setAllProducts(data) });
    }

    useEffect(() => {
        fetchInfo();
    }, [])

    const remove_product = async (id) => {
        await fetch('http://localhost:3010/removeproduct', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: id })
        })
        await fetchInfo();
    }

    // const update_product =async (id) => {
    //     await fetch('http://localhost:3010/removeproduct',{
    //         method:"POST",
    //         headers:{
    //             Accept:'application/json',
    //             "Content-Type":'applicaton/json',
    //             body:JSON.stringify({id:id})
    //         }
    //     })
    // }
    // const update_product = async (id) => {
    //     let responseData;
    //     let product = productDetails;


    //     let formData = new FormData();
    //     formData.append('product', image);

    //     //image url create and upload
    //     await fetch('http://localhost:3010/upload', {
    //         method: 'POST',
    //         headers: {
    //             Accept: 'application/json',
    //         },
    //         body: formData,
    //     }).then((res) => res.json()).then((data) => { responseData = data })
        

    //     if (responseData.success) {
    //         product.image = responseData.image_url;
    //         await fetch('http://localhost:3010/addproduct', {
    //             method: "POST",
    //             body: JSON.stringify(product),
    //             headers: {
    //                 Accept: 'application/json',
    //                 'Content-Type': 'application/json'
    //             }
    //         }).then((res) => res.json()).then((data) => {
    //             data.success ? alert("Data is saved") : alert("data is not saved");
    //         })
    //     }

    // }


    return (
        <>
        <Container>
        <Row>
          <Col>Image</Col>
          <Col>Product Name</Col>
          <Col>New Price</Col>
          <Col>Old Price</Col>
          <Col>Category</Col>
          <Col xs={1}></Col>
          <Col xs={1}></Col>
        </Row>
        {allproducts.map((product,index)=>{
            return  <>
        <hr/>
            <Row>
          <Col><img src={product.image} alt="" className="listproduct-product-icon" /></Col>
          <Col>{product.name}</Col>
          <Col>${product.old_price}</Col>
          <Col>${product.new_price}</Col>
          <Col>{product.category}</Col>
          <Col xs={1}><svg onClick={()=>{remove_product(product.id)}} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16"><path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/></svg></Col>
          <Col xs={1}><Link to={`/admin/listproduct/${product.id}`}><svg onClick={()=>{<Update product={product}/>}} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16"><path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325"/></svg></Link></Col>
        </Row>
        <Row>

        </Row>

        </>
        })}
        
      </Container>
      </>
    );
    
}

export default ListProduct