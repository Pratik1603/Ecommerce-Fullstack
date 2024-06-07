import express from 'express';
import cors from 'cors';

import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import bodyParser from 'body-parser';
// import { authMiddleware } from './middlewares/authMiddleware.js';
dotenv.config();

const app = express();
app.use(cors()); // use of cors , for enabling cors
app.use(express.json());

const PORT = process.env.PORT || 6001;
mongoose.connect(process.env.MONGO_URL) // connecting mongodb
.then(() => {
    app.listen(PORT, ()=> console.log(`Server Port: ${PORT}`));
})
.catch((error) => console.log(`${error} did not connect`));

app.get('/', (req, res) => {
    res.send('Server is Running! 🚀');
});

app.use(bodyParser.json());
app.use(cookieParser()); // use of cookie parser
// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);

  // Error middleware
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({
      success: false,
      statusCode,
      message,
    });
});