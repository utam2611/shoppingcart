import React, { useState } from "react";
import "./AddProduct.css";
import upload_area from '../Assets/assets/upload_area.svg'
import { useNavigate } from "react-router-dom";




const AddProduct = () => {
    const [image, setImage] = useState(false);
    const [productDetails, setProductDetails] = useState(
        {
            name: "",
            image: "",
            category: "Jars & Container",
            new_price: 0,
            old_price: 0
        }
    )

    const imageHandler = (e) => {
        setImage(e.target.files[0]);
    }

    const changeHandler = (e) => {
        setProductDetails({ ...productDetails, [e.target.name]: e.target.value })
    }

    const Add_Product = async () => {
        let responseData;
        let product = productDetails;


        let formData = new FormData();
        formData.append('product', image);

        //image url create and upload
        await fetch('http://localhost:3010/upload', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
            },
            body: formData,
        }).then((res) => res.json()).then((data) => { responseData = data })
        

        if (responseData.success) {
            product.image = responseData.image_url;
            await fetch('http://localhost:3010/addproduct', {
                method: "POST",
                body: JSON.stringify(product),
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                }
            }).then((res) => res.json()).then((data) => {
                data.success ? alert("Data is saved") : alert("data is not saved");
            })
        }

    }
    // add-product-selector
    return (
        <div className="add-product">
            <div className="addproduct-itemfield">
                <p>Product Title</p>
                <input value={productDetails.name} onChange={changeHandler} type="text" name="name" placeholder="Type here" />
            </div>
            <div className="addproduct-price">
                <div className="addproduct-itemfield">
                    <p>Price</p>
                    <input value={productDetails.old_price} onChange={changeHandler} type="text" name="old_price" placeholder="Type here" />
                </div>
                <div className="addproduct-itemfield">
                    <p>Offer Price</p>
                    <input value={productDetails.new_price} onChange={changeHandler} type="text" name="new_price" placeholder="Type here" />
                </div>
            </div>
            <div className="addproduct-itemfield">
                <p>Product Category</p>
                <select value={productDetails.category} onChange={changeHandler} name="category" className="add-product-selector">
                    <option value="Jars & Container" name="category">Jars & Container</option>
                    <option value="Chopper" name="category">Chopper</option>
                    <option value="Kitchen Tools" name="category">Kitchen Tools</option>
                </select>
            </div>
            <div className="addproduct-itemfield">
                <label htmlFor="file-input">
                    <img src={image ? URL.createObjectURL(image) : upload_area} alt="" className="addproduct-thumbnail-img" />
                </label>
                <input onChange={imageHandler} type="file" id="file-input" name="image" hidden />
            </div>
            <button className="addproduct-btn" onClick={() => { Add_Product() }}>ADD</button>
        </div>
    )
}

export default AddProduct