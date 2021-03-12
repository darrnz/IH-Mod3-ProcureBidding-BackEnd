const Product = require('../models/Product.model')
const User = require('../models/User.models')
const Tender = require('../models/Tender.model')
const ProductTender = require('../models/ProductTender.model')
const Quote = require('../models/Quote.model')

//Admon routes Tender General

exports.createTender = async(req, res, next) => {
    const { loggedId } = req.body //idcomprador
    try {
        let newTender = await Tender.create({...req.body})
        await User.findByIdAndUpdate(loggedId, { $push: { idTender: newTender._id}})
        await Tender.findByIdAndUpdate(newTender._id, { $push: { idPurchaser: loggedId}, $set: { status: "open"}})
        res.status(201).json(newTender)
    } catch (err) {
        next(err)
    }
}


exports.listUserTender = async(req, res, next) => {
    const { loggedId } = req.params
    
    try {
        let listTender = await User.findById(loggedId).populate('idTender')
        
        res.json(listTender)
    } catch (err) {
        next(err)
    }
}

exports.tenderDetails = async(req, res, next) => {
    const { idTender } = req.params
    
    try {
        const toPopulate = [ { path: 'idVendor', populate: { path: 'idVendor' } } ]
        let showTender = await Tender.findById(idTender).populate(toPopulate)
        res.status(201).json(showTender)
    } catch (err) {
        next(err)
    }
}

exports.editTender = async(req, res, next) => {
    const id = req.params.id
    
    try {
        let editTender = await Tender.findByIdAndUpdate(id, { $set:{  ...req.body } } , { new:true })
        res.status(201).json(editTender)
    } catch (err) {
        next(err)
    }
}

exports.tenderWinner = async(req, res, next) => {
    let { id } = req.params
    let  idWinner  = '604482b7764a4754a9888cc3' ///req.body mandar al gnador en el body
    
    try {
        const winner = await Tender.findByIdAndUpdate(id, { $push: { idWinnerQuote: idWinner }, $set: { status: "closed"} })
        await User.findByIdAndUpdate(idWinner, { $push: { winnedTenders: id}})
        await Quote.findByIdAndUpdate(idWinner, { $set: { winner: true}})
        res.json(winner)
    } catch (err) {
        next(err)
    }
}

//Admon routes for Vendors on Tender
exports.addVendorToTender = async(req, res, next) => {
    const { tenderID, idVendor } = req.params

    try {
        let updatedTen = await Tender.findByIdAndUpdate(tenderID, { $push: { idVendor: idVendor } })
        let updatedUser = await User.findByIdAndUpdate(idVendor, { $push: { idTender: tenderID} })
        res.status(201).json(updatedUser)
    } catch (err) {
        next(err)
    }
}

exports.deleteVendorFromTender = async(req, res, next) => {
    const { tenderID, idVendor } = req.params
    
    try {
        let updatedTen = await Tender.findByIdAndUpdate(tenderID, { $pull: { idVendor: idVendor } })
        let updatedUser = await User.findByIdAndUpdate(idVendor, { $pull: { idTender: tenderID} })
        res.status(201).json(updatedUser)
    } catch (err) {
        next(err)
    }
}

//Admon routes for Products on Tender

exports.addProductToTender = async(req, res, next) => {
    const  {idTender}  = req.params
    
    const { tenderProducts } = req.body
    
    try {
        
        updatedNew = await Tender.findByIdAndUpdate(idTender, { $set: { tenderProducts: req.body} }, { new:true })
        res.status(201).json(updatedNew)
    } catch (err) {
        next(err)
    }
}

exports.deleteProductFromTender = async(req, res, next) => {
    const { deleteidPTender, id } = req.params
   
    try {
        await Tender.findByIdAndUpdate(id, { $pull: { idProductsTender: deleteidPTender } }) 
        let deleteProdTen = await ProductTender.findByIdAndDelete(deleteidPTender)
        
        res.status(201).json('Successfully deleted product!')
    } catch (err) {
        next(err)
    }
}
