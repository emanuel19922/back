import { Router } from "express";
import { uploader } from "../multer.utils.js";
import productManager from '../manager/ProductManager.js'



const router = Router()



const newPoductManager = new productManager()

router.get('/', async (req, res) => {



  try {

    const limit = req.query.limit

    const produ = await newPoductManager.getProducts(limit)

    return res.send(produ)

  } catch (error) {

    console.log(error)

  }

})


router.get('/:pid', async (req, res) => {

  try {

    const productfilter = req.params.pid

    const produ = await newPoductManager.getProductById(productfilter)

    if (!produ) return res.send("error")

    res.send(produ)

  } catch (error) {

    console.log(error)

  }

})


router.post('/', uploader.single('thumbnail'),async  (req, res) => {

  try {

    // if (!req.file) {

    //   res.status(500).send("subir foto")
     
    // }
  
    const productsBody = req.body
  

    const products = await newPoductManager.addProducts(productsBody)
  
    res.send(products)
  
    
  } catch (error) {
     console.log(error)
  }

 

})

//modificacion
router.put('/pid',  uploader.single('thumbnail'), async (req,res)=>{

  try {

 const productsId = parseInt(req.query.id)

 const productPost = req.body

  if(req.file){

 productPost.thumbnail = `http://localhost:8080/images/${req.file.originalname}`

 }

 const product = await  newPoductManager.updateProduct(productsId,productPost)
 
res.status(200).send("cargado")
    
  } catch (error) {
    
  }

})

router.delete('/:id', async (req, res) => {
  try{
      const id = parseInt(req.params.id)

      const productEliminated = await newPoductManager.deletProduct(id)
      console.log(productEliminated)

      res.send(productEliminated)
  } catch (err) {
      res.status(500).send("Error al querer eliminar el producto: " + err)
  }
})





export default router;