import mongoose from 'mongoose';

const likesSchema = new mongoose.Schema(
  {
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
  },
  { timestamps: true } 
);
likesSchema.index({ userId: 1, productId: 1 }, { unique: true });

const likesModel = mongoose.model('Like', likesSchema); 

export default likesModel;
