import React from "react";
import './Admin.css'
import Sidebar from "../../Components/Sidebar/Sidebar";
import { Route,Routes } from "react-router-dom";
import AddProduct from "../../Components/AddProduct/AddProduct";
import ListProduct from "../../Components/ListProduct/ListProduct";

const Admin = () => {
    
   console.log( window.location)
    return (
        <div className="admin">
            <Sidebar/>
           
        </div>
    )
}

export default Admin
