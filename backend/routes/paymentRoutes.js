import express from 'express';
import { payment } from '../controller/payementController.js';
const router = express.Router();

router.post('/create-checkout-session' , payment)

export default router;