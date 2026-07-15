import mongoose from 'mongoose';

// schema for contact form
const contactSchema = new mongoose.Schema(
  {
    userName: {
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
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please enter a valid email.',
      ],
    },

    subject: {
      type: String,
      required: [true, 'Subject is required.'],
      trim: true,
      minlength: [3, 'Subject must be at least 3 characters.'],
      maxlength: [120, 'Subject must not exceed 120 characters.'],
    },

    message: {
      type: String,
      required: [true, 'Message is required.'],
      trim: true,
      minlength: [10, 'Message must be at least 10 characters.'],
      maxlength: [1000, 'Message must not exceed 1000 characters.'],
    },

    status: {
      type: String,
      enum: ['unread', 'read'],
      default: 'unread',
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const Contact = mongoose.model('Contact', contactSchema);

export default Contact;
