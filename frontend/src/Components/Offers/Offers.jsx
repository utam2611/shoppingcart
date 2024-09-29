import React from "react";
import './Offers.css'
import excluive_image from '../Assets/exclusive_image.png'
import p13_product from '../Assets/product_13.png'

const Offers = () =>{
    return (
        <div className="offers">
          <div className="offers-left">
            <h1>Exclusive</h1>
            <h1>Offers For You</h1>
            <p>ONLY ON BEST SELLERS PRODUCTS</p>
            <button>Check Now</button>
          </div>
          <div className="offers-right">
             <img src={p13_product} alt=""/>
          </div>
        </div>
    )
}

export default Offers