import { Router } from "express";
import  CartManager  from "../manager/cartManager.js";




const router = Router()

const cartManager = new CartManager()

router.get('/', async (req, res) => {
    try{
        const carts = await cartManager.getCarts()
        res.send(carts)

    } catch (err) {
        res.status(500).send("Error al obtener los carritos" + err)
    }
})

router.get('/:cid', async (req, res) => {
    const id = parseInt(req.params.cid)
    const cart = await cartManager.getCartById(id)
    res.send(cart)

})

router.post('/', async (req, res) => {
    try {
        const cart = await cartManager.createCart()
        res.send(cart)
    } catch (err) {
        res.status(500).send("Error al crear el carrito" + err)
    }
})


//esta ruta el primero dice que id vamos a modificar el cid y el pid es el id dentro de products el cual agrega quantiti cada vez que machea

router.post('/:cid/product/:pid', async (req, res) => {
 
    try{
        const cid = parseInt(req.params.cid)

        const pid = parseInt(req.params.pid)

        const product = await cartManager.addProductInCart(cid, pid)

        res.send(product)

    } catch (err) {
        
        res.status(500).send("Error al agregar producto al carrito" + err)
    }
})

export default router