const productRouter = require("./routes/products_route");
const express = require("express");
const cors = require("cors");
const path = require("path");
const cartRouter=require('./routes/cart_route')
// const LoginRouter=require('./routes/adminLogin')

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static("public"));

// app.use('/login',LoginRouter)
app.use("/cart",cartRouter);
app.use("/products", productRouter);

app.listen(8081, () => {
  console.log("Server is listening on 8081...");
});