const Product=require('../models/product')
const path = require('../util/path')

exports.getProducts=(req,res,next)=>{
    Product.fetchAll(products=>{
        res.render('shop/product-list',{prods:products,
            path:'/products',
            pageTitle:"All Products",
            hasProducts: products.length>0,
            activeShop: true,
            productCSS: true,
            layout: false
        })
    })
}

exports.getIndex=(req,res)=>{
        Product.fetchAll(products=>{
        res.render('shop/index',{prods:products,
            path:'/',
            pageTitle:"Shop"
        })
    })
}

exports.getProductsList=(req,res)=>{
    res.render('shop/product-details.ejs',{pageTitle:'Product Details',path:'/product'})
}

exports.getCart=(req,res)=>{
    res.render('shop/cart',{pageTitle:'Cart',path:'/cart'})
}


exports.getCheckout=(req,res)=>{
    res.render('shop/checkout',{pageTitle:'CheckOut',path:'/checkout'})
}

