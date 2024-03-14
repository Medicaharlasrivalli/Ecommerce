const express=require('express');
const path=require('path')
const router=express.Router();
const {getProducts,addProductInCart, manageQuantity, removeProduct, cartLength}=require('../controllers/cart');


router.get('/:user_id',getProducts);
router.post('/',addProductInCart)
router.put('/:sym',manageQuantity)
router.delete('/remove',removeProduct)
router.get('/cartlength/:id',cartLength)
module.exports=router