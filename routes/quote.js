const router = require('express').Router()
const { createQuote, deleteQuote, editQuote, quoteDetails,
    addProductToQuote, deleteProductFromQuote} = require('../controllers/quote.controller')


//RUTAS PARA SIGUIENTES MODULOS
/* router.post('/profile/:idTender/create-quote', createQuote)
router.delete('/profile/:idTender/:idQuote/delete',deleteQuote)
router.put('/profile/:idTender/:idQuote/edit', editQuote)
router.get('/profile/:idTender/:idQuote', quoteDetails)
router.post('/profile/:idTender/:idQuote/add-product',addProductToQuote)
router.delete('/profile/:idTender/:idQuote/:idProdQuote', deleteProductFromQuote) */

module.exports = router

