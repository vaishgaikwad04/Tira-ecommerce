import express from 'express';
import { deleteLike, fetchLikeProduct, likeProduct } from '../controller/likesController.js';
const router = express.Router();

router.post('/likes/:productId',likeProduct);
router.get('/likeProducts/:userId', fetchLikeProduct);
router.delete('/likes/delete/:productId', deleteLike);

export default router;