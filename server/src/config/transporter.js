import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
  host: process.env.BREVO_HOST,
  port: Number(process.env.BREVO_PORT),
  secure: true,
  auth: {
    user: process.env.BREVO_USER,
    pass: process.env.BREVO_PASS,
  },
  family: 4, // IPv4 force
  connectionTimeout: 15000, // 15 second wait
  greetingTimeout: 15000,
  socketTimeout: 15000,
});

transporter.verify((error, success) => {
  if (error) {
    console.log('SMTP verify error:', error);
  } else {
    console.log('SMTP connected successfully');
  }
});
