
const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { cargarArchivo, actualizarImagen } = require('../controllers/uploads');
const { coleccionesPerminitas } = require('../helpers');

const router = Router();

router.post( '/', cargarArchivo );

router.put( '/:coleccion/:id', [
    check('id', 'El id debe ser de Mongo').isMongoId(),
    check('coleccion').custom( c => coleccionesPerminitas( c, ['usuarios', 'productos'] ) ),
    validarCampos
], actualizarImagen );

module.exports = router;
