const ContenedorMongo = require('../../contenedores/ContenedorMongoDb')
const Model = require('../../../models/productModel')

class ProductsMongoDAO extends ContenedorMongo {
    constructor() {
        super(Model, 'mongodb://localhost:27017/products')
    }
}

module.exports = ProductsMongoDAO