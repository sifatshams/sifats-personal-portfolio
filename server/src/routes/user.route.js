import express from 'express';
import {
  deleteAccount,
  updateProfile,
} from '../controllers/user.controller.js';

import { protect } from '../middlewares/auth.middleware.js';
import { upload } from '../middlewares/upload.middleware.js';

const userRoute = express.Router();

/**
 * @route   PUT /api/users/profile
 * @desc    Update user profile data and single avatar image
 * @access  Private (Both Admin & User)
 */
userRoute.put('/profile', protect, upload.single('avatar'), updateProfile);

/**
 * @route   DELETE /api/users/account
 * @desc    Delete user account and clean up assets from Cloudinary
 * @access  Private (Both Admin & User)
 */
userRoute.delete('/account', protect, deleteAccount);

export default userRoute;
