import express from 'express';
import { createUse, readReviewsByProductId , deleteReviews } from '../controller/useController.js';
const router = express.Router();
import {auth } from '../middleware/auth.js'

router.post('/create',auth(), createUse);
router.get('/read/:productId', auth(), readReviewsByProductId )
router.delete('/delete/:reviewId', deleteReviews);


export default router;