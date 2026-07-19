import taskService from '../../services/users/task.service.js';

const catchAsync = (fn) => (req, res, next) => fn(req, res, next).catch(next);

export const getDashboardSummary = catchAsync(async (req, res) => {
  // req.user._id from auth middleware
  const summary = await taskService.getDashboardSummary(req.user._id);

  res.status(200).json({
    status: 'success',
    data: summary,
  });
});

export const getMyTasks = catchAsync(async (req, res) => {
  const tasks = await taskService.queryUserTasks(req.user._id, req.query);

  res.status(200).json({
    status: 'success',
    results: tasks.length,
    data: tasks,
  });
});

export const createTask = catchAsync(async (req, res) => {
  const newTask = await taskService.createNewTask(req.user._id, req.body);

  res.status(201).json({
    status: 'success',
    data: newTask,
  });
});

export const updateTask = catchAsync(async (req, res) => {
  const updatedTask = await taskService.updateTaskById(
    req.user._id,
    req.params.id,
    req.body,
  );

  if (!updatedTask) {
    return res.status(404).json({
      status: 'fail',
      message: 'No task found with this ID for this user',
    });
  }

  res.status(200).json({
    status: 'success',
    data: updatedTask,
  });
});
