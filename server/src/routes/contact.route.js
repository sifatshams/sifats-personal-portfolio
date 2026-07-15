import express from 'express';
import contactController from '../controllers/contact.controller.js';
import validate from '../middlewares/validation.middleware.js';
import { contactValidator } from '../validators/contact.validator.js';

const contactRoute = express.Router();

// public contact api
contactRoute.post('/contact', contactValidator, validate, contactController);

export default contactRoute;
