const ContenedorArchivo = require('../../contenedores/ContenedorArchivo')


class ProductsArchivoDAO extends ContenedorArchivo {


    constructor() {
        super('productos.json')
    }

}

module.exports = ProductsArchivoDAO