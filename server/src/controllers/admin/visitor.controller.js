import { getVisitorAnalyticsService } from '../../services/admin/visitor.service.js';

export const getVisitorAnalyticsController = async (req, res, next) => {
  try {
    // call the service
    const analytics = await getVisitorAnalyticsService();

    // success response
    res.status(200).json({
      success: true,
      message: 'Visitor analytics fetched successfully!',
      data: analytics,
    });
  } catch (error) {
    next(error);
  }
};
