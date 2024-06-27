import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Delete from './Delete';
import { Link } from 'react-router-dom';
function Home() {
    const dialog = useRef();
    const [data, setData] = useState([]);
    const [deleteID, setDeleteID] = useState();
    // const [images,setImages]=useState([]);
    function handleDele() {
        axios.get('http://localhost:8080/products/').then(result => {
            setData(result.data)
            console.log(result)
        }
        ).catch(err => console.log(err))
    }
    useEffect(() => {
        axios.get('http://localhost:8080/products/').then(result => {
            setData(result.data)
            console.log(result)
        }
        ).catch(err => console.log(err))
    }, []);
    const openDialog = (id) => {
        setDeleteID(id)
        dialog.current.open();
    }
    return (
        <div>
            <div className='w-100 bg-white rounded p-3'>
                <h2>Product List</h2>
                <div className='d-flex justify-content-end'>
                    <Link to="/create" className='btn btn-success'>Create +</Link>
                </div>
                <table className='table'>
                    <tbody>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Description</th>
                            <th>Image</th>
                            <th>Stock</th>
                        </tr>
                        {data.map((product, index) => {
                            return (
                                <>
                                    <tr key={index}>
                                        <td>{product.id}</td>
                                        <td>{product.name}</td>
                                        <td>{product.price}</td>
                                        <td>{product.description}</td>
                                        <td><img src={`http://localhost:8080/images/` + product.image.split(',')[0]} style={{ width: "25%", height: "25%" }} alt='' /></td>
                                        <td>{product.stock}</td>
                                        <td><Link to={`/view/${product.id}`} className='btn btn-sm btn-info'>View</Link></td>
                                        <td><Link to={`/edit/${product.id}`} className='btn btn-sm btn-primary mx-2'>Edit</Link></td>
                                        <td><button onClick={() => openDialog(product.id)} className='btn btn-sm btn-danger'>Delete</button></td>
                                    </tr>
                                    <Delete id={deleteID} handleDele={handleDele} ref={dialog} />
                                </>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Home