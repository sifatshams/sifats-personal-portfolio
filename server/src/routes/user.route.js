import express from 'express';
import {
  deleteAccount,
  updateProfile,
} from '../controllers/user.controller.js';
import { getSettingsController } from '../controllers/users/settings.controller.js';
import { protect } from '../middlewares/auth.middleware.js';
import { upload } from '../middlewares/upload.middleware.js';

const userRoute = express.Router();

// get all user data
userRoute.get('/settings', protect, getSettingsController);

userRoute.put('/profile', protect, upload.single('avatar'), updateProfile);

// delete acc
userRoute.delete('/account', protect, deleteAccount);

export default userRoute;
