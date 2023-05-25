
const { response } = require("express");
const { ObjectId } = require('mongoose').Types;

const { Usuario, Categoria, Producto } = require('../models')

const coleccionesPemitidas = [
    'categorias',
    'productos',
    'roles',
    'usuarios'
];

const buscarUsuarios = async( termino = '', res = response) => {

    const esMongID = ObjectId.isValid( termino );

    if ( esMongID ) {
        const usuario = await Usuario.findById( termino );

        res.json( {
            results: ( usuario ) ? [ usuario ] : []
        } );
    }

    const regex = new RegExp( termino, 'i' )

    const usuarios = await Usuario.find( { 
        $or: [ { nombre: regex, estado: true }, { correo: reg, estado: true } ],
        $and: [ { estado: true } ]
     } );

    res.json( {
        results: usuarios
    } );
}

const buscarCategorias = async( termino = '', res = response) => {

    const esMongID = ObjectId.isValid( termino );

    if ( esMongID ) {
        const categoria = await Categoria.findById( termino );

        res.json( {
            result: ( categoria ) ? [ categoria ] : []
        } );
    }

    const regex = new RegExp( termino, 'i' )

    const categorias = await Categoria.find( { nombre: regex, estado: true } );

    res.json( {
        results: categorias
    } );
}

const buscarProductos = async( termino = '', res = response) => {

    const esMongID = ObjectId.isValid( termino );

    if ( esMongID ) {
        const producto = await Producto.findById( termino ).populate( 'categoria', 'nombre' );

        res.json( {
            result: ( producto ) ? [ producto ] : []
        } );
    }

    const regex = new RegExp( termino, 'i' )

    const productos = await Producto.find( { nombre: regex, estado: true } )
                            .populate( 'categoria', 'nombre' );

    res.json( {
        results: productos
    } );
}

const buscar = ( req, res = response ) => {

    const { coleccion, termino } = req.params;

    if ( !coleccionesPemitidas.includes( coleccion ) ){
        return res.status(400).json( {
            msg: `Las colecciones permitas son: ${ coleccionesPemitidas }`
        } )
    }

    switch ( coleccion ) {
        case 'usuarios':
            buscarUsuarios( termino, res );
            break;
        case 'categorias':
            buscarCategorias( termino, res );
            break;
        case 'productos':
            buscarProductos( termino, res );
            break;
        default:
            res.status(500).json( {
                msg: 'Es busqueda no esta implentada'
            } )
    }

}

module.exports = {
    buscar
}
