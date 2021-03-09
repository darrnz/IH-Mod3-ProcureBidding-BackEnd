// RUTAS PARA CREAR USUARIOS
const express = require('express')
const router = express.Router()
const usuarioController = require('../controllers/userAuth')
const {check} = require('express-validator')

// CREA UN USUARIO
// api/usuarios
router.post('/', 
    [
        check("companyName", "El nombre es obligatorio").not().isEmpty(),
        check("email", "Agrega un email válido").isEmail(),
        check("password", "El password debe ser mínimo de 6 caracteres").isLength({min: 4})
    ], 
    usuarioController.crearUsuario)

module.exports = router