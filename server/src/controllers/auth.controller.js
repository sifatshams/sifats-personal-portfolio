// @ts-nocheck
import cookieOptions from '../config/cookie.config.js';
import User from '../models/User.model.js';
import { logActivity } from '../services/admin/activity.service.js';
import authService from '../services/auth.service.js';
import { uploadToCloudinary } from '../utils/cloudinaryUpload.util.js';
import { sendOtpEmail } from '../utils/email.util.js';
import generateToken from '../utils/jwt.util.js';
import { generateOTP, getOtpExpiry } from '../utils/otp.util.js';

// @ts-ignore
export const registerController = async (req, res, next) => {
  try {
    const userData = req.body;
    const file = req.file;

    // call the service
    const user = await authService.registerService(userData, file);

    // success response with updated fields including the new profileImage object
    res.status(201).json({
      success: true,
      message: 'User registered successfully. Please verify your email!',
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        isEmailVerified: user.isEmailVerified,
        profileImage: user.profileImage,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @ts-ignore
const verifyEmailController = async (req, res, next) => {
  try {
    const { token } = req.params;
    // find user
    const user = await User.findOne({
      emailVerificationToken: token,
      emailVerificationExpire: { $gt: Date.now() },
    });
    // if user not here
    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or expire verification link!',
      });
    }

    user.isEmailVerified = true;
    user.emailVerificationToken = null;
    user.emailVerificationExpire = null;
    // now save on db
    await user.save();

    // success response
    res.status(200).json({
      success: true,
      message: 'Email verified successfully. You can login now!',
    });
  } catch (error) {
    next(error);
  }
};

export const loginController = async (req, res, next) => {
  try {
    const { email, password, rememberMe } = req.body;

    // call the service layer to fetch user data
    const user = await authService.loginService(email);

    // validate credentials using schema methods
    if (!user || !(await user.matchPassword(password))) {
      return res
        .status(401)
        .json({ success: false, message: 'Invalid credentials!' });
    }

    // check account status constraint
    if (!user.isActive) {
      return res.status(403).json({
        success: false,
        message: 'Your account has been deactivated!',
      });
    }

    // enforce email verification constraint
    if (!user.isEmailVerified) {
      return res.status(403).json({
        success: false,
        message: 'Please verify your email first!',
      });
    }

    // generate token
    const token = generateToken(
      {
        id: user._id,
        role: user.role,
      },
      rememberMe,
    );

    // track state transitions by logging administrative actions
    if (user.role === 'admin') {
      await logActivity({
        type: 'login',
        action: 'login',
        title: 'Admin Login',
        description: `${user.name} logged into the admin dashboard.`,
        entityId: user._id,
        entityType: 'user',
      });
    }

    // dynamic cookie expiration configuration 14 days vs 7 days
    const currentCookieOptions = {
      ...cookieOptions,
      maxAge: rememberMe ? 14 * 24 * 60 * 60 * 1000 : 7 * 24 * 60 * 60 * 1000,
    };

    // return authentication credentials and complete image metadata array
    res
      .cookie('token', token, currentCookieOptions)
      .status(200)
      .json({
        success: true,
        message: 'User logged in successfully!',
        token,
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          isEmailVerified: user.isEmailVerified,
          avatar: user.avatar,
          profileImage: user.profileImage,
        },
      });
  } catch (error) {
    next(error);
  }
};

// logout user controller
const logoutController = async (req, res, next) => {
  try {
    // clear the cookie
    res.clearCookie('token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });

    // extra security
    res.setHeader('Clear-Site-Data', '"cookies", "storage", "cache"');

    // success response
    res.status(200).json({
      success: true,
      message: 'User successfully logged out and session cleared!',
    });
  } catch (error) {
    next(error);
  }
};

// otp send controllers
const sendOtpController = async (req, res, next) => {
  try {
    const { email } = req.body;

    // call the service
    const user = await authService.sendOtpService({ email });
    console.log(user);

    // generate the 6 digit otp
    const otp = generateOTP();
    const otpExpire = getOtpExpiry();

    user.otp = otp;
    user.otpExpire = otpExpire;

    // save on db
    await user.save();

    // send otp email
    await sendOtpEmail(email, user.name, otp);

    // success response
    res.status(200).json({
      success: true,
      message: `A verification code has been sent to your email!`,
    });
  } catch (error) {
    next(error);
  }
};

// verify otp
const verifyOtpController = async (req, res, next) => {
  try {
    // call the service
    const result = await authService.verifyOtpService(req.body);

    // success response
    res.status(200).json({
      success: true,
      message: 'OTP verified successfully. You can now reset your password!',
    });
  } catch (error) {
    next(error);
  }
};

// reset pass controller
const resetPasswordController = async (req, res, next) => {
  try {
    const { email, newPassword } = req.body;

    // call the service
    await authService.resetPasswordService({ email, newPassword });

    // success response
    res.status(200).json({
      success: true,
      message: 'Password reset successfully. You can login now!',
    });
  } catch (error) {
    next(error);
  }
};

// get user profile
const getProfileController = async (req, res, next) => {
  try {
    const user = req.user;
    console.log(user);

    // success response
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};

// update logged in user data
const updateUserProfileController = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { name, email, password, phone } = req.body;

    // read existing profileImage from body if sent, otherwise keep it null
    let profileImageData = req.body.profileImage
      ? JSON.parse(req.body.profileImage)
      : undefined;

    // check and handle file upload via memory buffer
    if (req.file) {
      const cloudinaryResult = await uploadToCloudinary(
        req.file.buffer,
        'user_profiles',
      );
      // format to match { url, publicId } structure
      profileImageData = {
        url: cloudinaryResult.url,
        publicId: cloudinaryResult.publicId,
      };
    }

    // trigger profile update service
    const updateUser = await authService.updateUserProfileService(userId, {
      name,
      email,
      password,
      phone,
      profileImage: profileImageData,
    });

    if (!updateUser) {
      return res
        .status(404)
        .json({ success: false, message: 'User not found!' });
    }

    res.status(200).json({
      success: true,
      message: 'Profile settings updated successfully!',
      data: updateUser,
    });
  } catch (error) {
    next(error);
  }
};

const authController = {
  registerController,
  verifyEmailController,
  loginController,
  sendOtpController,
  verifyOtpController,
  resetPasswordController,
  logoutController,
  getProfileController,
  updateUserProfileController,
};

export default authController;
