
const { response, request } = require('express');

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

const usuariosPost = (req, res) => {
    
    const { nombre, edad } = req.body;
    
    res.json( {
        msj: 'post API - usuariosPost',
        nombre,
        edad
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