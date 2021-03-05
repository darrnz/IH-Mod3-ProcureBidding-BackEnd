const router = require('express').Router()
const { 
    createProduct, listProducts, editProduct
} = require('../controllers/products.controller')

router.post('/create-product', createProduct)
router.get('/list-products', listProducts)
router.post('/edit-product/:id',editProduct)

module.exports = router