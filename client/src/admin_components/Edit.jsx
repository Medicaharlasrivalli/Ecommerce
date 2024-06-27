import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
function Edit() {
    const [product, setProduct] = useState({
        name: '',
        price: '',
        description: '',
        stock: '',
        image: '',
    });
    const [images, setImages] = useState([]);
    const [newImages, setNewImager] = useState([]);
    const navigate = useNavigate();
    const { id } = useParams();
    // const [file, setFile] = useState();
    useEffect(() => {
        axios.get('http://localhost:8080/products/' + id).then(result => {
            setProduct(result.data[0])
            const img = result.data[0].image.split(',')
            setImages(img);
        }).catch(err => console.log(err))
    }, [id])

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        console.log(newImages);
        if (newImages.length !== 0) {
            for (const i of newImages) {
                formData.append('images', i);
            }
        }
        else {
            console.log("No images");
            formData.append('images', new Blob());
        }
        formData.append('image', product.image)
        formData.append('name', product.name);
        formData.append('price', product.price);
        formData.append('description', product.description);
        formData.append('stock', product.stock);
        // console.log(file);
        console.log(formData);
        axios.put('http://localhost:8080/products/edit/' + id, formData).then(result => {
            console.log(formData)
            if (result.data.Status === 'success')
                navigate('/admin_products')
        }).catch(err => console.log(err))
    }
    return (
        <div className='d-flex bg-primary justify-content-center align-items-center'>
            <div className='w-50 bg-white rounded p-3'>
                <form>
                    <h2>Update Product</h2>
                    <div className='mb-2'>
                        <label htmlFor=''>Name</label>
                        <input value={product.name} onChange={e => setProduct({ ...product, name: e.target.value })} type="text" placeholder='Enter name' className='form-control' />
                    </div>
                    <div className='mb-2'>
                        <label>Price</label>
                        <input value={product.price} onChange={e => setProduct({ ...product, price: e.target.value })} type="number" placeholder='Enter price' className='form-control' />
                    </div>
                    <div className='mb-2'>
                        <label>Description</label>
                        <textarea value={product.description} onChange={e => setProduct({ ...product, description: e.target.value })} type="text" placeholder='Enter description' className='form-control' />
                    </div>
                    <div className='mb-2'>
                        <label>Stock</label>
                        <input value={product.stock} onChange={e => setProduct({ ...product, stock: e.target.value })} type="number" placeholder='Enter stock' className='form-control' />
                    </div>
                    <div className='mb-2'>
                        <label>Current Image</label>
                        <br />{images.map(image => {
                            return (
                                <img src={`http://localhost:8080/images/` + image.replace(/\s/g, "")} style={{ height: "25%", width: "25%" }} alt='' />
                            )
                        })}
                    </div>
                    <div className='mb-2'>
                        <label>Update Image</label>
                        <input multiple accept='image/*' onChange={e => setNewImager(e.target.files)} type="file" className='form-control' />
                    </div>
                    <Link to='/admin_products' className='btn btn-primary me-2'>Back</Link>
                    <button onClick={handleSubmit} className='btn btn-success'>Submit</button>
                </form>
            </div>
        </div>
    )
}

export default Edit