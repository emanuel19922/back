import express from 'express'
import prouctRoutes from './router/products.routes.js'


import routepets from './router/carts.routes.js'


const app = express()



//const newPoductManager = new productManager('./products.json')

app.use(express.json())

app.use(express.urlencoded({ extended: true }))
app.use(express.static('./src/public'))


app.use('/api/products' ,prouctRoutes)// esta es la que no me lee
app.use('/api/carts', routepets)



app.listen(8080, () => {

  console.log("servidor corriendo ")

})



//nodemon src/app.js  http://127.0.0.1:8080/products  // 