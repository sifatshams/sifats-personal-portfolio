import { body } from 'express-validator';

export const createProjectValidator = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Project title is required.')
    .isLength({ min: 3, max: 100 })
    .withMessage('Project title must be between 3 and 100 characters.'),

  body('description')
    .trim()
    .notEmpty()
    .withMessage('Project description is required.')
    .isLength({ min: 10, max: 500 })
    .withMessage('Project description must be between 10 and 500 characters.'),

  body('status')
    .optional()
    .isIn(['pending', 'in_progress', 'completed', 'cancelled'])
    .withMessage('Invalid project status.'),

  body('progress')
    .optional()
    .isInt({ min: 0, max: 100 })
    .withMessage('Progress must be between 0 and 100.'),

  body('githubUrl').optional().isURL().withMessage('Invalid GitHub URL.'),

  body('liveUrl').optional().isURL().withMessage('Invalid Live URL.'),

  body('technologies')
    .optional()
    .isArray()
    .withMessage('Technologies must be an array.'),
];

export const updateProjectValidator = [
  body('title')
    .optional()
    .trim()
    .isLength({ min: 3, max: 100 })
    .withMessage('Project title must be between 3 and 100 characters.'),

  body('description')
    .optional()
    .trim()
    .isLength({ min: 10, max: 500 })
    .withMessage('Project description must be between 10 and 500 characters.'),

  body('status')
    .optional()
    .isIn(['pending', 'in_progress', 'completed', 'cancelled'])
    .withMessage('Invalid project status.'),

  body('progress')
    .optional()
    .isInt({ min: 0, max: 100 })
    .withMessage('Progress must be between 0 and 100.'),

  body('thumbnail')
    .optional()
    .trim()
    .isString()
    .withMessage('Thumbnail must be a string.'),

  body('githubUrl')
    .optional()
    .trim()
    .isURL()
    .withMessage('Please provide a valid GitHub URL.'),

  body('liveUrl')
    .optional()
    .trim()
    .isURL()
    .withMessage('Please provide a valid Live URL.'),

  body('technologies')
    .optional()
    .isArray()
    .withMessage('Technologies must be an array.'),

  body('technologies.*')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Technology name cannot be empty.'),
];
