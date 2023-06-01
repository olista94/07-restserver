
const validrCampos = require('../middlewares/validar-campos');
const validarJWT = require('../middlewares/validar-jwt');
const validarRoles = require('../middlewares/validar-roles');
const validarArchivo = require('../middlewares/validar-archivo');

module.exports = {
    ...validarArchivo,
    ...validrCampos,
    ...validarJWT,
    ...validarRoles
}
