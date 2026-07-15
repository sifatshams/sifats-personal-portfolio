import { getSettingsService } from '../../services/users/settings.service.js';

export const getSettingsController = async (req, res, next) => {
  try {
    // call service
    const settings = await getSettingsService(req.user.id);

    // success response
    res.status(200).json({
      success: true,
      message: 'Settings fetched successfully!',
      data: settings,
    });
  } catch (error) {
    next(error);
  }
};
