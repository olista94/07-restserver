
const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos, validarArchivoSubir } = require('../middlewares');
const { cargarArchivo, actualizarImagen, mostrarImagen } = require('../controllers/uploads');
const { coleccionesPerminitas } = require('../helpers');

const router = Router();

router.post( '/', validarArchivoSubir, cargarArchivo );

router.put( '/:coleccion/:id', [
    validarArchivoSubir,
    check('id', 'El id debe ser de Mongo').isMongoId(),
    check('coleccion').custom( c => coleccionesPerminitas( c, ['usuarios', 'productos'] ) ),
    validarCampos
], actualizarImagen );

router.get('/:coleccion/:id', [
    check('id', 'El id debe ser de Mongo').isMongoId(),
    check('coleccion').custom( c => coleccionesPerminitas( c, ['usuarios', 'productos'] ) ),
    validarCampos
], mostrarImagen )

module.exports = router;
