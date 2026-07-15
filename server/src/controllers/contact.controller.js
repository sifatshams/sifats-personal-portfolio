import contactService from '../services/contact.service.js';

const contactController = async (req, res, next) => {
  try {
    // get data from body
    const contactData = req.body;

    // create contact message
    const contact = await contactService(contactData);

    // success response
    res.status(201).json({
      success: true,
      message: 'Your message has been sent successfully!',
      data: {
        _id: contact._id,
        userName: contact.userName,
        email: contact.email,
        subject: contact.subject,
        message: contact.message,
        status: contact.status,
        createdAt: contact.createdAt,
      },
    });
  } catch (error) {
    next(error);
  }
};

export default contactController;
