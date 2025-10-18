import express from 'express';
const router = express.Router();
import { createProduct, deleteProduct, readProduct, readSingleProduct, updateProduct} from '../controller/adminController.js';

router.post('/create', createProduct);
router.get('/', readProduct);
router.get('/:id', readSingleProduct);
router.delete('/delete/:id', deleteProduct);
router.put('/update/:id', updateProduct);


export default router;