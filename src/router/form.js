import Router  from "express"




 const router = Router()

router.post('/',(req,res)=>{


    console.log(req.body)

res.send(req.body)

})

 export default router