// const Cart = require("./cart");
// const db = require("../util/db");
// module.exports = class Product {
//   constructor(id, title, imageUrl, descrip, price) {
//     this.id = id;
//     this.title = title;
//     this.imageUrl = imageUrl;
//     this.descrip = descrip;
//     this.price = price;
//   }
//   //Save Product to Database
//   save() {
//     return db.execute(
//       "INSERT INTO products (Title,Price,Description,ImageUrl) VALUES (?,?,?,?)",
//       [this.title, this.price, this.descrip, this.imageUrl],
//     );
//   }

//   //Delete Product by ID from Database
//   static deleteById(id) {
//     return db.execute("DELETE FROM products WHERE products.ID=?", [id]);
//   }

//   //Get All Products from Database
//   static fetchAll() {
//     return db.execute("SELECT * FROM products");
//   }

//   //Get Product by ID from Database
//   static findbyId(id) {
//     return db.execute("SELECT * FROM products WHERE products.ID=?", [id]);
//   }
// };

const Sequelize=require('sequelize');

const sqz=require('../util/db');

const Product=sqz.define('product',{
  id:{
    type:Sequelize.INTEGER,
    autoIncrement:true,
    allowNull:false,
    primaryKey:true
  },
  title:{
    type:Sequelize.STRING,
    allowNull:false
  },
  price:{
    type:Sequelize.DOUBLE,
    allowNull:false
  },
  imageUrl:{
    type:Sequelize.STRING,
    allowNull:false
  },
  descrip:{
    type:Sequelize.STRING,
    allowNull:false
  }
})

module.exports=Product;