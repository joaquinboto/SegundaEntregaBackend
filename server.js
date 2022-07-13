const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'));
app.use('/api/productos', require('./src/routes/productos'))
app.use('/api/carrito' , require('./src/routes/carrito'))


app.listen(PORT , () => {
    console.log(`Server corriendo en puerto ${PORT}`)
})