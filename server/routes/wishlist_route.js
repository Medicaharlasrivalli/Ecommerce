const express=require('express');
const path=require('path')
const {getWishlist,addWishListItem,deleteWishListItem, getOneWishListItem}=require('../controllers/wishlist')
const router=express.Router();

router.get('/:user_id',getWishlist);
router.post('/',addWishListItem);
router.delete('/',deleteWishListItem);
router.post('/single',getOneWishListItem)
module.exports=router
