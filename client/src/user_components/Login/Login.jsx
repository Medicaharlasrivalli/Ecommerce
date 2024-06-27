import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react';
import { UserContext } from '../UserContext/UserContext';
export default function Login() {
  const navigate = useNavigate()
  const { setUser } = useContext(UserContext)
  useEffect(() => {
    setUser(null);
  }, [])
  const [userdata, setUserData] = useState({
    email: null,
    password: null
  })
  const [signinSuccess, setSigninSuccess] = useState(false)
  const [signinMsg, setSigninMsg] = useState(null)
  function handleChanges(sym, e) {
    setUserData(prevdata => {
      return {
        ...prevdata, [sym]: e.target.value
      }
    })
  }
  function handleOnClick() {
    axios.post('http://localhost:8080/login', userdata).then(result => {
      console.log(result.data)
      if (result.data.Status === "Success") {
        console.log(result.data.user)
        setUser(result.data.user)
        setSigninSuccess(true)
        setSigninMsg(null)
        navigate('/Welcome', { state: result.data.user })
      }
      else {
        setSigninMsg(result.data.msg)
        setSigninSuccess(false)
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
        <h2>LOGIN</h2>
        {!signinSuccess && <p style={{ color: 'red' }}>{signinMsg}</p>}
        <input className="lg-text" type="text" placeholder="Username or Email Address*" required onChange={(e) => handleChanges('email', e)} /><br></br>
        <input type="password" placeholder="Password*" required onChange={(e) => handleChanges('password', e)} /><br></br>

        <a href="/">Forget password?</a><br></br>
        <input type="checkbox"></input>
        <label>Remember Me</label><br></br>

        <button className="lg-button" type="submit" onClick={handleOnClick}>Login</button>
        <a href="/Signup" >No Account? Register</a>

      </div>
    </div>
  );

}