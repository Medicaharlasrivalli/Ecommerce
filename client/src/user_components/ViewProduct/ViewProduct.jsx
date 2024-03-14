import React, { useEffect } from 'react'
import './viewProduct.css'
// import sample1 from './assetsNew/sample1.png';
import { useState } from 'react';
import { FaHeart } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import NavigationBar from '../Navigation_bar/NavigationBar';
import { useNavigate } from 'react-router-dom';
function ViewProduct() {
    const [product, setProdcut] = useState([]);
    const { id } = useParams();
    const navigate = useNavigate();
    const [isWishlisted, setIsWishlisted] = useState(false); // Track wishlist state
    const toggleWishlist = () => setIsWishlisted(!isWishlisted);
    const [images, setImages] = useState([]);
    const [index, setIndex] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const user_id = 1;
    function addToCart() {
        const image = images[0];
        axios.post('http://localhost:8081/cart', { user_id, product, quantity, image }).then(result => {
            if (result.data.Status === "success")
                navigate(`/cart/${user_id}`)
        }).catch(err => console.log(err))
    }
    useEffect(() => {
        axios.get('http://localhost:8081/products/' + id).then(result => {
            console.log(result.data)
            setProdcut(result.data[0])
            const img = result.data[0].image.split(',')
            setImages(img)
        }).catch(err => console.log(err))
    }, [id])
    function searchHandler() {
        navigate('/')
    }
    function handlePrev() {
        if (index === 0)
            setIndex(images.length - 1)
        else
            setIndex(index => index - 1)
    }
    function handleNext() {
        if (index === images.length - 1)
            setIndex(0)
        else
            setIndex(index => index + 1)
    }
    return (
        <>
            <NavigationBar handleSearch={searchHandler} user_id={user_id} />
            <div class="product-view">
                <div class="product-image">
                    <img src={`http://localhost:8081/images/` + images[index]} alt="Product" />
                    <button onClick={handlePrev} class="previous">&lt;</button>
                    <button onClick={handleNext} class="next">&gt;</button>
                </div>

                <div class="product-details">
                    <h3 class="product-name">{product.name}</h3>
                    <p>{product.description}</p>
                    <p>This is a description of the product. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc rhoncus dui sit amet rutrum euismod. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Nulla vitae elit libero, a pharetra augue.</p>
                    <br></br>
                    <span class="price">${product.price}</span>
                    <span>
                        <p>Quantity</p>
                        <div className="quantity-control">
                            <button className='left' onClick={() => { setQuantity(quantity => quantity - 1) }}>-</button>
                            <span>{quantity}</span>
                            <button className='right' onClick={() => { setQuantity(quantity => quantity + 1) }}>+</button>
                        </div>
                    </span>
                    <div class="details">
                        <h4>Details</h4>
                        <ul>
                            <li>Detail 1</li>
                            <li>Detail 2</li>
                            <li>Detail 3</li>
                        </ul>
                    </div>
                    <br></br>
                    <div className='buttons'>
                        <button class="add-to-cart" onClick={addToCart}>Add to Cart</button>
                        <button className="wishlist-button" onClick={toggleWishlist}>
                            {isWishlisted ? <FaHeart className="heart active" /> : <FaHeart className="heart" />}
                            Wishlist
                        </button>
                    </div>

                </div>
            </div>
        </>
    )
}

export default ViewProduct