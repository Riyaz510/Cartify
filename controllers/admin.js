const Product = require("../models/product");

//Get Add Product Page
exports.getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
  });
};

//Add Product to Database
exports.postAddProduct = (req, res) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const descrip = req.body.descrip;
  const price = req.body.price;

  Product.create({
    title: title,
    price: price,
    imageUrl: imageUrl,
    descrip: descrip,
  })
    .then(() => {
      console.log("Created Product");
      res.redirect("/admin/products");
    })
    .catch((err) => {
      console.log(err);
    });
};

//Get Edit Product Page
exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/");
  }
  const prodId = req.params.productId;
  Product.findByPk(prodId)
    .then((product) => {
      if (!product) {
        return res.redirect("/");
      }
      res.render("admin/edit-product", {
        pageTitle: "Edit Product",
        path: "/admin/edit-product",
        editing: editMode,
        product: product,
      });
    })
    .catch((err) => console.log(err));
};

//Edit Product in Database
exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDescrip = req.body.descrip;
  Product.findByPk(prodId)
    .then((product) => {
      product.title = updatedTitle;
      product.imageUrl = updatedImageUrl;
      product.descrip = updatedDescrip;
      product.price = updatedPrice;
      return product.save();
    })
    .then((result) => {
      console.log("Updated Product", result);
      res.redirect("/admin/products");
    })
    .catch((err) => console.log(err));
};

//Get All Products for Admin
exports.getAdminProducts = (req, res) => {
  Product.findAll()
    .then((products) => {
      res.render("admin/products", {
        prods: products,
        path: "/admin/products",
        pageTitle: "Shop",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

//Delete Product by ID from Database
exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findByPk(prodId)
    .then((product) => {
      return product.destroy();
    }).then(result=>{
      console.log("Destroyed Product");
      res.redirect("/admin/products");
    })
    .catch((err) => {
      console.log(err);
    });
};
