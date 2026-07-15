import express from 'express';
import authController from '../controllers/auth.controller.js';
import { protect } from '../middlewares/auth.middleware.js';
import { upload } from '../middlewares/upload.middleware.js';
import validate from '../middlewares/validation.middleware.js';
import {
  loginValidator,
  registerValidator,
  resetPasswordValidator,
  sendOtpValidator,
  verifyOtpValidor,
} from '../validators/auth.validator.js';

const authRoute = express.Router();

// register user
authRoute.post(
  '/register',
  upload.single('avatar'),
  registerValidator,
  validate,
  authController.registerController,
);

// verify email
authRoute.get('/verify-email/:token', authController.verifyEmailController);

// login user
authRoute.post(
  '/login',
  loginValidator,
  validate,
  authController.loginController,
);

// logout user
authRoute.post('/logout', protect, authController.logoutController);

// send reset pass otp
authRoute.post(
  '/send-reset-otp',
  sendOtpValidator,
  validate,
  authController.sendOtpController,
);

// verify reset pass otp
authRoute.post(
  '/verify-reset-otp',
  verifyOtpValidor,
  validate,
  authController.verifyOtpController,
);

// reset password
authRoute.post(
  '/reset-password',
  resetPasswordValidator,
  validate,
  authController.resetPasswordController,
);

/* 
  ? Protected routes
*/
// get user profile
authRoute.get('/profile', protect, authController.getProfileController);

// update user profile
authRoute.put(
  '/update-profile',
  protect,
  upload.single('avatar'),
  authController.updateUserProfileController,
);

export default authRoute;
