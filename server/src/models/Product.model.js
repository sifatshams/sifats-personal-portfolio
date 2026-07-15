import mongoose from 'mongoose';

// create product schema
const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Product title is required.'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Product description is required.'],
    },
    price: {
      type: Number,
      required: [true, 'Product price is required.'],
    },
    images: [
      {
        url: String,
        publicId: String,
      },
    ],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true, versionKey: false },
);

const Product = mongoose.model('Product', productSchema);

export default Product;
