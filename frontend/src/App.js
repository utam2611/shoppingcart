import './App.css';
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter, Routes, Route, Form } from 'react-router-dom';
import ShopCategory from './Pages/ShopCategory';
import Product from './Pages/Product';
import Cart from './Pages/Cart';
import LoginSignup from './Pages/LoginSignup';
import Shop from './Pages/Shop';
import Footer from './Components/Footer/Footer';
import man_banner from './Components/Assets/man_banner.jpg';
import women_banner from './Components/Assets/women_banner.jpg';
import kid_banner from './Components/Assets/kids_banner.jpg';
import chopper_banner from './Components/Assets/chopper_banner.jpg';

import banner from './Components/Assets/jars.jpg'
import Admin from './Pages/Admin/Admin';
import AddProduct from './Components/AddProduct/AddProduct';
import ListProduct from './Components/ListProduct/ListProduct';
import Update from './Components/Update/Update';
import Order from './Components/OrderItem/OrderItem';


function App() {

  let token = localStorage.getItem('auth-token')


  return (
    <div>
      <BrowserRouter>

        <Navbar />
        <Routes>
          {/* <Route path='/' element={<Shop/>}/> */}
          <Route path='/' element={<LoginSignup />} />
          <Route path='/home' element={<Shop />} />
          <Route path='/jarscontainer' element={<ShopCategory banner={banner} category="Jars & Container" />} />
          <Route path='/chopper' element={<ShopCategory banner={banner} category="Chopper" />} />
          <Route path='/kitchentools' element={<ShopCategory banner={banner} category="Kitchen Tools" />} />
          <Route path="/product" element={<Product />}>
            <Route path=':productId' element={<Product />} />
          </Route>
          
          <Route path='/cart' element={<Cart />} />
          <Route path='/order' element={<Order />} />

          <Route path='/login' element={<LoginSignup />} />
          <Route path='/admin/*' element={<Admin />}>

          </Route>
          <Route path="/admin/addproduct" element={<AddProduct />} />
          <Route path="/admin/listproduct" element={<ListProduct />} />
          <Route path="/admin/listproduct/:id" element={<Update />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
