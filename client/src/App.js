// import logo from './logo.svg';
import "./App.css";
import Home from "./admin_components/Home";
import Create from "./admin_components/Create";
import View from "./admin_components/View";
import Edit from "./admin_components/Edit";
// import Delete from "./admin_components/Delete";
// import Login from "./admin_components/Login";
import AdminHome from "./admin_components/AdminHome";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Products from "./user_components/Products/Products";
import ViewProduct from "./user_components/ViewProduct/ViewProduct";
import Category from "./user_components/Category/Category";
import Cart from "./user_components/Cart/Cart";
import Wishlist from "./user_components/Wishlist/Wishlist";
import Login from "./user_components/Login/Login";
import SignUp from "./user_components/Login/SignUp";
import Welcome from "./user_components/Welcome/Welcome";
import UserContextProvider from "./user_components/UserContext/UserContext";
function App() {
  return (
    <UserContextProvider>
    <BrowserRouter>
      <Routes>
        <Route path='/products/:category' element={<Category/>}></Route>
        <Route path='/Welcome' element={<Welcome/>}></Route>
        <Route path="/" element={<Login/>}></Route>
        <Route path="/Signup" element={<SignUp/>}></Route>
        <Route path="/products" element={<Products />}></Route>
        <Route path='/products/:category' element={<Category/>}></Route>
        <Route path="/product/:id" element={<ViewProduct />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/admin_products" element={<Home />}></Route>
        <Route path="/create" element={<Create />}></Route>
        <Route path="/view/:id" element={<View />}></Route>
        <Route path="/edit/:id" element={<Edit />}></Route>
        <Route path='/cart' element={<Cart/>}></Route>
        <Route path="/adminHome" element={<AdminHome />}></Route>
        <Route path="/wishlist" element={<Wishlist/>}></Route>
      </Routes>
    </BrowserRouter>
    </UserContextProvider>
  );
}

export default App;
