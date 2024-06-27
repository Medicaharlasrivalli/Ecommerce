import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom';
function View() {
    const { id } = useParams();
    const [product, setProduct] = useState([]);
    const [images,setImages]=useState([]);
    useEffect(() => {
        axios.get('http://localhost:8080/products/' + id).then(result => {    
        setProduct(result.data[0])
            const img=result.data[0].image.split(',');
            console.log(img);
            setImages(img)
            console.log(result.data[0])
        }).catch(err => console.log(err))
    }, [id])
    return (
        <div class='container'>
            <div style={{paddingInline:"10px",flexDirection:"row"}}>
                <div class='image' style={{ alignContent: "flex-start" ,flexDirection:"column"}}>
                    {/* {images.map(image=><img alt="" src={`http://localhost:8080/images/`+image.replace(/\s/g, "")} style={{ height: "50%", width: "50%", paddingTop: "20px" ,flexDirection:"column"}}/>)} */}
                    <img src={`http://localhost:8080/images/`} style={{ height: "50%", width: "50%", paddingTop: "20px" ,flexDirection:"column"}} alt='' />
                </div>
                <div class='text-content' style={{paddingLeft:"300px",paddingInline:"20px",flexDirection:"column"}}>
                    <h2>Product Details</h2>
                    ID:<h2>{product.id}</h2>
                    Name:<h2>{product.name}</h2>
                    Price:<h2>{product.price}</h2>
                    Description:<h2>{product.description}</h2>
                    Stock:<h2>{product.stock}</h2>
                </div>
                <Link to='/admin_products' className='btn btn-primary me-2'>Back</Link>
                <Link to={`/edit/${id}`} className='btn btn-info'>Edit</Link>
            </div>
        </div>
    )
}

export default View