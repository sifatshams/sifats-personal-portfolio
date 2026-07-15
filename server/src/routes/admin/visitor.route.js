import express from 'express';
import { getVisitorAnalyticsController } from '../../controllers/admin/visitor.controller.js';
import { adminOnly, protect } from '../../middlewares/auth.middleware.js';

const visitorRoute = express.Router();

// admin controll only
visitorRoute.use(protect);
visitorRoute.use(adminOnly);

// routes
visitorRoute.get('/', getVisitorAnalyticsController);

export default visitorRoute;
