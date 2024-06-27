import React, { useEffect, useState } from 'react'
import NavigationBar from '../Navigation_bar/NavigationBar';
// import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext/UserContext';
import { useContext } from 'react';
function Wishlist() {
    const [data, setData] = useState([]);
    const { user } = useContext(UserContext)
    // const  user_id  = user.id;
    const navigate = useNavigate();
    useEffect(() => {
        if (user === null) {
            navigate('/')
        }
        else {
            axios.get('http://localhost:8080/wishlist/' + user.id).then(result => {
                console.log(result.data)
                setData(result.data)
            }).catch(err => console.log(err))
        }
    }, [user, navigate])
    function handleClick(id) {
        navigate(`/product/${id}`)
    }
    function handleRemove(user_id, product_id) {
        axios.delete('http://localhost:8080/wishlist?user_id=' + user_id + '&product_id=' + product_id).then(result => {
            if (result.data.Status === 'success') {
                axios.get('http://localhost:8080/wishlist/' + user_id).then(result => {
                    console.log(result.data)
                    setData(result.data)
                }).catch(err => console.log(err))
            }
        }).catch(err => console.log(err))
    }
    return (
        <>
            {user !== null && <>
                <NavigationBar />
                <div className='cart_block'>
                    <h3>Wish List</h3>
                    <div className='cart'>
                        <table className="cart-table">
                            <thead>
                                <tr>
                                    <th>Image</th>
                                    <th>Product</th>
                                    <th>Price</th>
                                    <th>Remove</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map(wishlist => {
                                    return (
                                        <tr >
                                            <td><img onClick={() => handleClick(wishlist.product_id)} src={`http://localhost:8080/images/` + wishlist.product_image} alt="Product" /></td>
                                            <td onClick={() => handleClick(wishlist.product_id)}>{wishlist.product_name}</td>
                                            <td>{wishlist.product_price}</td>
                                            <td ><button onClick={() => handleRemove(wishlist.user_id, wishlist.product_id)}>Remove</button></td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </>}
        </>

    )
}

export default Wishlist