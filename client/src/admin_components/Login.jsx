import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
function Login() {
    const [cred, setCred] = useState({
        username: '',
        password: ''
    })
    const navigate=useNavigate();
    const [mess,setMess]=useState(null);
    const handleLogin=(e)=>{
        e.preventDefault();
        axios.post('http://localhost:8081/login',cred).then(result=>{
            console.log(result.data)
            if(result.data.Status==='success'){
                console.log('true')
                navigate('/adminHome')
            }
            else{
                setMess(result.data.Message)
            }
        }).catch(err=>console.log(err))
    }
    return (
        <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
            <div className='w-50 bg-white rounded p-3'>
                <form>
                    <h2>Login</h2>
                    <div className='mb-2'>
                        <label htmlFor=''>Username</label>
                        <input onChange={e => setCred({ ...cred, username: e.target.value })} type="text" placeholder='Enter username' className='form-control' />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor=''>Password</label>
                        <input onChange={e => setCred({ ...cred, password: e.target.value })} type="password" placeholder='Enter username' className='form-control' />
                    </div>
                    {mess && <p style={{color:"red"}}>{mess}</p>}
                    <button onClick={handleLogin} className='btn btn-success'>Login</button>
                </form>
            </div>
        </div>

    )
}

export default Login