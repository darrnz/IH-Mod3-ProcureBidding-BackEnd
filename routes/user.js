const router = require('express').Router()
const { 
    listVendors,listAdminDetails,
    purchaserDetails, vendorDetails
} = require('../controllers/user.controller')

router.get('/list-vendors', listVendors)

router.get('/profile/purchaser', purchaserDetails)


module.exports = router

//RUTAS SEGUNDO MODULO
/* router.get('/admin-details', listAdminDetails) */
/* router.get('/profile/vendor',vendorDetails) */