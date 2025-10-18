import express from 'express';
import { createCart,  deleteCart,  readCart } from '../controller/cartController.js';
import { auth } from '../middleware/auth.js';
const router = express.Router();

router.post('/create' , createCart)
router.get('/read', auth(),  readCart)
router.delete('/delete/:id', auth(), deleteCart)


export default router;