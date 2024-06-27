const productRouter = require("./routes/products_route");
const express = require("express");
const cors = require("cors");
const path = require("path");
const cartRouter = require("./routes/cart_route");
const wishlistRouter = require("./routes/wishlist_route");
const loginRouter = require("./routes/login_route");
const signUpRouter = require("./routes/signUp_route");
const cookieParser = require("cookie-parser");
// const LoginRouter=require('./routes/adminLogin')

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static("public"));
app.use(cookieParser());

// app.use('/login',LoginRouter)
app.use("/login", loginRouter);
app.use("/signup", signUpRouter);
app.use("/cart", cartRouter);
app.use("/wishlist", wishlistRouter);
app.use("/products", productRouter);

app.listen(8080, () => {
  console.log("Server is listening on 8080...");
});
