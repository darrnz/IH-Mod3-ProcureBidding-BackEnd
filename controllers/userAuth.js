const User = require('../models/User.models')
const bcrypt = require('bcrypt')
const { validationResult } = require('express-validator')
const jwt = require("jsonwebtoken")
 
exports.crearUsuario = async (req, res) => {
    console.log(req.body)
    // Revisar si hay errores
    const errores = validationResult(req)
    
    if(!errores.isEmpty()){
        return res.status(400).json({errores: errores.array()}) 
    }
    console.log(req.body)
    // EXTRAER EMAIL Y PASSWORD
    const { email, password } = req.body
    console.log(password)
    try {
        // Revisar que el usuario registrado sea único
        let usuario = await User.findOne({email})
        
        if(usuario){
            return res.status(400).json({msg: "El usuario ya existe" })
        }

        // guardar el nuevo usuario
        usuario = new User(req.body)
        console.log(usuario.password)
        // Hashear el password
        const salt = await bcrypt.genSalt(10)
        usuario.password = await bcrypt.hash(password, salt)

        // Guardar usuario
        await usuario.save()

        // CREAR JWT
        const payload = {
            usuario: {
                id: usuario.id 
            }
        }

        // FIRMAR EL JWT
        jwt.sign(payload, process.env.SECRETA, {
            expiresIn: 360000
        }, (error, token) => {
            if(error) throw error

            // Mensaje de confirmación
            res.json({token}) 

        })


    } catch(error){
        console.log(error)
        res.status(400).send("Hubo un error") 
    }
}