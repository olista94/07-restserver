
const express = require('express');
const cors = require('cors');

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

        // CORS
        this.app.use( cors() );

        // Directorio poublico
        this.app.use( express.static('public') )
    }

    routes() {

        this.app.use( '/api/users', require('../routes/user') );
    }

    listen(){

        this.app.listen( this.port, () => {
            console.log( 'Servidor corriendo en puerto', this.port );
        } );
    }
}


module.exports = Server;