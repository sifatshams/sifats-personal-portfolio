import axios from 'axios';

export const sendBrevoEmail = async ({ to, subject, html, senderName }) => {
  try {
    const response = await axios.post(
      'https://api.brevo.com/v3/smtp/email',
      {
        sender: {
          name: senderName || 'Sifat Tech',
          email: process.env.BREVO_SENDER,
        },
        to: [{ email: to }],
        subject: subject,
        htmlContent: html,
      },
      {
        headers: {
          'api-key': process.env.BREVO_API_KEY,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      },
    );
    console.log('Email sent successfully:', response.data);
    return response.data;
  } catch (error) {
    console.log('Brevo email error:', error.response?.data || error.message);
    throw error;
  }
};
