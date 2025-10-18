import productModel from "../models/productModel.js";


export const createProduct = async (req, res) => {
  const { name, description, price, image, category,sizes } = req.body;
  try {
    const createdProduct = await productModel.create({
      name,
      description,
      price,
      image,
      category,
      sizes,
    });
    res
      .status(201)
      .json({ message: "Product created successfully!", createdProduct });
  } catch (error) {
    console.error("Create Product Error:", error);
    res.status(500).json({ message: "Server error", error });
  }
};


export const readProduct = async (req, res) => {
  try {
    const products = await productModel.find();
    res
      .status(200)
      .json({ message: "Products fetched successfully!", products });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const readSingleProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const readSingleProduct = await productModel.findById(id);
    if (!readSingleProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res
      .status(200)
      .json({ message: "Product fetched successfully!", readSingleProduct });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedProduct = await productModel.findByIdAndDelete(id);
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res
      .status(200)
      .json({ message: "Product deleted successfully!", deletedProduct });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, description, price, image, category ,sizes} = req.body;
  try {
    const updatedProduct = await productModel.findByIdAndUpdate(
      id,
      {
        name,
        description,
        price,
        image,
        category,
        sizes,
      },
      { new: true }
    );
    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res
      .status(200)
      .json({ message: "Product updated successfully!", updatedProduct });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};


