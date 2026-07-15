import express from 'express';
import {
  createProjectController,
  deleteProjectController,
  getAllProjectsController,
  getProjectByIdController,
  updateProjectController,
} from '../../controllers/admin/project.controller.js';
import { adminOnly, protect } from '../../middlewares/auth.middleware.js';
import validate from '../../middlewares/validation.middleware.js';
import {
  createProjectValidator,
  updateProjectValidator,
} from '../../validators/project.validator.js';

const projectRoute = express.Router();

// first login them check is admin?
projectRoute.use(protect);
projectRoute.use(adminOnly);

// create projects
projectRoute.post(
  '/',
  createProjectValidator,
  validate,
  createProjectController,
);

// get all projects
projectRoute.get('/', getAllProjectsController);

// get single project by id
projectRoute.get('/:id', getProjectByIdController);

// update project
projectRoute.put(
  '/:id',
  updateProjectValidator,
  validate,
  updateProjectController,
);

// delete project
projectRoute.delete('/:id', deleteProjectController);

export default projectRoute;
