import React, { useContext, useState } from "react";
import './OrderItem.css'
import { ShopContext } from '../../Context/ShopContext';
import remove_icon from '../Assets/cart_cross_icon.png';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';



const OrderItem = () => {
  const { getTotalCartAmount, all_product, orderItem, addorder, removeFromCart } = useContext(ShopContext);
  { <hr /> }
  const [promocode, setpromocode] = useState([]);
  let ida = [];

  let id = 0
  const changeHandler = (e) => {
    setpromocode({ ...promocode, [e.target.name]: e.target.value })
  }
  
let totalAmount = getTotalCartAmount()
  return (

    <Container key={id
    
    }>
      <Row>
        <Col>Image</Col>
        <Col>Product Name</Col>
        <Col>New Price</Col>
        <Col>Quantity</Col>
        <Col>Old Price</Col>
        <Col xs={1}></Col>
        <Col xs={1}></Col>
      </Row>
      {all_product.map((e) => {
        if (orderItem[e.id] > 0) {
          ida.push(e.id)
          return <>

            <hr />
            <Row>
              <Col>{e.name}</Col>
              <Col>{e.new_price}</Col>
              <Col><button className="cartitems-quantity">{orderItem[e.id]}</button></Col>
              <Col>${e.new_price * orderItem[e.id]}</Col>
              <Col><img className="cartitems-remove-icon" src={remove_icon} onClick={() => { removeFromCart(e.id) }} alt="" /></Col>
            </Row>
          </>
        }
        return null;
      })}

      {/* 
      <div className="cartitems-down">
          <div className="cartitems-total">
            <h1>cart Totals</h1>
            <div>
              <div className="cartitems-total-item">
                <p>Subtotal</p>
                <p>${getTotalCartAmount()}</p>
              </div>
              <hr />
              <div className="cartitems-total-item">
                <p>Shipping Fee</p>
                <p>Free</p>
              </div>
              <hr />
              <div className="cartitems-total-item">
                <h3>Total</h3>
                <h3>${getTotalCartAmount()}</h3>
              </div>
            </div>
            <button>PROCEED TO CHECKOUT</button>
          </div>
          <div className="cartitems-promocode">
            <p>If you hve have a promo code,Enter it here</p>
            <div className="cartitems-promobox">
              <input type="text" placeholder="promo code" />
              <button>Submit</button>
            </div>
          </div>
        </div>

       */}

      <Row>
        <Col>
          <Row md="2">
            <h1>Cart Totals</h1>
          </Row>
          <Row md="2">
            <h5><Col>SubTotal</Col></h5>
            <h5><Col>${getTotalCartAmount()}</Col></h5>
          </Row>
          <Row md="2">
            <h5><Col>Shipping</Col></h5>
            <h5><Col> Free</Col></h5>
          </Row>
          <Row md="2">
            <h3><Col>Total</Col></h3>
            <h3><Col> ${getTotalCartAmount()}</Col></h3>
          </Row>

          <Row md="2" >
            <Col><Button md="" variant="secondary" size="lg" active onClick={() => { addorder(ida) }}>Procced To Checkout</Button></Col>
          </Row>
        </Col>
        <Col>
          <Row>If you have a promocode,to enter</Row>
          <Row>
            <InputGroup size="sm" className="mb-3" value={promocode} onChange={changeHandler}>
              <Form.Control
                placeholder="Enter Promo code"
                aria-label="Small"
                aria-describedby="inputGroup-sizing-sm"
              />
            </InputGroup>
          </Row>
          <Row>
            <Col>
              <Button variant="outline-dark">Submit</Button></Col>
            <Col></Col>
          </Row>
        </Col>
      </Row >
    </Container >
  )
}

export default OrderItem