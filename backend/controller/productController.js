import productModel from "../models/productModel.js";

export const readProduct = async (req,res) => {
    try{
        const readProduct = await productModel.find();
        res.status(200).json({message:'product read sucessfully!', readProduct});
    }catch(error){
        res.status(500).json({message:'server err', error});
    }

}

export const readSingleProduct = async (req,res) => {
    const {id} = req.params;
    try{
        const readSingle = await productModel.findById(id);
        res.status(200).json({message:'product read sucessfully!', readSingle});
    }catch(error){
        res.status(500).json({message:'server err', error});
    }

}


export const category = async (req, res) => {
    const { category } = req.params;
  
    try {
      const categories =
        category === "ALL"
          ? await productModel.find()
          : await productModel.find({
              category: { $regex: new RegExp(`^${category}$`, "i") },
            }); // case-insensitive exact match
  
      res.status(200).json({ categories });
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  };
  
  

 