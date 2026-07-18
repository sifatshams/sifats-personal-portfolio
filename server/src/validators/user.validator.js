import { body } from 'express-validator';

// update notification settings validator
export const updateNotificationSettingsValidator = [
  body('email')
    .optional()
    .isBoolean()
    .withMessage('Email notification must be a boolean.'),

  body('contact')
    .optional()
    .isBoolean()
    .withMessage('Contact notification must be a boolean.'),

  body('security')
    .optional()
    .isBoolean()
    .withMessage('Security notification must be a boolean.'),

  body('marketing')
    .optional()
    .isBoolean()
    .withMessage('Marketing notification must be a boolean.'),

  body('updates')
    .optional()
    .isBoolean()
    .withMessage('Updates notification must be a boolean.'),
];
