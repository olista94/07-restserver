
const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');

const usuariosGet = async(req = request, res = response) => {
    
    const { limite = 5, desde = 0 } = req.query;
    const usuarios = await Usuario.find()
        .skip( Number( desde ) )
        .limit( Number (limite ) );

    res.json( usuarios );
}

// Crear usuarios
const usuariosPost = async(req, res) => {
    
    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario( { nombre, correo, password, rol } );

    // Encriptar contraseña
    const salt = bcryptjs.genSaltSync(); // Vueltas de encriptacion hash (por defecto son 10)
    usuario.password = bcryptjs.hashSync( password, salt );

    // Guardar en BD
    await usuario.save();

    res.json( usuario );
}

// Editar usuarios
const usuariosPut = async(req, res) => {

    const { id } = req.params;
    const { _id, password, google, correo, ...resto } = req.body;

    if ( password ) {
        // Encriptar contraseña
        const salt = bcryptjs.genSaltSync(); // Vueltas de encriptacion hash (por defecto son 10)
        resto.password = bcryptjs.hashSync( password, salt );
    }

    const usuario = await Usuario.findByIdAndUpdate( id, resto );

    res.json( usuario );
}

const usuariosPatch = (req, res) => {
    res.json( {
        msj: 'patch API - usuariosPatch'
    } );
}

const usuariosDelete = (req, res) => {
    res.json( {
        msj: 'delete API - usuariosDelete'
    } );
}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
}