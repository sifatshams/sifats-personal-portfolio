import taskService from '../../services/users/task.service.js';

export const getDashboardSummary = async (req, res, next) => {
  try {
    const summary = await taskService.getDashboardSummary(req.user._id);

    return res.status(200).json({
      success: true,
      message: 'Dashboard summary retrieved successfully!',
      data: summary,
    });
  } catch (error) {
    next(error);
  }
};

export const getMyTasks = async (req, res, next) => {
  try {
    const tasks = await taskService.queryUserTasks(req.user._id, req.query);

    return res.status(200).json({
      success: true,
      message: 'Tasks retrieved successfully!',
      results: tasks.length,
      data: tasks,
    });
  } catch (error) {
    next(error);
  }
};

export const createTask = async (req, res, next) => {
  try {
    const newTask = await taskService.createNewTask(req.user._id, req.body);

    return res.status(201).json({
      success: true,
      message: 'Task created successfully!',
      data: newTask,
    });
  } catch (error) {
    next(error);
  }
};

export const updateTask = async (req, res, next) => {
  try {
    const updatedTask = await taskService.updateTaskById(
      req.user._id,
      req.params.id,
      req.body,
    );

    if (!updatedTask) {
      return res.status(404).json({
        success: false,
        message:
          'Task not found or you are not authorized to update this task!',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Task updated successfully!',
      data: updatedTask,
    });
  } catch (error) {
    next(error);
  }
};
