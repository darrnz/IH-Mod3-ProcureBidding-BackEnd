const Product = require('../models/Product.model')
const User = require('../models/User.models')
const Tender = require('../models/Tender.model')
const ProductTender = require('../models/ProductTender.model')
const Quote = require('../models/Quote.model')

/* //Admon tenders
router.post('/profile/create-tender', createTender) ok
router.get('/profile/tender-details/:id', tenderDetails) ok -> revisar como sera el populate
router.get('/profile/user-tenders/', listUserTender) ok -> revisar para imprimir menos info
router.put('/profile/edit-tender/:id', editTender) ok
router.put('/profile/tender-details/:id/:idwinner', tenderWinner)
//Admon Vendors on Tenders
router.post('/profile/create-tender/:id/add-vendor', addVendorToTender) ok
router.delete('/profile/create-tender/:id/delete-vendor', deleteVendorFromTender) ok

//Admon Products over tender
router.post('
', addProductToTender) ok
router.delete('/profile/create-tender/:id/:deleteid', deleteProductFromTender) ok

} */

//Admon routes Tender General

exports.createTender = async(req, res, next) => {
    let loggedId = '6043b776affbad07b4f18241' //idcomprador
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
    let loggedId = '6043b776affbad07b4f18241'
    try {
        let listTender = await User.findById(loggedId).populate('idTender idProductsTender')
        console.log(listTender)
        res.json(listTender)
    } catch (err) {
        next(err)
    }
}

exports.tenderDetails = async(req, res, next) => {
    const { idTender } = req.params
    console.log(req.params)
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
    console.log(req.body, id)
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
    //const vendoWinner = tenders.idQuote
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
    const { idTender } = req.params
    const { idVendor } = req.body
    try {
        let updatedTen = await Tender.findByIdAndUpdate(idTender, { $push: { idVendor: idVendor } })
        let updatedUser = await User.findByIdAndUpdate(idVendor, { $push: { idTender: idTender} })
        res.status(201).json(updatedTen)
    } catch (err) {
        next(err)
    }
}

exports.deleteVendorFromTender = async(req, res, next) => {
    const id = req.params.id
    const { idVendor } = req.body//req.body.idVendor
    try {
        await Tender.findByIdAndUpdate(id, { $pull: { idVendor: idVendor } })
        await User.findByIdAndUpdate(idVendor, { $pull: { idTender: id} })
        res.status(201).json('Successfully deleted vendor!')
    } catch (err) {
        next(err)
    }
}

//Admon routes for Products on Tender

exports.addProductToTender = async(req, res, next) => {
    const  {idTender}  = req.params
    console.log(idTender)
    const { tenderProducts } = req.body
    console.log(req.body)
    try {
        //let newTenderProd = await ProductTender.create({ ...req.body })
        updatedNew = await Tender.findByIdAndUpdate(idTender, { $set: { tenderProducts: req.body} }, { new:true })
        //let updatedNew = await ProductTender.findByIdAndUpdate(newTenderProd._id, { $push: { idTender: idTender, idProduct: idProduct} })
        res.status(201).json(updatedNew)
    } catch (err) {
        next(err)
    }
}

exports.deleteProductFromTender = async(req, res, next) => {
    const { deleteidPTender, id } = req.params
    console.log(req.params)
    try {
        await Tender.findByIdAndUpdate(id, { $pull: { idProductsTender: deleteidPTender } }) 
        let deleteProdTen = await ProductTender.findByIdAndDelete(deleteidPTender)
        console.log(deleteProdTen)
        res.status(201).json('Successfully deleted product!')
    } catch (err) {
        next(err)
    }
}
