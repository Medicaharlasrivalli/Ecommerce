import React from 'react'
import './Products.css'
import { useNavigate } from 'react-router-dom'
import NavigationBar from '../Navigation_bar/NavigationBar'
import { useEffect, useState } from 'react'
import axios from 'axios'
function Products() {
    const user_id=1;
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:8081/products/').then(result => {
            setData(result.data)
            console.log(result)
        }
        ).catch(err => console.log(err))
    }, []);
    function handleClick(id) {
        navigate(`/product/${id}`)
    }
    function searchHandler(searchItem){
        console.log("SearchItem",searchItem)
        axios.post('http://localhost:8081/products',{searchItem}).then(result => {
            setData(result.data)
            console.log(result)
        }
        ).catch(err => console.log(err))
    }
    return (
        <>
            <NavigationBar user_id={user_id} handleSearch={searchHandler}/>
            <div class="product-grid" >
                {data.map((product, index) => {
                    return (
                        <div class="product-item" onClick={()=>handleClick(product.id)}>
                            <img src={`http://localhost:8081/images/` + product.image.split(',')[0]} alt="Product 1" />
                            <h3>{product.name}</h3>
                            {/* <p>{product.description}</p> */}
                            <span class="product-price">${product.price}</span>
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default Products