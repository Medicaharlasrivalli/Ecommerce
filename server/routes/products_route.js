const express=require('express');
const path=require('path')
const {
  allProducts,
  addProduct,
  viewProduct,
  editProduct,
  deleteProduct,
  searchProduct,
} = require("../controllers/products.js");
const router = express.Router();
const {upload}=require('../database/mysql_connect.js')
router.get("/", allProducts);
router.get("/:id", viewProduct);
router.post("/add",upload.array("image"),addProduct);
router.put("/edit/:id",upload.array("image"),editProduct);
router.delete("/delete/:id", deleteProduct);
router.post("/",searchProduct)
module.exports = router;
