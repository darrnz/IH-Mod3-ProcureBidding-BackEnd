const User = require('../models/User.models')
const { createToken } = require('../config/jwt.config')

exports.signin = (req, res, next) => {
    const { password, role} = req.body
    const loggedId = '60430f8353e46a2137797129'
    console.log(req.body)
    if(role === 'Purchaser') {
        User.register({...req.body }, password)
        .then(user => User.findByIdAndUpdate(loggedId, { $push: {idPurcharser: user._id } }))
        .then(user => res.status(201).json({ user }))
        
        .catch(error => res.status(500).json( { error }))
    } else {
        let newUser=  User.register({...req.body }, password)
        .then(user => res.status(201).json({ newUser }))
        .catch(err => res.status(500).json( { err }))
    }

}

exports.login = (req, res, next) => {
    const { user, err } = req
    const [headload, payload, signature] = createToken(user)
    res.cookie('headload', `${headload}.${payload}`, {
        //maxAge: 1000*60*30,
        sameSite: false,
        resave: true,
        saveUninitialized: false,
    })
    res.cookie('signature', signature, {
        httpOnly: true,
        sameSite: false
    })

    res.status(200).json({ user })
}

exports.loggedUser = (req, res, next) => {
    const { user } = req
    res.status(200).json({ user })
}

exports.logout = (req, res, next) => {
    res.clearCookie('headload')
    res.clearCookie('signature')
    res.status(200).json({ msg: 'Successfully logout'})
}