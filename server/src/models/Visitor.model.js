import mongoose from 'mongoose';

// visitor schema
const visitorSchema = new mongoose.Schema(
  {
    ip: {
      type: String,
      required: true,
      trim: true,
    },
    browser: {
      type: String,
      default: 'Unknown',
      trim: true,
    },
    os: {
      type: String,
      default: 'Unknown',
      trim: true,
    },
    device: {
      type: String,
      enum: ['desktop', 'mobile', 'tablet', 'bot', 'unknown'],
      default: 'unknown',
    },
    path: {
      type: String,
      required: true,
      trim: true,
    },
    method: {
      type: String,
      default: 'GET',
      trim: true,
    },
    referrer: {
      type: String,
      default: null,
    },
    country: {
      type: String,
      default: 'Unknown',
    },

    city: {
      type: String,
      default: 'Unknown',
    },
    userAgent: {
      type: String,
      default: '',
    },
    isUnique: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true, versionKey: false },
);

const visitorModel = mongoose.model('Visitor', visitorSchema);

export default visitorModel;
