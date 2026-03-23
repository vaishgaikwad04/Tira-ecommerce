import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import connectedToDb from './config/db.js';

import authRoutes from './routes/authRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import productRoutes from './routes/productRoutes.js'
import cartRoutes from './routes/cartRoutes.js'
import paymentRoutes from './routes/paymentRoutes.js'
import useRoutes from './routes/useRoutes.js'
import likesRoutes from './routes/likesRoutes.js'


dotenv.config();

const app = express();

// CORS configuration
const corsOptions = {
    origin: 'https://courageous-mandazi-96928f.netlify.app',
    credentials: true,
};
app.use(cors(corsOptions));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


// Connect to MongoDB
connectedToDb();

// Route
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/product', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api', paymentRoutes);
app.use('/api', useRoutes);
app.use('/api', likesRoutes);


// Server listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
