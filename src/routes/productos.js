const {Router} = require('express')
const router = Router()
const Factory = require('../dao/main')
const DAO = Factory()


router.get('/' , async (req , res) => {
    res.send(await DAO.products.getAll())
})

router.get('/:id' , async (req , res) => {
    
    const id = Number(req.params.id)
    if (isNaN(id)) {
        return res.status(404).send(`El valor debe ser un numero`)
    }
    if (id < 1 ) {
        return res.status(404).send(`El parametro debe ser mayor a 0`)
    }

    if (id > await DAO.products.getAll().length)
     {
        return res.status(404).send(`El ${id} esta fuera de rango`)
     }

     return res.send(await DAO.products.getByID(id))
})

router.put('/:id' , async (req, res) => {
    const { name , cantidad , img , precio } = req.body
    const id = req.params.id
    if (name && cantidad && img && precio) {
        await DAO.products.editById(req.body , id)
        res.send('Objeto editado correctamente')
    }
    else{
        res.status(500).send('Se necesitan todos los datos')
    }
})

router.put('/' , (req, res) => {
    const { name , cantidad , img , precio } = req.body
    const { id } = req.body
    DAO.products.editById(req.body , id)
    res.send({
        mensaje: "Ok"
    })
})

router.post('/' , (req , res) => {
    DAO.products.save(req.body)
    res.send({mensaje: 'Added product'})
})


router.delete('/:id' , (req, res) => {
    const id = req.params.id
    DAO.products.deleteByID(id)
    res.send({mensaje: 'Product removed'})
})


module.exports = router