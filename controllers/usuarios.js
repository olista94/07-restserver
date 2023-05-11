
const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');

const usuariosGet = (req = request, res = response) => {
    
    const { q, nombre = "No name", apikey, page = 1, limit } = req.query;

    res.json( {
        msj: 'get API - usuariosGet',
        q,
        nombre,
        apikey,
        page,
        limit
    } );
}

const usuariosPost = async(req, res) => {
    
    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario( { nombre, correo, password, rol } );

    // Verificar si correo existe
    const existeMail = await Usuario.findOne( { correo } );
    if ( existeMail ){
        return res.status(400).json( {
            msg: 'Ese correo ya esta registrado'
        } );
    }

    // Encriptar contraseña
    const salt = bcryptjs.genSaltSync(); // Vueltas de encriptacion hash (por defecto son 10)
    usuario.password = bcryptjs.hashSync( password, salt );

    // Guardar en BD
    await usuario.save();

    res.json( {
        usuario
    } );
}

const usuariosPut = (req, res) => {

    const id = req.params.id;

    res.json( {
        msj: 'put API - usuariosPut',
        id
    } );
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