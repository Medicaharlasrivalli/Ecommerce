const multer = require("multer");
const mysql = require("mysql");
const path = require("path");
const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  database: "Ecommerce",
  password: "Saibaba@123",
});
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
const upload = multer({
  storage: storage,
});
module.exports = { upload, db };
