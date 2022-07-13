const ContenedorArchivo = require('../../contenedores/ContenedorArchivo')


class CartArchivoDAO extends ContenedorArchivo {


    constructor() {
        super('carrito.json')
    }

}

module.exports = CartArchivoDAO