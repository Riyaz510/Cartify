const express=require('express')

const path=require('path')

const rootDir=require('../util/path')

const router=express.Router()

const adminData=require('./admin')

const shopController=require('../controllers/shop')

router.get('/',shopController.getIndex)

router.get('/products',shopController.getProductsList)

router.get('/cart',shopController.getCart)

router.get('/checkout',shopController.getCheckout)

module.exports=router