
const { response, json } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');

const { generarJWT } = require('../helpers/generar-jwt');
const { googleVerify } = require('../helpers/google-verify');
const usuario = require('../models/usuario');

const login = async(req, res = response) => {

    const { correo, password } =  req.body;

    try {
        const usuario = await Usuario.findOne( { correo } );

        // Si email existe
        if ( !usuario ) {
            return res.status(400).json( {
                msg: 'Usuario / Password no son correctos - password: incorrecta'
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
        const token = await generarJWT( usuario.id );

        res.json( {
           usuario, 
           token
        } );

    } catch (error) {
        console.log( error );
        return res.status(500).json( {
            msg: 'Hable con el administrador'
        } )
    }
}

const googleSigIn = async( req, res = response ) => {
    
    const { id_token } = req.body;

    try {

        const { nombre, img, correo } = await googleVerify( id_token );

        let usuario = await Usuario.findOne( { correo } );

        if ( !usuario ) {
            const data = {
                nombre,
                correo,
                password: ':P',
                img,
                google: true
            };

            usuario = new Usuario( data );
            await usuario.save();
        }

        // Si el usuario esta activo en la BD
        if ( !usuario.estado ) {
            return res.status(401).json( {
                msg: 'Hable con el Administrador - Usuario bloqueado'
            } )
        }

        // Generar el JWT
        const token = await generarJWT( usuario.id );

        res.json( {
            usuario,
            token
        } );

    } catch ( error ) {
        json.status(400).json( {
            ok: false,
            msg: 'El token no se pudo verificar'
        } )
    }
    
}

module.exports = {
    login,
    googleSigIn
}
