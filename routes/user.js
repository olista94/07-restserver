
const { Router } = require('express');
const { check } = require('express-validator');
const Role = require('../models/role');

const { validarCampos } = require('../middlewares/validar-campos');

const { usuariosGet,
        usuariosPost, 
        usuariosPut,
        usuariosPatch,
        usuariosDelete } = require('../controllers/usuarios');


const router = Router();

router.get( '/', usuariosGet );

router.put( '/:id', usuariosPut );

router.post( '/', [
    check( 'nombre', 'El nombre es obligatorio' ).not().isEmpty(),
    check( 'password', 'La contraseña debe ser más de 6 caracteres').isLength( { min:6 } ),
    check( 'correo', 'El correo no es valido' ).isEmail(),
    // check( 'rol', 'No es un rol permitido' ).isIn( ['ADMIN_ROLE', 'USER_ROLE'] ),
    check('rol').custom( async( rol = '' ) => {
        const existeRol = await Role.findOne( { rol } );
        if( !existeRol ) {
            throw new Error( `El rol ${ rol } no está registrado en la BD` )
        }
    } ),
    validarCampos
] , usuariosPost );

router.patch( '/', usuariosPatch );

router.delete( '/', usuariosDelete );

module.exports = router;
