import React, { useEffect, useState } from 'react'
import './Cart.css'
import NavigationBar from '../Navigation_bar/NavigationBar'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
// import {  useParams } from 'react-router-dom'
import { UserContext } from '../UserContext/UserContext';
import { useContext } from 'react'
function Cart() {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();
    const [carts, setCarts] = useState([{
        user_id: '',
        product_id: '',
        product_name: '',
        product_image: '',
        product_price: '',
        quantity: ''
    }]);
    const [total, setTotal] = useState(0);
    const [id, setId] = useState(0);
    useEffect(() => {
        if (user === null) {
            navigate('/')
        }
        else {
            axios.get('http://localhost:8080/cart/' + user.id).then(result => {
                console.log(result.data)
                setTotal(0)
                setCarts(result.data)
                result.data.map(cart => {
                    return setTotal(total => total + (cart.product_price * cart.quantity))
                })
            }).catch(err => console.log(err))
        }
    }, [total, user, navigate])
    const handleMinus = (user_id, product_id, quantity) => {
        axios.put('http://localhost:8080/cart/-', { user_id, product_id, quantity }).then(result => {
            if (result.data.Status === "success") {
                console.log(result.data.Status)
                axios.get('http://localhost:8080/cart/' + user_id).then(result => {
                    console.log(result);
                    setTotal(0)
                    setCarts(result.data)
                    setId(id => id + 1);
                    result.data.map(cart => {
                        return setTotal(total => total + (cart.product_price * cart.quantity))
                    })
                }).catch(err => console.log(err))
            }
        }).catch(err => console.log(err))
    }
    const handlePlus = (user_id, product_id, quantity) => {
        axios.put('http://localhost:8080/cart/+', { user_id, product_id, quantity }).then(result => {
            if (result.data.Status === "success") {
                axios.get('http://localhost:8080/cart/' + user_id).then(result => {
                    setTotal(0)
                    setCarts(result.data)
                    result.data.map(cart => {
                        return setTotal(total => total + (cart.product_price * cart.quantity))
                        // console.log(total);
                    })
                }).catch(err => console.log(err))
            }
        }).catch(err => console.log(err))
    }
    const handleRemove = (user_id, product_id) => {
        console.log(user_id, product_id)
        axios.delete('http://localhost:8080/cart/remove?user_id=' + user_id + '&product_id=' + product_id).then(result => {
            if (result.data.Status === "success") {
                axios.get('http://localhost:8080/cart/' + user_id).then(result => {
                    setTotal(0)
                    setCarts(result.data)
                    setId(id => id + 1);
                    result.data.map(cart => {
                        return setTotal(total => total + (cart.product_price * cart.quantity))
                        // console.log(total);
                    })
                }).catch(err => console.log(err))
            }
        }).catch(err => console.log(err))
    }
    function handleClick(id) {
        navigate(`/product/${id}`)
    }
    return (
        <>
            {user !== null && <>
                <NavigationBar id={id} />
                <div className='cart_block'>
                    <h3>Shopping Cart</h3>
                    <div className='cart'>
                        <table className="cart-table">
                            <thead>
                                <tr>
                                    <th>Image</th>
                                    <th>Product</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th>Subtotal</th>
                                    <th>Remove</th>
                                </tr>
                            </thead>
                            <tbody>
                                {carts.map(cart => {
                                    return (
                                        <tr>
                                            <td><img onClick={() => handleClick(cart.product_id)} src={`http://localhost:8080/images/` + cart.product_image} alt="Product" /></td>
                                            <td onClick={() => handleClick(cart.product_id)}>{cart.product_name}</td>
                                            <td >{cart.product_price}</td>
                                            <td>
                                                <div className="quantity-control">
                                                    <button onClick={() => handleMinus(cart.user_id, cart.product_id, cart.quantity)}>-</button>
                                                    <span>{cart.quantity}</span>
                                                    <button onClick={() => handlePlus(cart.user_id, cart.product_id, cart.quantity)}>+</button>
                                                </div>
                                            </td>
                                            <td>${(cart.product_price * cart.quantity).toFixed(2)}</td>
                                            <td><button onClick={() => handleRemove(cart.user_id, cart.product_id)}>Remove</button></td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                    <div className="checkout-section">
                        <h5>Total: $<span id="subtotal">{total.toFixed(2)}</span></h5>
                        <button className="rm-button">Proceed to Checkout</button>
                    </div>
                </div>
            </>}
        </>
    )
}

export default Cart