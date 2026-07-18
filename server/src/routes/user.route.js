import express from 'express';
import {
  deleteAccount,
  updateNotificationSettingsController,
  updateProfile,
} from '../controllers/user.controller.js';
import { getSettingsController } from '../controllers/users/settings.controller.js';
import { protect } from '../middlewares/auth.middleware.js';
import { upload } from '../middlewares/upload.middleware.js';
import validate from '../middlewares/validation.middleware.js';
import { updateNotificationSettingsValidator } from '../validators/user.validator.js';

const userRoute = express.Router();

// get all user data
userRoute.get('/settings', protect, getSettingsController);

// update profile
userRoute.put('/profile', protect, upload.single('avatar'), updateProfile);

// delete acc
userRoute.delete('/account', protect, deleteAccount);

/**
 * @route   PATCH /api/users/notification-settings
 * @desc    Update notification settings
 * @access  Private (Both Admin & Users)
 */
userRoute.patch(
  '/notification-settings',
  protect,
  updateNotificationSettingsValidator,
  validate,
  updateNotificationSettingsController,
);

export default userRoute;
