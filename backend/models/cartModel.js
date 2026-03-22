import mongoose from 'mongoose';

const cartSchema = mongoose.Schema({
    userId: String,
    productId: String,
    name: String,
    price: Number,
    quantity: {
        type: Number,  // ← Fix: use Number type
        default: 1,
      },
      sizes: String,
      image: {
  type: String,
}
      
})

const cartModel = mongoose.model('Cart', cartSchema);
export default cartModel;