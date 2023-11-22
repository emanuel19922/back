const socket = io()


const form = document.querySelector('#form')
const containerPoducts = document.querySelector('#containerPoducts')


form.addEventListener('submit', async (e) => {
    e.preventDefault()

    let products = {
        title: document.querySelector('#title').value,
        description: document.querySelector('#description').value,
        price: document.querySelector('#price').value,
        code: document.querySelector('#code').value,
      //  thumbnail: document.querySelector('#thumbnail'),
        stock: document.querySelector('#stock').value,
    }
    console.log(products.thumbnail)

    

    //  usamos un fetch para poder enviar la data del formulario 
    //pega en el endpoint post de api
    const res = await fetch('/api/products', {
        method: 'POST',
        body: JSON.stringify(products),
        headers: {
            'Content-Type': 'application/json',
        }


    })

    try {
        const resultProducts = await fetch('/api/products')

        const results = await resultProducts.json()

        if (results.status === 'error') {
            throw new Error(results.error)
        } else {
            //soceket emit para enviar prod en realtmie
            socket.emit('productList', results)


            document.querySelector('#title').value = ""
            document.querySelector('#description').value = ""
            document.querySelector('#price').value = ""
            document.querySelector('#code').value = ""
            document.querySelector('#thumbnail').value  = ""
                document.querySelector('#stock').value = ""
        }


    } catch (error) {
        console.log(error)

    }


})



const deleteProduct = async (id) => {

    try {
        //enviamos  con el metodo delet a api/products recivimos y enviamos con emit a ppp.js para que haga la carla en vivo
        const res = await fetch(`/api/products/${id}`, {

            method: 'DELETE'

        })

        const result = await res.json()

        if (result.status === 'error') throw new Error(result.error)
        else socket.emit('productList', result.res)


    } catch (error) {
        console.log(error)
    }


}



socket.on('allproducts', data => {
    containerPoducts.innerHTML = ""

    data.map(element => {
        containerPoducts.innerHTML += ` 
        <br>${element.id}<br>
           <br>${element.title}<br>
           <img  src="${element.thumbnail}" alt="" />
           <br>${element.description}<br>
           <br>${element.price}<br>
           <br>${element.code}<br>
           <br>${element.stock}<br>
       
           <button id="btnDelet" onclick="deleteProduct(${element.id}) "> eliminar </button>
           
           `
    });


})



