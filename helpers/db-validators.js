
// const categoria = require('../models/categoria');
const Role = require('../models/role');
const { Usuario, Categoria, Producto } = require('../models');

const esRolValido = async( rol = '' ) => {

    const existeRol = await Role.findOne( { rol } );
    if( !existeRol ) {
        throw new Error( `El rol ${ rol } no está registrado en la BD` )
    }
}

const emailExiste = async( correo = '' ) => {
    
    // Verificar si correo existe
    const existeMail = await Usuario.findOne( { correo } );
    if ( existeMail ){
        throw new Error( `El correo ${ correo } ya esta registrado` );
    }
}

const idUsuarioExiste = async( id ) => {
    
    // Verificar si correo existe
    const existeId = await Usuario.findById( id );
    if ( !existeId ){
        throw new Error( `El id ${ id } no existe` );
    }
}

/**
 * Categorias
 */
const existeCategoriaPorId = async( id ) => {
    
    // Verificar si categoria existe
    const existeCategoria = await Categoria.findById( id );
    if ( !existeCategoria ){
        throw new Error( `El id ${ id } no existe` );
    }
}

/**
 * Productos
 */
const existeProductoPorId = async( id ) => {
    
    // Verificar si producto existe
    const existeProducto = await Producto.findById( id );
    if ( !existeProducto ){
        throw new Error( `El id ${ id } no existe` );
    }
}

module.exports = {
    esRolValido, 
    emailExiste,
    idUsuarioExiste, 
    existeCategoriaPorId,
    existeProductoPorId
}
