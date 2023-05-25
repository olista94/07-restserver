
const { Router } = require('express');
const { check } = require('express-validator');

const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');

const { actualizarProducto,
        borrarProducto,
        crearProducto, 
        obtenerProducto,
        obtenerProductos } = require('../controllers/productos');

const { existeProductoPorId, existeCategoriaPorId } = require('../helpers/db-validators');

const router = Router();

/**
 * {{url}}/api/productos
 */

// Obtener todos los productos - publico
router.get( '/', obtenerProductos );

// Obtener un producto por id - publico
router.get( '/:id', [
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom( existeProductoPorId ),
    validarCampos,
    ], obtenerProducto );

// Crear producto - privado - cualquier persona con un token valido
router.post( '/', [ 
    validarJWT, 
    check('nombre', 'El nombre es obligatorio').notEmpty(),
    check('categoria', 'No es un id de Mongo válido').isMongoId(),
    check('categoria').custom( existeCategoriaPorId ),
    validarCampos
    ], crearProducto );

// Actualizar producto - privado - cualquiera con token valido
router.put( '/:id', [
    validarJWT,
    // check('categoria', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom( existeProductoPorId ),
    validarCampos
    ], actualizarProducto );

// Borrar un producto - admin
router.delete( '/:id', [
    validarJWT,
    esAdminRole, 
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom( existeProductoPorId ),
    validarCampos
    ], borrarProducto );

module.exports = router;
