import express from 'express';
import { upload } from '../middlewares/upload.middleware.js';
import { createProduct } from '../controllers/product.controller.js';
// import { protect, restrictTo } from '../middlewares/auth.middleware.js'; // যদি প্রোটেকশন থাকে

const productRoute = express.Router();

// শুধু অ্যাডমিনরা প্রোডাক্ট তৈরি করতে পারবে (যদি তোমার auth মিডলওয়্যার থাকে)
// router.post('/', protect, restrictTo('admin'), upload.array('productImages', 5), createProduct);

// simple root
productRoute.post('/', upload.array('productImages', 5), createProduct);

export default productRoute;