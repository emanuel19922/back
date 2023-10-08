const fs = require('fs');


class ProductManager {
    #priceRevenue
    constructor(path) {
        this.path = path;
        this.products = []

        this.#priceRevenue = 0.15

    }


    //Validacion para que el codigo no se repita
    validateCode = (code) => {

        return this.products.some((product) => product.code === code)

    }




    //creo el producto

    //agrego 1 producto
    getAddProducts = async (title, description, price, thumbnail, code, stock) => {


        const getProducts = await this.getProducts();

        const product = {
            id: (this.products.length - 1) + 1,
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        }


        //Valido que no se repita el codigo

        if (this.validateCode(code)) return console.log("El producto ya existe")



        //Valido que haya ingresadotodos los campos ya que son obligatorios

        if (!title || !description || !price || !thumbnail || !code || !stock) {

            return console.log("falta parametro")

        }

        getProducts.push(product)

        try {

            await fs.promises.writeFile(this.path, JSON.stringify(getProducts, null, "\t"));

        }
        catch (error) {

            return error
        }



    }
    //con este metodo  lo llamamos en en getaddproducts para que me lea si existe un json y si es asi me devuelve parseado la informacion

    getProducts = async () => {
        try {

            const products = await fs.promises.readFile(this.path, 'utf-8');

            return this.products = JSON.parse(products)

        } catch (error) {

            return this.products;
        }


    }





    //Muestro 1 producto buscando el id dentro del array
    getProductById = async (id) => {

        const getProducts = await this.getProducts();

        const producto = getProducts.find((producto) => producto.id == id);

        producto ? console.log(producto) : console.log("Not Found")

    }



    // busco por id y  modifico 

    updateProduct = async (id, title, description, price, thumbnail, code, stock) => {

        const getProducts = await this.getProducts();


        // const productss = await fs.promises.readFile(this.path, 'utf-8');


        const producto = getProducts.filter((producto) => producto.id == id);





        for (const product of producto) {

            const productModified = {
                id: product.id,
                title: title,
                description: description,
                price: price,
                thumbnail: thumbnail,
                code: code,
                stock: stock
            }
            //busco en el array y modifico agregandole el producto modificado

            this.products[id] = productModified

            try {
                const productModifiedJson = fs.promises.writeFile(this.path, JSON.stringify(this.products, null, "\t"))

            } catch (error) {
                return console.log(error)

            }




        }


    }

    deletProduct = async (id) => {

        const getProducts = await this.getProducts();

        const producto = getProducts.filter((producto) => producto.id !== id);

        this.products = producto

        try {

            const productModifiedJson = fs.promises.writeFile(this.path, JSON.stringify(this.products, null, "\t"))

        } catch (error) {

            console.log(error)

        }





    }


}





//creo la instancia de la clase
const productManager = new ProductManager('./products.json')
productManager.getAddProducts("producto prueba", "dfdfdf", 200, "Sin imagen", "abc12dd3", 25)
productManager.getAddProducts("producto prueba", "dfdfdf", 200, "Sin imagen", "abc12ddxx3", 25)

//productManager.updateProduct(1,"producto nuevo","producto nuevo", 200, "Sin imagen", "sssssss", 25)

// productManager.deletProduct(0)

//Re//alizo las pruebas


// node ProductManager.js