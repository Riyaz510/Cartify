const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
  res.render("admin/Add-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    activeAddProduct: true,
    formsCSS: true,
    productCSS: true,
  });
};

exports.postAddProduct = (req, res) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const descrip = req.body.descrip;
  const price = req.body.price;
  const product = new Product(title, imageUrl, descrip, price);
  product.save();
  res.redirect("/");
};

exports.getAdminProducts = (req, res) => {
  Product.fetchAll((products) => {
    res.render("admin/products", {
      prods: products,
      path: "/products",
      pageTitle: "Shop",
    });
  });
};
