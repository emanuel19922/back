import { Router } from "express";
import productManager from '../dao/manager/ProductManager.js'
import { uploader } from "../multer.utils.js";





const router = Router()

const newPoductManager = new productManager()


router.get('/',async (req, res) => {


const  products = await newPoductManager.getProducts()


  res.render('home' ,{products})

})
//llamar a la funcion para agregar productos y para eliminalor usando sockect emit y socket on 


router.get('/realTimeProducts', async (req, res) => {
  try {
      const products = await newPoductManager.getProducts()


      res.render('realTimeProducts', { products })

  } catch (error) {
     
      res.status(500).json({ error: error })
  }
})

// router.post('/realTimeProducts', async (req, res) => {
//   try {
//       const products = await newPoductManager.getProducts()
// console.log(products)
      
//       const allProducts = await newPoductManager.addProducts(req.body)


//       res.render('realTimeProducts', { products })

//   } catch (error) {
     
//       res.status(500).json({ error: error })
//   }
// })




export default router