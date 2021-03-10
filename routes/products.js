const router = require('express').Router()
const mongoose = require('mongoose')
const { 
    createProduct, listProducts, editProduct
} = require('../controllers/products.controller')
const auth = require('../middleware/auth')

router.post('/create-product', auth, createProduct)//ok
router.get('/list-products', listProducts)
router.post('/list-products/edit/:id',editProduct)

module.exports = router