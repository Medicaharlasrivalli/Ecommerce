import React from 'react'
import './Products.css'
import { useNavigate } from 'react-router-dom'
import NavigationBar from '../Navigation_bar/NavigationBar'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { UserContext } from '../UserContext/UserContext';
import { useContext } from 'react'
function Products() {
    const {user}=useContext(UserContext);
    const navigate = useNavigate();
    console.log(user);
    useEffect(()=>{
        // console.log(user);
        if (user===null){
            navigate('/')
        }
    },[user,navigate])
    // const user_id=user.id;
    const [data, setData] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:8080/products/').then(result => {
            setData(result.data)
            console.log(result)
        }
        ).catch(err => console.log(err))
    }, []);
    function handleClick(id) {
        navigate(`/product/${id}`)
    }
    return (
        <>
        {user!==null && <>
            <NavigationBar/>
            <div class="product-grid" >
                {data.map((product, index) => {
                    return (
                        <div class="product-item" onClick={()=>handleClick(product.id)}>
                            <img src={`http://localhost:8080/images/` + product.image.split(',')[0]} alt="Product 1" />
                            <h3>{product.name}</h3>
                            {/* <p>{product.description}</p> */}
                            <span class="product-price">${product.price}</span>
                        </div>
                    )
                })}
            </div>
        </>}
        </>
        
    )
}

export default Products