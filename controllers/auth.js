
const { response } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');

const login = async(req, res = response) => {

    const { correo, password } =  req.body;

    try {
        const usuario = await Usuario.findOne( { correo } );

        // Si email existe
        if ( !usuario ) {
            return res.status(400).json( {
                msg: 'Usuario / Password no son correctos - passord: incorrecta'
            } );
        }

        // Si usuario actuivo en BD
        if ( !usuario.estado ) {
            return res.status(400).json( {
                msg: 'Usuario / Password no son correctos - estado: false'
            } );
        }

        // Contraseña correcta
        const validPassword = bcryptjs.compareSync( password, usuario.password );
        if ( !validPassword ) {
            return res.status(400).json( {
                msg: 'Usuario / Password no son correctos - password'
            } );
        }

        // Generar JWT

        res.json( {
            msg: 'Login ok'
        } );

    } catch (error) {
        console.log( error );
        return res.status(500).json( {
            msg: 'Hable con el administrador'
        } )
    }
}

module.exports = {
    login
}
