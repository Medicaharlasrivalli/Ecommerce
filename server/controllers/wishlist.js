const { db } = require("../database/mysql_connect.js");
const getWishlist=(req,res)=>{
    const {user_id}=req.params;
    const sql="select * from wishlist where user_id=?";
    db.query(sql,[user_id],(err,result)=>{
        if(err) return res.json({Message:"Error in the server"})
        else return res.json(result);
    })
}
const addWishListItem=(req,res)=>{
    console.log(req.body)
    const {user_id,product,image}=req.body;
    const sql="insert into wishlist values(?,?,?,?,?)";
    db.query(sql,[user_id,product.id,product.name,image,product.price],(err,result)=>{
        if(err) return res.json({Message:"Error in the server"})
        else return res.json({Status:"success"})
    })
}
const deleteWishListItem=(req,res)=>{
    const {user_id,product_id}=req.query;
    const sql="delete from wishlist where user_id=? and product_id=?";
    db.query(sql,[user_id,product_id],(err,result)=>{
        if(err) return res.json({Message:"Error in the server"})
        else return res.json({Status:'success'})
    })
}
const getOneWishListItem=(req,res)=>{
    const {user_id,id}=req.body;
    const sql="select * from wishlist where user_id=? and product_id=?"
    db.query(sql,[user_id,id],(err,result)=>{
        if(err) return res.json({Message:"Error in the server"})
        else{
            console.log("L"+result)
            if(result.length!==0)
                return res.json({Status:"success"})
            else    
                return res.json({Status:"false"})
        }
    })
}
module.exports={getWishlist,addWishListItem,deleteWishListItem,getOneWishListItem}