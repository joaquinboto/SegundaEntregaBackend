const ContenedorMongo = require('../../contenedores/ContenedorMongoDb')
const Model = require('../../../models/cartModel')

class CartMongoDAO extends ContenedorMongo {
    constructor() {
        super(Model, 'mongodb://localhost:27017/cart')
    }
}

module.exports = CartMongoDAO