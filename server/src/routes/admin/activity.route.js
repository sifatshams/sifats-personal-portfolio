import express from 'express';
import { getAllActivitiesController } from '../../controllers/admin/activity.controller.js';
import { adminOnly, protect } from '../../middlewares/auth.middleware.js';

const activityRoute = express.Router();

// first login them check is admin?
activityRoute.use(protect);
activityRoute.use(adminOnly);

// routes
activityRoute.get('/', getAllActivitiesController);

export default activityRoute;
