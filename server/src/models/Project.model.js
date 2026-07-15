import mongoose from 'mongoose';

// create project schema
const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Project title is required'],
      trim: true,
      minlength: [3, 'Project title must be at least 3 characters long'],
      maxlength: [100, 'Project title must be less than 100 characters long'],
    },
    description: {
      type: String,
      required: [true, 'Project description is required'],
      trim: true,
      minlength: [
        10,
        'Project description must be at least 10 characters long',
      ],
      maxlength: [
        500,
        'Project description must be less than 500 characters long',
      ],
    },
    status: {
      type: String,
      enum: ['pending', 'in_progress', 'completed', 'cancelled'],
      default: 'pending',
    },
    progress: {
      type: Number,
      default: 0,
      min: [0, 'Progress cannot be less than 0'],
      max: [100, 'Progress cannot be greater than 100'],
    },
    thumbnail: {
      type: String,
      default: null,
    },
    githubUrl: {
      type: String,
      trim: true,
      default: '',
      match: [/^(https?:\/\/).+/, 'Please enter a valid GitHub URL'],
    },
    liveUrl: {
      type: String,
      trim: true,
      default: '',
      match: [/^(https?:\/\/).+/, 'Please enter a valid Live URL'],
    },
    technologies: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true, versionKey: false },
);

const projectModel = mongoose.model('Project', projectSchema);
export default projectModel;
