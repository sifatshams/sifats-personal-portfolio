import mongoose from 'mongoose';

// activity Schema
const activitySchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ['project', 'user', 'message', 'login'],
      required: [true, 'Activity type is required.'],
      trim: true,
    },
    action: {
      type: String,
      enum: [
        'created',
        'updated',
        'deleted',
        'registered',
        'received',
        'login',
      ],
      required: [true, 'Activity action is required.'],
      trim: true,
    },
    title: {
      type: String,
      required: [true, 'Activity title is required.'],
      trim: true,
      maxlength: [100, 'Title cannot exceed 100 characters.'],
    },
    description: {
      type: String,
      required: [true, 'Activity description is required.'],
      trim: true,
      maxlength: [300, 'Description cannot exceed 300 characters.'],
    },
    entityId: {
      type: mongoose.Schema.Types.ObjectId,
      default: null,
    },

    //related resource type
    entityType: {
      type: String,
      enum: ['project', 'user', 'contact'],
      default: null,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const activityModel = mongoose.model('Activity', activitySchema);

export default activityModel;
