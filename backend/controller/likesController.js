import likesModel from "../models/likesModel.js";

export const likeProduct = async (req, res) => {
  const {  productId } = req.params;
const{userId } = req.body;
  try {
    const existingLike = await likesModel.findOne({ productId,userId });

    if (existingLike) {
      await likesModel.deleteOne({ productId,userId });
      return res.status(200).json({ message: "Product unliked." });
    } else {
      const newLike = await likesModel.create({
        productId ,
        userId
      });
      return res.status(201).json({ message: "Product liked.", like: newLike });
      console.log(newLike)
    }

  } catch (error) {
    return res.status(500).json({ message: "An error occurred.", error: error.message });
  }
};


export const fetchLikeProduct = async (req, res) => {
  const { userId } = req.params;

  try {
    const likedProducts = await likesModel.find({ userId }).populate('productId');
    res.status(200).json({
      message: 'Liked products fetched successfully!',
      likedProducts,
    });
  } catch (error) {
    return res.status(500).json({
      message: "An error occurred while fetching liked products.",
      error: error.message,
    });
  }
};

export const deleteLike = async (req, res) => {
  const { productId } = req.params;

  try {
    const deletedProduct = await likesModel.findByIdAndDelete(productId);

    if (!deletedProduct) {
      return res.status(404).json({
        message: 'Product like not found.',
      });
    }

    res.status(200).json({
      message: 'Deleted product like successfully!',
      deletedProduct,
    });
  } catch (error) {
    return res.status(500).json({
      message: "An error occurred while deleting the liked product.",
      error: error.message,
    });
  }
};
