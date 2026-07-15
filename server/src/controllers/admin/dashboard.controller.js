import { getDashboardService } from '../../services/admin/dashboard.service.js';

// get dashboard data
export const getDashboardController = async (req, res, next) => {
  try {
    // get logged in admin id
    const adminId = req.user._id;

    // call service
    const dashboard = await getDashboardService(adminId);

    // success response
    res.status(200).json({
      success: true,
      message: 'Dashboard data fetched successfully!',
      data: dashboard,
    });
  } catch (error) {
    next(error);
  }
};
