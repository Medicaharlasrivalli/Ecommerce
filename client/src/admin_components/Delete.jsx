import React, { forwardRef, useRef } from 'react'
import { useImperativeHandle } from 'react';
import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
const Delete=forwardRef(function Delete({id,handleDele},ref) {
const dialog=useRef();
// const navigate=useNavigate();
useImperativeHandle(ref,()=>{
    return{
        open(){
            dialog.current.showModal();
        }
    };
})
function deleteHandle(){
  axios.delete('http://localhost:8081/products/delete/'+id).then(result=>{
    if(result.data.Status==='success'){
        dialog.current.close();
        handleDele();
        // navigate('/')
    }
  }).catch(err=>console.log(err))
}
  return (
    <dialog ref={dialog}>
        <h2>Are you sure,do you want to delete the item</h2>
        <button onClick={deleteHandle} className='btn btn-sm btn-primary mx-2'>Yes</button>
        <button onClick={()=>{dialog.current.close()}}className='btn btn-sm btn-danger'>No</button>
    </dialog>
  )
})

export default Delete