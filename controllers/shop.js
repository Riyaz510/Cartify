const Product = require("../models/product");
const path = require("../util/path");
const Cart = require("../models/cart");

//Get All Products
exports.getProducts = (req, res, next) => {
  Product.findAll()
    .then((products) => {
      res.render("shop/product-list", {
        prods: products,
        path: "/products",
        pageTitle: "All Products",
        hasProducts: products.length > 0,
        activeShop: true,
        productCSS: true,
        layout: false,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

//Get Product Details by ID
exports.getProductId = (req, res, next) => {
  const prodId = req.params.productId;
  // Product.findAll({ where: { id: prodId } })
  //   .then((products) => {
  //     const product = products[0]; // Get the first (and likely only) product
  //     if (!product) {
  //       return res.redirect("/products");
  //     }
  //     res.render("shop/product-details", {
  //       product,
  //       pageTitle: product.Title,
  //       path: "/products",
  //     });
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
  Product.findByPk(prodId)
    .then((products) => {
      const product = products;
      if (!product) {
        return res.redirect("/products");
      }
      res.render("shop/product-details", {
        product,
        pageTitle: product.Title,
        path: "/products",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

//Get Products for Home Page
exports.getIndex = (req, res) => {
  Product.findAll()
    .then((products) => {
      res.render("shop/index", {
        prods: products,
        path: "/",
        pageTitle: "Shop",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

//Get Cart Products
exports.getCart = (req, res) => {
  Cart.getCart((cart) => {
    Product.fetchAll((prods) => {
      const cartProducts = [];
      for (product of prods) {
        const cartProductData = cart.products.find(
          (prod) => prod.id === product.id,
        );
        if (cartProductData) {
          cartProducts.push({ productData: product, qty: cartProductData.qty });
        }
      }
      res.render("shop/cart", {
        pageTitle: "Cart",
        path: "/cart",
        products: cartProducts,
      });
    });
  });
};

//Add Product to Cart
exports.postCart = (req, res) => {
  const prodId = req.body.productId;
  Product.getbyId(prodId, (product) => {
    Cart.addProduct(prodId, product.price);
  });
  res.redirect("/cart");
};

//Delete Product from Cart
exports.postCartDeleteProduct = (req, res) => {
  const prodId = req.body.productId;
  Product.getbyId(prodId, (product) => {
    Cart.deleteProduct(prodId, product.price);
    res.redirect("/cart");
  });
};

//Get Checkout Page
exports.getCheckout = (req, res) => {
  res.render("shop/checkout", { pageTitle: "CheckOut", path: "/checkout" });
};

//Get Orders Page
exports.getOrders = (req, res) => {
  res.render("shop/orders", { pageTitle: "Orders", path: "/orders" });
};
