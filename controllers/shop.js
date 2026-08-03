const Product = require("../models/product");
const path = require("../util/path");
const Cart = require("../models/cart");
exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("shop/product-list", {
      prods: products,
      path: "/products",
      pageTitle: "All Products",
      hasProducts: products.length > 0,
      activeShop: true,
      productCSS: true,
      layout: false,
    });
  });
};

exports.getProductId = (req, res, next) => {
  const prodId = req.params.productId;
  Product.getbyId(prodId, (prod) => {
    if (!prod) {
      return res.redirect("/products");
    }
    res.render("shop/product-details", {
      product: prod,
      pageTitle: prod.title,
      path: "/products",
    });
  });
};

exports.getIndex = (req, res) => {
  Product.fetchAll((products) => {
    res.render("shop/index", { prods: products, path: "/", pageTitle: "Shop" });
  });
};

exports.getCart = (req, res) => {
  res.render("shop/cart", { pageTitle: "Cart", path: "/cart" });
};

exports.postCart = (req, res) => {
  const prodId = req.body.productId;
  Product.getbyId(prodId, (product) => {
    Cart.addProduct(prodId, product.price);
  });
  res.redirect("/cart");
};

exports.getCheckout = (req, res) => {
  res.render("shop/checkout", { pageTitle: "CheckOut", path: "/checkout" });
};

exports.getOrders = (req, res) => {
  res.render("shop/orders", { pageTitle: "Orders", path: "/orders" });
};
