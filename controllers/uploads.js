
const path = require('path');

const { v4: uuidv4 } = require('uuid');

const { response } = require("express");

const cargarArchivo = (req, res = response) => {


    if  ( !req.files || Object.keys( req.files ).length === 0 || !req.files.archivo ) {
      return res.status(400).send( 'No hay archivos que subir' );
    }

    const { archivo } = req.files;

    const nombreCortado = archivo.name.split('.');

    const extension = nombreCortado[ nombreCortado.length - 1 ];

    // Validar extension
    const extensionesValidas = ['png','jpg','jpeg','gif'].join(', ');

    if ( !extensionesValidas.includes( extension.toLowerCase() ) ) {
        return res.status(400).json( {
            msg: `La extensión ${ extension } no está permitida. Estas son las válidas: ${ extensionesValidas }`
        } )
    }

    const nombreTemp = uuidv4() + '.' + extension;

    const uploadPath = path.join( __dirname, '../uploads/', nombreTemp );
    
    // Use the mv() method to place the file somewhere on your server
    archivo.mv( uploadPath, ( err ) => {
      if ( err )        
        return res.status(500).json( { err } );
    
      res.json( {msg: 'Archivo subido a ' + uploadPath} );
    } );
}

module.exports = cargarArchivo;
