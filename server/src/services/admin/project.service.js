import mongoose from 'mongoose';
import projectModel from '../../models/Project.model.js';
import { logActivity } from './activity.service.js';

// create project
export const createProjectService = async (projectData) => {
  // duplicate title check
  const existingProject = await projectModel.findOne({
    title: projectData.title,
  });

  if (existingProject) {
    throw new Error('Project with this title already exists!');
  }

  // create project
  const project = await projectModel.create(projectData);

  // save activity
  await logActivity({
    type: 'project',
    action: 'created',
    title: 'Project Created',
    description: `${project.title} project was created.`,
    entityId: project._id,
    entityType: 'project',
  });

  return project;
};

// get all projects
export const getAllProjectsService = async (query) => {
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 10;
  const skip = (page - 1) * limit;

  const filter = {};

  // status filter
  if (query.status) {
    filter.status = query.status;
  }

  // search
  if (query.search) {
    filter.title = {
      $regex: query.search,
      $options: 'i',
    };
  }

  const total = await projectModel.countDocuments(filter);

  const projects = await projectModel
    .find(filter)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  return {
    projects,
    pagination: { total, page, limit, totalPages: Math.ceil(total / limit) },
  };
};

// get projects by id
export const getProjectByIdService = async (projectId) => {
  // check valid objectId
  if (!mongoose.Types.ObjectId.isValid(projectId)) {
    const error = new Error('Invalid project id.');
    error.statusCode = 400;
    throw error;
  }

  // check project exists
  const project = await projectModel.findById(projectId);

  if (!project) {
    const error = new Error('Project not found!');
    error.statusCode = 404;
    throw error;
  }

  return project;
};

// updates project
export const updateProjectService = async (projectId, projectData) => {
  // check valid objectId
  if (!mongoose.Types.ObjectId.isValid(projectId)) {
    const error = new Error('Invalid object id.');
    error.statusCode = 400;
    throw error;
  }

  // check project exists
  const project = await projectModel.findById(projectId);

  if (!project) {
    const error = new Error('Project not found!');
    error.statusCode = 404;
    throw error;
  }

  // duplicate title check
  if (projectData && projectData.title) {
    const existingProject = await projectModel.findOne({
      title: projectData.title,
      _id: { $ne: projectId },
    });

    if (existingProject) {
      const error = new Error('Project title already exists!');
      error.statusCode = 409;
      throw error;
    }
  }

  // update project
  const updateProject = await projectModel.findByIdAndUpdate(
    projectId,
    projectData,
    { new: true, runValidators: true },
  );

  // save activity
  await logActivity({
    type: 'project',
    action: 'updated',
    title: 'Project Updated',
    description: `${project.title} project was updated.`,
    entityId: project._id,
    entityType: 'project',
  });

  return updateProject;
};

// delete project
export const deleteProjectService = async (projectId) => {
  // check valid objectId
  if (!mongoose.Types.ObjectId.isValid(projectId)) {
    const error = new Error('Invalid project id.');
    error.statusCode = 400;
    throw error;
  }

  // find project
  const project = await projectModel.findById(projectId);

  if (!project) {
    const error = new Error('Project not found!');
    error.statusCode = 404;
    throw error;
  }

  // delete the project
  await project.deleteOne();

  // save activity
  await logActivity({
    type: 'project',
    action: 'deleted',
    title: 'Project Deleted',
    description: `${project.title} project was deleted.`,
    entityId: project._id,
    entityType: 'project',
  });

  return project;
};
