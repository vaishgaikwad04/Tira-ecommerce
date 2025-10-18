import cartModel from "../models/cartModel.js";

export const createCart = async (req, res) => {
  const { userId, productId, name, price, quantity, sizes } = req.body;

  try {
    const existingCart = await cartModel.findOne({ userId, productId });
   
    if (existingCart) {
      existingCart.quantity = existingCart.quantity + 1; // increment quantity
      await existingCart.save(); // wait for save
      return res.status(200).json({ message: 'Cart quantity updated!', cart: existingCart });
    }

    const createdCart = await cartModel.create({
      userId,
      productId,
      name,
      price,
      quantity,
      sizes,
    });

    res.status(201).json({ message: 'Cart created successfully!', cart: createdCart });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};



  
  export const readCart = async (req, res) => {
    const userId = req.user.id; 
  
    try {
      const cartItems = await cartModel.find({ user_id: userId })
       
  
      if (!cartItems.length) {
        return res.status(404).json({ message: 'No cart items found for this user.' });
      }
  
      res.status(200).json({ cart: cartItems, userId });
    } catch (error) {
      console.error("Error reading cart:", error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  
export const deleteCart = async (req,res) => {
  const {id} = req.params;
  try{
    const deletedProduct =await cartModel.findByIdAndDelete(id);
    res.status(200).json({message:'product deleted sucessfully!'})
  }
  catch(error){
    console.error("Error reading cart:", error);
      res.status(500).json({ message: 'Internal server error' });
  }
}
  
