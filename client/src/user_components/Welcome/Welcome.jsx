import { useNavigate } from "react-router-dom"
import NavigationBar from "../Navigation_bar/NavigationBar"
import {useEffect} from 'react';
import {UserContext}  from "../UserContext/UserContext";
import  {useContext} from "react";
import './Welcome.css';

export default function Welcome(){
    const navigate=useNavigate()
    const {user}=useContext(UserContext);
    console.log(user);
    // const location=useLocation()
    // const data=location.state
    // console.log(data)
    useEffect(()=>{
        // console.log(user);
        if (user===null){
            navigate('/')
        }
    },[user,navigate])
    

    return(
        <>
        {user!==null && 
        <>
        <NavigationBar/>
        <div className="container">
        <main className="main">
            <div className='box'>
                <section className="hero">
                    <h2>Welcome to <br></br> Taliya <br></br> Fashion</h2>
                    <p>Our online clothing store offers a wide variety of stylish and trendy clothing options for men and women.</p>
                    <p>We have everything you need to look and feel your best, from casual wear to formal attire.</p>
                </section>
            </div>
        </main>
        <section className="products">
            <h3>T-shirts</h3>
            <p>Browse our selection of high-quality T-shirts for men and women.</p>
        
        </section>

        <footer className="footer">
            <p>&copy; Taliyah Fashion 2024</p>
        </footer>
        </div>

        </>
        }
        
        </>
    )
}