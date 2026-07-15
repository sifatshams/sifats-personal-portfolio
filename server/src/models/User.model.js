import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';

// schema for users
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required.'],
      trim: true,
      minlength: [2, 'Name must be at least 2 characters.'],
      maxlength: [50, 'Name must not exceed 50 characters.'],
    },
    email: {
      type: String,
      required: [true, 'Email is required.'],
      trim: true,
      lowercase: true,
      unique: true,
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        'Please enter a valid email.',
      ],
    },
    phone: {
      type: String,
      trim: true,
      default: null,
    },
    password: {
      type: String,
      required: [true, 'Password is required.'],
      select: false,
      minlength: [8, 'Password must be at least 8 characters.'],
    },
    avatar: {
      type: String,
      default: null,
    },
    // profile img
    profileImage: {
      url: String,
      publicId: String,
    },

    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },

    // notification settings
    notificationSettings: {
      email: {
        type: Boolean,
        default: true,
      },
      contact: {
        type: Boolean,
        default: true,
      },
      security: {
        type: Boolean,
        default: true,
      },
      marketing: {
        type: Boolean,
        default: false,
      },
      updates: {
        type: Boolean,
        default: true,
      },
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    // email verification
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    emailVerificationToken: {
      type: String,
      default: null,
    },
    emailVerificationExpire: {
      type: Date,
      default: null,
    },

    // otp
    otp: {
      type: String,
      default: null,
    },
    otpExpire: {
      type: Date,
      default: null,
    },
    isOtpVerified: {
      type: Boolean,
      default: false,
    },

    // password reset
    resetPasswordToken: {
      type: String,
      default: null,
    },
    resetPasswordExpire: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true, versionKey: false },
);

// ? pre password hashing with bcrypts
userSchema.pre('save', async function () {
  // check if pass is not modified then return...
  // @ts-ignore
  if (!this.isModified('password')) return;

  try {
    // generate the salt
    const salt = await bcrypt.genSalt(12);

    // now hash the password
    // @ts-ignore
    this.password = await bcrypt.hash(this.password, salt);
  } catch (error) {
    throw error;
  }
});

// ? now compare the password
// @ts-ignore
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);

export default User;
