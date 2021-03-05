const jwt = require('jsonwebtoken')
const User = require('../models/User.models')

exports.createToken = (user) => {
    return jwt.sign({
        userId: user._id,
        email: user.email,
        role: user.role
    }, process.env.SECRET, { expiresIn: '24' }).split('.')
}

exports.verifyToken = (req, res, next) => {
    const { headload, signature } = req.cookies
    if(!headload || !signature) {
        return res.status(401).json({ errorMsg: "You can's access, please try again" })
        jwt.verify(headload + signature, process.env.SECRET, (err, decoded) => {
            if(err) {
                return res.status(401).json({ errorMsg: "You can's access, please try again" })
            }
            User.findById(decoded.userId)
            .then(user => {
                req.user = user
                next()
            })
            .catch(err => {
                res.status(401).json({ err })
                next()
            })
        })
    }
}