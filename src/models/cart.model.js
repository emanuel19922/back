import mongoose from 'mongoose'

const cartSchema = new mongoose.Schema({
    products: {
        type: [
            {
                _id: false,
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'products',
                },
                quantity: Number,
            }
        ],
        default: []
    }
})

cartSchema.pre('findOne', function () {
    this.populate('products.product')
})

const cartModel = mongoose.model('carts', cartSchema)

export default cartModel