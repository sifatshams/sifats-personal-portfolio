import express from 'express';
import {
  createTask,
  getDashboardSummary,
  getMyTasks,
  updateTask,
} from '../../controllers/users/task.controller.js';
import { protect } from '../../middlewares/auth.middleware.js';

const taskRoute = express.Router();

taskRoute.use(protect);

// dash specific root
taskRoute.get('/dashboard-summary', getDashboardSummary);

// crud root
taskRoute.route('/').get(getMyTasks).post(createTask);

taskRoute.route('/:id').patch(updateTask);

export default taskRoute;
