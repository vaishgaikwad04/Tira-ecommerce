import express from 'express';
import { readProduct, readSingleProduct , category, } from '../controller/productController.js';
const router = express.Router();


router.get('/read', readProduct);
router.get('/read/:id', readSingleProduct);
router.get('/category/:category', category);

export default router;