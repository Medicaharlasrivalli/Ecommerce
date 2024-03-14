import React from 'react'
import { Link } from 'react-router-dom'
// import productLogo from '../../public/product_logo.jpg'
function AdminHome() {
    return (
        <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
            <div className='h-45 w-100 bg-white rounded p-3'>
                <form>
                    <div>
                        {/* <Link to='/' style={{ height: "300px", width: "218px", }} className='btn btn-sm btn-primary'><img src="product_logo.jpg" style={{ height: "100%", width: "100%", paddingTop: "10px" }} /></Link> */}
                        <Link to='/admin_products' style={{ height: "300px", width: "218px", }} className='btn btn-sm btn-primary'><img alt="" src="product_logo.png" style={{ height: "100%", width: "100%", paddingTop: "10px" }} /></Link>
                        <Link to='/admin_products' style={{ height: "300px", width: "218px", }} className='btn btn-sm btn-primary'><img alt="" src="order-list.png" style={{ height: "100%", width: "100%", paddingTop: "10px" }} /></Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AdminHome