import visitorModel from '../../models/Visitor.model.js';

// visitor analytics
export const getVisitorAnalyticsService = async () => {
  // today
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // yesterday
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  // last 7 days
  const last7Days = new Date(today);
  last7Days.setDate(last7Days.getDate() - 6);

  // first day of month
  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

  // basic stats
  const [
    totalVisitors,
    uniqueVisitors,
    todayVisitors,
    yesterdayVisitors,
    monthVisitors,
  ] = await Promise.all([
    visitorModel.countDocuments(),

    visitorModel.countDocuments({
      isUnique: true,
    }),

    visitorModel.countDocuments({
      createdAt: {
        $gte: today,
      },
    }),

    visitorModel.countDocuments({
      createdAt: {
        $gte: yesterday,
        $lt: today,
      },
    }),

    visitorModel.countDocuments({
      createdAt: {
        $gte: firstDayOfMonth,
      },
    }),
  ]);

  // analytics
  const [weeklyVisitors, topPages, browsers, devices, countries] =
    await Promise.all([
      // weekly visitors
      visitorModel.aggregate([
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
          $sort: {
            _id: 1,
          },
        },
      ]),

      // top pages
      visitorModel.aggregate([
        {
          $group: {
            _id: '$path',
            visitors: {
              $sum: 1,
            },
          },
        },
        {
          $sort: {
            visitors: -1,
          },
        },
        {
          $limit: 5,
        },
        {
          $project: {
            _id: 0,
            path: '$_id',
            visitors: 1,
          },
        },
      ]),

      // browsers
      visitorModel.aggregate([
        {
          $group: {
            _id: '$browser',
            visitors: {
              $sum: 1,
            },
          },
        },
        {
          $sort: {
            visitors: -1,
          },
        },
        {
          $project: {
            _id: 0,
            browser: '$_id',
            visitors: 1,
          },
        },
      ]),

      // devices
      visitorModel.aggregate([
        {
          $group: {
            _id: '$device',
            visitors: {
              $sum: 1,
            },
          },
        },
        {
          $sort: {
            visitors: -1,
          },
        },
        {
          $project: {
            _id: 0,
            device: '$_id',
            visitors: 1,
          },
        },
      ]),

      // top countries
      visitorModel.aggregate([
        {
          $group: {
            _id: '$country',
            visitors: {
              $sum: 1,
            },
          },
        },
        {
          $sort: {
            visitors: -1,
          },
        },
        {
          $limit: 10,
        },
        {
          $project: {
            _id: 0,
            country: '$_id',
            visitors: 1,
          },
        },
      ]),
    ]);

  // calculate growth
  let growth = 0;

  if (yesterdayVisitors === 0) {
    growth = todayVisitors > 0 ? 100 : 0;
  } else {
    growth = Number(
      (((todayVisitors - yesterdayVisitors) / yesterdayVisitors) * 100).toFixed(
        2,
      ),
    );
  }

  return {
    stats: {
      totalVisitors,
      uniqueVisitors,
      todayVisitors,
      yesterdayVisitors,
      monthVisitors,
      growth,
    },

    weeklyVisitors,

    topPages,

    browsers,

    devices,

    countries,
  };
};
