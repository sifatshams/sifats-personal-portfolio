
import Product from '../models/Product.model.js';
import mediaService from '../services/media.service.js';

export const createProduct = async (req, res, next) => {
  try {
    const files = req.files;
    let imagesArray = [];

    // if img already here then update service
    if (files && files.length > 0) {
      imagesArray = await mediaService.uploadMultipleImages(files, 'products');
    }

    // create new product
    const newProduct = await Product.create({
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      images: imagesArray,
      createdBy: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: 'Product created successfully!',
      data: newProduct,
    });
  } catch (error) {
    next(error);
  }
};
