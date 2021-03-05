const router = require('express').Router()
const { 
    createTender, tenderDetails, editTender,
    addVendorToTender, deleteVendorFromTender, listVendors,
    addProductToTender, deleteProductFromTender
} = require('../controllers/tender.controller')

//Admon tenders
router.post('/profile/create-tender', createTender)
router.get('/profile/tender-details/:id', tenderDetails)
router.put('/profile/edit-tender/:id', editTender)

//Admon Vendors on Tenders
router.post('/profile/create-tender/add-vendor/:id', addVendorToTender)
router.delete('/profile/create-tender/delete-vendor/:id', deleteVendorFromTender)
router.get('profile/create-tender/list-vendor', listVendors)

//Admon Products over tender
router.router.post('/profile/create-tender/add-product/:id', addProductToTender)
router.delete('/profile/create-tender/delete-product/:id', deleteProductFromTender)

module.exports = router