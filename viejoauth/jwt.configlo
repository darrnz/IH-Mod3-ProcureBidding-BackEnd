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
    if (!headload || !signature) return res.status(401).json({ error: "You can't access, please try again" })
    jwt.verify(headload + signature, process.env.SECRET, (error, decoded) => {
        if (error) return res.status(401).json({ error: "You can't access, please try again" })
        User.findById(decoded.userId)
            .then(user => {
                req.user = user
                next()
            })
            .catch(error => {
                res.status(401).json({ error })
                next()
            })
    })
}