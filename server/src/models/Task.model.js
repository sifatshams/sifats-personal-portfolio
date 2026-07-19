import mongoose from 'mongoose';

// create an task schema
const taskSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Task must belong to a user!'],
      index: true,
    },
    title: {
      type: String,
      required: [true, 'Task title is required!'],
      trim: true,
      maxlength: [150, 'Title cannot be more than 150 characters!'],
    },
    description: {
      type: String,
      required: [true, 'Task description is required!'],
      trim: true,
    },
    priority: {
      type: String,
      enum: {
        values: ['Low', 'Medium', 'High'],
        message: 'Priority must be either Low, Medium, or High!',
      },
      default: 'Medium',
    },
    status: {
      type: String,
      enum: {
        values: ['Pending', 'In Progress', 'Completed'],
        message: 'Status must be Pending, In Progress, or Completed!',
      },
      default: 'Pending',
    },
    dueDate: {
      type: Date,
      required: [true, 'Due date is required!'],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

// dynamic filtering
taskSchema.index({ user: 1, status: 1 });
taskSchema.index({ user: 1, title: 'text' });

const Task = mongoose.model('Task', taskSchema);
export default Task;
