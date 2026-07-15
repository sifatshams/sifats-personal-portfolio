import activityModel from '../../models/Activity.model.js';
import contactModel from '../../models/Contact.model.js';
import projectModel from '../../models/Project.model.js';
import userModel from '../../models/User.model.js';
import visitorModel from '../../models/Visitor.model.js';

export const getDashboardService = async (adminId) => {
  // today
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // total stats
  const [totalProjects, totalMessages, totalVisitors, totalUsers, profile] =
    await Promise.all([
      projectModel.countDocuments(),

      contactModel.countDocuments(),

      visitorModel.countDocuments(),

      userModel.countDocuments(),

      userModel.findById(adminId).select('name email avatar role'),
    ]);

  // recent projects
  const recentProjects = await projectModel
    .find()
    .sort({ createdAt: -1 })
    .limit(5)
    .select(
      'title description status technologies thumbnail createdAt updatedAt',
    );

  // recent messages
  const recentMessages = await contactModel
    .find()
    .sort({ createdAt: -1 })
    .limit(5)
    .select('userName email subject message status createdAt');

  // latest activities
  const activities = await activityModel
    .find()
    .sort({ createdAt: -1 })
    .limit(10);

  // last 7 days visitors
  const last7Days = new Date(today);
  last7Days.setDate(last7Days.getDate() - 6);

  const visitorChart = await visitorModel.aggregate([
    {
      $match: {
        createdAt: {
          $gte: last7Days,
        },
      },
    },
    {
      $group: {
        _id: {
          $dateToString: {
            format: '%Y-%m-%d',
            date: '$createdAt',
          },
        },
        visitors: {
          $sum: 1,
        },
      },
    },
    {
      $project: {
        _id: 0,
        date: '$_id',
        visitors: 1,
      },
    },
    {
      $sort: {
        _id: 1,
      },
    },
  ]);

  return {
    stats: {
      totalProjects,
      totalMessages,
      totalVisitors,
      totalUsers,
      growth: 0,
    },

    recentProjects,

    recentMessages,

    activities,

    visitorChart,

    profile,
  };
};
