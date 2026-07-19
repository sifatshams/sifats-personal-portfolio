import mongoose from 'mongoose';
import Task from '../../models/Task.model.js';

class TaskService {
  // dash summary
  async getDashboardSummary(userId) {
    const userObjectId = new mongoose.Types.ObjectId(userId);

    const summary = await Task.aggregate([
      { $match: { user: userObjectId } },
      {
        $facet: {
          // global countars calculation
          globalStats: [
            {
              $group: {
                _id: null,
                totalTasks: { $sum: 1 },
                completedTasks: {
                  $sum: { $cond: [{ $eq: ['$status', 'Completed'] }, 1, 0] },
                },
                // dummy counter
                activeProjects: {
                  $addToSet: '$status',
                },
              },
            },
          ],
          // chart analitycs
          statusDistribution: [
            { $group: { _id: '$status', count: { $sum: 1 } } },
          ],
          // recent 4 task
          recentTasks: [
            { $sort: { updatedAt: -1 } },
            { $limit: 4 },
            { $project: { _id: 1, title: 1, priority: 1, status: 1 } },
          ],
          // upcoming deadlines
          upcomingDeadlines: [
            {
              $match: {
                status: { $ne: 'Completed' },
                dueDate: { $gte: new Date() },
              },
            },
            { $sort: { dueDate: 1 } },
            { $limit: 3 },
            { $project: { _id: 1, title: 1, due: '$dueDate' } },
          ],
        },
      },
    ]);

    // aggregation data formating
    const rawData = summary[0];
    const statsData = rawData.globalStats[0] || {
      totalTasks: 0,
      completedTasks: 0,
      activeProjects: [],
    };

    const total = statsData.totalTasks || 0;
    const completed = statsData.completedTasks || 0;
    const completionRate =
      total > 0 ? Math.round((completed / total) * 100) : 0;

    // task analitysk array
    const statuses = ['In Progress', 'Completed', 'Pending'];
    const taskAnalytics = statuses.map((status) => {
      const match = rawData.statusDistribution.find((d) => d._id === status);
      const count = match ? match.count : 0;
      return {
        label: status === 'Pending' ? 'To Do / Backlog' : status,
        count,
        percentage: total > 0 ? Math.round((count / total) * 100) : 0,
        color:
          status === 'Completed'
            ? 'bg-emerald-500'
            : status === 'In Progress'
              ? 'bg-amber-500'
              : 'bg-slate-500',
      };
    });

    return {
      stats: {
        totalTasks: total,
        completedTasks: completed,
        completionRate,
        activeProjects: statsData.activeProjects.length || 0,
      },
      taskAnalytics,
      recentTasks: rawData.recentTasks,
      upcomingDeadlines: rawData.upcomingDeadlines.map((d) => ({
        _id: d._id,
        title: d.title,
        due: new Date(d.due).toLocaleDateString('en-US', {
          weekday: 'short',
          month: 'short',
          day: 'numeric',
        }),
      })),
    };
  }

  // all task get and search and filter task
  async queryUserTasks(userId, query) {
    const { search, status } = query;
    let findQuery = { user: userId };

    if (status && status !== 'All') {
      findQuery.status = status;
    }

    if (search) {
      findQuery.$or = [
        { title: { $regex: search, $options: 'i' } },
        { desc: { $regex: search, $options: 'i' } },
      ];
    }

    return await Task.find(findQuery).sort({ createdAt: -1 });
  }

  // create new task
  async createNewTask(userId, taskData) {
    return await Task.create({
      user: userId,
      ...taskData,
    });
  }

  // update task
  async updateTaskById(userId, taskId, updateData) {
    return await Task.findOneAndUpdate(
      { _id: taskId, user: userId },
      updateData,
      { new: true, runValidators: true },
    );
  }
}

export default new TaskService();
