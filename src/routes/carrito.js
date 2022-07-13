const {Router} = require('express')
const router = Router()
const Factory = require('../dao/main')
const DAO = Factory()


router.get('/' , async (req, res) => {
    res.send(await DAO.cart.getAll())
})

router.post('/' , async (req , res) => {
    const carrito = {...req.body , ... {productos: []}}
    
    res.json(await DAO.cart.save(carrito))
})

router.post('/:id/productos' , async (req , res) => {
    const id = req.params.id // enviando parametro del carrito a buscar
    const product = req.body // obteniendo datos del producto
    const cart = await DAO.cart.getByID(id) //obteniendo el carrito
    cart.productos.push(product) //ingresando el nuevo producto al arreglo del carrito
    const newObj = await DAO.cart.editById(cart , id) 
    res.send(newObj)
})

router.delete('/:id' , async (req , res) => {
    const id = req.params.id
    const carrito = DAO.cart.getByID(id)
    await DAO.cart.deleteByID(carrito.id)
    res.send(`Carrito con el ${id} eliminado`)
})



module.exports = router