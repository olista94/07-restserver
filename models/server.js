
const express = require('express');

class Server {

    constructor() {

        this.app  = express();
        this.port = process.env.PORT;

        // Middelware
        this.middelwares();
        // Rutas de mi aplicacion
        this.routes();
    }

    middelwares() {

        // Directorio poublico
        this.app.use( express.static('public') )
    }

    routes() {

        this.app.get( '/api', (req, res) => {
            res.json( {
                msj: 'get API'
            } );
        } );

        this.app.put( '/api', (req, res) => {
            res.status(400).json( {
                msj: 'put API'
            } );
        } );

        this.app.post( '/api', (req, res) => {
            res.status(201).json( {
                msj: 'post API'
            } );
        } );

        this.app.delete( '/api', (req, res) => {
            res.json( {
                msj: 'delete API'
            } );
        } );
    }

    listen(){

        this.app.listen( this.port, () => {
            console.log( 'Servidor corriendo en puerto', this.port );
        } );
    }
}


module.exports = Server;