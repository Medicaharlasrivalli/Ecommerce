import React, { useEffect, useState } from 'react';
import { AiOutlineSearch, AiOutlineUser, AiOutlineHeart, AiOutlineShoppingCart } from 'react-icons/ai';
import './NavigationBar.css'
import axios from 'axios';
const NavigationBar = ({ handleSearch, user_id }) => {
    const [cartCount, setCartCount] = useState(0);
    useEffect(() => {
        axios.get('http://localhost:8081/cart/cartlength/' + user_id).then(result => {
            console.log(result.data.Length)
            setCartCount(result.data.Length)
        }).catch(err => console.log(err))
    }, [user_id])
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
                        placeholder="Search..."
                        className="search-input"
                        onChange={(e) => handleSearch(e.target.value)}
                    />
                </div>

                {/* User icons */}
                <div class="user-icons">
                    <a href="/profile"><AiOutlineUser /></a>
                    <a href={`/wishlist/${user_id}`}><AiOutlineHeart /></a>
                    <a href={`/cart/${user_id}`} class="cart-icon-container">
                        <AiOutlineShoppingCart />
                        {cartCount > 0 && <span class="cart-counter">{cartCount}</span>}
                    </a>
                </div>

            </div>
        </nav>
    );
};

export default NavigationBar;