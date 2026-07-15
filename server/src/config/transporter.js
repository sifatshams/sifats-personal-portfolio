import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
  // @ts-ignore
  host: process.env.BREVO_HOST,
  port: process.env.BREVO_PORT,
  secure: false,
  auth: {
    user: process.env.BREVO_USER,
    pass: process.env.BREVO_PASS,
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log('SMTP connected successfully');
  }
});
