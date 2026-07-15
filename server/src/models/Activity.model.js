import mongoose from 'mongoose';

// Activity Schema
const activitySchema = new mongoose.Schema(
  {
    // activity category
    type: {
      type: String,
      enum: ['project', 'user', 'message', 'login'],
      required: [true, 'Activity type is required.'],
      trim: true,
    },

    // activity action
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

    // timeline title
    title: {
      type: String,
      required: [true, 'Activity title is required.'],
      trim: true,
      maxlength: [100, 'Title cannot exceed 100 characters.'],
    },

    // timeline description
    description: {
      type: String,
      required: [true, 'Activity description is required.'],
      trim: true,
      maxlength: [300, 'Description cannot exceed 300 characters.'],
    },

    // related resource Id
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
