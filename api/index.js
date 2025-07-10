const express = require('express');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const serverless = require('serverless-http');
require('dotenv').config();

const serviceAccount = require('../myshop-1580d-firebase-adminsdk-fbsvc-69296d705b.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const app = express();
app.use(bodyParser.json());

// ตั้งค่า SMTP (ใช้ Gmail) - ใช้ environment variables
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// API ส่งอีเมลยืนยัน
app.post('/send-custom-verification-email', async (req, res) => {
  const { userEmail, redirectUrl } = req.body;
  const actionCodeSettings = {
    url: redirectUrl || `${process.env.FRONTEND_URL}/verify-email-success`
  };

  try {
    // สร้างลิงก์ยืนยัน
    const actionLink = await admin.auth().generateEmailVerificationLink(userEmail, actionCodeSettings);

    // สร้างเนื้อหาอีเมล custom
    const html = `
      <h2>ยืนยันอีเมลสำหรับ Art-tive</h2>
      <p>สวัสดีค่ะ/ครับ,</p>
      <p>กรุณาคลิกลิงก์ด้านล่างเพื่อยืนยันอีเมลของคุณ:</p>
      <a href="${actionLink}">ยืนยันอีเมล</a>
      <p>หากคุณไม่ได้สมัครสมาชิก กรุณาเมินอีเมลนี้</p>
      <br>
      <p>ขอบคุณ,<br>ทีมงาน Art-tive</p>
    `;

    // ส่งอีเมล
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: userEmail,
      subject: process.env.EMAIL_SUBJECT,
      html
    });

    res.status(200).json({ message: 'ส่งอีเมลยืนยันแล้ว' });
  } catch (err) {
    console.error('Error sending email:', err);
    res.status(500).json({ error: err.message });
  }
});

// ... (โค้ดเดิม)

module.exports = app;
module.exports.handler = serverless(app); 