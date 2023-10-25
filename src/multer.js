import express from "express";

import multer from 'multer'

const app = express()


app.use(express.json())


const storage = multer.diskStorage({

    destination: function (req, file, cd) {

        cd( null, 'src/public')// donde se aloja

    },

    filename: function (req, file, cd) {

        cd(null, file.originalname) //como se llama el archivo 

    }

})

const uploder = multer({ storage })


app.use('/static', express.static( 'src/public' )) // este lo leee


app.post('/', uploder.single('ema'), (req, res) => { // este lo guarda 
    if (!req.file) {
        return res.status(500).send('not file')
    }
    console.log(req.file)
    res.send("file")
})

app.get('/', (req, res) => {
    res.send("hola")
})


app.listen(8080, () => { console.log("corriendo") })
//nodemon src/multer.js