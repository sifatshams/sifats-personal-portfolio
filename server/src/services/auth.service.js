import User from '../models/User.model.js';
import { sendVerificationEmail } from '../utils/email.util.js';
import { generateSecureToken, getTokenExpiry } from '../utils/otp.util.js';
import { logActivity } from './admin/activity.service.js';
import mediaService from './media.service.js';

// @ts-ignore
export const registerService = async (userData, file) => {
  // check if user already exists
  const existingUser = await User.findOne({ email: userData.email });
  if (existingUser) {
    throw new Error('User already exists with this email!');
  }

  // upload image to Cloudinary if a file is provided
  let imageData = null;
  if (file) {
    // uploads directly to the 'user_profiles' folder
    imageData = await mediaService.uploadSingleImage(file, 'user_profiles');
  }

  // generate verification token and expiry (24 hours)
  const verificationToken = generateSecureToken();
  const verificationExpire = getTokenExpiry(24);

  // create new user/admin in the database
  const newUser = await User.create({
    name: userData.name,
    email: userData.email,
    phone: userData.phone || null,
    password: userData.password,
    role: userData.role,
    profileImage: imageData,
    emailVerificationToken: verificationToken,
    emailVerificationExpire: verificationExpire,
  });

  // send verification email
  await sendVerificationEmail(newUser.email, newUser.name, verificationToken);

  // log system activity
  await logActivity({
    type: 'user',
    action: 'registered',
    title: 'New User Registered',
    description: `${newUser.name} created a new account.`,
    entityId: newUser._id,
    entityType: 'user',
  });

  return newUser;
};

// @ts-ignore
const loginService = async (email) => {
  const user = await User.findOne({ email }).select('+password');
  return user;
};

// send otp services
// @ts-ignore
const sendOtpService = async ({ email }) => {
  const user = await User.findOne({ email });
  // if account not found
  if (!user) {
    // @ts-ignore
    const error = new Error('No accound found with this email!');
    // @ts-ignore
    error.statusCode = 404;
    throw error;
  }

  return user;
};

// verify otp
// @ts-ignore
const verifyOtpService = async ({ email, otp }) => {
  const user = await User.findOne({
    email,
    otp,
    otpExpire: { $gt: Date.now() },
  });

  // validation
  if (!user) {
    const error = new Error('Invalid or expire OTP!');
    // @ts-ignore
    error.statusCode = 400;
    throw error;
  }

  user.otp = null;
  user.otpExpire = null;
  user.isOtpVerified = true;

  // save user
  await user.save();

  return user;
};

// reset pass
// @ts-ignore
const resetPasswordService = async ({ email, newPassword }) => {
  // find user
  const user = await User.findOne({ email });

  // validation
  if (!user) {
    const error = new Error('User not found!');
    // @ts-ignore
    error.statusCode = 404;
    throw error;
  }

  if (!user.isOtpVerified) {
    const error = new Error('Please verify OTP first!');
    // @ts-ignore
    error.statusCode = 400;
    throw error;
  }

  // update password
  user.password = newPassword;

  // clear reset related data
  user.otp = null;
  user.otpExpire = null;
  user.isOtpVerified = false;

  // save on db
  await user.save();
  return user;
};

// update logged in user profile
// @ts-ignore
const updateUserProfileService = async (userId, updateData) => {
  // locate client node from database instance
  const user = await User.findById(userId);
  if (!user) {
    throw new Error('User not found!');
  }

  // target fields permitted for profile modifications
  const allowedUpdate = ['name', 'password', 'phone', 'profileImage'];

  // parse incoming keys payload array
  const incomingUpdates = Object.keys(updateData);

  // dynamically map update properties to user model instance
  incomingUpdates.forEach((field) => {
    // update field only if it is allowed and not undefined
    if (allowedUpdate.includes(field) && updateData[field] !== undefined) {
      user[field] = updateData[field];
    }
  });

  // commit operation document onto collections
  const savedUser = await user.save();

  // dispatch system log tracking routine
  await logActivity({
    type: 'user',
    action: 'updated',
    title: 'Profile Updated',
    description: `${savedUser.name} updated profile.`,
  });

  // parse document layer to omit confidential records safely
  const result = savedUser.toObject();
  // @ts-ignore
  delete result.password;

  return result;
};

const authService = {
  registerService,
  loginService,
  sendOtpService,
  verifyOtpService,
  resetPasswordService,
  updateUserProfileService,
};

export default authService;
