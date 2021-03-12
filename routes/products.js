const router = require('express').Router()
const mongoose = require('mongoose')
const { 
    createProduct, listProducts, editProduct
} = require('../controllers/products.controller')
const auth = require('../middleware/auth')

router.post('/create-product', auth, createProduct)//ok
router.get('/list-products', listProducts)



module.exports = router

//RUTAS PARA SIGUIENTES MODULOS
/* router.post('/list-products/edit/:id',editProduct) */