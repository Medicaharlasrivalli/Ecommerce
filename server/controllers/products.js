const { db } = require("../database/mysql_connect.js");
const allProducts = (req, res) => {
  const sql = "SELECT * FROM products";
  db.query(sql, (err, result) => {
    if (err) return res.json({ Message: "Error in the server" });
    else {
      // console.log(result);
      return res.json(result);
    }
  });
};
const addProduct = (req, res) => {
  const product = req.body;
  const image = req.files.map((file) => file.filename).toString();
  console.log("Images are", image);
  console.log(product);
  // console.log(file);
  const sql =
    "INSERT INTO products (name,price,description,image,stock) VALUES(?,?,?,?,?)";
  db.query(
    sql,
    [product.name, product.price, product.description, image, product.stock],
    (err, result) => {
      if (err) {
        console.log("Sent");
        console.log(err);
        return res.json({ Message: "Error in the server" });
      } else {
        console.log("Sent");
        console.log("The result is" + result);
        return res.json({ Status: "success" });
      }
    }
  );
};
const viewProduct = (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM products WHERE id=?";
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.log(err);
      return res.json({ Message: "Error in the server" });
    } else {
      console.log(result);
      return res.json(result);
    }
  });
};
const editProduct = (req, res) => {
  const { id } = req.params;
  const product = req.body;
  const file = req.files.map((file) => file.filename).toString();
  let image;
  if (file.length === 0) image = product.image;
  else image = file;
  console.log(id);
  console.log(product);
  const sql =
    "UPDATE products SET name=?,price=?,description=?,image=?,stock=? WHERE id=?";
  db.query(
    sql,
    [
      product.name,
      product.price,
      product.description,
      image,
      product.stock,
      id,
    ],
    (err, result) => {
      if (err) return res.json({ Message: "Error in the server" });
      else return res.json({ Status: "success" });
    }
  );
};
const deleteProduct = (req, res) => {
  const { id } = req.params;
  console.log(id);
  const sql = "DELETE FROM products WHERE id=?";
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.log(err);
      return res.json({ Message: "Error in the server" });
    } else {
      console.log(result);
      console.log("deleted");
      return res.json({ Status: "success" });
    }
  });
};
const searchProduct = (req, res) => {
  let { searchItem } = req.body;
  console.log(req.body);
  let sql;
  if (searchItem === "") sql = "select * from products";
  else if (searchItem === "men") {
    sql = "select * from products where name regexp ? and name not regexp ?";
  } else if (searchItem === "kids") {
    sql = "select * from products where name regexp ?";
    searchItem = "girl|boy|" + searchItem;
  } else sql = "select * from products where name regexp ?";

  db.query(sql, [searchItem, "women"], (err, result) => {
    if (err) {
      console.log(err);
      return res.json({ Message: "Error in the server" });
    } else {
      // console.log(result)
      return res.json(result);
    }
  });
};
module.exports = {
  allProducts,
  addProduct,
  viewProduct,
  editProduct,
  deleteProduct,
  searchProduct,
};
