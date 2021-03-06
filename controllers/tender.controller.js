const Product = require('../models/Product.model')
const User = require('../models/User.models')
const Tender = require('../models/Tender.model')
const ProductTender = require('../models/ProductTender.model')

/* //Admon tenders
router.post('/profile/create-tender', createTender) ok
router.get('/profile/tender-details/:id', tenderDetails)
router.get('/profile/user-tenders/', listUserTender)
router.put('/profile/edit-tender/:id', editTender)

//Admon Vendors on Tenders
router.post('/profile/create-tender/add-vendor/:id', addVendorToTender)
router.delete('/profile/create-tender/delete-vendor/:id', deleteVendorFromTender)
router.get('profile/create-tender/list-vendor', listVendors)

//Admon Products over tender
router.post('/profile/create-tender/add-product/:id', addProductToTender)
router.delete('/profile/create-tender/delete-product/:id', deleteProductFromTender)

} */

//Admon routes Tender General

exports.createTender = async(req, res, next) => {
    let loggedId = '604313ae962e0f2382b5fac9'
    try {
        let newTender = await Tender.create({...req.body})
        await User.findByIdAndUpdate(loggedId, { $push: { idTender: newTender._id}})
        await Tender.findByIdAndUpdate(newTender._id, { $push: { idPurchaser: loggedId}})
        res.status(201).json(newTender)
    } catch (err) {
        next(err)
    }
}


exports.listUserTender = async(req, res, next) => {
    let loggedId = '604313ae962e0f2382b5fac9'
    try {
       //const toPopulate = [ { path: 'projects', populate: { path: 'architects' } } ]
        let listTender = await User.findById(loggedId).populate('idTender idProducts')
        console.log(listTender)
        res.json(listTender)
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
