import React, { useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import "./Update.css";
import  upload_area from "../Assets/assets/upload_area.svg";
import { useNavigate } from "react-router-dom";




const Update = (props) => {
    const [name, setName] = useState('');
    const [new_price, setNew_Price] = useState('');
    const [old_price, setOld_Price] = useState('');
    const [category, setCategory] = useState('');
    const [image, setimage] = useState('');
    const par = useParams();
    const nav = useNavigate();

    useEffect(() => {
        getProductDetails();
    }, []);

    const getProductDetails = async () => {

        let result = await fetch(`http://localhost:3010/allproduct/${par.id}`,
        {
            headers: {
                "Content-Type": "application/json",
            }
        });
        result = await result.json();  
        setName(result.name)
        setNew_Price(result.new_price)
        setOld_Price(result.old_price)
        setCategory(result.category)
        setimage(result.image)
    }

    
    const imageHandler = (e) => {
        console.log(e)
        setimage(e.target.files[0]);

    }

    let formData = new FormData();
    formData.append('product', image);

        
        const UpdateProduct = async () => {
            let responseData;

            // await fetch('http://localhost:3010/upload', {
            //     method: 'POST',
            //     headers: {
            //         Accept: 'application/json',
            //     },
            //     body: formData,
            // }).then((res) => res.json()).then((data) => { responseData = data })
            
            //  image=responseData.image_url


            let result = await fetch(`http://localhost:3010/updateproduct/${par.id}`, {
                method: 'put',
                body: JSON.stringify({ name, new_price, old_price, category  }),
                headers: {
                    "Content-Type": "application/json",
                }
            });

            result = await result.json();
            if (result) {
                nav('/admin')   
            }
    
        }
    
    // add-product-selector
    return (
        <>
        <div className="add-product">
            <div className="addproduct-itemfield">
                <p>Product Title</p>
                <input value={name} onChange={(e)=>{setName(e.target.value)}} type="text" name="name" placeholder="Type here" />
            </div>
            <div className="addproduct-price">
                <div className="addproduct-itemfield">
                    <p>Price</p>
                    <input value={old_price} onChange={(e)=>{setOld_Price(e.target.value)}} type="text" name="old_price" placeholder="Type here" />
                </div>
                <div className="addproduct-itemfield">
                    <p>Offer Price</p>
                    <input value={new_price} onChange={(e)=>{setNew_Price(e.target.value)}} type="text" name="new_price" placeholder="Type here" />
                </div>
            </div>
            <div className="addproduct-itemfield">
                <p>Product Category</p>
                <select value={category} onChange={(e)=>{setCategory(e.target.value)}} name="category" className="add-product-selector">
                    <option value="Jars & Container" name="category">Jars & Container</option>
                    <option value="Chopper" name="category">Chopper</option>
                    <option value="Kitchen Tools" name="category">Kitchen Tools</option>
                </select>
            </div>
            <div className="addproduct-itemfield">
                <label htmlFor="file-input">
                    <img src={image ?image:upload_area } alt="" className="addproduct-thumbnail-img" />
                </label>
                <input onChange={imageHandler} type="file" id="file-input" name="image" hidden />
            </div>
            <button className="addproduct-btn" onClick={() => { UpdateProduct() }}>ADD</button>
        </div>
        </>
    )
}

export default Update