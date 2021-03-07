const Product = require('../models/Product.model')
const User = require('../models/User.models')
const Tender = require('../models/Tender.model')
const ProductTender = require('../models/ProductTender.model')
const Quote = require('../models/Quote.model')
const ProductQuote = require('../models/ProductQuote.model')

//crear, editar det
/* 
router.post('/profile/:idTender/create-quote', createQuote) ok
router.delete('/profile/:idTender/:idQuote/delete',deleteQuote) ok
router.put('/profile/:idTender/:idQuote/edit', editQuote) ok
router.get('/profile/:idTender/:idQuote', quoteDetails)
router.post('/profile/:idTender/:idQuote/add-product',addProductToQuote) OK
router.delete('/profile/:idTender/:idQuote/:idProdQuote', deleteProductFromQuote) OK
*/
//Admon for Quotes
exports.createQuote = async(req, res, next) => {
    let loggedVendor = '6043b82b86599407cb99bd00' // id vendor req.body?
    let { idTender } = req.params //id de la tender a la que se le hara la coti
    try {
        let newQuote = await Quote.create({ ...req.body })
        await User.findByIdAndUpdate(loggedVendor, { $push: { idQuote: newQuote._id } })
        await Quote.findByIdAndUpdate(newQuote._id, { $push: { idVendor: loggedVendor, idTender: idTender}})
        await Tender.findByIdAndUpdate(idTender, { $push: { idQuote: newQuote._id }})
        res.json(newQuote)
    } catch (error) {
        next(error)
    }
}

exports.deleteQuote = async(req, res, next) => {
    let loggedVendor = '6043b82b86599407cb99bd00' // req.body?
    let { idQuote, idTender } = req.params //id del quote a eleminar
    try {
        await User.findByIdAndUpdate(loggedVendor, { $pull: { idQuote: idQuote } })
        await Tender.findByIdAndUpdate(idTender, { $pull: { idQuote: idQuote }})
        await Quote.findByIdAndDelete(idQuote)
        res.json('Cotización eliminada exitosamente')
    } catch (error) {
        next(error)
    }
}

exports.editQuote = async(req, res, next) => {
    let { idQuote } = req.params //id del quote a eleminar
    
    try {
        await Quote.findByIdAndUpdate( idQuote, { $set: { ...req.body } }, { new: true })
        res.json('Editaste exitosamente')
    } catch (error) {
        next(error)
    }
}

exports.quoteDetails = async(req, res, next) => {
    let { idTender, idQuote} = req.params

    try {
        const showQuote = await Quote.findById(idQuote).populate('idProductQuote')
        res.json(showQuote)
    } catch (error) {
        next(error)
    }
}
//Admon of Products for Quotes

exports.addProductToQuote = async(req, res, next) => {
    const { idQuote, idTender } = req.params
    
    try {
        let newQuoteProd = await ProductQuote.create({ ...req.body })
        await ProductQuote.findByIdAndUpdate(newQuoteProd._id, { $push: { idQuote: idQuote } })
        await Quote.findByIdAndUpdate(idQuote, { $push: { idProductQuote: newQuoteProd._id } })
        res.json('Successfully added product!')
    } catch (err) {
        next(err)
    }
}

exports.deleteProductFromQuote = async(req, res, next) => {
    const { idProdQuote, idQuote, idTender } = req.params
    console.log(req.params)
    try {
        await Quote.findByIdAndUpdate(idQuote, { $pull: { idProductQuote: idProdQuote } }) 
        let deleteProdQuo = await ProductQuote.findByIdAndDelete(idProdQuote)
        console.log(deleteProdQuo)
        res.json('Successfully deleted product!')
    } catch (err) {
        next(err)
    }
}


