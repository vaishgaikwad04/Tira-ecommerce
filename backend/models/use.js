import mongoose from 'mongoose';

const useSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Auth',
    required: true,
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  message: {
    type: String,
    required: false,
  },
}, { timestamps: true }); 

const useModel = mongoose.model('Use', useSchema);
export default useModel;
