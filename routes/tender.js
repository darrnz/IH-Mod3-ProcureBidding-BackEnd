const router = require('express').Router()
const { 
    createTender, tenderDetails, editTender, listUserTender,
    tenderWinner, addVendorToTender, deleteVendorFromTender, listVendors,
    addProductToTender, deleteProductFromTender
} = require('../controllers/tender.controller')

//Admon tenders
router.post('/profile/create-tender', createTender)
router.get('/profile/tender-details/:idTender', tenderDetails)
router.get('/profile/user-tenders/', listUserTender)
router.put('/profile/edit-tender/:id', editTender)
router.put('/profile/tender-details/:id/', tenderWinner)
//Admon Vendors on Tenders
router.put('/profile/create-tender/:id/add-vendor', addVendorToTender)
router.delete('/profile/create-tender/:id/delete-vendor', deleteVendorFromTender)


//Admon Products over tender
router.post('/profile/create-tender/:idTender/add-product', addProductToTender)
router.delete('/profile/create-tender/:idTender/:deleteidPTender', deleteProductFromTender)

module.exports = router