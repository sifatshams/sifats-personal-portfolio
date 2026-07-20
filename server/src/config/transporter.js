import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
  host: process.env.BREVO_HOST,
  port: Number(process.env.BREVO_PORT),
  secure: false,
  auth: {
    user: process.env.BREVO_USER,
    pass: process.env.BREVO_PASS,
  },
  family: 4, // ipv4 force
  connectionTimeout: 10000, // 10 second timeout (optional safety)
});

transporter.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log('SMTP connected successfully!');
  }
});
