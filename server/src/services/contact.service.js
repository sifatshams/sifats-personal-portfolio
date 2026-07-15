import Contact from '../models/Contact.model.js';

import { logActivity } from './admin/activity.service.js';

// create contact message
const contactService = async (contactData) => {
  const { userName, email, subject, message } = contactData;

  // create contact
  const contact = await Contact.create({
    userName,
    email,
    subject,
    message,
  });

  // save activity
  await logActivity({
    type: 'message',
    action: 'received',
    title: 'New Contact Message',
    description: `${contact.userName} sent "${contact.subject}".`,
    entityId: contact._id,
    entityType: 'contact',
  });

  return contact;
};

export default contactService;
