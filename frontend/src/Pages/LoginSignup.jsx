import React, { useState } from "react";
import './CSS/LoginSignup.css'
import { UNSAFE_LocationContext } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const LoginSignup = () => {

  const [state, setState] = useState("Login")

  const [formdata, setFormData] = useState({
    username: "",
    password: "",
    email: ""
  })

  const changeHandler = (e) => {
    setFormData({ ...formdata, [e.target.name]: e.target.value })
  }


  const login = async () => {
    let responseData;
    await fetch('http://localhost:3010/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formdata)
    }).then((res) => res.json()).then((data) => { responseData = data })

    if (responseData.success) {
      localStorage.setItem('auth-token', responseData.token)
      if (responseData.isadmin) {
        localStorage.setItem('access', responseData.isadmin)
        window.location.replace('/admin')
      }
      else {

        localStorage.setItem('access', false)
        window.location.replace('/home')
      }
    }
    else {
      alert(responseData.error)
    }
  }


  const signup = async () => {
    let responseData;
    await fetch('http://localhost:3010/signup', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formdata),
    })
      .then((res) => res.json())
      .then((data) => { responseData = data })

    if (responseData.success) {
      localStorage.setItem('auth-token', responseData.token)
      window.location.replace("/home")
    }
    else {

      alert(responseData.error)
    }
  }


  return (
    
    <div className="loginsignup">
      <Container>
      <div className="loginsignup-container">

        <h1>{state}</h1>
        <div className="loginsignup-fields">
          {state == "Sign Up" ? <input name="username" value={formdata.username} onChange={changeHandler} type="text" placeholder="Your Name" /> : <></>}
          <input name="email" value={formdata.email} onChange={changeHandler} type="email" placeholder="Email Address" />
          <input name="password" value={formdata.password} onChange={changeHandler} type="password" placeholder="Password" />
        </div>
        <Row><button onClick={()=>{state=="Login"?login():signup()}}>Continue</button></Row>
        {state == "Sign Up" ? 
        <p className="loginsignup-login">Already have an account? <span onClick={() => { setState("Login") }}>Login here</span></p> :
        <p className="loginsignup-login">Create An Account <span onClick={() => { setState("Sign Up") }}>Click here</span></p>}
        <div className="loginsignup-agree">
          <input type="checkbox" name="" id="" />
          <p>By continuing,i agree to the terms of use & privacy policy.</p>
        </div>
      </div>
      </Container>
    </div>
    
  )
}

export default LoginSignup

