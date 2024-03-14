import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios  from 'axios';
import NavigationBar from '../Navigation_bar/NavigationBar';
import { useNavigate } from 'react-router-dom';
function Category() {
    const user_id=1;
    const {category}=useParams();
    const searchItem=category;
    console.log(category)
    const navigate=useNavigate();
    const [data,setData]=useState([]);
    useEffect(() => {
        axios.post('http://localhost:8081/products',{searchItem}).then(result => {
            setData(result.data)
            console.log(result)
        }
        ).catch(err => console.log(err))
    }, [searchItem]);
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

export default Category