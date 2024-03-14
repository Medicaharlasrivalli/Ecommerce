import React, { useEffect, useState } from 'react'
import './Cart.css'
import NavigationBar from '../Navigation_bar/NavigationBar'
import axios from 'axios'
import {  useParams } from 'react-router-dom'
function Cart() {
    const { user_id } = useParams();
    const [carts, setCarts] = useState([{
        user_id: '',
        product_id: '',
        product_name: '',
        product_image: '',
        product_price: '',
        quantity: ''
    }]);
    const [total, setTotal] = useState(0);
    const [userId,setUserId]=useState(user_id);
    useEffect(() => {
        axios.get('http://localhost:8081/cart/' + user_id).then(result => {
            console.log(result.data)
            setTotal(0)
            setUserId(user_id)
            setCarts(result.data)
            result.data.map(cart => {
                return setTotal(total => total + (cart.product_price * cart.quantity))
            })
        }).catch(err => console.log(err))
    }, [total, user_id])
    const handleMinus = (user_id, product_id, quantity) => {
        axios.put('http://localhost:8081/cart/-', { user_id, product_id, quantity }).then(result => {
            if (result.data.Status === "success") {
                axios.get('http://localhost:8081/cart/' + user_id).then(result => {
                    setTotal(0)
                    setUserId(user_id)
                    setCarts(result.data)
                    result.data.map(cart => {
                        return setTotal(total => total + (cart.product_price * cart.quantity))
                    })
                }).catch(err => console.log(err))
            }
        }).catch(err => console.log(err))
    }
    const handlePlus = (user_id, product_id, quantity) => {
        axios.put('http://localhost:8081/cart/+', { user_id, product_id, quantity }).then(result => {
            if (result.data.Status === "success") {
                axios.get('http://localhost:8081/cart/' + user_id).then(result => {
                    setTotal(0)
                    setUserId(user_id)
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
        axios.delete('http://localhost:8081/cart/remove?user_id=' + user_id + '&product_id=' + product_id).then(result => {
            if (result.data.Status === "success") {
                axios.get('http://localhost:8081/cart/'+user_id).then(result => {
                    setTotal(0)
                    setUserId(user_id)
                    setCarts(result.data)
                    result.data.map(cart => {
                        return setTotal(total => total + (cart.product_price * cart.quantity))
                        // console.log(total);
                    })
                }).catch(err => console.log(err))
            }
        }).catch(err => console.log(err))
    }
    return (
        <>
            <NavigationBar user_id={userId} />
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
                                        <td><img src={`http://localhost:8081/images/` + cart.product_image} alt="Product" /></td>
                                        <td>{cart.product_name}</td>
                                        <td>{cart.product_price}</td>
                                        <td>
                                            <div className="quantity-control">
                                                <button onClick={() => handleMinus(cart.user_id, cart.product_id, cart.quantity)}>-</button>
                                                <span>{cart.quantity}</span>
                                                <button onClick={() => handlePlus(cart.user_id, cart.product_id, cart.quantity)}>+</button>
                                            </div>
                                        </td>
                                        <td>${cart.product_price * cart.quantity}</td>
                                        <td><button onClick={() => handleRemove(cart.user_id, cart.product_id)}>Remove</button></td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
                <div className="checkout-section">
                    <h5>Total: $<span id="subtotal">{total}</span></h5>
                    <button className="rm-button">Proceed to Checkout</button>
                </div>
            </div>
        </>
    )
}

export default Cart