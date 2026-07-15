import express from 'express';

import { getDashboardController } from '../../controllers/admin/dashboard.controller.js';
import { adminOnly, protect } from '../../middlewares/auth.middleware.js';

const dashboardRoute = express.Router();

// admin only
dashboardRoute.use(protect);
dashboardRoute.use(adminOnly);

// routes
dashboardRoute.get('/', getDashboardController);

export default dashboardRoute;
