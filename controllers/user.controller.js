const User = require('../models/User.models')

exports.listVendors = async(req, res, next) => {
    try {
        let listVendors = await User.find({ 'role': 'Vendor' })
        
        res.json(listVendors)
    } catch (err) {
        next(err)
    }
}

exports.purchaserDetails = async(req, res, next) => {
    let idLoggedPurchaser = '6043b776affbad07b4f18241'

    try {
        const toPopulate = [ { path: 'idTenders', populate: { path: 'idTenders' } } ]
        const purchaserDetails = await User.findById(idLoggedPurchaser).populate('idTender')
        res.json(purchaserDetails)
    } catch (error) {
        next(error)
    }
}


//RUTAS SIGUIENTES MODULOS
/* exports.vendorDetails = async(req, res, next) => {
    let idLoggedVendor = ''

    try {
        const toPopulate = [ { path: 'idTenders', populate: { path: 'idTenders' } } ]
        const vendorDetails = await User.findById(idLoggedVendor).populate(toPopulate)
        res.json(vendorDetails)
    } catch (error) {
        next(error)
    }
}


exports.listAdminDetails = async(req, res, next) => {
    const { loggedAdmin } = req.body //id del logged admin
    try {
        let listPurchasers = await User.findById(loggedAdmin).populate('idPurcharser')
        res.status(201).json(listPurchasers)
    } catch (err) {
        next(err)
    }
} */