import {
  createProjectService,
  deleteProjectService,
  getAllProjectsService,
  getProjectByIdService,
  updateProjectService,
} from '../../services/admin/project.service.js';

// create projects
export const createProjectController = async (req, res, next) => {
  try {
    // call service
    const project = await createProjectService(req.body);

    // success response
    return res.status(201).json({
      success: true,
      message: 'Project created successfully!',
      data: project,
    });
  } catch (error) {
    next(error);
  }
};

// get all projects
export const getAllProjectsController = async (req, res, next) => {
  try {
    // call service by query
    const result = await getAllProjectsService(req.query);

    // success response
    res.status(200).json({
      success: true,
      message: 'Projects fetched successfully!',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

// get project by id
export const getProjectByIdController = async (req, res, next) => {
  try {
    // call service by req.params
    const project = await getProjectByIdService(req.params.id);

    // success response
    res.status(200).json({
      success: true,
      message: 'Project fetched successfully!',
      data: project,
    });
  } catch (error) {
    next(error);
  }
};

// update project
export const updateProjectController = async (req, res, next) => {
  try {
    // destructure
    const { id } = req.params;
    const updateData = req.body;

    // call the service
    const project = await updateProjectService(id, updateData);

    // success response
    res.status(200).json({
      status: true,
      message: 'Project updated successfully!',
      data: project,
    });
  } catch (error) {
    next(error);
  }
};

// delete project
export const deleteProjectController = async (req, res, next) => {
  try {
    // destructure the id from params
    const { id } = req.params;

    await deleteProjectService(id);

    // success response
    res
      .status(200)
      .json({ success: true, message: 'Project deleted successfully!' });
  } catch (error) {
    next(error);
  }
};
