import express, { json } from 'express'
import productManager from './ProductManager.js'




const app = express()






app.get('/products', async (req, res) => {
 try {

  const newPoductManager = new productManager('./products.json')

  const produ = await newPoductManager.getProducts()

  const limit = req.query.limit

  if (limit) {

    const products = produ.splice(0, limit)

    return res.send(products)

  }

  return res.send(produ)
  
 } catch (error) {

  console.log(error)
  
 }
 

})



app.get('/products/:pid', async (req, res) => {

try {

  const newPoductManager = new productManager('./products.json')

  const produ = await newPoductManager.getProducts()

  const productfilter = req.params.pid

  const productfiltered = produ.filter((e) => e.id == JSON.parse(productfilter))

  res.send(...productfiltered)
  
} catch (error) {

  console.log(error)
  
}

})




app.listen(8080, () => {
  console.log("servidor corriendo ")
})



//nodemon src/app.js  http://127.0.0.1:8080/products  // 