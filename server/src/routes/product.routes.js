import express from 'express';
import { upload } from '../middlewares/upload.middleware.js';
import { createProduct } from '../controllers/product.controller.js';
// import { protect, restrictTo } from '../middlewares/auth.middleware.js';

const productRoute = express.Router();

// router.post('/', protect, restrictTo('admin'), upload.array('productImages', 5), createProduct);

// simple root
productRoute.post('/', upload.array('productImages', 5), createProduct);

export default productRoute;