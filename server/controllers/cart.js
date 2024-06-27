const { db } = require("../database/mysql_connect.js");
const getProducts = (req, res) => {
  const {user_id}=req.params;
  const sql = "SELECT * FROM CARTS WHERE user_id=?";
  db.query(sql, [user_id],(err, result) => {
    if (err) return res.json({ Message: "Error in the server" });
    else {
      console.log(result);
      return res.json(result);
    }
  });
};
const addProductInCart = (req, res) => {
  console.log(req.body)
  let { user_id, product, quantity, image } = req.body;
  const sql0="select * from carts where user_id=? and product_id=?";
  let isExist=false;
  db.query(sql0,[user_id,product.id],(err,result)=>{
    if(err) return res.json({Message:"Error in the server"})
    else {
      console.log("len",result.length)
      if(result.length>0){
        isExist=true;
        quantity=quantity+result[0].quantity;
        console.log(quantity);
      }
      if(isExist===false){
        const sql = "insert into carts values(?,?,?,?,?,?)";
        db.query(
          sql,
          [user_id, product.id, image, product.name, product.price, quantity],
          (err, result) => {
            if (err) {
              console.log(err);
              return res.json({ Message: "Error in the server" });
            } else {
              return res.json({ Status: "success" });
            }
          }
        );
      }
      else{
        const sql = "update carts set quantity=? where user_id=? and product_id=?";
        db.query(sql, [quantity, user_id, product.id], (err, result) => {
        if (err) {
          console.log(err);
          return res.json({ Message: "Error in the server" });
        } else {
          console.log(result);
          return res.json({Status:"success"});
        }
      })
      }
    }
  })
  console.log(isExist)
  
};
const manageQuantity = (req, res) => {
  const { sym } = req.params;
  console.log(req.body, req.params);
  let { user_id, product_id, quantity } = req.body;
  if(quantity===1 && sym==="-"){
    const sql0="delete from carts where user_id=? and product_id=?";
    db.query(sql0,[user_id,product_id],(err,result)=>{
        if(err) return res.json({Message:"Error in the server"})
        else return res.json({Status:"success"})
    })
    }
else{
    if (sym === "+") quantity = quantity + 1;
  else quantity = quantity - 1;
  const sql = "update carts set quantity=? where user_id=? and product_id=?";
  db.query(sql, [quantity, user_id, product_id], (err, result) => {
    if (err) {
      console.log(err);
      return res.json({ Message: "Error in the server" });
    } else {
      console.log(result);
      return res.json({Status:"success"});
    }
  });
}
}
const removeProduct=(req,res)=>{
    const {user_id,product_id}=req.query;
    console.log(user_id,product_id)
    const sql="delete from carts where user_id=? and product_id=?";
    db.query(sql,[user_id,product_id],(err,result)=>{
      if(err) {
        console.log(err)
        return res.json({Message:"Error in the server"})
      }
      else {
        console.log(result)
        return res.json({Status:"success"})
      }
    })
}
const cartLength=(req,res)=>{
  console.log(req.params)
  const {id}=req.params;
  const sql="SELECT * FROM carts WHERE user_id=?";
  db.query(sql,[id],(err,result)=>{
    if(err) return res.json({Message:"Error in the server"})
    else return res.json({Length:result.length})
  })
}

module.exports = { getProducts, addProductInCart, manageQuantity,removeProduct,cartLength};
