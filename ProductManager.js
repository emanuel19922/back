class ProductManager {
    #priceRevenue
    constructor() {

        this.products = []
        this.#priceRevenue = 0.15

    }


    //Validacion para que el codigo no se repita
    validateCode = (code) => {

        return this.products.some((product) => product.code === code)

    }

    eliminarcode = (code) => {
        
        return this.products.splice(code, 1)

    }

    //muestro los priductos
    getProducts = () => {

        console.log(this.products)

    }

    //agrego 1 producto
    getAddProducts = (title, description, price, thumbnail, code, stock) => {

        //Valido que no se repita el codigo

        this.validateCode(code) && console.log("El producto ya existe")



        //Valido que haya ingresadotodos los campos ya que son obligatorios

        if (!title || !description || !price || !thumbnail || !code || !stock) {

            return this.eliminarcode(code)

        }

this.#priceRevenue

        const product = {
            id: this.products.length + 1,
            title,
            description,
            price:this.#priceRevenue +1,
            thumbnail,
            code,
            stock
        }


        //Agrego el producto al array
        this.products.push(product)


    }


    //creo el producto


    //Muestro 1 producto buscando el id dentro del array
    getProductById = (id) => {
        const producto = this.products.find((producto) => producto.id == id);

        producto ? console.log(producto) : console.log("Not Found")

    }


}

//creo la instancia de la clase
const productManager = new ProductManager()
console.log(productManager)

//Realizo las pruebas
productManager.getProducts()
productManager.getAddProducts("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25)
 productManager.getProducts()
 productManager.getAddProducts("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25)
 productManager.getAddProducts()
productManager.getAddProducts("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc124", 25)
productManager.getProducts()
 productManager.getProductById(1)
 productManager.getProductById(2)
 productManager.getProductById(4)
 productManager.getProductById(4)
//"producto prueba", "", 200, "Sin imagen", "abc124", 25  node ProductManager.js