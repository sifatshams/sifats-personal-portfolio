import activityModel from '../../models/Activity.model.js';

export const logActivity = async ({
  type,
  action,
  title,
  description,
  entityId = null,
  entityType = null,
}) => {
  await activityModel.create({
    type,
    action,
    title,
    description,
    entityId,
    entityType,
  });
};

export const getAllActivitiesService = async (query) => {
  // pagination setup
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 10;
  const skip = (page - 1) * limit;

  // destructure
  const { search, type, action } = query;

  const filter = {};

  // search
  if (search) {
    filter.$or = [
      { title: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } },
    ];
  }

  // filter by type
  if (type) {
    filter.type = type;
  }

  // filter by action
  if (action) {
    filter.action = action;
  }

  const totalActivities = await activityModel.countDocuments(filter);
  const activities = await activityModel
    .find(filter)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  return {
    activities,
    pagination: {
      total: totalActivities,
      page,
      limit,
      totalPages: Math.ceil(totalActivities / limit),
    },
  };
};
