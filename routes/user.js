const router = require('express').Router()
const { 
    listVendors,listAdminDetails,
    purchaserDetails, vendorDetails
} = require('../controllers/user.controller')

router.get('/list-vendors', listVendors)
router.get('/admin-details', listAdminDetails)
router.get('/profile/vendor',vendorDetails)
router.get('/profile/pruchaser', purchaserDetails)

module.exports = router