
// const categoria = require('../models/categoria');
const Role = require('../models/role');
const { Usuario, Categoria } = require('../models');

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

const existeCategoriaPorId = async( id ) => {
    
    // Verificar si actegoria existe
    const existeCategoria = await Categoria.findById( id );
    if ( !existeCategoria ){
        throw new Error( `El id ${ id } no existe` );
    }
}

module.exports = {
    esRolValido, 
    emailExiste,
    idUsuarioExiste, 
    existeCategoriaPorId
}
