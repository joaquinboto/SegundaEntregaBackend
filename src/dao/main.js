const ProductsMongoDAO = require('./Productos/ProductsMongoDAO')
const ProductsMemoryDAO = require('./Productos/ProductsMemoriaDAO')
const ProductsArchivoDAO = require('./Productos/ProductsArchivoDAO')
const CartMongoDAO = require('./Cart/CartMongoDAO')
const CartMemoryDAO = require('./Cart/CartMemoriaDAO')
const CartArchivoDAO = require('./Cart/CartArchivoDAO')

require('dotenv').config()

const FactortyDAO = () => {
    switch(process.env.TYPE_DB){
        case 'mongo':
            console.log('servidor en mongo')
            return {
                products: new ProductsMongoDAO(),
                cart: new CartMongoDAO()
            }
        case 'memory':
            console.log('servidor en memoria')
            return {
                products: new ProductsMemoryDAO(),
                cart: new CartMemoryDAO()
            }
        case 'file':
            console.log('servidor en archivo')
            return {
                products: new ProductsArchivoDAO(),
                cart: new CartArchivoDAO()
            }
    }

}

module.exports = FactortyDAO