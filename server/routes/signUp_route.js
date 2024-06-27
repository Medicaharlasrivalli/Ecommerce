const express=require('express');
const {signupUser}=require('../controllers/signUp')
const router=express.Router();

router.post('/',signupUser);

module.exports=router