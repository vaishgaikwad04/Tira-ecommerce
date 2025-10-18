import express from 'express';
import { checkAuth, getUserId, loginUser, logoutUser, registerUser } from '../controller/authController.js';
import { auth } from '../middleware/auth.js';
const router = express.Router();

router.post('/register', registerUser);
router.post('/login',loginUser);
router.post('/logout',auth(['user','admin']), logoutUser);
router.get('/getUserId', auth(['user','admin']), getUserId);
router.get('/checkAuth', checkAuth);

export default router;