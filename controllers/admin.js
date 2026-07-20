const Product=require('../models/product')

exports.getAddProduct=(req,res,next)=>{
    res.render("admin/Add-product",{pageTitle:"Add Product",
        path:"/admin/add-product",
        activeAddProduct: true,
        formsCSS: true,
        productCSS:true
    })
}

exports.postAddProduct=(req,res)=>{
    const product = new Product(req.body.title)
    product.save()
    res.redirect('/')
}

exports.getAdminProducts=(req,res)=>{
    res.render('admin/products',{pageTitle:'Admin Products',path:'/admin/products'})
}