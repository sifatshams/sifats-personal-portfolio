import { getAllActivitiesService } from '../../services/admin/activity.service.js';

export const getAllActivitiesController = async (req, res, next) => {
  try {
    // call service and get url from query
    const result = await getAllActivitiesService(req.query);

    // success response
    res.status(200).json({
      success: true,
      message: 'Activities fetched successfully!',
      data: result.activities,
      pagination: result.pagination,
    });
  } catch (error) {
    next(error);
  }
};
