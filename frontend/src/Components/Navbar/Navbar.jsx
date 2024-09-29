import React, { useState, useContext, useRef } from 'react'
import './Navbar.css'
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { ShopContext } from '../../Context/ShopContext';
import logo from '../Assets/logo.png'
import cart_icon from '../Assets/cart_icon.png'
import nav_dropdown from '../Assets/dropdown_icon.png'


const Navbar = () => {

  const [menu, setMenu] = useState("Shops")
  const { getTotalCartItems,getTotalOrderItem } = useContext(ShopContext);
  const menuRef = useRef();

  const dropdown_toggle = (e) => {
    menuRef.current.classList.toggle('nav-menu-visible');
    e.target.classList.toggle('open');
  }
  
  return (
    
    <div className='navbar'>
      <div className="nav-logo">
        <img src={logo} alt="" />
        <p>SHOPPER</p>
      </div>
      <img className='nav-dropdown' onClick={dropdown_toggle} src={nav_dropdown} alt="" />
      <ul ref={menuRef} className="nav-menu">
        <li onClick={() => { setMenu("shop") }}><Link style={{ textDecoration: 'none' }} to='/home'>Shop</Link>{menu === "shop" ? <hr /> : <></>}</li>
        <li onClick={() => { setMenu("jarscontainer") }}><Link style={{ textDecoration: 'none' }} to='/jarscontainer'>Jars & Container</Link>{menu === "jarscontainer" ? <hr /> : <></>}</li>
        <li onClick={() => { setMenu("chopper") }}><Link style={{ textDecoration: 'none' }} to='/chopper'>Chopper</Link>{menu === "chopper" ? <hr /> : <></>}</li>
        <li onClick={() => { setMenu("kitchentools") }}><Link style={{ textDecoration: 'none' }} to='/kitchentools'>Kitchen Tools</Link>{menu === "kitchentools" ? <hr /> : <></>}</li>
        {localStorage.getItem('access')== 'true' ?<li onClick={() => { setMenu("admin") }}><Link style={{ textDecoration: 'none' }} to='/admin'>DashBord</Link>{menu === "admin" ? <hr /> : <></>}</li>
 : <></>}
      </ul>
      <div className="nav-login-cart">
        {localStorage.getItem('auth-token') ? <button onClick={() => { localStorage.removeItem('auth-token'); window.location.replace('/'); localStorage.removeItem('access') }}>Log Out</button> : <Link to='/login'><button>Login</button></Link>}

        <Link to='/cart'><img src={cart_icon} alt="" /></Link>
        <div className="nav-cart-count">{getTotalCartItems()}</div> 
        <Link to='/order'><img src={cart_icon} alt="" /></Link>
        <div className="nav-cart-count">{getTotalOrderItem()}</div> 
      </div>
      
    </div>
  )
}

export default Navbar