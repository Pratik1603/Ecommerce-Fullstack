import express from 'express';
import { getProducts,getProductById,addProduct,updateProduct,deleteProduct } from '../controllers/productController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
const router = express.Router();

router.get('/', getProducts);
router.get('/:id', getProductById);
router.post('/', 
    // authMiddleware,
     addProduct);
router.put('/:id', 
    // authMiddleware, 
    updateProduct);
router.delete('/:id', 
    // authMiddleware, 
    deleteProduct);

export default router;
