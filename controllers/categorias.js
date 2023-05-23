
const { response } = require("express");
const { Categorta } = require('../models');

const crearCategoria = async (req, res = response) => {

    const nombre = req.body.nombre.toUpperCase();

    const categoriaDB = await Categorta.findOne( { nombre } );

    if ( categoriaDB ) {
        return res.status(400).json( {
            msg: `La categoria ${ categoriaDB.nombre } ya existe`
        } );
    }

    // Generar la data a guardar
    const data = {
        nombre,
        usuario: req.usuario._id
    }

    const categoria = new Categorta( data );

    // Guardar DB
    await categoria.save();

    res.status(201).json( categoria );
}

module.exports = {
    crearCategoria
}
