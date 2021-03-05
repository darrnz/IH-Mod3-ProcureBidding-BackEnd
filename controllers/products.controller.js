const Product = require('../models/Product.model')
const User = require('../models/User.models')

/* exports.signin = (req, res, next) => {
    const { password } = req.body
    console.log(password)
    
    User.register({...req.body }, password)
        .then(user => res.status(201).json({ user }))
        .catch(err => res.status(500).json( { err }))
} */
exports.createProduct = async(req, res, next) => {
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
        await Product.find({})
    } catch (err) {
        next(err) 
    }
}

/* exports.productDetails = async(req, res, next) => {
    const id = req.params.id;
    try {
        
    } catch (err) {
        next(err)
    }

} */

exports.editProduct = async(req, res, next) => {
    const id = req.params.id;
    try {
        let editedProduct = Product.findByIdAndUpdate(id, 
            { $set: { ...req.params } }, { new:true});
        res.status(201).json(editedProduct)
    } catch (err) {
        next(err)
    }
}

/* exports.deleteProduct = async(req, res, next) => {
    const id = req.params.id
    try {
        let deletedProduct = await Product.findByIdAndRemove(id);
        res.status(200).res.json(deletedProduct)
    } catch (err) {
        next(err)
    }
} */