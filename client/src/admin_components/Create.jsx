import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
function Create() {
const [product,setProduct]=useState({
    id:'',
    name:'',
    price:'',
    description:'',
    image:[],
    stock:''
});

const navigate=useNavigate();

const handleSubmit=(e)=>{
    e.preventDefault();
    const formData = new FormData();
    formData.append('name',product.name);
    formData.append('price',product.price);
    formData.append('description',product.description);
    formData.append('stock',product.stock);
    for(const i of product.image){
        formData.append('image',i);
    }
    console.log(formData)
    axios.post('http://localhost:8081/products/add',formData,{ headers: {'Content-Type': 'multipart/form-data'}}).then(result=>{
        if(result.data.Status==="success")
            navigate('/admin_products')
    }).catch(err=>console.log(err))
}
  return (
    <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
            <div className='w-50 bg-white rounded p-3'>
                <form>
                    <h2>Add Product</h2>
                    <div className='mb-2'>
                        <label htmlFor=''>Name</label>
                        <input onChange={e => setProduct({ ...product, name: e.target.value })} type="text" placeholder='Enter name' className='form-control' />
                    </div>
                    <div className='mb-2'>
                        <label>Price</label>
                        <input onChange={e => setProduct({ ...product, price: e.target.value })} type="number" placeholder='Enter price' className='form-control' />
                    </div>
                    <div className='mb-2'>
                        <label>Description</label>
                        <textarea onChange={e => setProduct({ ...product, description: e.target.value })} type="textarea" placeholder='Enter description' className='form-control' />
                    </div>
                    <div className='mb-2'>
                        <label>Stock</label>
                        <input onChange={e => setProduct({ ...product, stock: e.target.value })} type="number" placeholder='Enter stock' className='form-control' />
                    </div>
                    <div className='mb-2'>
                        <label>Image</label>
                        <input onChange={e=>setProduct({...product,image:e.target.files})} type="file" multiple accept='image/*' className='form-control' />
                    </div>
                    <Link to='/admin_products' className='btn btn-primary me-2'>Back</Link>
                    <button onClick={handleSubmit} className='btn btn-success'>Submit</button>
                </form>
            </div>
        </div>
  )
}

export default Create