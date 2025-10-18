import mongoose from 'mongoose';

const productSchema = mongoose.Schema({
   name: String,
   description: String,
   price: Number,
   image: String,
   category: {
      type: String,
      enum: ['ALL', 'NEW', 'DRESSES', 'TOPS', 'BODYSUITES'], // Ensure 'bodysuits' is here
      default:'ALL',
    },
    sizes: {
      type: [String], // This allows an array of sizes
      enum: ["S", "M", "L", "XL", "XXL"], // These are the allowed values
      default: ['XL'],
    },
  

})

const productModel = mongoose.model('Product', productSchema);

export default productModel;