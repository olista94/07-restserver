
const { Router } = require('express');
const { check } = require('express-validator');

// const { validarCampos } = require('../middlewares/validar-campos');
// const { validarJWT } = require('../middlewares/validar-jwt');
// const { esAdminRole, tieneRol } = require('../middlewares/validar-roles');

const { validarCampos, 
        validarJWT, 
        esAdminRole, 
        tieneRol } = require('../middlewares');

const { esRolValido, 
        emailExiste, 
        idUsuarioExiste } = require('../helpers/db-validators');

const { usuariosGet,
        usuariosPost, 
        usuariosPut,
        usuariosPatch,
        usuariosDelete } = require('../controllers/usuarios');

const router = Router();

router.get( '/', usuariosGet );

// Crear usuario
router.post( '/', [
    check( 'nombre', 'El nombre es obligatorio' ).not().isEmpty(),
    check( 'password', 'La contraseña debe ser más de 6 caracteres').isLength( { min:6 } ),
    check( 'correo').custom( emailExiste ),
    check('rol').custom( esRolValido ),
    validarCampos
], usuariosPost );

//
router.put( '/:id', [
    check( 'id', 'No es un ID válido' ).isMongoId(),
    check( 'id' ).custom( idUsuarioExiste ),
    check('rol').custom( esRolValido ),
    validarCampos
], usuariosPut );

router.delete( '/:id', [
    validarJWT,
    // esAdminRole,
    tieneRol('ADMIN_ROLE', 'VENTAS_ROLE'),
    check( 'id', 'No es un ID válido' ).isMongoId(),
    check( 'id' ).custom( idUsuarioExiste ),
    validarCampos
], usuariosDelete );

router.patch( '/', usuariosPatch );

module.exports = router;
