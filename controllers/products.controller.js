const mongoose = require('mongoose')
const Product = require('../models/Product.model')
const User = require('../models/User.models')

/* 
router.post('/create-product', createProduct) ok
router.get('/list-products', listProducts) ok
router.post('/list-products/edit/:id',editProduct) -> REvisar
} */
exports.createProduct = async(req, res, next) => {
    
    let  {idCreator } = req.body //id purchaser creador
    try {
        let newProduct = await Product.create({ ...req.body })
        await Product.findByIdAndUpdate(newProduct._id, { $push: { idCreator: idCreator } }) //id del user:comprador/Creador 
        await User.findByIdAndUpdate(idCreator, { $push: { idProducts: newProduct._id } })
        res.status(201).json(newProduct)
    } catch (err) {
        next(err)
    }
}

exports.listProducts = async(req, res, next) => {
    try {
        const productList = await Product.find({})
        res.status(200).json(productList)
    } catch (err) {
        next(err) 
    }
}


//RUTAS PARA SIGUIENTES MODULOS

/* exports.productDetails = async(req, res, next) => {
    const id = req.params.id;
    try {
        
    } catch (err) {
        next(err)
    }

} */

/* exports.editProduct = async(req, res, next) => {
    console.log(req.body)
    const {id} = req.params.id;
    let {id} = '60431955c8471427b076c28c'
    console.log(id)
    try {
        Product.findByIdAndUpdate(id, 
            { $set: { ...req.body } } , { new:true});
        res.status(200).json('ok')
    } catch (err) {
        next(err)
    }
} */

/* exports.deleteProduct = async(req, res, next) => {
    const id = req.params.id
    try {
        let deletedProduct = await Product.findByIdAndRemove(id);
        res.status(200).res.json(deletedProduct)
    } catch (err) {
        next(err)
    }
} */