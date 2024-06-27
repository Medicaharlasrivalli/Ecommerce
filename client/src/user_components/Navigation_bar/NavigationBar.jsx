import React, { useEffect, useRef, useState } from 'react';
import { AiOutlineSearch, AiOutlineUser, AiOutlineHeart, AiOutlineShoppingCart } from 'react-icons/ai';
import './NavigationBar.css';
import { UserContext } from '../UserContext/UserContext';
import { useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const NavigationBar = ({ id }) => {
    const { user} = useContext(UserContext);
    const user_id = user.id;
    const navigate=useNavigate();
    const searchItem=useRef(null);
    const [cartCount, setCartCount] = useState(0);
    // function handleUser(){
    //     setUser(null)
    // }
    function searchHandler(){
        navigate(`/products/${searchItem.current.value}`)
        searchItem.current.value=null;
    }
    useEffect(() => {
        axios.get('http://localhost:8080/cart/cartlength/' + user_id).then(result => {
            console.log(result.data.Length)
            console.log(id)
            setCartCount(result.data.Length)
        }).catch(err => console.log(err))
    }, [user_id,id])
    return (
        <nav className="navigation-bar">
            <div className="nav-left">
                {/* Logo */}
                <h2>TALIYA FASHION</h2>

                {/* Category links */}
                <div className="nav-links">
                    <a href={`/products/${"men"}`}>MEN</a>
                    <a href={`/products/${'women'}`}>WOMEN</a>
                    <a href={`/products/${"kids"}`}>KIDS</a>
                </div>
            </div>

            <div className="nav-right">
                {/* Search bar */}
                <div className="search-bar">
                    <AiOutlineSearch className="search-icon" />
                    <input
                        type="text"
                        ref={searchItem}
                        placeholder="Search..."
                        className="search-input"
                        onKeyDown={(e) =>{if(e.key==="Enter"){searchHandler();}}}
                    ></input>
                </div>

                {/* User icons */}
                <div class="user-icons">
                    <a href="/profile"><AiOutlineUser /></a>
                    <a href={`/wishlist`}><AiOutlineHeart /></a>
                    <a href={`/cart`} class="cart-icon-container">
                        <AiOutlineShoppingCart />
                        {cartCount > 0 && <span class="cart-counter">{cartCount}</span>}
                    </a>
                    <a href={'/'}>Logout</a>
                </div>

            </div>
        </nav>
    );
};

export default NavigationBar;