import { useState } from "react"
import "./Login.css"
import axios from 'axios';
import {useNavigate} from 'react-router-dom' 
// import { useContext } from "react";
// import { UserContext } from "../UserContext/UserContext";

export default function SignUp(){
  const navigate=useNavigate()
  const [signupSuccess,setSignupSuccess]=useState(false)
  const [signupMsg,setSignupMsg]=useState(null)
  const [userDetails,setUserDetails]=useState({
    fname:null,lname:null,uname:null,email:null,password:null,dob:null,phone:null
  })
  function handleChanges(sym,e){
    setUserDetails(prevDetails=>{
      return{
      ...prevDetails,[sym]:e
    }})

  }
  function handleSignup(){
    console.log(userDetails)   
    axios.post("http://localhost:8080/signup/",userDetails).then(result =>{
      console.log(result)
      if(result.data.Status==="Success"){
        setSignupSuccess(true)
        setSignupMsg(null)
        navigate('/')
      }
      else{
        setSignupMsg("Email is Already Exists")
        setSignupSuccess(false)
      }
  })                                                                                                                                  
  }
    return (
        <div class="container">
        <header>
          <h1>TALIYA </h1><br></br>
          <h2>FASHION</h2>
    
        </header>
          <div class="login-box">
              <h2>SIGNUP</h2>
              {!signupSuccess && <p style={{color:'red'}}>{signupMsg}</p>}
              {}
              <input className="lg-text" type="text"  placeholder="First Name*" required onChange={(e)=>handleChanges("fname",e.target.value)}/><br></br>
              <input className="lg-text" type="text"  placeholder="Last Name*" required onChange={(e)=>handleChanges("lname",e.target.value)}/><br></br>
              <input className="lg-text" type="text"  placeholder="Username*" required onChange={(e)=>handleChanges("uname",e.target.value)}/><br></br>
              
              <input type="email"   placeholder="Email Address*" required onChange={(e)=>handleChanges("email",e.target.value)}/><br></br>
              <input type="password"   placeholder="Password*" required onChange={(e)=>handleChanges("password",e.target.value)}/><br></br>
              <input type="date" placeholder="Date of Birth" required onChange={(e)=>handleChanges("dob",e.target.value)}/><br></br>
              <input type="tel" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" placeholder="Phone Number*" onChange={(e)=>handleChanges("phone",e.target.value)}></input>
    
              <button className="lg-button" type="submit" onClick={handleSignup}>Signup
              </button>
              
          </div>
          </div>
    )
}