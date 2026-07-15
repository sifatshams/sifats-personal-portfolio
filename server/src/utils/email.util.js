// @ts-nocheck
import { transporter } from '../config/transporter.js';

// @ts-ignore
export const sendVerificationEmail = async (
  toEmail,
  userName,
  verificationToken,
) => {
  const verifyURL = `${process.env.CLIENT_URL}/verify-email/${verificationToken}`;

  const mailOptions = {
    from: `"Sifat Tech" <${process.env.BREVO_SENDER}>`,
    to: toEmail,
    subject: '📩 Verify Your Email • Sifat Tech',

    html: `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width,initial-scale=1.0" />
<title>Email Verification</title>
</head>

<body style="
  margin:0;
  padding:0;
  background:#0f172a;
  font-family:Arial,sans-serif;
">

<table
width="100%"
cellpadding="0"
cellspacing="0"
style="padding:40px 16px;"
>
<tr>
<td align="center">

<table
width="620"
cellpadding="0"
cellspacing="0"
style="
  max-width:620px;
  background:#111827;
  border-radius:28px;
  overflow:hidden;
  border:1px solid #1f2937;
  box-shadow:0 20px 60px rgba(79,70,229,.18);
"
>

<!-- HEADER -->
<tr>
<td
style="
  background:linear-gradient(135deg,#6366f1,#4f46e5);
  text-align:center;
  padding:42px 30px;
"
>

<div
style="
  width:70px;
  height:70px;
  background:rgba(255,255,255,.12);
  border-radius:50%;
  line-height:70px;
  font-size:30px;
  margin:0 auto 18px;
"
>
✉️
</div>

<h1
style="
  margin:0;
  color:white;
  font-size:30px;
  font-weight:700;
"
>
Sifat Tech
</h1>

<p
style="
  margin-top:10px;
  color:#dbeafe;
  font-size:14px;
"
>
Secure Account Verification
</p>

</td>
</tr>

<!-- BODY -->
<tr>
<td style="padding:45px 38px;">

<h2
style="
  color:white;
  margin:0 0 18px;
  font-size:28px;
"
>
Hello ${userName},
</h2>

<p
style="
  color:#cbd5e1;
  font-size:16px;
  line-height:1.9;
  margin:0 0 20px;
"
>
Thank you for joining
<strong style="color:#818cf8;">
Sifat Tech
</strong>.
To activate your account and keep it secure,
please verify your email address.
</p>

<!-- CTA -->
<div style="text-align:center;margin:38px 0;">

<a
href="${verifyURL}"
style="
  display:inline-block;
  background:linear-gradient(135deg,#6366f1,#4f46e5);
  color:#fff;
  text-decoration:none;
  padding:16px 36px;
  border-radius:14px;
  font-size:16px;
  font-weight:700;
  box-shadow:0 10px 30px rgba(79,70,229,.35);
"
>
Verify Email Address
</a>

</div>

<!-- SECURITY BOX -->
<div
style="
  background:#0b1220;
  border:1px solid #1e293b;
  border-radius:16px;
  padding:18px;
"
>

<p
style="
  margin:0 0 10px;
  color:#94a3b8;
  font-size:14px;
  font-weight:600;
"
>
Button not working?
</p>

<p
style="
  margin:0;
  color:#818cf8;
  word-break:break-word;
  font-size:14px;
"
>
${verifyURL}
</p>

</div>

<!-- NOTE -->
<p
style="
  margin-top:28px;
  color:#94a3b8;
  line-height:1.8;
  font-size:14px;
"
>
This verification link will remain active for
<strong style="color:#fff;">
24 hours
</strong>.
If you did not create an account, you may safely ignore this email.
</p>

</td>
</tr>

<!-- FOOTER -->
<tr>
<td
style="
  background:#0b1120;
  border-top:1px solid #1f2937;
  text-align:center;
  padding:28px;
"
>

<p
style="
  margin:0;
  color:#64748b;
  font-size:13px;
"
>
© ${new Date().getFullYear()} Sifat Tech
</p>

<p
style="
  margin-top:8px;
  color:#475569;
  font-size:12px;
"
>
Secure • Reliable • Future Ready
</p>

</td>
</tr>

</table>

</td>
</tr>
</table>

</body>
</html>
`,
  };

  await transporter.sendMail(mailOptions);
};

// send otp email
export const sendOtpEmail = async (toEmail, userName, otp) => {
  const mailOptions = {
    from: `"Inventory APP Security" <${process.env.BREVO_SENDER}>`,
    to: toEmail,
    subject: 'Your Password Reset OTP • Sifat Tech',
    html: `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8" />
</head>

<body style="
  margin:0;
  padding:0;
  background:#f4f7fb;
  font-family:Arial,sans-serif;
">

  <table width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td align="center" style="padding:40px 20px;">

        <table width="520" cellpadding="0" cellspacing="0" style="
          background:#ffffff;
          border-radius:20px;
          overflow:hidden;
          box-shadow:0 10px 35px rgba(0,0,0,.08);
        ">

          <!-- top gradient -->
          <tr>
            <td style="
              background:linear-gradient(135deg,#4f46e5,#7c3aed);
              padding:35px;
              text-align:center;
            ">
              <h1 style="
                margin:0;
                color:#ffffff;
                font-size:28px;
                font-weight:700;
              ">
                🔐 Inventory APP
              </h1>

              <p style="
                margin-top:10px;
                color:#e5e7eb;
                font-size:14px;
              ">
                Secure Account Verification
              </p>
            </td>
          </tr>

          <!-- content -->
          <tr>
            <td style="padding:40px;">

              <h2 style="
                margin:0 0 16px;
                color:#111827;
                font-size:24px;
              ">
                Password Reset Request
              </h2>

              <p style="
                color:#4b5563;
                font-size:16px;
                line-height:1.7;
                margin-bottom:15px;
              ">
                Hi <b>${userName}</b>,
              </p>

              <p style="
                color:#4b5563;
                font-size:16px;
                line-height:1.7;
              ">
                We received a request to reset your account password.
                Use the OTP below to continue.
              </p>

              <!-- otp box -->
              <div style="
                margin:35px 0;
                text-align:center;
              ">
                <div style="
                  display:inline-block;
                  background:#eef2ff;
                  border:2px dashed #6366f1;
                  color:#4338ca;
                  padding:18px 35px;
                  border-radius:14px;
                  font-size:34px;
                  font-weight:700;
                  letter-spacing:10px;
                ">
                  ${otp}
                </div>
              </div>

              <p style="
                color:#6b7280;
                font-size:15px;
                line-height:1.7;
              ">
                ⏳ This OTP is valid for
                <b>5 minutes</b>.
              </p>

              <p style="
                color:#6b7280;
                font-size:15px;
                line-height:1.7;
              ">
                If you did not request a password reset,
                you can safely ignore this email.
              </p>

            </td>
          </tr>

          <!-- footer -->
          <tr>
            <td style="
              background:#f9fafb;
              padding:22px;
              text-align:center;
              border-top:1px solid #e5e7eb;
            ">

              <p style="
                margin:0;
                color:#9ca3af;
                font-size:13px;
              ">
                © ${new Date().getFullYear()} Inventory APP
              </p>

              <p style="
                margin-top:8px;
                color:#9ca3af;
                font-size:12px;
              ">
                Security • Reliability • Protection
              </p>

            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>
`,
  };

  await transporter.sendMail(mailOptions);
};
