const Product = require('../models/Product.model')
const User = require('../models/User.models')
const Tender = require('../models/Tender.model')
const ProductTender = require('../models/ProductTender.model')

/* exports.signin = (req, res, next) => {
    const { password } = req.body
    console.log(password)
    
    User.register({...req.body }, password)
        .then(user => res.status(201).json({ user }))
        .catch(err => res.status(500).json( { err }))
} */

//Admon routes Tender General

exports.createTender = async(req, res, next) => {
    try {
        let newTender = await Tender.create({...req.body})
        await User.findByIdAndUpdate(loggedId, { $push: { idTender: newTender._id}})
        await Tender.findByIdAndUpdate(newTender._id, { $push: { idCreator: loggedId}})
        res.status(201).json(newTender)
    } catch (err) {
        next(err)
    }
}

exports.tenderDetails = async(req, res, next) => {
    const id = req.params.id
    try {
        let showTender = await Tender.findBy(id)
        res.status(201).json(showTender)
    } catch (err) {
        next(err)
    }
}

exports.editTender = async(req, res, next) => {
    const id = req.params.id
    try {
        let editTender = await Tender.findByIdAndUpdate(id, { ...req.params }, { new:true })
        res.status(201).json(editTender)
    } catch (err) {
        next(err)
    }
}

//Admon routes for Vendors on Tender
exports.addVendorToTender = async(req, res, next) => {
    const id = req.params.id
    const idVendor = req.body.idVendor
    try {
        await Tender.findByIdAndUpdate(id, { $push: { idVendor: idVendor } })
        await User.findByIdAndUpdate(idVendor, { $push: { idTender: id} })
        res.status(201).json('Successfully added vendor!')
    } catch (err) {
        next(err)
    }
}

exports.deleteVendorFromTender = async(req, res, next) => {
    const id = req.params.id
    const idVendor = req.body.idVendor
    try {
        await Tender.findByIdAndUpdate(id, { $pull: { idVendor: idVendor } })
        await User.findByIdAndUpdate(idVendor, { $pull: { idTender: id} })
        res.status(201).json('Successfully deleted vendor!')
    } catch (err) {
        next(err)
    }
}

exports.listVendors = async(req, res, next) => {
    const id = req.params.id
    try {
        let listVendors = await User.find({ role:'Vendors' })
        res.status(201).json(listVendors)
    } catch (err) {
        next(err)
    }
}


//Admon routes for Products on Tender

exports.addProductToTender = async(req, res, next) => {
    const id = req.params.id
    const productId = req.body.productId
    try {
        let newTenderProd = await ProductTender.create({...req.body})
        await Tender.findByIdAndUpdate(id, { $push: { idProductsTender: newTenderProd._id } })
        await ProductTender.findByIdAndUpdate(newTenderProd._id, { $push: { idTender: id, idCreator: loggedId, idProduct: productId} })
        res.status(201).json('Successfully added product!')
    } catch (err) {
        next(err)
    }
}

exports.deleteProductFromTender = async(req, res, next) => {
    const id = req.params.id
    const productId = req.body.productId
    try {
        let newTenderProd = await ProductTender.create({...req.body})
        await Tender.findByIdAndUpdate(id, { $pull: { idProductsTender: newTenderProd._id } })
        await ProductTender.findByIdAndUpdate(newTenderProd._id, { $pull: { idTender: id, idCreator: loggedId, idProduct: productId} })
        res.status(201).json('Successfully deleted product!')
    } catch (err) {
        next(err)
    }
}
