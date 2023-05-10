
const { response } = require('express');

const usuariosGet = (req, res = response) => {
    
    res.json( {
        msj: 'get API - usuariosGet'
    } );
}

const usuariosPut = (req, res) => {
    res.status(500).json( {
        msj: 'put API - usuariosPut'
    } );
}

const usuariosPost = (req, res) => {
    res.status(201).json( {
        msj: 'post API - usuariosPost'
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