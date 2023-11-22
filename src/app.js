import express from 'express'
import prouctRoutes from './router/products.routes.js'
import routepets from './router/carts.routes.js'
import handlebars from 'express-handlebars'
import viewsRouter from './router/views.js'
import register from './router/form.js'
import __dirname from './utils.js'
import { Server } from 'socket.io'
import mongoose from "mongoose"

const app = express()


app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/view')
app.set('view engine', 'handlebars')





//para que leea los metods post
app.use(express.json())
app.use(express.urlencoded({ extended: true }))




//pagina estatica o principal en ruta principal sin / solo http://127.0.0.1:8080
app.use('/static', express.static(__dirname + '/public'))




app.use('/api/products', prouctRoutes)
app.use('/api/carts', routepets)

app.use('/home', viewsRouter)

//app.use('/form', register)



const url ='mongodb+srv://emanuel01992:Emanuel@cluster0r2.d0kpl78.mongodb.net/'
// aca nombre de la base de datos "mibasededatos"
// y en user models va ell nombre de la colecion 
mongoose.connect(url,{dbName:'ecommerce'})
.then(()=>{
    console.log("connect")

})
.catch(()=>{
    console.log("Err")
})

const hhttpServer = app.listen(8080, () => console.log("servidor corriendo "))

export const  socketServer = new Server(hhttpServer)

socketServer.on('connection', socket => {



  socket.on('productList', data => {


    socketServer.emit('allproducts', data)

  })



})












//nodemon src/app.js  http://127.0.0.1:8080/products  // 