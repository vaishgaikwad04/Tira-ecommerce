import useModel from "../models/use.js";

export const createUse = async (req, res) => {
  const { userId, productId, message } = req.body;

  if (!userId || !productId || !message) {
    return res.status(400).json({
      message: 'userId, productId, and message are required.',
    });
  }

  try {
    const createdUse = await useModel.create({ userId, productId, message });

    res.status(201).json({
      message: 'Product review successfully created!',
      data: createdUse,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error creating review',
      error: error.message,
    });
  }
};

import mongoose from 'mongoose';

{/*export const readReviewsByProductId = async (req, res) => {
  const { productId } = req.params;
  const { userId } = req.query; 

  if (!mongoose.Types.ObjectId.isValid(productId)) {
    return res.status(400).json({ message: 'Invalid productId' });
  }

  try {
    const reviews = await useModel
      .find({ productId })
      .populate('userId', 'userName'); 

    res.status(200).json({
      message: 'Reviews fetched successfully',
      data: reviews,
    });

    console.log('reviews:', reviews);

    
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({
      message: 'Error fetching reviews',
      error: error.message,
    });
  }
};*/}



import productModel from '../models/productModel.js';
import authModel from '../models/authModel.js';

export const readReviewsByProductId = async (req, res) => {
  const { productId } = req.params;
  const { userId } = req.query;

  if (!mongoose.Types.ObjectId.isValid(productId)) {
    return res.status(400).json({ message: 'Invalid productId' });
  }

  try {
    const reviews = await useModel.find({ productId })
      .populate('userId', 'email role');

    if (!reviews.length) {
      return res.status(404).json({ message: 'No reviews found' });
    }

    console.log('Reviews:', reviews);
    res.status(200).json({
      message: 'Reviews fetched successfully',
      data: reviews,
    });
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({
      message: 'Error fetching reviews',
      error: error.message,
    });
  }
};

export const deleteReviews = async (req, res) => {
  const { reviewId } = req.params;

  try {
    const deletedReview = await useModel.findByIdAndDelete(reviewId);

    if (!deletedReview) {
      return res.status(404).json({ message: 'Review not found' });
    }

    res.status(200).json({
      message: 'Review deleted!',
      data: deletedReview,
    });
  } catch (error) {
    console.error('Error deleting review:', error);
    res.status(500).json({
      message: 'Error deleting review',
      error: error.message,
    });
  }
};
