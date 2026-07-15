import { body } from 'express-validator';
import User from '../models/User.model.js';

export const registerValidator = [
  // name
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required!')
    .isLength({ min: 2, max: 50 })
    .withMessage('Name must be 2-50 characters!'),

  // email
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required!')
    .isEmail()
    .withMessage('Please enter a valid email!')
    .normalizeEmail({
      gmail_remove_dots: false,
    })
    .custom(async (email) => {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        throw new Error('Email already exists with this email!');
      }
      return true;
    }),
  // password
  body('password')
    .notEmpty()
    .withMessage('Password is required!')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters!')
    .matches(/[A-Z]/)
    .withMessage('Must contain uppercase!')
    .matches(/[a-z]/)
    .withMessage('Must contain lowercase!')
    .matches(/[0-9]/)
    .withMessage('Must contain number!')
    .matches(/[!@#$%^&*]/)
    .withMessage('Must contain special character!'),
];

// login validatior
export const loginValidator = [
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email required')
    .isEmail()
    .withMessage('Invalid email'),

  body('password').notEmpty().withMessage('Password required'),
];

// send otp validator
export const sendOtpValidator = [
  body('email').isEmail().withMessage('Please enter a valid email!'),
];

// verify otp validator
export const verifyOtpValidor = [
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required!')
    .isEmail()
    .withMessage('Please enter a valid email!'),

  body('otp')
    .trim()
    .notEmpty()
    .withMessage('OTP is required!')
    .isLength({ min: 6, max: 6 })
    .withMessage('OTP must be 6 digits!')
    .isNumeric()
    .withMessage('OTP must be numeric!'),
];

// reset pass validator
export const resetPasswordValidator = [
  body('email')
    .notEmpty()
    .withMessage('Email is required!')
    .isEmail()
    .withMessage('Please provide a valid email!'),

  body('newPassword')
    .notEmpty()
    .withMessage('New password is required!')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long!')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage(
      'Password must contain at least one uppercase letter, one lowercase letter, and one number!',
    ),
];
