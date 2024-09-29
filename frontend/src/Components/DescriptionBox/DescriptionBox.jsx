import React from "react";
import './DescriptionBox.css'

const DescriptionBox = () => {
    return (
        <div className="desciptionbox">
        <div className="desciptionbox-navigator">
            <div className="desciptionbox-nav-box">Description</div>
            <div className="desciptionbox-nav-box fade">Reviews (122)</div>
        </div>
        <div className="desciptionbox-description">
            <p>An e-commerce website is an online platform that facilitates that buying and selling of products or services over the internet. It serves as a virtual marketplace where businesses and individuals can showcasw their products, interact with customers, and conduct transaction without the need for a physical presence. E-commerce website have gained immense popularity due to their convenice,accessibility,and the global reach they offer.</p>
            <p>E-commerce websites typically display product or services along with detailed description,images,prices,and any available variations (e.g., sizes,color). Each product usually has its own dedicated page with relevant information.</p>
        </div>
        </div>
    )
}

export default DescriptionBox